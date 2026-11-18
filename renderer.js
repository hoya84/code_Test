/* ===== 아이콘 ===== */
const ICONS = {
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  save: '<path d="M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M7 3v5h8V3M7 21v-7h10v7"/>',
  bold: '<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/>',
  italic: '<path d="M19 4h-9M14 20H5M15 4 9 20"/>',
  strike: '<path d="M4 12h16M16 6.5C15.5 5 14 4 12 4 9.5 4 8 5.3 8 7c0 1.2.8 2 2 2.6M8 17c.5 1.7 2.1 3 4.2 3 2.5 0 4-1.3 4-3 0-.8-.3-1.5-.9-2"/>',
  quote: '<path d="M6 17c-1.7 0-3-1.3-3-3v-3c0-3 2-5 5-5M16 17c-1.7 0-3-1.3-3-3v-3c0-3 2-5 5-5"/><path d="M6 17h2v-3H6M16 17h2v-3h-2"/>',
  ul: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".8"/><circle cx="4.5" cy="12" r=".8"/><circle cx="4.5" cy="18" r=".8"/>',
  ol: '<path d="M10 6h10M10 12h10M10 18h10M4 5l1.5-1v4M3.5 13.5c.5-1 2.5-1 2.5.3 0 1.2-2.5 1.8-2.5 3.2h2.7"/>',
  task: '<rect x="3.5" y="4" width="6" height="6" rx="1.2"/><path d="m5 7 1.3 1.3L8.5 6M13 7h8M13 17h8"/><rect x="3.5" y="14" width="6" height="6" rx="1.2"/>',
  code: '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
  codeblock: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="m9 10-2 2 2 2M15 10l2 2-2 2"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 10h18M3 15h18M10 4v16"/>',
  hr: '<path d="M4 12h16"/><path d="M8 7h8M8 17h8" opacity=".4"/>',
  outline: '<path d="M4 6h16M8 12h12M12 18h8"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  export: '<path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  html: '<path d="m8 8-5 4 5 4M16 8l5 4-5 4"/>',
  pdf: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M8.5 15h1.8a1.2 1.2 0 0 0 0-2.4H8.5V17"/>',
  more: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  zoomin: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2M11 8v6M8 11h6"/>',
  zoomout: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2M8 11h6"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.4 2.4 0 0 1 4.7.7c0 1.6-2.3 2-2.3 3.4M12 17h.01"/>',
  install: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>'
};
document.querySelectorAll('[data-icon]').forEach((el) => {
  el.outerHTML = `<svg viewBox="0 0 24 24">${ICONS[el.dataset.icon] || ''}</svg>`;
});

/* ===== 상태 ===== */
const $ = (id) => document.getElementById(id);
const preview = $('preview');
const wrap = $('preview-wrap');
let fontSize = 15;
let suppressDirty = false;
let headings = [];

const store = {
  get: (k, d) => { try { return localStorage.getItem(k) ?? d; } catch (_) { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (_) { /* ignore */ } }
};

/* ===== Markdown ===== */
marked.use({
  gfm: true,
  breaks: true,
  renderer: {
    code({ text, lang }) {
      const l = (lang || '').trim().split(/\s+/)[0];
      const html = window.api.highlight(text, l);
      return `<pre${l ? ` data-lang="${l}"` : ''}><code class="hljs">${html}</code></pre>`;
    }
  }
});

function sanitize(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script,iframe,object,embed,style,link,meta,form').forEach((n) => n.remove());
  doc.querySelectorAll('*').forEach((el) => {
    [...el.attributes].forEach((a) => {
      if (/^on/i.test(a.name) || /^\s*javascript:/i.test(a.value)) el.removeAttribute(a.name);
    });
  });
  return doc.body.innerHTML;
}

/* ===== 에디터 ===== */
const cm = CodeMirror($('editor'), {
  mode: { name: 'markdown', highlightFormatting: true, strikethrough: true, fencedCodeBlockHighlighting: false },
  lineNumbers: true,
  lineWrapping: true,
  styleActiveLine: true,
  autoCloseBrackets: true,
  tabSize: 4,
  indentUnit: 4,
  indentWithTabs: false,
  extraKeys: {
    Enter: 'newlineAndIndentContinueMarkdownList',
    Tab: (c) => (c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection('    ', 'end')),
    'Shift-Tab': (c) => c.indentSelection('subtract'),
    'Ctrl-B': () => fmt('bold'),
    'Ctrl-I': () => fmt('italic'),
    'Ctrl-K': () => fmt('link')
  }
});

let renderTimer;
function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 80);
}

function render() {
  const text = cm.getValue();
  preview.innerHTML = sanitize(marked.parse(text));
  buildOutline(text);
  updateStats();
}

function buildOutline(text) {
  headings = [];
  let line = 0;
  for (const tok of marked.lexer(text)) {
    if (tok.type === 'heading') headings.push({ line, depth: tok.depth, text: tok.text.replace(/[*_`~]/g, '') });
    line += (tok.raw.match(/\n/g) || []).length;
  }
  const list = $('outlineList');
  list.innerHTML = '';
  if (!headings.length) {
    list.innerHTML = '<div class="empty">제목(#)이 없습니다</div>';
    return;
  }
  headings.forEach((h, i) => {
    const a = document.createElement('a');
    a.className = 'd' + h.depth;
    a.textContent = h.text;
    a.title = h.text;
    a.onclick = () => {
      if (isCompact()) toggleOutline(false); // 모바일에서는 이동 후 패널 닫기
      cm.scrollIntoView({ line: h.line, ch: 0 }, 120);
      cm.setCursor({ line: h.line, ch: 0 });
      const el = preview.querySelectorAll('h1,h2,h3,h4,h5,h6')[i];
      if (el) wrap.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
    };
    list.appendChild(a);
  });
}

function updateStats() {
  const text = cm.getValue();
  const chars = text.length;
  const words = (text.match(/[\p{L}\p{N}_'-]+/gu) || []).length;
  $('stCount').textContent = `${words.toLocaleString()}단어 · ${chars.toLocaleString()}자 · ${cm.lineCount().toLocaleString()}줄`;
  const min = Math.max(1, Math.round(words / 250));
  $('stRead').textContent = `읽는 시간 약 ${min}분`;
}

function updatePos() {
  const c = cm.getCursor();
  $('stPos').textContent = `줄 ${c.line + 1}, 열 ${c.ch + 1}`;
}

cm.on('change', () => {
  scheduleRender();
  if (!suppressDirty) window.api.setDirty(true);
});
cm.on('cursorActivity', updatePos);

// 스크롤 동기화 (소스 -> 미리보기)
cm.on('scroll', () => {
  if ($('main').dataset.mode !== 'split') return;
  const i = cm.getScrollInfo();
  const r = i.top / Math.max(1, i.height - i.clientHeight);
  wrap.scrollTop = r * (wrap.scrollHeight - wrap.clientHeight);
});

/* ===== 서식 도구 ===== */
function wrapSel(before, after, placeholder) {
  const sel = cm.getSelection();
  if (sel) {
    // 이미 감싸져 있으면 해제
    if (sel.startsWith(before) && sel.endsWith(after) && sel.length >= before.length + after.length) {
      cm.replaceSelection(sel.slice(before.length, sel.length - after.length), 'around');
    } else {
      cm.replaceSelection(before + sel + after, 'around');
    }
  } else {
    const c = cm.getCursor();
    cm.replaceSelection(before + placeholder + after);
    cm.setSelection({ line: c.line, ch: c.ch + before.length }, { line: c.line, ch: c.ch + before.length + placeholder.length });
  }
}

function prefixLines(prefixFn, stripRe) {
  const from = cm.getCursor('from').line;
  const to = cm.getCursor('to').line;
  cm.operation(() => {
    let n = 0;
    for (let i = from; i <= to; i++) {
      const t = cm.getLine(i);
      const stripped = stripRe ? t.replace(stripRe, '') : t;
      const p = prefixFn(n++);
      const has = t.startsWith(p) && !stripRe ? true : false;
      cm.replaceRange(has ? t.slice(p.length) : p + stripped, { line: i, ch: 0 }, { line: i, ch: t.length });
    }
  });
}

function insertBlock(text) {
  const c = cm.getCursor();
  const atStart = c.ch === 0;
  cm.replaceSelection((atStart ? '' : '\n') + text + '\n');
}

function fmt(kind) {
  switch (kind) {
    case 'h1': return prefixLines(() => '# ', /^#{1,6}\s+/);
    case 'h2': return prefixLines(() => '## ', /^#{1,6}\s+/);
    case 'h3': return prefixLines(() => '### ', /^#{1,6}\s+/);
    case 'bold': return wrapSel('**', '**', '굵은 텍스트');
    case 'italic': return wrapSel('*', '*', '기울임 텍스트');
    case 'strike': return wrapSel('~~', '~~', '취소선');
    case 'code': return wrapSel('`', '`', '코드');
    case 'quote': return prefixLines(() => '> ');
    case 'ul': return prefixLines(() => '- ');
    case 'ol': return prefixLines((n) => `${n + 1}. `);
    case 'task': return prefixLines(() => '- [ ] ');
    case 'codeblock': {
      const sel = cm.getSelection() || '코드를 입력하세요';
      return insertBlock('```\n' + sel + '\n```');
    }
    case 'link': {
      const sel = cm.getSelection();
      const c = cm.getCursor('from');
      cm.replaceSelection(`[${sel || '링크 텍스트'}](https://)`);
      const base = c.ch + (sel ? sel.length : 6) + 3;
      cm.setSelection({ line: c.line, ch: base }, { line: c.line, ch: base + 8 });
      return;
    }
    case 'image': return cm.replaceSelection(`![${cm.getSelection() || '설명'}](이미지 경로)`);
    case 'table': return insertBlock('| 제목1 | 제목2 | 제목3 |\n| ----- | ----- | ----- |\n| 내용 | 내용 | 내용 |\n| 내용 | 내용 | 내용 |');
    case 'hr': return insertBlock('---');
  }
}

document.querySelectorAll('[data-fmt]').forEach((b) =>
  b.addEventListener('mousedown', (e) => {
    e.preventDefault(); // 에디터 포커스(모바일에서는 키보드) 유지
    if ($('main').dataset.mode === 'preview') setView(isCompact() ? 'edit' : 'split');
    cm.focus();
    fmt(b.dataset.fmt);
  })
);
document.querySelectorAll('[data-cmd]').forEach((b) =>
  b.addEventListener('click', () => {
    $('exportMenu').hidden = true;
    window.api.cmd(b.dataset.cmd);
  })
);

/* ===== 내보내기 메뉴 ===== */
$('btnExport').addEventListener('click', (e) => {
  e.stopPropagation();
  $('exportMenu').hidden = !$('exportMenu').hidden;
});
document.addEventListener('click', () => ($('exportMenu').hidden = true));

/* ===== 보기 모드 / 테마 / 개요 ===== */
const compactMQ = window.matchMedia('(max-width: 820px)');
const isCompact = () => compactMQ.matches;

// auto=true: 화면 크기 때문에 자동 전환한 경우(사용자 선택으로 저장하지 않음)
function setView(mode, auto) {
  if (isCompact() && mode === 'split') { mode = 'edit'; auto = true; } // 좁은 화면에서는 분할 불가
  $('main').dataset.mode = mode;
  document.querySelectorAll('#viewseg button').forEach((b) => b.classList.toggle('on', b.dataset.view === mode));
  if (!auto) store.set('view', mode);
  cm.refresh();
}
document.querySelectorAll('#viewseg button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));

function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  $('btnTheme').querySelector('svg').innerHTML = ICONS[dark ? 'sun' : 'moon'];
  $('btnTheme').querySelector('.lbl').textContent = dark ? '라이트 모드' : '다크 모드';
  $('metaTheme').content = dark ? '#1b1f29' : '#f4f5f7';
  store.set('theme', dark ? 'dark' : 'light');
}
$('btnTheme').addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

function toggleOutline(force) {
  const open = force ?? !$('outline').classList.contains('open');
  $('outline').classList.toggle('open', open);
  $('btnOutline').classList.toggle('toggled', open);
  document.body.classList.toggle('outline-open', open);
  if (!isCompact()) store.set('outline', open ? '1' : '0');
  cm.refresh();
}
$('btnOutline').addEventListener('click', () => { closeMore(); toggleOutline(); });
$('scrim').addEventListener('click', () => toggleOutline(false));

// 화면 폭이 바뀌면(회전, 분할 화면 등) 보기 모드를 재조정
compactMQ.addEventListener('change', () => {
  if (isCompact()) {
    if ($('main').dataset.mode === 'split') setView('edit', true);
    toggleOutline(false);
  } else {
    setView(store.get('view', 'split'), true);
    toggleOutline(store.get('outline', '0') === '1');
  }
});

/* ===== 더보기 메뉴(모바일) / 글자 크기 / 도움말 ===== */
function closeMore() {
  $('util').classList.remove('open');
  $('btnMore').setAttribute('aria-expanded', 'false');
}
$('btnMore').addEventListener('click', (e) => {
  e.stopPropagation();
  const open = $('util').classList.toggle('open');
  $('btnMore').setAttribute('aria-expanded', String(open));
  $('exportMenu').hidden = true;
});
$('util').addEventListener('click', (e) => { if (e.target.closest('button') && !e.target.closest('#btnOutline')) closeMore(); });
document.addEventListener('click', (e) => { if (!e.target.closest('#util')) closeMore(); });

function zoom(d) {
  fontSize = d === 0 ? 15 : Math.min(32, Math.max(10, fontSize + d));
  store.set('fs', String(fontSize));
  applyFont();
}
$('btnZoomIn').addEventListener('click', () => zoom(1));
$('btnZoomOut').addEventListener('click', () => zoom(-1));

$('btnInstall').addEventListener('click', () => window.installApp && window.installApp());

const helpDlg = $('helpDlg');
const openHelp = () => (helpDlg.open ? helpDlg.close() : helpDlg.showModal());
$('btnHelp').addEventListener('click', openHelp);
$('helpClose').addEventListener('click', () => helpDlg.close());
helpDlg.addEventListener('click', (e) => { if (e.target === helpDlg) helpDlg.close(); }); // 바깥 터치로 닫기
window.addEventListener('keydown', (e) => {
  if (e.key === 'F1') { e.preventDefault(); openHelp(); }
  if ((e.ctrlKey || e.metaKey) && !e.altKey && ['1', '2', '3'].includes(e.key) && window.api.isWeb) {
    e.preventDefault();
    setView(['edit', 'split', 'preview'][Number(e.key) - 1]);
  }
});

/* ===== 구분선 드래그 (마우스/터치/펜 공용) ===== */
const divider = $('divider');
divider.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  divider.setPointerCapture(e.pointerId);
  divider.classList.add('drag');
});
divider.addEventListener('pointermove', (e) => {
  if (!divider.hasPointerCapture(e.pointerId)) return;
  const r = $('main').getBoundingClientRect();
  const pct = Math.min(85, Math.max(15, ((e.clientX - r.left) / r.width) * 100));
  $('editorPane').style.flex = `0 0 ${pct}%`;
  cm.refresh();
});
const endDrag = (e) => {
  divider.classList.remove('drag');
  if (divider.hasPointerCapture(e.pointerId)) divider.releasePointerCapture(e.pointerId);
};
divider.addEventListener('pointerup', endDrag);
divider.addEventListener('pointercancel', endDrag);

/* ===== 파일 드래그 앤 드롭 ===== */
let dragDepth = 0;
window.addEventListener('dragenter', (e) => { e.preventDefault(); dragDepth++; $('dropHint').classList.add('show'); });
window.addEventListener('dragleave', () => { if (--dragDepth <= 0) { dragDepth = 0; $('dropHint').classList.remove('show'); } });
window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => {
  e.preventDefault();
  dragDepth = 0;
  $('dropHint').classList.remove('show');
  const f = e.dataTransfer.files[0];
  if (f && /\.(md|markdown|txt)$/i.test(f.name)) window.api.cmd('open', window.api.pathOf(f)); // 웹에서는 File 객체 그대로
});

/* ===== 메인 프로세스 연동 ===== */
function applyFont() {
  document.documentElement.style.setProperty('--fs', fontSize + 'px');
  cm.refresh();
}
window.api.onLoad((text) => {
  suppressDirty = true;
  cm.setValue(text);
  cm.clearHistory();
  suppressDirty = false;
  cm.scrollTo(0, 0);
  render();
});
window.api.onZoom((d) => zoom(d));
window.api.onToggleTheme(() => setTheme(!document.body.classList.contains('dark')));
window.api.onViewMode(setView);
window.api.onToggleOutline(() => toggleOutline());
window.api.onFileInfo((info) => {
  $('fname').textContent = info.name;
  $('fname').title = info.path;
  $('dot').classList.toggle('dirty', info.dirty);
});

/* ===== HTML 내보내기용 템플릿 (밝은 테마) ===== */
const EXPORT_CSS = `
body{font-family:'Segoe UI','Pretendard','Malgun Gothic',sans-serif;line-height:1.75;color:#1f2430;max-width:860px;margin:2.5em auto;padding:0 1.6em;word-wrap:break-word;font-size:16px}
h1,h2,h3,h4,h5,h6{margin:1.6em 0 .6em;line-height:1.3;font-weight:700}
h1{font-size:2em;padding-bottom:.3em;border-bottom:1px solid #dfe2e8}
h2{font-size:1.5em;padding-bottom:.25em;border-bottom:1px solid #dfe2e8}
h3{font-size:1.25em}
a{color:#4f6bed;text-decoration:none}
code{font-family:'Cascadia Code',Consolas,monospace;font-size:.88em;background:#f3f5f9;padding:.18em .42em;border-radius:5px}
pre{background:#f3f5f9;border:1px solid #dfe2e8;border-radius:10px;padding:16px 18px;overflow:auto;line-height:1.55;white-space:pre-wrap;word-break:break-word}
pre code{background:none;padding:0}
blockquote{margin:1.1em 0;padding:.4em 1.1em;color:#5b6475;border-left:4px solid #4f6bed;background:rgba(79,107,237,.08);border-radius:0 8px 8px 0}
table{border-collapse:collapse;margin:1.2em 0;width:auto}
th,td{border:1px solid #dfe2e8;padding:8px 14px}
th{background:#f4f5f7;text-align:left}
img{max-width:100%;border-radius:8px}
hr{border:0;border-top:1px solid #dfe2e8;margin:2em 0}
li>input[type=checkbox]{margin-right:.5em}
.hljs-comment,.hljs-quote{color:#8b95a7;font-style:italic}
.hljs-keyword,.hljs-selector-tag,.hljs-literal,.hljs-doctag,.hljs-built_in{color:#b02a6b}
.hljs-string,.hljs-regexp,.hljs-addition{color:#0a7f4f}
.hljs-number,.hljs-symbol,.hljs-bullet,.hljs-meta{color:#c25a00}
.hljs-title,.hljs-section,.hljs-name,.hljs-selector-id,.hljs-selector-class{color:#2d55c9}
.hljs-attr,.hljs-attribute,.hljs-variable,.hljs-type,.hljs-params{color:#0b7285}
@media print{body{margin:0;max-width:none;padding:0;font-size:12pt}pre,blockquote,table,img{page-break-inside:avoid}h1,h2,h3{page-break-after:avoid}}
`;

window.getSource = () => cm.getValue();
window.getFullHtml = () => {
  const m = cm.getValue().match(/^#\s+(.+)$/m);
  const title = (m ? m[1] : '문서').replace(/[<>&"]/g, '');
  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>${EXPORT_CSS}</style></head><body>
${preview.innerHTML}
</body></html>`;
};

/* ===== 초기화 ===== */
const SAMPLE = `# MD 에디터

왼쪽에 **Markdown**을 입력하면 오른쪽에 *실시간*으로 렌더링됩니다.

## 주요 기능

- 파일 열기 / 저장, 드래그 앤 드롭으로 열기
- 툴바 서식 버튼과 단축키 (\`Ctrl+B\`, \`Ctrl+I\`, \`Ctrl+K\`)
- **HTML / PDF** 내보내기
- 개요 패널, 다크 모드, 분할·편집·미리보기 전환

### 체크리스트

- [x] 마크다운 작성
- [ ] 문서 내보내기

### 코드 하이라이트

\`\`\`javascript
function greet(name) {
  return \`안녕하세요, \${name}!\`;
}
console.log(greet("Markdown"));
\`\`\`

### 표

| 기능 | 단축키 |
|------|--------|
| 열기 | Ctrl+O |
| 저장 | Ctrl+S |
| HTML 내보내기 | Ctrl+E |
| PDF 내보내기 | Ctrl+Shift+E |

> 팁: 툴바 오른쪽의 **내보내기** 버튼으로 바로 변환할 수 있습니다.
`;

const savedTheme = store.get('theme', null);
setTheme(savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
fontSize = Number(store.get('fs', '15')) || 15;
applyFont();
setView(store.get('view', 'split'), true);
toggleOutline(!isCompact() && store.get('outline', '0') === '1');
suppressDirty = true;
const draft = window.api.initialText && window.api.initialText(); // 웹: 이전 임시저장 복원
cm.setValue(draft != null ? draft : SAMPLE);
cm.clearHistory();
suppressDirty = false;
render();
updatePos();
