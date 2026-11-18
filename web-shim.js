/* 브라우저/PWA 전용 어댑터.
 * Electron(preload.js)이 window.api 를 제공하면 아무것도 하지 않고,
 * 일반 브라우저(안드로이드 Chrome 등)에서는 같은 인터페이스를 웹 API로 구현한다.
 */
(function () {
  if (window.api) return; // Electron

  const handlers = {};
  const on = (name) => (cb) => { handlers[name] = cb; };
  const emit = (name, ...a) => handlers[name] && handlers[name](...a);

  const DRAFT_KEY = 'mdeditor.draft';
  const NAME_KEY = 'mdeditor.name';
  const safe = {
    get: (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (_) { /* 용량 초과 등 무시 */ } }
  };

  let fileName = safe.get(NAME_KEY) || '';
  let dirty = false;
  let fileHandle = null; // File System Access API (데스크톱 Chrome)
  let saveTimer;

  const displayName = () => fileName || '제목 없음';
  const publishInfo = () => emit('file-info', { name: displayName(), path: '', dirty });

  /* ----- 토스트 ----- */
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }
  window.toast = toast;

  /* ----- 파일 입출력 ----- */
  function download(name, text, type) {
    const blob = new Blob([text], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  const baseName = () => (fileName || '문서').replace(/\.[^.]+$/, '');
  const ensureMd = (n) => (/\.(md|markdown|txt)$/i.test(n) ? n : n + '.md');

  function loadText(text, name, handle) {
    fileName = name || '';
    fileHandle = handle || null;
    safe.set(NAME_KEY, fileName);
    dirty = false;
    emit('load-content', text);
    safe.set(DRAFT_KEY, text);
    publishInfo();
  }

  function confirmDiscard() {
    return !dirty || confirm('저장하지 않은 변경 내용이 있습니다. 계속할까요?');
  }

  function pickFile() {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      // text/* 를 함께 넣어야 안드로이드 파일 선택기에서 .md 가 비활성화되지 않는다
      input.accept = '.md,.markdown,.txt,text/markdown,text/plain,text/*';
      input.onchange = () => resolve(input.files[0] || null);
      input.oncancel = () => resolve(null);
      input.click();
    });
  }

  async function openFile(file) {
    if (!confirmDiscard()) return;
    try {
      if (!file && window.showOpenFilePicker) {
        const [h] = await window.showOpenFilePicker({
          types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md', '.markdown'], 'text/plain': ['.txt'] } }]
        });
        const f = await h.getFile();
        return loadText(await f.text(), f.name, h);
      }
      file = file || (await pickFile());
      if (!file) return;
      loadText(await file.text(), file.name, null);
    } catch (e) {
      if (e && e.name === 'AbortError') return;
      toast('파일을 열 수 없습니다.');
    }
  }

  async function saveFile(asNew) {
    const text = window.getSource();
    try {
      if (window.showSaveFilePicker) {
        if (asNew || !fileHandle) {
          fileHandle = await window.showSaveFilePicker({
            suggestedName: ensureMd(fileName || '문서.md'),
            types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md'] } }]
          });
          fileName = fileHandle.name;
        }
        const w = await fileHandle.createWritable();
        await w.write(text);
        await w.close();
      } else {
        fileName = ensureMd(fileName || '문서.md');
        download(fileName, text, 'text/markdown;charset=utf-8');
      }
      safe.set(NAME_KEY, fileName);
      dirty = false;
      safe.set(DRAFT_KEY, text);
      publishInfo();
      toast(window.showSaveFilePicker ? '저장했습니다.' : `다운로드 폴더에 ${fileName} 로 저장했습니다.`);
    } catch (e) {
      if (!e || e.name !== 'AbortError') toast('저장하지 못했습니다.');
    }
  }

  function exportHtml() {
    const name = baseName() + '.html';
    download(name, window.getFullHtml(), 'text/html;charset=utf-8');
    toast(`${name} 로 내보냈습니다.`);
  }

  // PDF: 브라우저 인쇄 대화상자의 "PDF로 저장"을 사용한다
  function exportPdf() {
    const frame = document.createElement('iframe');
    frame.setAttribute('aria-hidden', 'true');
    frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
    frame.srcdoc = window.getFullHtml();
    frame.onload = () => {
      try {
        frame.contentWindow.document.title = baseName();
        frame.contentWindow.focus();
        frame.contentWindow.print();
        toast('인쇄 화면에서 "PDF로 저장"을 선택하세요.');
      } catch (_) {
        toast('PDF 내보내기를 지원하지 않는 브라우저입니다.');
      }
      setTimeout(() => frame.remove(), 60000);
    };
    document.body.appendChild(frame);
  }

  function newFile() {
    if (!confirmDiscard()) return;
    loadText('', '', null);
  }

  /* ----- window.api ----- */
  window.api = {
    isWeb: true,
    onLoad: on('load-content'),
    onZoom: on('zoom'),
    onToggleTheme: on('toggle-theme'),
    onViewMode: on('view-mode'),
    onToggleOutline: on('toggle-outline'),
    onFileInfo: on('file-info'),
    pathOf: (f) => f,
    highlight: (code, lang) => {
      try {
        if (lang && window.hljs && hljs.getLanguage(lang)) return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
      } catch (_) { /* fallthrough */ }
      return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    setDirty: (v) => {
      dirty = v;
      publishInfo();
      clearTimeout(saveTimer); // 자동 임시저장 (브라우저가 닫혀도 내용 보존)
      saveTimer = setTimeout(() => safe.set(DRAFT_KEY, window.getSource()), 600);
    },
    initialText: () => safe.get(DRAFT_KEY),
    cmd: (name, arg) => {
      ({ new: newFile, open: () => openFile(arg), save: () => saveFile(false), saveAs: () => saveFile(true), exportHtml, exportPdf }[name] || (() => {}))();
    }
  };

  /* ----- 단축키 (키보드가 있는 태블릿/크롬북) ----- */
  window.addEventListener('keydown', (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    const k = e.key.toLowerCase();
    const run = (fn) => { e.preventDefault(); fn(); };
    if (k === 's') run(() => saveFile(e.shiftKey));
    else if (k === 'o') run(() => openFile());
    else if (k === 'n' && e.altKey) run(newFile);
    else if (k === 'e') run(e.shiftKey ? exportPdf : exportHtml);
  });

  window.addEventListener('beforeunload', (e) => {
    if (dirty) { safe.set(DRAFT_KEY, window.getSource()); e.preventDefault(); e.returnValue = ''; }
  });

  /* ----- PWA: 서비스 워커, 설치 버튼, 파일 연결 ----- */
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  let deferredInstall = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstall = e;
    document.getElementById('btnInstall')?.removeAttribute('hidden');
  });
  window.addEventListener('appinstalled', () => {
    deferredInstall = null;
    document.getElementById('btnInstall')?.setAttribute('hidden', '');
    toast('홈 화면에 설치되었습니다.');
  });
  window.installApp = async () => {
    if (!deferredInstall) return toast('브라우저 메뉴 ⋮ → "앱 설치" 또는 "홈 화면에 추가"를 사용하세요.');
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    document.getElementById('btnInstall')?.setAttribute('hidden', '');
  };

  if ('launchQueue' in window) {
    launchQueue.setConsumer(async (p) => {
      if (!p.files || !p.files.length) return;
      const h = p.files[0];
      const f = await h.getFile();
      loadText(await f.text(), f.name, h);
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('is-web');
    publishInfo();
  });
})();
