'use strict';
(() => {
/* =========================================================
   아이콘 (니니닝! 시리즈 공통)
   ========================================================= */
const ICONS = {
  person: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 4-5.2 7-5.2s5.8 1.6 7 5.2"/>',
  note: '<rect x="4.5" y="3.5" width="15" height="17" rx="2.5"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/>',
  image: '<rect x="4" y="5" width="16" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="m5 17 4.5-4.5 3 3L15 13l4 4"/>',
  layers: '<path d="m12 4 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4"/>',
  type: '<path d="M4 7V5h16v2M12 5v14M9 19h6"/>',
  palette: '<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-1.2-1-1.6-1-2.6 0-1 .8-1.7 1.8-1.7h2.2a3.7 3.7 0 0 0 3.7-3.7C20.5 6.6 16.7 3.5 12 3.5Z"/><circle cx="7.6" cy="11.3" r="1.1"/><circle cx="10.4" cy="7.6" r="1.1"/><circle cx="14.8" cy="7.8" r="1.1"/>',
  more: '<circle cx="5.5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18.5" cy="12" r="1.3" fill="currentColor"/>',
  download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  trash: '<path d="M5 7h14M10 4h4M7 7l1 12.5a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5L17 7"/>',
  up: '<path d="m6 15 6-6 6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  redo: '<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>',
};
const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const BUNNY = '<ellipse cx="8.4" cy="7.2" rx="2.4" ry="5.6" transform="rotate(-12 8.4 7.2)"/><ellipse cx="15.6" cy="7.2" rx="2.4" ry="5.6" transform="rotate(12 15.6 7.2)"/><ellipse cx="12" cy="15.4" rx="7" ry="6.3"/>';
const BRAND = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${BUNNY}<circle cx="9.4" cy="14.8" r="1" fill="#3182f6"/><circle cx="14.6" cy="14.8" r="1" fill="#3182f6"/></svg>`;

/* =========================================================
   기본값
   ========================================================= */
const BASE = 1600; // 긴 변 픽셀
const RATIOS = [['169', 16, 9, '16:9'], ['1610', 16, 10, '16:10'], ['32', 3, 2, '3:2'], ['43', 4, 3, '4:3'], ['11', 1, 1, '1:1'], ['45', 4, 5, '4:5'], ['916', 9, 16, '9:16'], ['custom', 0, 0, '직접']];
const ACCENTS = ['#3182f6', '#18a5a5', '#03b26c', '#ffb331', '#fe7e3a', '#f04452', '#f66c9b', '#a234c7', '#191f28'];
const FONTS = [
  ['고딕 · 돋움', [['Pretendard', '', '프리텐다드'], ['Noto Sans KR', 'Noto+Sans+KR:wght@400;500;700;900', '본고딕 (Noto Sans KR)'], ['Gothic A1', 'Gothic+A1:wght@400;600;800', '고딕 A1'], ['Gowun Dodum', 'Gowun+Dodum', '고운돋움'], ['Nanum Gothic', 'Nanum+Gothic:wght@400;700;800', '나눔고딕'], ['IBM Plex Sans KR', 'IBM+Plex+Sans+KR:wght@400;500;700', 'IBM Plex Sans KR'], ['Orbit', 'Orbit', '오르빗']]],
  ['명조 · 바탕', [['Nanum Myeongjo', 'Nanum+Myeongjo:wght@400;700;800', '나눔명조'], ['Noto Serif KR', 'Noto+Serif+KR:wght@400;600;700', '본명조 (Noto Serif KR)'], ['Gowun Batang', 'Gowun+Batang:wght@400;700', '고운바탕'], ['Hahmlet', 'Hahmlet:wght@400;600;800', '함렛'], ['Song Myung', 'Song+Myung', '송명']]],
  ['디스플레이', [['Black Han Sans', 'Black+Han+Sans', '검은고딕'], ['Do Hyeon', 'Do+Hyeon', '도현'], ['Jua', 'Jua', '주아'], ['Dongle', 'Dongle:wght@400;700', '동글']]],
  ['손글씨', [['Gaegu', 'Gaegu:wght@400;700', '개구'], ['Hi Melody', 'Hi+Melody', '하이멜로디'], ['Nanum Pen Script', 'Nanum+Pen+Script', '나눔손글씨 펜'], ['Poor Story', 'Poor+Story', '푸어스토리'], ['Yeon Sung', 'Yeon+Sung', '연성']]],
];
const FONT_PARAM = {};
FONTS.forEach(([, l]) => l.forEach(([f, p]) => { FONT_PARAM[f] = p; }));

const SKINS = [['white', '화이트'], ['cloud', '클라우드'], ['dark', '다크'], ['mac', 'macOS'], ['glass', '글래스'], ['editorial', '에디토리얼'], ['block', '컬러 블록'], ['grid', '그리드'], ['note', '노트'], ['film', '필름'], ['pattern', '패턴'], ['photo', '사진 배경']];
const mesh = (a, b, c, d, base) => `radial-gradient(45% 60% at 12% 18%, ${a} 0%, transparent 70%), radial-gradient(42% 58% at 88% 14%, ${b} 0%, transparent 70%), radial-gradient(55% 65% at 74% 94%, ${c} 0%, transparent 70%), radial-gradient(45% 55% at 18% 96%, ${d} 0%, transparent 70%), ${base}`;
// [이름, 배경, 어두운 배경인지]
const GLASS = {
  aurora: ['오로라', mesh('#a9c8ff', '#ffc7e4', '#c7b8ff', '#b5f0e3', '#eef1fb')],
  mint: ['민트', mesh('#b8f2e6', '#aed9e0', '#ffe3b8', '#d3f5c8', '#eef7f5')],
  peach: ['피치', mesh('#ffd0b5', '#ffb8c9', '#d9c4f0', '#ffe6c7', '#fbf1f0')],
  lavender: ['라벤더', mesh('#d6c8ff', '#f3c9f0', '#b9c6ff', '#efe3ff', '#f4f1fd')],
  lemon: ['레몬', mesh('#fff1a6', '#c9f2c7', '#ffd6a5', '#fff8d6', '#fbfaee')],
  ocean: ['오션', mesh('#9fd8ff', '#9ee6e0', '#7fa8ff', '#c9ecff', '#eef6fb')],
  cherry: ['체리', mesh('#ffb3c6', '#ffd1dc', '#ff9eb5', '#ffe0e9', '#fdf0f3')],
  sunset: ['노을', mesh('#ffb88c', '#ff9ec4', '#c79bff', '#ffd59e', '#fbefee')],
  mono: ['모노', mesh('#e3e6ea', '#f5f6f8', '#d4d8de', '#eceef1', '#f2f4f6')],
  night: ['밤', mesh('#2b3a8c', '#6a2c7a', '#134e6f', '#1f2a5c', '#0d1020'), true],
  forest: ['숲', mesh('#1f5e4a', '#2f4f7a', '#3d6b3a', '#173c3a', '#0c1614'), true],
  wine: ['와인', mesh('#7a2346', '#4a2370', '#8a3a2a', '#3a1530', '#140a12'), true],
};
const WALLS = {
  mist: ['안개', 'radial-gradient(60% 80% at 18% 18%, #e8f3ff 0%, rgba(232,243,255,0) 70%), radial-gradient(70% 80% at 85% 85%, #c9d8f2 0%, rgba(201,216,242,0) 70%), linear-gradient(150deg,#eef2f8,#c3d0e6)'],
  dawn: ['새벽', 'radial-gradient(60% 80% at 15% 20%, #ffc9d9 0%, rgba(255,201,217,0) 70%), radial-gradient(60% 70% at 85% 25%, #c3b6ff 0%, rgba(195,182,255,0) 70%), radial-gradient(70% 80% at 60% 100%, #8cb8ff 0%, rgba(140,184,255,0) 70%), linear-gradient(135deg,#f3cde0,#a9bff2)'],
  sea: ['바다', 'radial-gradient(60% 80% at 20% 15%, #a8efe3 0%, rgba(168,239,227,0) 70%), radial-gradient(70% 80% at 85% 80%, #3d6bff 0%, rgba(61,107,255,0) 70%), linear-gradient(160deg,#5ed3d0,#2a4cc4)'],
  graphite: ['흑연', 'radial-gradient(60% 80% at 25% 20%, #4b4b5c 0%, rgba(75,75,92,0) 70%), radial-gradient(60% 80% at 80% 90%, #2e3550 0%, rgba(46,53,80,0) 70%), linear-gradient(150deg,#26262e,#0e0e12)'],
};
const GT = {
  light: ['라이트', { bg: '#f7f8f9', panel: '#ffffff', ink: '#191f28', ink2: '#4e5968', sub: '#8b95a1', rule: 'rgba(25,31,40,.2)', minor: 'rgba(25,31,40,.045)', major: 'rgba(25,31,40,.09)' }],
  dark: ['다크', { bg: '#0e0e10', panel: '#151518', ink: '#f2f4f6', ink2: '#c1c7cf', sub: '#8b95a1', rule: 'rgba(255,255,255,.2)', minor: 'rgba(255,255,255,.04)', major: 'rgba(255,255,255,.085)' }],
  blue: ['블루', { bg: '#f2f6fc', panel: '#ffffff', ink: '#0f1b33', ink2: '#3c4a66', sub: '#6b7a96', rule: 'rgba(49,130,246,.35)', minor: 'rgba(49,130,246,.07)', major: 'rgba(49,130,246,.14)' }],
};
const PATTERNS = [['dots', '도트'], ['grid', '모눈'], ['check', '체크'], ['stripe', '사선'], ['heart', '하트'], ['star', '별'], ['wave', '물결'], ['plus', '플러스']];
const TWEET_TAGS = ['RT', '마음', '일상', '탐라대화', '인용', '구독', '썰', '연성', '앓이', '기타'];

const uid = () => Math.random().toString(36).slice(2, 10);
const blankItem = () => ({ img: null, genre: '', name: '', credit: '', x: 50, y: 30, z: 1 });
function defaults() {
  return {
    v: 1,
    profile: { photo: null, px: 50, py: 50, pz: 1, showPhoto: true, psize: 100, pratio: '11', pshape: 'circle', name: '', handle: '', summary: '', showHandle: true, showSummary: true },
    sections: [
      { id: 'intro', type: 'text', title: '자기소개', on: true, wide: true, body: '' },
      { id: 'tweet', type: 'tags', title: '트윗 성향', on: true, wide: true, showAll: false, tags: TWEET_TAGS.map((l) => ({ label: l, on: false })) },
      { id: 'dream', type: 'dream', title: '드림 성향', on: true, wide: false, showAll: true, opts: { ONLY: false, OPEN: false, CBC: false }, note: '' },
      { id: 'ng', type: 'text', title: 'NG', on: true, wide: false, body: '' },
    ],
    gallery: { on: true, title: '', pos: 'auto', share: 46, arrange: 'feature', caption: 'over', capColor: '#000000', capAlpha: 58, items: [blankItem(), blankItem()] },
    text: { head: 'Pretendard', body: 'Pretendard', scale: 100, lh: 1.6, ls: 0, align: 'left', keepAll: true, titleStyle: 'plain', autofit: true, radius: 16 },
    skin: { type: 'white', accent: '#3182f6', wall: 'mist', winTone: 'light', gt: 'light', glass: 'aurora', glassColor: '#dbe7fb', pattern: 'dots', patBg: '#e8f3ff', patFg: '#c4dcfc', patSize: 36, image: null, imgFit: 'cover', dimTone: 'dark', dim: 20, panelTone: 'light', panelAlpha: 92 },
    layout: { ratio: '32', w: 3, h: 2 },
    scale: 2,
  };
}
function merge(def, src) {
  if (!src || typeof src !== 'object' || Array.isArray(def)) return src ?? def;
  const out = { ...def };
  for (const k of Object.keys(src)) out[k] = (def[k] && typeof def[k] === 'object' && !Array.isArray(def[k])) ? merge(def[k], src[k]) : src[k];
  return out;
}
function normalize(o) { const d = merge(defaults(), o || {}); if (d.text.titleStyle === 'line') d.text.titleStyle = 'bold'; return d; }

/* =========================================================
   공용
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const getPath = (o, p) => p.split('.').reduce((a, k) => (a == null ? undefined : a[k]), o);
function setPath(o, p, v) { const ks = p.split('.'); const last = ks.pop(); ks.reduce((a, k) => a[k], o)[last] = v; }
const isMobile = () => matchMedia('(max-width: 900px)').matches;
const svgURI = (s) => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
function hexRGB(hex) { const n = parseInt(hex.replace('#', '').padEnd(6, '0').slice(0, 6), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function lum(hex) { return hexRGB(hex).map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }).reduce((a, v, i) => a + v * [.2126, .7152, .0722][i], 0); }
const rgba = (hex, a) => `rgba(${hexRGB(hex).join(',')},${a})`;
const tint = (hex, t) => `rgb(${hexRGB(hex).map((c) => Math.round(c + (255 - c) * t)).join(',')})`;

/* =========================================================
   저장소 (이 브라우저의 IndexedDB에만 저장)
   ========================================================= */
let dbP = null;
function db() {
  if (!dbP) dbP = new Promise((res, rej) => {
    const r = indexedDB.open('maint-niniing', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return dbP;
}
async function dbGet(k) { const d = await db(); return new Promise((res, rej) => { const q = d.transaction('kv').objectStore('kv').get(k); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); }
async function dbSet(k, v) { const d = await db(); return new Promise((res, rej) => { const t = d.transaction('kv', 'readwrite'); t.objectStore('kv').put(v, k); t.oncomplete = () => res(); t.onerror = () => rej(t.error); }); }

let state = defaults();
let IMG = {};          // 이미지 id → dataURL (상태와 따로 보관해서 되돌리기가 가벼움)
let loaded = false;

/* 이미지: 저장은 dataURL, 화면에는 blob URL */
const urlMap = {};
function imgURL(id) {
  if (!id || !IMG[id]) return '';
  if (!urlMap[id]) {
    try {
      const [h, b] = IMG[id].split(',');
      const mime = h.match(/:(.*?);/)[1];
      const bin = atob(b), arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      urlMap[id] = URL.createObjectURL(new Blob([arr], { type: mime }));
    } catch (e) { urlMap[id] = IMG[id]; }
  }
  return urlMap[id];
}
function readImage(file, max = 1800) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onerror = rej;
    fr.onload = () => {
      const img = new Image();
      img.onerror = rej;
      img.onload = () => {
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        const keepAlpha = /png|webp|gif/.test(file.type);
        res(c.toDataURL(keepAlpha ? 'image/png' : 'image/jpeg', 0.92));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
async function addImage(file, max) { const id = uid(); IMG[id] = await readImage(file, max); return id; }
function usedImages() {
  const ids = new Set([state.profile.photo, state.skin.image, ...state.gallery.items.map((i) => i.img)].filter(Boolean));
  return Object.fromEntries(Object.entries(IMG).filter(([k]) => ids.has(k)));
}

/* 글꼴: 고를 때만 불러옴 */
const loadedFonts = new Set(['Pretendard']);
function ensureFont(f) {
  if (!f || loadedFonts.has(f) || !FONT_PARAM[f]) return;
  loadedFonts.add(f);
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.crossOrigin = 'anonymous';
  l.href = `https://fonts.googleapis.com/css2?family=${FONT_PARAM[f]}&display=swap`;
  l.onload = () => document.fonts && document.fonts.ready.then(() => render());
  document.head.appendChild(l);
}
const stack = (f) => `'${f}', 'Pretendard', -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif`;

/* =========================================================
   배경 무늬
   ========================================================= */
function patternSVG(kind, fg, s) {
  const h = s / 2;
  const shapes = {
    dots: `<circle cx='${h}' cy='${h}' r='${s * .1}' fill='${fg}'/>`,
    grid: `<path d='M${s} 0V${s}M0 ${s}H${s}' stroke='${fg}' stroke-width='${Math.max(1, s * .03)}' fill='none'/>`,
    check: `<rect width='${h}' height='${h}' fill='${fg}'/><rect x='${h}' y='${h}' width='${h}' height='${h}' fill='${fg}'/>`,
    stripe: `<path d='M-${h} ${h}L${h} -${h}M0 ${s}L${s} 0M${h} ${s + h}L${s + h} ${h}' stroke='${fg}' stroke-width='${s * .16}'/>`,
    heart: `<path transform='translate(${h} ${h * 1.05}) scale(${s / 64})' d='M0 8C-3-1-14-3-14 6C-14 12-6 17 0 21C6 17 14 12 14 6C14-3 3-1 0 8Z' fill='${fg}'/>`,
    star: `<path transform='translate(${h} ${h}) scale(${s / 64})' d='M0-14L3.6-4.6L14-4.3L5.8 1.9L8.6 12L0 6.2L-8.6 12L-5.8 1.9L-14-4.3L-3.6-4.6Z' fill='${fg}'/>`,
    wave: `<path d='M0 ${h}Q${s / 4} ${h - s * .18} ${h} ${h}T${s} ${h}' stroke='${fg}' stroke-width='${s * .06}' fill='none' stroke-linecap='round'/>`,
    plus: `<path d='M${h} ${h - s * .14}V${h + s * .14}M${h - s * .14} ${h}H${h + s * .14}' stroke='${fg}' stroke-width='${s * .06}' stroke-linecap='round'/>`,
  };
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}' viewBox='0 0 ${s} ${s}'>${shapes[kind] || ''}</svg>`;
}
function gridSVG(cell, t) {
  const s = cell * 4; let d = '';
  for (let i = 1; i < 4; i++) d += `M${i * cell + .5} 0V${s}M0 ${i * cell + .5}H${s}`;
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}' viewBox='0 0 ${s} ${s}'><path d='${d}' stroke='${t.minor}' stroke-width='1' fill='none'/><path d='M.5 0V${s}M0 .5H${s}' stroke='${t.major}' stroke-width='1' fill='none'/></svg>`;
}

/* =========================================================
   스킨 → 카드 색
   ========================================================= */
function dims() {
  const r = state.layout.w / state.layout.h;
  return r >= 1 ? { W: BASE, H: Math.round(BASE / r) } : { W: Math.round(BASE * r), H: BASE };
}
function glassBG(key = state.skin.glass) { return key === 'solid' ? state.skin.glassColor : (GLASS[key] || GLASS.aurora)[1]; }
function glassDark(key = state.skin.glass) { return key === 'solid' ? lum(state.skin.glassColor) < .3 : !!(GLASS[key] || GLASS.aurora)[2]; }
function skinVars(W, H) {
  const sk = state.skin, acc = sk.accent;
  const v = { '--hl': rgba(acc, .22), '--accent': acc, '--c-on-accent': lum(acc) > .5 ? '#191f28' : '#ffffff', '--accent-soft': rgba(acc, .12), '--accent-text': acc, '--c-rule': 'rgba(0,0,0,.15)' };
  let bg = '', dim = '', cls = '';
  const LIGHT = { '--c-bg': '#ffffff', '--c-bg2': '#ffffff', '--c-ink': '#191f28', '--c-ink2': '#4e5968', '--c-sub': '#8b95a1', '--c-panel': '#f2f4f6', '--c-line': '#e5e8eb' };
  const DARK = { '--c-bg': '#101012', '--c-bg2': '#101012', '--c-ink': '#f2f4f6', '--c-ink2': '#c1c7cf', '--c-sub': '#8b95a1', '--c-panel': '#1c1c20', '--c-line': '#3a3a42' };
  if (sk.type === 'white') Object.assign(v, LIGHT);
  else if (sk.type === 'cloud') Object.assign(v, LIGHT, { '--c-bg': '#f2f4f6', '--c-panel': '#ffffff' });
  else if (sk.type === 'dark') Object.assign(v, DARK);
  else if (sk.type === 'mac') {
    Object.assign(v, sk.winTone === 'dark'
      ? { ...DARK, '--c-bg': '#1c1c20', '--c-bg2': '#1c1c20', '--c-panel': '#2a2a30', '--c-line': 'rgba(255,255,255,.12)', '--c-bar': '#232328' }
      : { ...LIGHT, '--c-panel': '#f2f4f6', '--c-line': 'rgba(0,23,51,.09)', '--c-bar': '#f9fafb' });
    bg = (WALLS[sk.wall] || WALLS.mist)[1];
  } else if (sk.type === 'glass') {
    const night = glassDark();
    Object.assign(v, night ? { ...DARK, '--c-panel': 'rgba(255,255,255,.08)', '--c-line': 'rgba(255,255,255,.14)', '--c-bg2': '#1a1f35', '--glass-edge': 'rgba(255,255,255,.16)' }
                           : { ...LIGHT, '--c-panel': 'rgba(255,255,255,.5)', '--c-line': 'rgba(25,31,40,.09)', '--c-bg2': '#ffffff', '--glass-edge': 'rgba(255,255,255,.85)' });
    bg = glassBG();
    cls = 'sk-glass';
  } else if (sk.type === 'editorial') {
    Object.assign(v, { ...LIGHT, '--c-bg': '#fafaf8', '--c-bg2': '#fafaf8', '--c-ink': '#111111', '--c-ink2': '#3b3b3b', '--c-sub': '#6e6e6e', '--c-panel': '#ecebe8', '--c-line': '#111111' });
    cls = 'sk-editorial';
  } else if (sk.type === 'block') {
    Object.assign(v, LIGHT);
    bg = `linear-gradient(180deg, ${acc} 0, ${acc} var(--band, 32%), #ffffff var(--band, 32%))`;
    cls = 'sk-block';
  } else if (sk.type === 'note') {
    const ln = Math.round(Math.min(W, H) / 26), mg = Math.round(Math.min(W, H) * .035);
    Object.assign(v, { ...LIGHT, '--c-bg': '#fdfdfb', '--c-bg2': '#fdfdfb', '--c-panel': '#f1f3f6', '--c-line': 'rgba(49,130,246,.28)' });
    bg = `linear-gradient(90deg, transparent ${mg}px, rgba(240,68,82,.5) ${mg}px, rgba(240,68,82,.5) ${mg + 2}px, transparent ${mg + 2}px), repeating-linear-gradient(180deg, transparent 0, transparent ${ln - 1}px, rgba(49,130,246,.14) ${ln - 1}px, rgba(49,130,246,.14) ${ln}px), #fdfdfb`;
    cls = 'sk-note';
  } else if (sk.type === 'film') {
    Object.assign(v, { ...DARK, '--c-bg': '#0b0b0d', '--c-bg2': '#0b0b0d', '--c-panel': '#18181c', '--c-line': 'rgba(255,255,255,.14)' });
    cls = 'sk-film';
  } else if (sk.type === 'grid') {
    const t = (GT[sk.gt] || GT.light)[1], cell = Math.round(Math.min(W, H) / 28);
    Object.assign(v, { '--c-bg': t.bg, '--c-bg2': t.panel, '--c-ink': t.ink, '--c-ink2': t.ink2, '--c-sub': t.sub, '--c-panel': t.panel, '--c-line': t.rule, '--c-rule': t.rule });
    bg = `${svgURI(gridSVG(cell, t))} 0 0/${cell * 4}px ${cell * 4}px repeat, ${t.bg}`;
    cls = 'sk-grid';
  } else {
    const lt = sk.panelTone !== 'dark', a = sk.panelAlpha / 100;
    Object.assign(v, lt
      ? { ...LIGHT, '--c-panel': `rgba(255,255,255,${a})`, '--c-line': 'rgba(0,23,51,.16)' }
      : { ...DARK, '--c-panel': `rgba(20,20,24,${a})`, '--c-line': 'rgba(255,255,255,.2)' });
    if (sk.type === 'pattern') {
      v['--c-bg'] = sk.patBg;
      bg = `${svgURI(patternSVG(sk.pattern, sk.patFg, sk.patSize))} 0 0/${sk.patSize}px ${sk.patSize}px repeat, ${sk.patBg}`;
    } else {
      const u = imgURL(sk.image);
      bg = u ? (sk.imgFit === 'tile' ? `url("${u}") 0 0/${Math.round(W / 4)}px auto repeat` : `url("${u}") center/cover no-repeat`) : (lt ? 'linear-gradient(135deg,#e8f3ff,#f2f4f6)' : 'linear-gradient(135deg,#1c2433,#101012)');
      if (sk.dim > 0) dim = sk.dimTone === 'dark' ? `rgba(0,0,0,${sk.dim / 100})` : `rgba(255,255,255,${sk.dim / 100})`;
    }
  }
  if (lum(v['--c-ink']) > .5 && lum(acc) < .3) { // 어두운 바탕 + 어두운 포인트 색: 글자는 밝게
    v['--accent-text'] = tint(acc, .55);
    v['--accent-soft'] = 'rgba(255,255,255,.12)';
    v['--hl'] = 'rgba(255,255,255,.2)';
  }
  return { v, bg, dim, cls };
}

/* =========================================================
   카드 그리기
   ========================================================= */
const card = $('#card');
const PERSON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 4-5.2 7-5.2s5.8 1.6 7 5.2"/></svg>';
const PIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="m5 17 4.5-4.5 3 3L15 13l4 4"/></svg>';
const hint = (t) => `<span class="ph-hint">${t}</span>`;
const picHTML = (u, x, y, z) => `<img class="pic" src="${u}" alt="" draggable="false" style="object-position:${x}% ${y}%;transform-origin:${x}% ${y}%;transform:scale(${z || 1})">`;
/* 서식: **굵게** · *기울임* · ==형광펜== */
const fmt = (h) => h.replace(/\{\{(#[0-9a-fA-F]{3,8})\|([\s\S]+?)\}\}/g, '<span style="color:$1">$2</span>').replace(/__(.+?)__/g, '<u>$1</u>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/==(.+?)==/g, '<mark>$1</mark>').replace(/(^|[^*])\*(?!\s)([^*\n]+?)\*/g, '$1<i>$2</i>');
const rich = (s) => fmt(esc(s));
const plain = (s) => String(s ?? '').replace(/\{\{#[0-9a-fA-F]{3,8}\||\}\}|\*\*|==|__|\*/g, '');

function sectionHTML(s, side) {
  let body = '';
  if (s.type === 'text') body = `<div class="txt">${s.body.trim() ? rich(s.body) : hint('내용을 입력하세요')}</div>`;
  else if (s.type === 'tags') {
    const list = s.tags.filter((t) => s.showAll || t.on);
    body = `<div class="tags">${list.map((t) => `<span class="tag${t.on ? '' : ' off'}">${esc(t.label)}</span>`).join('') || `<span class="txt">${hint('태그를 골라 주세요')}</span>`}</div>`;
  } else if (s.type === 'dream') {
    const keys = ['ONLY', 'OPEN', 'CBC'].filter((k) => s.showAll || s.opts[k]);
    body = `<div class="dream">${keys.map((k) => `<span class="dr${s.opts[k] ? '' : ' off'}">${k}</span>`).join('') || `<span class="txt">${hint('성향을 골라 주세요')}</span>`}</div>${s.note.trim() ? `<div class="dnote">${rich(s.note)}</div>` : ''}`;
  }
  return `<div class="sec${s.wide ? ' wide' : ' ' + side}" data-go="about">${s.title ? `<div class="lbl">${esc(s.title)}</div>` : ''}${body}</div>`;
}
/* 갤러리 배치
   - 균등: 모든 칸이 같은 크기. 마지막 줄은 가운데로 모음
   - 대표 강조: 홀수일 때 첫 칸이 2×2, 나머지는 1×1 → 작은 칸은 모두 같은 비율, 큰 칸은 정확히 2배
   칸 수는 한 칸이 캐릭터 그림에 맞는 3:4에 가장 가깝게 되도록 고름 */
const CELL_AR = 3 / 4;
const arCost = (ar) => Math.abs(Math.log(ar / CELL_AR));
function applyGrid(grid) {
  const kids = [...grid.children], n = kids.length; if (!n) return;
  const W = grid.clientWidth, H = Math.max(1, grid.clientHeight);
  kids.forEach((c) => { c.style.gridArea = ''; c.style.gridColumn = ''; c.style.gridRow = ''; });
  if (state.gallery.arrange !== 'even' && n % 2 === 1 && n > 1) {
    // 대표 강조: 3개 → 3×2 또는 2×3, 5개 → 4×2 또는 2×4 중 칸 비율이 더 나은 쪽
    const across = { 3: [3, 2], 5: [4, 2] }[n];
    const opts = [{ cols: across[0], rows: across[1], tall: false }, { cols: across[1], rows: across[0], tall: true }];
    const best = opts.sort((a, b) => arCost((W / a.cols) / (H / a.rows)) - arCost((W / b.cols) / (H / b.rows)))[0];
    let areas;
    if (!best.tall) areas = n === 3 ? ['a a b', 'a a c'] : ['a a b c', 'a a d e'];
    else areas = n === 3 ? ['a a', 'a a', 'b c'] : ['a a', 'a a', 'b c', 'd e'];
    grid.style.gridTemplateAreas = areas.map((x) => `"${x}"`).join(' ');
    grid.style.gridTemplateColumns = `repeat(${best.cols}, minmax(0, 1fr))`;
    grid.style.gridTemplateRows = `repeat(${best.rows}, minmax(0, 1fr))`;
    kids.forEach((c, i) => { c.style.gridArea = 'abcde'[i]; });
    return;
  }
  // 균등: 열 수를 1 ~ n 중에서 고르고, 반 칸 단위(2배 열)로 마지막 줄을 가운데 정렬
  // 줄 수를 먼저 정하고 한 줄에 고르게 나눔 (5개면 3 + 2, 4 + 1처럼 한 칸만 남지 않게)
  let cols = n, cost = Infinity;
  for (let r = 1; r <= n; r++) {
    const c = Math.ceil(n / r);
    if (Math.ceil(n / c) !== r) continue;
    const k = arCost((W / c) / (H / r)) + (n % c ? .08 : 0); // 줄이 꽉 차면 조금 더 선호
    if (k < cost) { cost = k; cols = c; }
  }
  const rows = Math.ceil(n / cols);
  grid.style.gridTemplateAreas = 'none';
  grid.style.gridTemplateColumns = `repeat(${cols * 2}, minmax(0, 1fr))`;
  grid.style.gridTemplateRows = `repeat(${rows}, minmax(0, 1fr))`;
  kids.forEach((c, i) => {
    const r = Math.floor(i / cols), inRow = r === rows - 1 ? n - r * cols : cols, k = i - r * cols;
    c.style.gridColumn = `${cols - inRow + 1 + k * 2} / span 2`;
    c.style.gridRow = `${r + 1}`;
  });
}

const P_RATIO = { 11: [1, 1], 34: [3, 4], 45: [4, 5], 23: [2, 3], 43: [4, 3] };
function phStyle(p) {
  const [rw, rh] = P_RATIO[p.pratio] || [1, 1];
  const w = 3.4 * (p.psize / 100) * (rw >= rh ? 1 : Math.sqrt(rw / rh)), h = w * rh / rw;
  const r = p.pshape === 'circle' && rw === rh ? '50%' : p.pshape === 'square' ? '0' : (Math.min(w, h) * .22).toFixed(3) + 'em';
  return `width:${w.toFixed(3)}em;height:${h.toFixed(3)}em;border-radius:${r}`;
}
/* 이름표 그라데이션: 색 · 불투명도, 글자 색은 바탕에 맞춰 자동 */
function capVars(g) {
  const a = g.capAlpha / 100, lightCap = lum(g.capColor) > .45 && a >= .3;
  return {
    '--cap0': rgba(g.capColor, 0), '--cap1': rgba(g.capColor, a),
    '--cap-ink': lightCap ? '#191f28' : '#ffffff',
    '--cap-shadow': lightCap ? 'none' : `0 1px ${a < .35 ? 6 : 3}px rgba(0,0,0,${a < .35 ? .45 : .2})`,
  };
}
function listHTML() {
  let col = 0;
  return state.sections.filter((s) => s.on).map((s) => {
    if (s.wide) { col = 0; return sectionHTML(s); }
    const side = col === 0 ? 'l' : 'r'; col = 1 - col;
    return sectionHTML(s, side);
  }).join('');
}
function render() {
  const { W, H } = dims();
  const t = state.text, g = state.gallery, p = state.profile;
  const { v, bg, dim, cls } = skinVars(W, H);
  const k = Math.min(W, H);
  ensureFont(t.head); ensureFont(t.body);
  Object.assign(v, {
    '--fH': stack(t.head), '--fB': stack(t.body), '--lh': t.lh, '--ls': t.ls + 'em',
    '--align': t.align, '--justify': t.align === 'center' ? 'center' : 'flex-start', '--wb': t.keepAll ? 'keep-all' : 'normal',
    ...capVars(g),
    '--psc': p.showPhoto ? Math.min(1.35, Math.max(.85, Math.sqrt(p.psize / 100))).toFixed(3) : 1,
    '--gap': Math.round(k * .028) + 'px', '--rad': (t.radius / 16 * .7).toFixed(3) + 'em',
  });
  card.className = `ts-${t.titleStyle} al-${t.align} ${cls}`;
  card.removeAttribute('style');
  card.style.width = W + 'px'; card.style.height = H + 'px';
  for (const [kk, vv] of Object.entries(v)) card.style.setProperty(kk, vv);

  const showGal = g.on && g.items.length > 0;
  const pos = g.pos === 'auto' ? (W / H >= 1.15 ? 'right' : 'bottom') : g.pos;
  const share = g.share / 100;
  const handle = p.handle.replace(/^@/, '').trim();
  const photo = imgURL(p.photo);

  const boxed = ['pattern', 'photo', 'glass'].includes(state.skin.type);
  const d0 = new Date(), today = `${d0.getFullYear()}. ${String(d0.getMonth() + 1).padStart(2, '0')}. ${String(d0.getDate()).padStart(2, '0')}`;
  const mast = state.skin.type === 'editorial' ? `<div class="mast"><span>PROFILE</span><span>${handle ? '@' + esc(handle) : ''}</span><span>${today}</span></div>` : '';
  const info = `<div class="info${boxed ? ' boxed' : ''}">${mast}
    <div class="prof" data-go="about" data-drop="photo">${p.showPhoto ? `<div class="ph"${photo ? ' data-img="photo"' : ' data-pick="photo"'} style="${phStyle(p)}">${photo ? picHTML(photo, p.px, p.py, p.pz) : `<span class="ph-hint">${PERSON}</span>`}</div>` : ''}
      <div class="who"><div class="id">${p.name.trim() ? `<div class="nm">${esc(p.name)}</div>` : `<div class="nm">${hint('닉네임')}</div>`}${p.showHandle && handle ? `<div class="hd">@${esc(handle)}</div>` : ''}</div>${p.showSummary && p.summary.trim() ? `<div class="sm">${rich(p.summary)}</div>` : ''}</div></div>
    <div class="list">${listHTML()}</div></div>`;

  const gal = !showGal ? '' : `<div class="gal${boxed ? ' boxed' : ''} ${g.caption === 'below' ? 'cap-below' : g.caption === 'over' ? 'cap-over' : ''}" data-go="chars">${g.title ? `<div class="lbl">${esc(g.title)}</div>` : ''}<div class="grid">${g.items.map((it, j) => {
    const hasCap = g.caption !== 'none' && (it.genre.trim() || it.name.trim());
    const credit = it.credit.trim() ? esc(it.credit) : '';
    const credInCap = credit && hasCap && g.caption === 'over';
    const cap = hasCap ? `<div class="cap"><div class="ct">${it.genre.trim() ? `<div class="g">${esc(it.genre)}</div>` : ''}${it.name.trim() ? `<div class="n">${esc(it.name)}</div>` : ''}</div>${credInCap ? `<span class="cr">${credit}</span>` : ''}</div>` : '';
    const pill = credit && !credInCap ? `<span class="cr pill">${credit}</span>` : '';
    const u = imgURL(it.img);
    const im = u ? `<div class="im" data-img="g${j}">${picHTML(u, it.x, it.y, it.z)}${pill}</div>` : `<div class="empty" data-pick="g${j}"><span class="ph-hint">${PIC}</span></div>`;
    return `<div class="gi" data-drop="g${j}">${im}${cap}</div>`;
  }).join('')}</div></div>`;

  let layStyle, inner;
  if (!showGal) { layStyle = 'grid-template-columns:minmax(0,1fr)'; inner = info; }
  else if (pos === 'bottom') { layStyle = `grid-template-rows:minmax(0,${1 - share}fr) minmax(0,${share}fr);grid-template-columns:minmax(0,1fr)`; inner = info + gal; }
  else if (pos === 'left') { layStyle = `grid-template-columns:minmax(0,${share}fr) minmax(0,${1 - share}fr)`; inner = gal + info; }
  else { layStyle = `grid-template-columns:minmax(0,${1 - share}fr) minmax(0,${share}fr)`; inner = info + gal; }
  const lay = `<div class="lay" style="${layStyle}">${inner}</div>`;

  const pad = Math.round(k * .055);
  let html = `<div class="bg" style="background:${(bg || 'var(--c-bg)').replace(/"/g, '&quot;')}"></div>${dim ? `<div class="dim" style="background:${dim}"></div>` : ''}`;
  if (state.skin.type === 'mac') {
    const mb = Math.round(k * .036), inset = Math.round(k * .05), tb = 46;
    const d = new Date();
    const date = `${d.getMonth() + 1}월 ${d.getDate()}일 (${'일월화수목금토'[d.getDay()]})`;
    html += `<div class="menubar" style="height:${mb}px;font-size:${Math.round(mb * .42)}px"><span>파일</span><span>편집</span><span>보기</span><span class="sp">${handle ? '@' + esc(handle) : ''}</span><span>${date}</span></div>
      <div class="win" style="left:${inset}px;right:${inset}px;top:${mb + inset * .7}px;bottom:${inset}px">
        <div class="titlebar" style="height:${tb}px"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i><div class="tt">${esc(p.name.trim() || '프로필')}</div></div>
        <div class="content" style="left:${pad * .7}px;right:${pad * .7}px;top:${tb + pad * .6}px;bottom:${pad * .7}px">${lay}</div></div>`;
  } else {
    if (state.skin.type === 'film') {
      const sh = Math.round(k * .06), hw = Math.round(sh * .42), hh = Math.round(sh * .52), step = Math.round(sh * .9);
      const holes = svgURI(`<svg xmlns='http://www.w3.org/2000/svg' width='${step}' height='${sh}'><rect x='${(step - hw) / 2}' y='${(sh - hh) / 2}' width='${hw}' height='${hh}' rx='${hw * .22}' fill='#f2f2f2' fill-opacity='.9'/></svg>`);
      const edge = `<span>${handle ? '@' + esc(handle).toUpperCase() : 'PROFILE'}</span><span>▸ 01</span><span>▸ 01A</span><span>${today}</span>`;
      html += `<div class="strip" style="top:0;height:${sh}px;background:${holes.replace(/"/g, '&quot;')} 0 0/${step}px ${sh}px repeat-x"></div><div class="strip" style="bottom:0;height:${sh}px;background:${holes.replace(/"/g, '&quot;')} 0 0/${step}px ${sh}px repeat-x"></div><div class="edge" style="top:${sh}px">${edge}</div><div class="edge" style="bottom:${sh}px">${edge}</div>`;
      html += `<div class="content" style="left:${pad}px;right:${pad}px;top:${Math.round(sh + pad * .75)}px;bottom:${Math.round(sh + pad * .75)}px">${lay}</div>`;
      card.innerHTML = html; layoutPass(); fit(); return;
    }
    if (state.skin.type === 'note') { const mg = Math.round(k * .035); html += `<div class="punch" style="left:${Math.round(mg * .45)}px"></div>`; }
    if (state.skin.type === 'grid') html += [[pad, pad], [W - pad, pad], [pad, H - pad], [W - pad, H - pad]].map(([x, y]) => `<i class="cm" style="left:${x}px;top:${y}px"></i>`).join('');
    html += `<div class="content" style="inset:${pad}px">${lay}</div>`;
  }
  card.innerHTML = html;
  layoutPass();
  fit();
}

/* 글이 넘치면 글자 크기를 줄여 카드 안에 맞춤 */
function layoutPass() {
  const t = state.text;
  const info = $('.info', card), list = $('.list', card);
  const base = 27 * (t.scale / 100);
  const setF = (f) => card.style.setProperty('--fz', (base * f).toFixed(2) + 'px');
  const over = () => info.scrollHeight > info.clientHeight + 1 || list.scrollWidth > list.clientWidth + 1;
  setF(1);
  // 프로필: 사진이 글보다 훨씬 크면 이름은 사진 윗선, 계정 요약은 사진 아랫선에 맞춤
  const prof = $('.prof', card), ph = $('.ph', card), who = $('.who', card);
  if (prof) { prof.classList.remove('tall'); if (ph && who && ph.offsetHeight > who.offsetHeight * 1.3) prof.classList.add('tall'); }
  if (t.autofit) {
    let lo = .45, hi = 1.12;
    setF(hi); if (!over()) { $$('.grid', card).forEach(applyGrid); setBand(); return; }
    for (let i = 0; i < 9; i++) { const m = (lo + hi) / 2; setF(m); if (over()) hi = m; else lo = m; }
    setF(lo);
  }
  $$('.grid', card).forEach(applyGrid);
  setBand();
}
/* 컬러 블록: 프로필 줄 아래까지 포인트 색 띠 */
function setBand() {
  if (state.skin.type !== 'block') return;
  const pr = $('.prof', card); if (!pr) return;
  let y = 0, el = pr;
  while (el && el !== card) { y += el.offsetTop; el = el.offsetParent; }
  card.style.setProperty('--band', (y + pr.offsetHeight + Math.round(Math.min(card.offsetWidth, card.offsetHeight) * .03)) + 'px');
}

/* =========================================================
   화면 맞춤 · 확대
   ========================================================= */
const stage = $('#stage'), stageInner = $('#stage-inner'), scaler = $('#scaler');
let zoom = 'fit';
function fit() {
  const w = card.offsetWidth, h = card.offsetHeight;
  if (!w) return;
  const pad = isMobile() ? 32 : 72;
  const s = zoom === 'fit' ? Math.min(1, (stage.clientWidth - pad) / w, (stage.clientHeight - pad - (isMobile() ? 40 : 70)) / h) : zoom;
  scaler.style.transform = `scale(${s})`;
  stageInner.style.width = (w * s) + 'px';
  stageInner.style.height = (h * s) + 'px';
  $('#zoom-val').textContent = Math.round(s * 100) + '%';
}
$('#hud').addEventListener('click', (e) => {
  const b = e.target.closest('[data-zoom]'); if (!b) return;
  const cur = parseFloat($('#zoom-val').textContent) / 100;
  const steps = [.25, .33, .5, .67, .75, .9, 1, 1.25, 1.5];
  if (b.dataset.zoom === 'fit') zoom = 'fit';
  if (b.dataset.zoom === 'in') zoom = steps.find((s) => s > cur + .005) || 1.5;
  if (b.dataset.zoom === 'out') zoom = [...steps].reverse().find((s) => s < cur - .005) || .25;
  fit();
});
new ResizeObserver(() => fit()).observe(stage);

/* =========================================================
   설정 패널
   ========================================================= */
const UI = {
  head: (t, p = '') => `<div class="pane-head"><h2>${t}</h2>${p ? `<p>${p}</p>` : ''}</div>`,
  sec: (title, body, foot = '', right = '') => `<div class="section-title"><span>${title}</span>${right}</div><div class="section">${body}</div>${foot ? `<p class="footnote">${foot}</p>` : ''}`,
  text: (label, k, ph = '') => `<div class="row stack"><span class="row-label">${label}</span><input class="input" type="text" data-k="${k}" placeholder="${esc(ph)}"></div>`,
  area: (label, k, rows = 4, ph = '') => `<div class="row stack">${label ? `<span class="row-label">${label}</span>` : ''}<textarea class="input" rows="${rows}" data-k="${k}" placeholder="${esc(ph)}"></textarea></div>`,
  slider: (label, k, min, max, step = 1, unit = '') => `<div class="row stack"><div class="row-top"><span class="row-label">${label}</span><span class="val" data-unit="${unit}"></span></div><input type="range" class="slider" min="${min}" max="${max}" step="${step}" data-k="${k}" aria-label="${label}"></div>`,
  sw: (label, k, sub = '') => `<label class="row"><span class="row-label">${label}${sub ? `<small>${sub}</small>` : ''}</span><input type="checkbox" class="switch" data-k="${k}"></label>`,
  seg: (label, k, opts, num = false) => `<div class="row"><span class="row-label">${label}</span><div class="seg" data-seg="${k}"${num ? ' data-num' : ''}>${opts.map(([v, t]) => `<button type="button" data-v="${v}">${t}</button>`).join('')}</div></div>`,
  color: (label, k) => `<div class="row"><span class="row-label">${label}</span><label class="color-btn"><span class="swatch"><i></i></span><span class="hex"></span><input type="color" data-k="${k}" aria-label="${label}"></label></div>`,
  font: (label, k, sub) => `<div class="row stack"><span class="row-label">${label}<small>${sub}</small></span><select class="select wide" data-k="${k}">${FONTS.map(([gname, l]) => `<optgroup label="${gname}">${l.map(([f, , n]) => `<option value="${f}">${n}</option>`).join('')}</optgroup>`).join('')}</select></div>`,
};

const PANES = [
  { id: 'layout', icon: 'layers', label: '구성', html: () => `${UI.head('구성', '판형과 메뉴의 순서 · 이름 · 너비를 정해요.')}
    <div class="section-title"><span>판형</span></div><div class="section"><div class="tiles ratio" id="ratio-tiles"></div><div class="row" id="custom-row" hidden><span class="row-label">직접 입력</span><div class="custom-ratio"><input class="input" type="number" min="1" max="40" id="rw" aria-label="가로"><span>:</span><input class="input" type="number" min="1" max="40" id="rh" aria-label="세로"></div></div></div>
    <div class="section-title"><span>메뉴</span></div><div class="section" id="menu-list"></div>
    <div class="picks" style="padding:10px 2px 0"><button type="button" class="chip" data-act="sec-add" data-type="text"><span data-icon="plus"></span>글 메뉴 추가</button><button type="button" class="chip" data-act="sec-add" data-type="tags"><span data-icon="plus"></span>태그 메뉴 추가</button></div>
    <p class="footnote">‘반’ 너비 메뉴 두 개가 이어지면 나란히 놓여요.</p>
    ${UI.sec('갤러리', UI.sw('갤러리 보이기', 'gallery.on') + UI.text('제목', 'gallery.title', '비우면 제목 없이') + UI.seg('위치', 'gallery.pos', [['auto', '자동'], ['left', '왼쪽'], ['right', '오른쪽'], ['bottom', '아래']]) + UI.slider('크기', 'gallery.share', 28, 64, 1, '%'), '자동은 가로형이면 오른쪽, 세로형 · 정사각형이면 아래예요.')}` },
  { id: 'about', icon: 'note', label: '소개', html: () => `${UI.head('소개')}
    ${UI.sec('프로필 사진', `<div class="row img-row" data-drop-row="photo"><button type="button" class="thumb" data-pick="photo" aria-label="프로필 사진 넣기">${icon('person')}</button><div class="img-txt"><b id="photo-state">사진 넣기</b><small>눌러서 파일이나 링크로 넣어요</small></div></div>${UI.seg('모양', 'profile.pshape', [['circle', '원'], ['rounded', '둥근 사각'], ['square', '사각']])}${UI.seg('비율', 'profile.pratio', [['11', '1:1'], ['34', '3:4'], ['45', '4:5'], ['23', '2:3'], ['43', '4:3']])}${UI.slider('크기', 'profile.psize', 60, 220, 1, '%')}<div id="photo-adj" hidden>${UI.slider('확대', 'profile.pz', 1, 4, .01, '×')}${UI.slider('가로 위치', 'profile.px', 0, 100, 1, '%')}${UI.slider('세로 위치', 'profile.py', 0, 100, 1, '%')}</div>`, '사진을 끌어다 놓거나 <b>Ctrl/⌘ + V</b>로 붙여넣어도 돼요. 미리보기에서 사진을 끌거나 휠을 굴려도 맞출 수 있어요. ‘원’은 1:1일 때만 동그랗고, 다른 비율에서는 둥근 사각이 돼요.')}
    ${UI.sec('정보', UI.text('닉네임', 'profile.name', '닉네임') + `<div class="row stack"><span class="row-label">아이디</span><input class="input" type="text" data-k="profile.handle" placeholder="아이디" autocapitalize="off" spellcheck="false"></div>` + UI.area('계정 요약', 'profile.summary', 2, '계정을 한두 줄로 소개해 주세요'))}
    ${UI.sec('보이기', UI.sw('프로필 사진', 'profile.showPhoto', '끄면 카드에서 사진 칸이 빠져요') + UI.sw('아이디', 'profile.showHandle') + UI.sw('계정 요약', 'profile.showSummary'))}
    <div id="about-list"></div><p class="footnote">글 칸을 누르면 뜨는 도구로 <b>굵게</b> · <i>기울임</i> · <u>밑줄</u> · 형광펜 · 글자 색을 넣을 수 있어요. 단축키 Ctrl/⌘ + B · I · U · Shift + H</p>` },
  { id: 'chars', icon: 'image', label: '갤러리', html: () => `${UI.head('갤러리', '1개부터 6개까지, 개수에 맞춰 그리드가 알아서 배치돼요.')}
    <div class="section-title"><span id="g-count"></span></div><div class="section" id="g-list"></div>
    <p class="footnote">사진은 칸에 끌어다 놓거나, 여러 장을 한 번에 고르거나, 링크로 넣어도 돼요. 이미지 주소를 복사해 <b>Ctrl/⌘ + V</b>로 붙여넣어도 돼요. 미리보기에서 사진을 끌면 위치가, 휠을 굴리면 확대가 바뀌어요. 커미션 출처는 이미지 오른쪽 아래에 작게 들어가요.</p>
    ${UI.sec('배치', UI.seg('홀수일 때', 'gallery.arrange', [['feature', '대표 강조'], ['even', '균등']]), '대표 강조: 첫 칸이 다른 칸의 2배 크기예요. 순서 화살표로 대표를 정해요. 균등: 모든 칸이 같은 크기이고 마지막 줄은 가운데로 모여요. 칸 비율은 사진이 3:4에 가깝게 자동으로 맞춰요.')}
    ${UI.sec('이름표', UI.seg('표시', 'gallery.caption', [['over', '이미지 위'], ['below', '이미지 아래'], ['none', '숨김']]) + `<div id="cap-opts">${UI.color('그라데이션 색', 'gallery.capColor')}${UI.slider('그라데이션 불투명도', 'gallery.capAlpha', 0, 100, 1, '%')}</div>`, '그라데이션은 ‘이미지 위’일 때 이름 뒤에 깔려요. 밝은 색을 고르면 글자가 어두워져요.')}` },
  { id: 'text', icon: 'type', label: '텍스트', html: () => `${UI.head('텍스트', '글꼴과 조판을 정해요.')}
    ${UI.sec('글꼴', UI.font('제목 · 이름', 'text.head', '닉네임, 메뉴 제목, 캐릭터 이름') + UI.font('본문', 'text.body', '소개 글, 태그, 계정 요약'))}
    ${UI.sec('조판', UI.slider('글자 크기', 'text.scale', 60, 140, 1, '%') + UI.slider('줄 간격', 'text.lh', 1.2, 2.2, .05, '×') + UI.slider('자간', 'text.ls', -.05, .12, .005, 'em') + UI.seg('정렬', 'text.align', [['left', '왼쪽'], ['center', '가운데']]) + UI.seg('메뉴 제목', 'text.titleStyle', [['plain', '기본'], ['accent', '포인트'], ['bold', '굵게']]) + UI.sw('단어 단위 줄바꿈', 'text.keepAll', '한글 단어가 중간에서 끊기지 않아요') + UI.sw('자동 맞춤', 'text.autofit', '글이 넘치면 크기를 줄여 카드 안에 맞춰요'))}` },
  { id: 'style', icon: 'palette', label: '스킨', html: () => `${UI.head('스킨', '바탕과 포인트 색을 골라요.')}
    <div class="section-title"><span>스킨</span></div><div class="section"><div class="tiles skins" id="skin-tiles"></div></div>
    <div id="skin-opts"></div>
    <div class="section-title"><span>포인트 색</span></div><div class="section"><div class="accents" id="accents"></div></div>
    ${UI.sec('모양', UI.slider('모서리 둥글기', 'text.radius', 0, 32, 1, 'px'))}
    ${UI.sec('저장 화질', UI.seg('배율', 'scale', [['1', '1×'], ['2', '2×'], ['3', '3×']], true), '2×면 3:2 기준 3200 × 2133px로 저장돼요.')}` },
];

const panelScroll = $('#panel-scroll'), rail = $('#rail'), app = $('#app');
panelScroll.innerHTML = PANES.map((p) => `<section class="pane" data-pane="${p.id}">${p.html()}</section>`).join('');
rail.innerHTML = PANES.map((p) => `<button type="button" class="rail-item" data-pane="${p.id}">${icon(p.icon)}<span>${p.label}</span></button>`).join('');
$('.brand-mark').innerHTML = BRAND;
$('#btn-more').innerHTML = icon('more');
$('[data-zoom="out"]').innerHTML = icon('minus');
$('[data-zoom="in"]').innerHTML = icon('plus');
const paintIcons = (root = document) => $$('[data-icon]', root).forEach((el) => { if (!el.firstChild) el.innerHTML = icon(el.dataset.icon); });
paintIcons();

let curPane = 'about';
function setPane(id, user) {
  if (user && isMobile()) {
    if (curPane === id && app.classList.contains('sheet-open')) { app.classList.remove('sheet-open'); return; }
    app.classList.add('sheet-open');
  }
  if (curPane !== id) panelScroll.scrollTop = 0;
  curPane = id;
  $$('.rail-item').forEach((b) => b.classList.toggle('on', b.dataset.pane === id));
  $$('.pane').forEach((p) => p.classList.toggle('on', p.dataset.pane === id));
  setTimeout(fit, 340);
}
rail.addEventListener('click', (e) => { const b = e.target.closest('.rail-item'); if (b) setPane(b.dataset.pane, true); });
$('#sheet-handle').addEventListener('click', () => { app.classList.remove('sheet-open'); setTimeout(fit, 340); });
card.addEventListener('click', (e) => {
  if (dragged) { dragged = false; return; }
  const im = e.target.closest('[data-img], [data-pick]');
  if (im) { openPickMenu(im.dataset.img || im.dataset.pick, im); return; }
  const go = e.target.closest('[data-go]'); if (go) setPane(go.dataset.go, true);
});

/* ---------- 미리보기에서 사진 맞추기: 끌면 위치, 휠은 확대 ---------- */
const imgKeys = (t) => (t === 'photo' ? { o: state.profile, x: 'px', y: 'py', z: 'pz', base: 'profile.p' } : { o: state.gallery.items[+t.slice(1)], x: 'x', y: 'y', z: 'z', base: `gallery.items.${t.slice(1)}.` });
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
function syncImgInputs(t) {
  const k = imgKeys(t);
  [k.x, k.y, k.z].forEach((f) => { const el = $(`#panel [data-k="${k.base}${f}"]`); if (el) syncControl(el); });
  if (t !== 'photo') { const th = $$('#g-list .gthumb')[+t.slice(1)]; if (th) th.style.backgroundPosition = `${k.o.x}% ${k.o.y}%`; }
}
let drag = null, dragged = false;
card.addEventListener('pointerdown', (e) => {
  const el = e.target.closest('[data-img]'); if (!el || e.button !== 0) return;
  const k = imgKeys(el.dataset.img); if (!k.o) return;
  const r = el.getBoundingClientRect();
  drag = { t: el.dataset.img, k, sx: e.clientX, sy: e.clientY, x0: k.o[k.x], y0: k.o[k.y], w: r.width, h: r.height, moved: false };
  e.preventDefault();
});
addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
  if (!drag.moved && Math.hypot(dx, dy) < 4) return;
  drag.moved = true; card.style.cursor = 'grabbing';
  const z = drag.k.o[drag.k.z] || 1;
  drag.k.o[drag.k.x] = Math.round(clamp(drag.x0 - dx / drag.w * 100 / z * 1.6, 0, 100));
  drag.k.o[drag.k.y] = Math.round(clamp(drag.y0 - dy / drag.h * 100 / z * 1.6, 0, 100));
  schedule();
});
addEventListener('pointerup', () => {
  if (!drag) return;
  if (drag.moved) { dragged = true; syncImgInputs(drag.t); setTimeout(() => { dragged = false; }, 0); }
  card.style.cursor = ''; drag = null;
});
card.addEventListener('wheel', (e) => {
  const el = e.target.closest('[data-img]'); if (!el) return;
  e.preventDefault();
  const k = imgKeys(el.dataset.img); if (!k.o) return;
  k.o[k.z] = +clamp((k.o[k.z] || 1) * Math.exp(-e.deltaY * .0015), 1, 4).toFixed(2);
  syncImgInputs(el.dataset.img); schedule();
}, { passive: false });

/* ---------- 목록 ---------- */
const moveBtns = (list, j, n, del = true) => `<div class="lbtns"><button type="button" class="icon-btn sm" data-act="up" data-list="${list}" data-i="${j}" aria-label="위로"${j === 0 ? ' disabled' : ''}>${icon('up')}</button><button type="button" class="icon-btn sm" data-act="down" data-list="${list}" data-i="${j}" aria-label="아래로"${j === n - 1 ? ' disabled' : ''}>${icon('down')}</button>${del ? `<button type="button" class="icon-btn sm danger" data-act="del" data-list="${list}" data-i="${j}" aria-label="지우기">${icon('trash')}</button>` : ''}</div>`;

function renderAbout() {
  $('#about-list').innerHTML = state.sections.map((s, i) => {
    const title = `${esc(s.title) || '제목 없음'}${s.on ? '' : ' <span style="font-weight:500;color:var(--text-4)">· 숨김</span>'}`;
    if (s.type === 'text') return UI.sec(title, UI.area('', `sections.${i}.body`, 4, '내용을 입력하세요'));
    if (s.type === 'tags') return UI.sec(title, `<div class="picks">${s.tags.map((t, j) => `<button type="button" class="pick${t.on ? ' on' : ''}" data-act="tag" data-i="${i}" data-j="${j}" aria-pressed="${t.on}">${esc(t.label)}${t.custom ? `<span class="x" data-act="tag-del" data-i="${i}" data-j="${j}" role="button" aria-label="${esc(t.label)} 지우기">${icon('x')}</span>` : ''}</button>`).join('')}</div>
      <div class="add-inline"><input class="input sm" type="text" placeholder="직접 추가" data-addtag="${i}" aria-label="태그 직접 추가"><button type="button" class="btn btn-sm" data-act="tag-add" data-i="${i}">추가</button></div>` + UI.sw('고르지 않은 태그도 흐리게', `sections.${i}.showAll`));
    if (s.type === 'dream') return UI.sec(title, `<div class="picks">${['ONLY', 'OPEN', 'CBC'].map((o) => `<button type="button" class="pick dream${s.opts[o] ? ' on' : ''}" data-act="dream" data-i="${i}" data-o="${o}" aria-pressed="${!!s.opts[o]}">${o}</button>`).join('')}</div>` + UI.area('비고', `sections.${i}.note`, 2, '자유롭게 적어 주세요') + UI.sw('고르지 않은 항목도 흐리게', `sections.${i}.showAll`));
    return '';
  }).join('');
  syncIn($('#about-list'));
}
function renderGallery() {
  $('#cap-opts').hidden = state.gallery.caption !== 'over';
  const items = state.gallery.items, n = items.length;
  $('#g-count').textContent = `캐릭터 ${n} / 6`;
  $('#g-list').innerHTML = items.map((it, j) => {
    const u = imgURL(it.img);
    return `<div class="gitem" data-drop-row="g${j}">
      <button type="button" class="gthumb" data-pick="g${j}" style="${u ? `background-image:url(&quot;${u}&quot;);background-position:${it.x}% ${it.y}%` : ''}" aria-label="${j + 1}번 이미지 넣기">${u ? '' : icon('image')}</button>
      <div class="gfields">
        <div class="ghead"><span class="gnum">${j + 1}</span>${moveBtns('gallery.items', j, n)}</div>
        <input class="input sm" type="text" data-k="gallery.items.${j}.genre" placeholder="장르">
        <input class="input sm" type="text" data-k="gallery.items.${j}.name" placeholder="캐릭터 이름">
        <input class="input sm" type="text" data-k="gallery.items.${j}.credit" placeholder="커미션 출처 (선택)">
        ${u ? `<div class="gpos"><span>확대</span><input type="range" class="slider" min="1" max="4" step="0.01" data-k="gallery.items.${j}.z" aria-label="확대"><span>가로</span><input type="range" class="slider" min="0" max="100" data-k="gallery.items.${j}.x" aria-label="가로 위치"><span>세로</span><input type="range" class="slider" min="0" max="100" data-k="gallery.items.${j}.y" aria-label="세로 위치"></div>` : ''}
      </div></div>`;
  }).join('') + (n < 6 ? `<button type="button" class="add-row" data-act="g-add">${icon('plus')}캐릭터 추가</button>` : '');
  syncIn($('#g-list'));
}
function renderMenuList() {
  const n = state.sections.length;
  const kind = { text: '글', tags: '태그', dream: '드림' };
  $('#menu-list').innerHTML = state.sections.map((s, i) => `<div class="mrow${s.on ? '' : ' off'}">
    <input type="checkbox" class="switch" data-k="sections.${i}.on" aria-label="${esc(s.title)} 보이기">
    <input class="input" type="text" data-k="sections.${i}.title" placeholder="${kind[s.type]} 메뉴" aria-label="메뉴 이름">
    <div class="mrow-tools"><div class="seg mini" data-seg="sections.${i}.wide" data-bool><button type="button" data-v="true">넓게</button><button type="button" data-v="false">반</button></div>${moveBtns('sections', i, n, !!s.custom)}</div>
  </div>`).join('');
  syncIn($('#menu-list'));
}
function renderRatio() {
  $('#ratio-tiles').innerHTML = RATIOS.map(([id, w, h, l]) => {
    const r = id === 'custom' ? 1.3 : w / h, bw = r >= 1 ? 30 : Math.round(26 * r), bh = r >= 1 ? Math.round(30 / r) : 26;
    return `<button type="button" class="tile${state.layout.ratio === id ? ' on' : ''}" data-act="ratio" data-r="${id}"><span class="ratio-pv"><i style="width:${bw}px;height:${bh}px${id === 'custom' ? ';border-radius:4px;background:none;border:1.5px dashed currentColor' : ''}"></i></span><span>${l}</span></button>`;
  }).join('');
  $('#custom-row').hidden = state.layout.ratio !== 'custom';
  $('#rw').value = state.layout.w; $('#rh').value = state.layout.h;
}
function skinPV(id) {
  const sk = state.skin;
  const box = (l, t, w, h, c, r = 3) => `<i style="left:${l}%;top:${t}%;width:${w}%;height:${h}%;background:${c};border-radius:${r}px"></i>`;
  const body = (panel, img) => box(10, 18, 12, 19, panel, 99) + box(10, 46, 40, 40, panel) + box(56, 18, 34, 68, img);
  switch (id) {
    case 'white': return `<span class="skin-pv" style="background:#fff">${body('#f2f4f6', '#e5e8eb')}</span>`;
    case 'cloud': return `<span class="skin-pv" style="background:#f2f4f6">${body('#fff', '#fff')}</span>`;
    case 'dark': return `<span class="skin-pv" style="background:#101012">${body('#2a2a30', '#2a2a30')}</span>`;
    case 'mac': return `<span class="skin-pv" style="background:${(WALLS[sk.wall] || WALLS.mist)[1]}">${box(9, 16, 82, 72, '#fff', 4)}<i style="left:13%;top:21%;display:flex;gap:2px"><b style="width:4px;height:4px;border-radius:50%;background:#ff5f57"></b><b style="width:4px;height:4px;border-radius:50%;background:#febc2e"></b><b style="width:4px;height:4px;border-radius:50%;background:#28c840"></b></i></span>`;
    case 'grid': { const t = (GT[sk.gt] || GT.light)[1]; return `<span class="skin-pv" style="background:${svgURI(gridSVG(5, t))} 0 0/20px 20px, ${t.bg}">${[[10, 18, 12, 19], [10, 46, 40, 40], [56, 18, 34, 68]].map(([l, tp, w, h]) => `<i style="left:${l}%;top:${tp}%;width:${w}%;height:${h}%;background:${t.panel};box-shadow:0 0 0 1px ${t.rule}"></i>`).join('')}</span>`; }
    case 'pattern': return `<span class="skin-pv" style="background:${svgURI(patternSVG(sk.pattern, sk.patFg, 12))} 0 0/12px 12px, ${sk.patBg}">${body('rgba(255,255,255,.92)', 'rgba(255,255,255,.92)')}</span>`;
    case 'glass': { const night = glassDark(); const pnl = night ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.6)'; return `<span class="skin-pv" style="background:${glassBG()}"><i style="left:8%;top:14%;width:46%;height:72%;background:${pnl};border-radius:5px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.7)"></i><i style="left:58%;top:14%;width:34%;height:72%;background:${pnl};border-radius:5px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.7)"></i></span>`; }
    case 'editorial': return `<span class="skin-pv" style="background:#fafaf8"><i style="left:9%;top:13%;width:43%;height:2px;background:#111"></i><i style="left:9%;top:20%;width:28%;height:7px;background:#111;border-radius:1px"></i><i style="left:9%;top:52%;width:43%;height:1px;background:#111"></i><i style="left:9%;top:66%;width:43%;height:1px;background:#111"></i><i style="left:9%;top:80%;width:43%;height:1px;background:#111"></i><i style="left:58%;top:13%;width:33%;height:74%;background:#d9d7d2"></i></span>`;
    case 'block': return `<span class="skin-pv" style="background:linear-gradient(180deg, ${sk.accent} 0 40%, #fff 40%)"><i style="left:9%;top:14%;width:13%;height:20%;border-radius:99px;background:rgba(255,255,255,.85)"></i><i style="left:26%;top:19%;width:20%;height:6px;border-radius:2px;background:#fff"></i><i style="left:9%;top:62%;width:42%;height:1px;background:#e5e8eb"></i><i style="left:9%;top:76%;width:42%;height:1px;background:#e5e8eb"></i><i style="left:58%;top:14%;width:33%;height:72%;background:#e5e8eb;border-radius:3px"></i></span>`;
    case 'note': return `<span class="skin-pv" style="background:linear-gradient(90deg, transparent 6px, rgba(240,68,82,.5) 6px, rgba(240,68,82,.5) 7px, transparent 7px), repeating-linear-gradient(180deg, transparent 0 7px, rgba(49,130,246,.2) 7px 8px), #fdfdfb"><i style="left:58%;top:16%;width:33%;height:68%;background:#e5e8eb;border-radius:3px"></i><i style="left:14%;top:18%;width:24%;height:5px;background:rgba(49,130,246,.35)"></i></span>`;
    case 'film': return `<span class="skin-pv" style="background:#0b0b0d"><i style="left:0;right:0;top:3px;height:5px;background:repeating-linear-gradient(90deg, transparent 0 3px, #ddd 3px 6px, transparent 6px 9px)"></i><i style="left:0;right:0;bottom:3px;height:5px;background:repeating-linear-gradient(90deg, transparent 0 3px, #ddd 3px 6px, transparent 6px 9px)"></i><i style="left:9%;top:24%;width:43%;height:52%;background:#1c1c20;border-radius:2px"></i><i style="left:58%;top:24%;width:33%;height:52%;background:#2a2a30;border-radius:2px"></i></span>`;
    case 'photo': { const u = imgURL(sk.image); return `<span class="skin-pv" style="background:${u ? `url(&quot;${u}&quot;) center/cover` : 'linear-gradient(135deg,#e8f3ff,#c9d8f2)'}">${body('rgba(255,255,255,.9)', 'rgba(255,255,255,.9)')}</span>`; }
  }
  return '';
}
function renderSkin() {
  const sk = state.skin;
  $('#skin-tiles').innerHTML = SKINS.map(([id, l]) => `<button type="button" class="tile${sk.type === id ? ' on' : ''}" data-act="skin" data-s="${id}">${skinPV(id)}<span>${l}</span></button>`).join('');
  let o = '';
  if (sk.type === 'mac') o = UI.sec('macOS', UI.seg('배경화면', 'skin.wall', Object.entries(WALLS).map(([k, [n]]) => [k, n])) + UI.seg('창', 'skin.winTone', [['light', '라이트'], ['dark', '다크']]));
  else if (sk.type === 'glass') o = `<div class="section-title"><span>글래스 배경</span></div><div class="section"><div class="tiles pats">${Object.entries(GLASS).map(([k, [n]]) => `<button type="button" class="tile${sk.glass === k ? ' on' : ''}" data-act="glass" data-g="${k}"><span class="pat-pv" style="background:${glassBG(k)}"></span><span>${n}</span></button>`).join('')}<button type="button" class="tile${sk.glass === 'solid' ? ' on' : ''}" data-act="glass" data-g="solid"><span class="pat-pv" style="background:${sk.glassColor}"></span><span>단색</span></button></div>${sk.glass === 'solid' ? UI.color('바탕 색', 'skin.glassColor') : ''}</div><p class="footnote">흐린 빛 위에 반투명한 판을 띄운 스타일이에요. 단색은 바탕 색을 직접 골라요.</p>`;
  else if (sk.type === 'editorial') o = `<p class="footnote" style="padding-top:12px">잡지 지면처럼 굵은 이름과 검은 괘선으로 정리해요. 맨 위에 날짜가 든 머리말이 들어가요.</p>`;
  else if (sk.type === 'block') o = `<p class="footnote" style="padding-top:12px">프로필 줄까지 포인트 색 띠를 깔아요. 띠 색은 아래 포인트 색으로 바꿔요.</p>`;
  else if (sk.type === 'note') o = `<p class="footnote" style="padding-top:12px">줄 노트 위에 적은 것처럼 보여요. 닉네임에 형광펜이 들어가요.</p>`;
  else if (sk.type === 'film') o = `<p class="footnote" style="padding-top:12px">필름 한 컷처럼 위아래에 구멍과 번호가 들어가요.</p>`;
  else if (sk.type === 'grid') o = UI.sec('그리드', UI.seg('톤', 'skin.gt', Object.entries(GT).map(([k, [n]]) => [k, n])), '가는 선으로 칸을 나눈 격자예요. 모서리에 재단 표시가 들어가요.');
  else if (sk.type === 'pattern') o = `<div class="section-title"><span>무늬</span></div><div class="section"><div class="tiles pats">${PATTERNS.map(([p, n]) => `<button type="button" class="tile${sk.pattern === p ? ' on' : ''}" data-act="pattern" data-p="${p}"><span class="pat-pv" style="background:${svgURI(patternSVG(p, sk.patFg, 16))} 0 0/16px 16px, ${sk.patBg}"></span><span>${n}</span></button>`).join('')}</div>${UI.color('바탕 색', 'skin.patBg')}${UI.color('무늬 색', 'skin.patFg')}${UI.slider('무늬 크기', 'skin.patSize', 16, 96, 2, 'px')}</div>`;
  else if (sk.type === 'photo') o = UI.sec('사진 배경', `<div class="row img-row"><button type="button" class="thumb" data-pick="bg" aria-label="배경 사진 고르기" style="${imgURL(sk.image) ? `background-image:url(&quot;${imgURL(sk.image)}&quot;)` : ''}">${imgURL(sk.image) ? '' : icon('image')}</button><div class="img-txt"><b>${sk.image ? '배경 사진' : '사진 넣기'}</b><small>눌러서 ${sk.image ? '바꾸거나 지워요' : '파일이나 링크로 넣어요'}</small></div></div>` + UI.seg('채우기', 'skin.imgFit', [['cover', '꽉 채우기'], ['tile', '바둑판']]) + UI.seg('덮개', 'skin.dimTone', [['dark', '어둡게'], ['light', '밝게']]) + UI.slider('덮개 농도', 'skin.dim', 0, 80, 1, '%'));
  if (sk.type === 'pattern' || sk.type === 'photo') o += UI.sec('칸', UI.seg('칸 색', 'skin.panelTone', [['light', '라이트'], ['dark', '다크']]) + UI.slider('불투명도', 'skin.panelAlpha', 40, 100, 1, '%'));
  $('#skin-opts').innerHTML = o;
  $('#accents').innerHTML = ACCENTS.map((c) => `<button type="button" class="accent-dot${sk.accent.toLowerCase() === c ? ' on' : ''}" style="--c:${c}" data-act="accent" data-c="${c}" aria-label="${c}"></button>`).join('') +
    `<label class="accent-dot custom${ACCENTS.includes(sk.accent.toLowerCase()) ? '' : ' on'}" style="--c:${sk.accent}" title="직접 고르기"><input type="color" data-k="skin.accent" aria-label="포인트 색 직접 고르기"></label>`;
  syncIn($('#skin-opts')); syncIn($('#accents')); paintIcons($('#skin-opts'));
}
function renderPhotoRow() {
  const u = imgURL(state.profile.photo), th = $('[data-drop-row="photo"] .thumb');
  th.style.backgroundImage = u ? `url("${u}")` : ''; th.innerHTML = u ? '' : icon('person');
  $('#photo-adj').hidden = !u;
  $('#photo-state').textContent = u ? '프로필 사진' : '사진 넣기';
  $('#photo-state').nextElementSibling.textContent = u ? '눌러서 바꾸거나 지워요' : '눌러서 파일이나 링크로 넣어요';
}

/* ---------- 값 ↔ 입력 칸 ---------- */
function showVal(el) {
  const v = parseFloat(el.value), out = el.closest('.row')?.querySelector('.val');
  el.style.setProperty('--p', ((v - parseFloat(el.min)) / (parseFloat(el.max) - parseFloat(el.min)) * 100) + '%');
  if (!out) return;
  const u = out.dataset.unit;
  out.textContent = u === '×' ? v.toFixed(2) + '×' : u === 'em' ? (v > 0 ? '+' : '') + v.toFixed(3) + 'em' : v + u;
}
function syncControl(el) {
  const v = getPath(state, el.dataset.k);
  if (el.type === 'checkbox') el.checked = !!v;
  else el.value = v ?? '';
  if (el.type === 'range') showVal(el);
  if (el.type === 'color') { const b = el.closest('.color-btn'); if (b) { $('.swatch i', b).style.background = el.value; $('.hex', b).textContent = el.value.toUpperCase(); } }
}
function syncSeg(seg) {
  const v = String(getPath(state, seg.dataset.seg));
  $$('button', seg).forEach((b) => b.classList.toggle('on', b.dataset.v === v));
}
function syncIn(root) { $$('[data-k]', root).forEach(syncControl); $$('[data-seg]', root).forEach(syncSeg); }
function fillForm() {
  syncIn($('#panel'));
  renderAbout(); renderGallery(); renderMenuList(); renderRatio(); renderSkin(); renderPhotoRow();
  setPane(curPane, false);
}

/* ---------- 되돌리기 ---------- */
let past = [], future = [], cur = '', histT = 0;
const snap = () => JSON.stringify(state);
function markHistory() {
  clearTimeout(histT);
  histT = setTimeout(() => {
    const s = snap(); if (s === cur) return;
    past.push(cur); if (past.length > 80) past.shift();
    future = []; cur = s; histBtns();
  }, 350);
}
function histBtns() { $('#btn-undo').disabled = !past.length; $('#btn-redo').disabled = !future.length; }
function restore(s) { cur = s; state = normalize(JSON.parse(s)); fillForm(); render(); histBtns(); clearTimeout(saveT); saveT = setTimeout(persist, 600); }
function undo() { clearTimeout(histT); const s = snap(); if (s !== cur) { past.push(cur); cur = s; } if (!past.length) return; future.push(cur); restore(past.pop()); }
function redo() { if (!future.length) return; past.push(cur); restore(future.pop()); }
$('#btn-undo').addEventListener('click', undo);
$('#btn-redo').addEventListener('click', redo);

/* ---------- 고칠 때마다 다시 그리기 + 자동 저장 ---------- */
let raf = 0, saveT = 0;
function schedule() {
  if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
  markHistory();
  clearTimeout(saveT);
  saveT = setTimeout(persist, 600);
}
function persist() {
  if (!loaded) return;
  dbSet('state', { state: JSON.parse(snap()), images: usedImages() }).catch(() => toast('자동 저장에 실패했어요. ‘작업 파일로 내보내기’로 보관해 주세요'));
}

const panel = $('#panel');
panel.addEventListener('input', (e) => {
  const t = e.target;
  if (!t.dataset.k) return;
  const v = t.type === 'checkbox' ? t.checked : t.type === 'range' ? parseFloat(t.value) : t.value;
  setPath(state, t.dataset.k, v);
  if (t.type === 'range' || t.type === 'color') syncControl(t);
  const k = t.dataset.k;
  if (/^gallery\.items\.\d+\.[xy]$/.test(k)) { const it = getPath(state, k.replace(/\.[xy]$/, '')); const th = t.closest('.gitem')?.querySelector('.gthumb'); if (th) th.style.backgroundPosition = `${it.x}% ${it.y}%`; }
  if (/^sections\.\d+\.on$/.test(k)) { t.closest('.mrow')?.classList.toggle('off', !v); renderAbout(); }
  if (/^sections\.\d+\.title$/.test(k)) renderAbout();
  if (k === 'skin.accent' || /^skin\.pat(Fg|Bg)$/.test(k)) { /* 고르는 중에는 패널을 다시 그리지 않음 */ }
  schedule();
});
panel.addEventListener('change', (e) => {
  const k = e.target.dataset.k;
  if (k === 'skin.accent' || /^skin\.(pat(Fg|Bg)|glassColor)$/.test(k || '')) renderSkin();
});
panel.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.dataset.addtag !== undefined && !e.isComposing) { e.preventDefault(); addTag(+e.target.dataset.addtag); }
});
function addTag(i) {
  const inp = $(`[data-addtag="${i}"]`); const v = inp.value.trim(); if (!v) return;
  state.sections[i].tags.push({ label: v, on: true, custom: true });
  renderAbout(); schedule(); $(`[data-addtag="${i}"]`)?.focus();
}
panel.addEventListener('click', (e) => {
  const segBtn = e.target.closest('[data-seg] button');
  if (segBtn) {
    const seg = segBtn.parentElement; let v = segBtn.dataset.v;
    if ('num' in seg.dataset) v = +v; else if ('bool' in seg.dataset) v = v === 'true';
    setPath(state, seg.dataset.seg, v);
    syncSeg(seg);
    if (/^skin\.(wall|gt|glass)$/.test(seg.dataset.seg)) renderSkin();
    if (seg.dataset.seg === 'gallery.caption') $('#cap-opts').hidden = v !== 'over';
    schedule(); return;
  }
  const pick = e.target.closest('[data-pick]');
  if (pick) { openPickMenu(pick.dataset.pick, pick); return; }
  const b = e.target.closest('[data-act]'); if (!b) return;
  const a = b.dataset.act, i = +b.dataset.i, j = +b.dataset.j;
  if (a === 'tag-del') { e.stopPropagation(); state.sections[i].tags.splice(j, 1); renderAbout(); }
  else if (a === 'tag') { const tg = state.sections[i].tags[j]; tg.on = !tg.on; b.classList.toggle('on', tg.on); b.setAttribute('aria-pressed', tg.on); }
  else if (a === 'tag-add') { addTag(i); return; }
  else if (a === 'dream') { const o = state.sections[i].opts; o[b.dataset.o] = !o[b.dataset.o]; b.classList.toggle('on', o[b.dataset.o]); b.setAttribute('aria-pressed', o[b.dataset.o]); }
  else if (a === 'up' || a === 'down' || a === 'del') {
    const list = b.dataset.list, arr = getPath(state, list);
    if (a === 'del') arr.splice(i, 1);
    else { const k = a === 'up' ? i - 1 : i + 1; if (k < 0 || k >= arr.length) return; [arr[i], arr[k]] = [arr[k], arr[i]]; }
    if (list === 'sections') { renderMenuList(); renderAbout(); } else renderGallery();
  }
  else if (a === 'img-link') { imageFromLink(b.dataset.target); return; }
  else if (a === 'g-add') { state.gallery.items.push(blankItem()); renderGallery(); }
  else if (a === 'sec-add') {
    const type = b.dataset.type;
    state.sections.push(type === 'tags' ? { id: uid(), type, title: '새 태그 메뉴', on: true, wide: true, custom: true, showAll: false, tags: [] } : { id: uid(), type, title: '새 메뉴', on: true, wide: true, custom: true, body: '' });
    renderMenuList(); renderAbout();
  }
  else if (a === 'ratio') {
    const r = RATIOS.find((x) => x[0] === b.dataset.r);
    state.layout.ratio = r[0]; if (r[1]) { state.layout.w = r[1]; state.layout.h = r[2]; }
    renderRatio();
  }
  else if (a === 'skin') { state.skin.type = b.dataset.s; renderSkin(); }
  else if (a === 'pattern') { state.skin.pattern = b.dataset.p; renderSkin(); }
  else if (a === 'glass') { state.skin.glass = b.dataset.g; renderSkin(); }
  else if (a === 'accent') { state.skin.accent = b.dataset.c; renderSkin(); }
  else if (a === 'photo-del') { state.profile.photo = null; renderPhotoRow(); }
  else if (a === 'bg-del') { state.skin.image = null; renderSkin(); }
  else return;
  schedule();
});
['#rw', '#rh'].forEach((id) => $(id).addEventListener('input', () => {
  const w = +$('#rw').value, h = +$('#rh').value;
  if (w > 0 && h > 0 && w / h <= 4 && h / w <= 4) { state.layout.w = w; state.layout.h = h; schedule(); }
}));

/* ---------- 글 서식 도구: 글 칸을 누르면 위에 뜸 ---------- */
const fmtBar = $('#fmtbar');
let fmtEl = null;
const isTextField = (el) => el && el.closest && el.closest('#panel') && el.tagName === 'TEXTAREA';
function placeFmt() {
  if (!fmtEl) return;
  const r = fmtEl.getBoundingClientRect(), pr = panel.getBoundingClientRect();
  if (r.bottom < pr.top + 10 || r.top > pr.bottom - 10) { fmtBar.hidden = true; return; }
  fmtBar.hidden = false;
  const bw = fmtBar.offsetWidth, bh = fmtBar.offsetHeight;
  let top = r.top - bh - 6;
  if (top < pr.top + 4) top = r.bottom + 6;
  fmtBar.style.top = Math.round(top) + 'px';
  fmtBar.style.left = Math.round(Math.max(8, Math.min(r.right - bw, innerWidth - bw - 8))) + 'px';
}
document.addEventListener('focusin', (e) => { if (isTextField(e.target)) { fmtEl = e.target; placeFmt(); } });
document.addEventListener('focusout', () => setTimeout(() => { if (!isTextField(document.activeElement) && !fmtBar.contains(document.activeElement)) { fmtEl = null; fmtBar.hidden = true; fmtColors.hidden = true; } }, 0));
panelScroll.addEventListener('scroll', placeFmt, { passive: true });
addEventListener('resize', placeFmt);
function wrapSel(el, mk) {
  const v = el.value, n = mk.length;
  let a = el.selectionStart, b = el.selectionEnd;
  while (a < b && /\s/.test(v[a])) a++; // 같이 잡힌 앞뒤 공백은 빼고 감쌈
  while (b > a && /\s/.test(v[b - 1])) b--;
  if (v.slice(a - n, a) === mk && v.slice(b, b + n) === mk) {
    el.value = v.slice(0, a - n) + v.slice(a, b) + v.slice(b + n);
    el.setSelectionRange(a - n, b - n);
  } else if (b - a > n * 2 - 1 && v.slice(a, a + n) === mk && v.slice(b - n, b) === mk) {
    el.value = v.slice(0, a) + v.slice(a + n, b - n) + v.slice(b);
    el.setSelectionRange(a, b - n * 2);
  } else {
    el.value = v.slice(0, a) + mk + v.slice(a, b) + mk + v.slice(b);
    el.setSelectionRange(a + n, b + n);
  }
  el.dispatchEvent(new Event('input', { bubbles: true }));
}
/* 글자 색: {{#색|글}} */
const fmtColors = $('#fmt-colors');
const TEXT_COLORS = ['#f04452', '#fe7e3a', '#ffb331', '#03b26c', '#18a5a5', '#3182f6', '#a234c7', '#f66c9b', '#8b95a1'];
fmtColors.insertAdjacentHTML('afterbegin', TEXT_COLORS.map((c) => `<button type="button" class="fc" style="--c:${c}" data-color="${c}" aria-label="${c}"></button>`).join(''));
let lastSel = null;
function colorSel(el, hex) {
  const v = el.value;
  let a = el.selectionStart, b = el.selectionEnd;
  while (a < b && /\s/.test(v[a])) a++;
  while (b > a && /\s/.test(v[b - 1])) b--;
  const pre = v.slice(0, a).match(/\{\{#[0-9a-fA-F]{3,8}\|$/);
  if (pre && v.slice(b, b + 2) === '}}') { // 이미 색이 있으면 바꾸거나 지움
    const s = a - pre[0].length, inner = v.slice(a, b), op = hex ? `{{${hex}|` : '';
    el.value = v.slice(0, s) + op + inner + (hex ? '}}' : '') + v.slice(b + 2);
    el.setSelectionRange(s + op.length, s + op.length + inner.length);
  } else {
    const inner = v.slice(a, b).replace(/\{\{#[0-9a-fA-F]{3,8}\||\}\}/g, '');
    if (hex && !inner) { toast('색을 바꿀 글자를 먼저 골라 주세요'); return; }
    const op = hex ? `{{${hex}|` : '';
    el.value = v.slice(0, a) + op + inner + (hex ? '}}' : '') + v.slice(b);
    el.setSelectionRange(a + op.length, a + op.length + inner.length);
  }
  el.dispatchEvent(new Event('input', { bubbles: true }));
}
fmtBar.addEventListener('mousedown', (e) => { if (e.target.tagName !== 'INPUT' && !e.target.closest('label')) e.preventDefault(); if (fmtEl) lastSel = { el: fmtEl, a: fmtEl.selectionStart, b: fmtEl.selectionEnd }; });
fmtBar.addEventListener('click', (e) => {
  const b = e.target.closest('[data-fmt]');
  if (b && fmtEl) { wrapSel(fmtEl, b.dataset.fmt); return; }
  if (e.target.closest('#fmt-color-btn')) { fmtColors.hidden = !fmtColors.hidden; placeFmt(); return; }
  const c = e.target.closest('[data-color]');
  if (c && fmtEl) { colorSel(fmtEl, c.dataset.color || ''); }
});
$('#fmt-custom').addEventListener('change', (e) => {
  if (!lastSel) return;
  const { el, a, b } = lastSel;
  el.focus(); el.setSelectionRange(a, b); fmtEl = el;
  colorSel(el, e.target.value);
});

/* =========================================================
   이미지 넣기: 고르기 · 끌어다 놓기 · 붙여넣기
   ========================================================= */
const fileImg = $('#file-img');
let pickTarget = '';
function pickImage(target) { pickTarget = target; fileImg.multiple = target.startsWith('g'); fileImg.value = ''; fileImg.click(); }
fileImg.addEventListener('change', () => { const fs = [...fileImg.files]; if (fs.length) putImages(pickTarget, fs); });

/* 사진 칸을 누르면: 파일에서 고르기 · 링크로 넣기 · 지우기 */
const pickMenu = $('#pickmenu');
let pickMenuTarget = '';
const hasImage = (t) => (t === 'photo' ? !!state.profile.photo : t === 'bg' ? !!state.skin.image : !!(state.gallery.items[+t.slice(1)] || {}).img);
function openPickMenu(target, anchor) {
  pickMenuTarget = target;
  const has = hasImage(target);
  pickMenu.innerHTML = `<button type="button" data-pm="file">${icon('image')}<span>${has ? '다른 파일로 바꾸기' : '파일에서 고르기'}${target.startsWith('g') ? '<small>여러 장을 고르면 다음 칸에 차례로 들어가요</small>' : ''}</span></button>
    <button type="button" data-pm="link">${icon('link')}<span>링크로 넣기</span></button>
    ${has ? `<div class="menu-sep"></div><button type="button" data-pm="del" class="danger">${icon('trash')}<span>사진 지우기</span></button>` : ''}`;
  pickMenu.hidden = false;
  const r = anchor.getBoundingClientRect(), mw = pickMenu.offsetWidth, mh = pickMenu.offsetHeight;
  let left = r.left, top = r.bottom + 8;
  if (top + mh > innerHeight - 8) top = Math.max(8, r.top - mh - 8);
  left = Math.max(8, Math.min(left, innerWidth - mw - 8));
  pickMenu.style.left = Math.round(left) + 'px'; pickMenu.style.top = Math.round(top) + 'px';
  pickMenu.querySelector('button').focus();
}
function closePickMenu() { pickMenu.hidden = true; }
pickMenu.addEventListener('click', (e) => {
  const b = e.target.closest('[data-pm]'); if (!b) return;
  const t = pickMenuTarget; closePickMenu();
  if (b.dataset.pm === 'file') pickImage(t);
  else if (b.dataset.pm === 'link') imageFromLink(t);
  else {
    if (t === 'photo') { state.profile.photo = null; renderPhotoRow(); }
    else if (t === 'bg') { state.skin.image = null; renderSkin(); }
    else { state.gallery.items[+t.slice(1)].img = null; renderGallery(); }
    schedule();
  }
});
document.addEventListener('pointerdown', (e) => { if (!pickMenu.hidden && !e.target.closest('#pickmenu')) closePickMenu(); }, true);
panelScroll.addEventListener('scroll', closePickMenu, { passive: true });
async function putImages(target, files) {
  files = files.filter((f) => f.type.startsWith('image/'));
  if (!files.length) return;
  try {
    if (target === 'photo') { state.profile.photo = await addImage(files[0], 1000); Object.assign(state.profile, { px: 50, py: 50, pz: 1 }); renderPhotoRow(); }
    else if (target === 'bg') { state.skin.image = await addImage(files[0], 2600); renderSkin(); }
    else {
      const items = state.gallery.items;
      let j = target === 'g-new' ? items.findIndex((it) => !it.img) : +target.slice(1);
      if (j < 0) j = items.length;
      let first = target !== 'g-new';
      for (const f of files) {
        if (!first) while (j < items.length && items[j].img) j++;
        first = false;
        if (j >= 6) { toast('캐릭터는 6개까지 넣을 수 있어요'); break; }
        if (!items[j]) items.push(blankItem());
        items[j].img = await addImage(f);
        Object.assign(items[j], { x: 50, y: 30, z: 1 });
        j++;
      }
      renderGallery();
    }
    schedule();
  } catch (err) { toast('이 이미지는 열 수 없어요. JPG나 PNG로 다시 시도해 주세요'); }
}
/* 링크로 넣기: 이미지 주소를 이미지 태그로 불러와 파일로 바꿈 */
async function imageFromLink(target) {
  const url = await askText('링크로 이미지 넣기', '이미지 주소를 붙여넣어 주세요. 이미지에서 오른쪽 클릭 → ‘이미지 주소 복사’로 가져올 수 있어요.', 'https://');
  if (url) loadImageURL(target, url.trim());
}
function viaImgTag(url) {
  return new Promise((res, rej) => {
    const im = new Image();
    im.crossOrigin = 'anonymous';
    im.referrerPolicy = 'no-referrer';
    im.onload = () => {
      try {
        const c = document.createElement('canvas');
        c.width = im.naturalWidth; c.height = im.naturalHeight;
        c.getContext('2d').drawImage(im, 0, 0);
        c.toBlob((b) => (b ? res(new File([b], 'link.png', { type: 'image/png' })) : rej()), 'image/png');
      } catch (e) { rej(e); }
    };
    im.onerror = rej;
    im.src = url;
  });
}
async function loadImageURL(target, url) {
  if (!/^https?:\/\//i.test(url)) { toast('http로 시작하는 이미지 주소를 넣어 주세요'); return; }
  toast('이미지를 가져오는 중…');
  let file = null;
  try { file = await viaImgTag(url); } catch (e) { /* 막힌 주소 */ }
  if (!file) { toast('이 주소는 사이트가 막아 둬서 가져올 수 없어요. 이미지를 저장해서 넣어 주세요'); return; }
  await putImages(target, [file]);
  toast('이미지를 넣었어요');
}
const linkTarget = () => (curPane === 'about' ? 'photo' : curPane === 'style' && state.skin.type === 'photo' ? 'bg' : 'g-new');
function dropTargetOf(e) {
  const r = e.target.closest && (e.target.closest('[data-drop-row]') || e.target.closest('#card [data-drop]'));
  if (!r) return null;
  return { el: r, target: r.dataset.dropRow || r.dataset.drop };
}
const dragKinds = (e) => [...e.dataTransfer.types];
document.addEventListener('dragover', (e) => {
  if (!dragKinds(e).some((t) => t === 'Files' || t === 'text/uri-list')) return;
  e.preventDefault();
  $$('.drop-on').forEach((x) => x.classList.remove('drop-on'));
  const d = dropTargetOf(e); if (d) (d.el.querySelector('.thumb, .gthumb') || d.el).classList.add('drop-on');
});
document.addEventListener('dragleave', (e) => { if (!e.relatedTarget) $$('.drop-on').forEach((x) => x.classList.remove('drop-on')); });
document.addEventListener('drop', (e) => {
  if (!dragKinds(e).some((t) => t === 'Files' || t === 'text/uri-list')) return;
  e.preventDefault();
  $$('.drop-on').forEach((x) => x.classList.remove('drop-on'));
  const d = dropTargetOf(e);
  const files = [...e.dataTransfer.files];
  if (!files.length) { const u = (e.dataTransfer.getData('text/uri-list') || '').split('\n').find((x) => /^https?:/i.test(x.trim())); if (u) loadImageURL(d ? d.target : linkTarget(), u.trim()); return; }
  if (d) putImages(d.target, files);
  else if (curPane === 'about') putImages('photo', files);
  else putImages('g-new', files);
});
document.addEventListener('paste', (e) => {
  if (e.target.closest && e.target.closest('input, textarea')) return;
  const files = [...(e.clipboardData?.files || [])].filter((f) => f.type.startsWith('image/'));
  if (!files.length) {
    const txt = (e.clipboardData?.getData('text') || '').trim();
    if (/^https?:\/\/\S+$/i.test(txt)) { e.preventDefault(); loadImageURL(linkTarget(), txt); }
    return;
  }
  e.preventDefault();
  putImages(curPane === 'about' ? 'photo' : curPane === 'style' && state.skin.type === 'photo' ? 'bg' : 'g-new', files);
});

/* =========================================================
   이미지로 저장 · 복사
   ========================================================= */
let exporterP = null;
function loadExporter() {
  if (typeof htmlToImage !== 'undefined') return Promise.resolve(true);
  if (!exporterP) {
    exporterP = new Promise((res) => {
      const sc = document.createElement('script');
      sc.src = 'lib/html-to-image.js';
      sc.onload = () => res(typeof htmlToImage !== 'undefined');
      sc.onerror = () => { exporterP = null; res(false); };
      document.head.append(sc);
    });
  }
  return exporterP;
}
(window.requestIdleCallback || ((f) => setTimeout(f, 1500)))(() => loadExporter(), { timeout: 4000 });

/* 쓰인 글꼴 중에서 카드에 실제로 있는 글자가 든 조각만 이미지에 넣음 */
const fontData = new Map();
function rangeHit(ur, codes) {
  if (!ur) return true;
  return ur.split(',').some((part) => {
    const m = part.trim().replace(/^U\+/i, '');
    let a, b;
    if (m.includes('?')) { a = parseInt(m.replace(/\?/g, '0'), 16); b = parseInt(m.replace(/\?/g, 'F'), 16); }
    else if (m.includes('-')) [a, b] = m.split('-').map((x) => parseInt(x, 16));
    else a = b = parseInt(m, 16);
    for (const c of codes) if (c >= a && c <= b) return true;
    return false;
  });
}
const toDataURL = (blob) => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsDataURL(blob); });
async function buildFontCSS() {
  const used = new Set([state.text.head, state.text.body, 'Pretendard']);
  const codes = new Set();
  for (const ch of card.textContent) codes.add(ch.codePointAt(0));
  const out = [], jobs = [];
  for (const sh of document.styleSheets) {
    if (!sh.href || !/fonts\.googleapis|pretendard/.test(sh.href)) continue;
    let rules; try { rules = sh.cssRules; } catch (e) { continue; }
    for (const r of rules) {
      if (!(r instanceof CSSFontFaceRule)) continue;
      const fam = r.style.getPropertyValue('font-family').replace(/['"]/g, '').trim();
      if (!used.has(fam)) continue;
      if (!rangeHit(r.style.getPropertyValue('unicode-range'), codes)) continue;
      const m = r.style.getPropertyValue('src').match(/url\(["']?([^"')]+)["']?\)/);
      if (!m) continue;
      const url = new URL(m[1], sh.href).href;
      jobs.push((async () => {
        try {
          if (!fontData.has(url)) fontData.set(url, await fetch(url).then((x) => x.blob()).then(toDataURL));
          out.push(r.cssText.replace(m[0], `url(${fontData.get(url)})`));
        } catch (e) { /* 못 받은 글꼴은 건너뜀 */ }
      })());
    }
  }
  await Promise.all(jobs);
  return out.join('\n');
}
const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
async function renderBlob() {
  if (!(await loadExporter())) throw new Error('exporter');
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  await document.fonts.ready;
  const opts = {
    pixelRatio: state.scale || 2,
    width: card.offsetWidth, height: card.offsetHeight,
    style: { transform: 'none', margin: '0' },
    fontEmbedCSS: await buildFontCSS(),
    cacheBust: false,
    filter: (n) => !(n.classList && n.classList.contains('ph-hint')), // 빈 칸 안내는 빼고 저장
  };
  card.classList.add('exporting');
  try {
    if (isSafari) await htmlToImage.toBlob(card, opts); // Safari 첫 렌더에서 이미지가 빠지는 문제 방지
    return await htmlToImage.toBlob(card, opts);
  } finally { card.classList.remove('exporting'); }
}
function fileBase() {
  const d = new Date();
  const date = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const title = (plain(state.profile.name).trim() || state.profile.handle.replace(/^@/, '').trim() || '메인트').replace(/[\\/:*?"<>|\n\r\t]+/g, ' ').trim().slice(0, 40);
  return `[메인트닝]${title}_${date}`;
}
function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
async function busy(btn, fn) { btn.disabled = true; try { await fn(); } finally { btn.disabled = false; } }
async function saveImage() {
  await busy($('#btn-save'), async () => {
    try {
      const blob = await renderBlob();
      const name = `${fileBase()}.png`;
      const file = new File([blob], name, { type: 'image/png' });
      const mobile = matchMedia('(hover: none) and (pointer: coarse)').matches;
      if (mobile && navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file] }); return; } catch (err) { if (err.name === 'AbortError') return; }
      }
      download(blob, name);
      toast('이미지를 저장했어요');
    } catch (err) {
      console.error(err);
      toast('저장하지 못했어요. 다시 시도해 주세요');
    }
  });
}
async function copyImage() {
  await busy($('#btn-copy'), async () => {
    try {
      if (!navigator.clipboard || !window.ClipboardItem) throw new Error('unsupported');
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': renderBlob() })]);
      toast('클립보드에 복사했어요');
    } catch (err) {
      console.error(err);
      toast(err.message === 'unsupported' ? '이 브라우저는 이미지 복사를 지원하지 않아요. 저장을 이용해 주세요' : '복사하지 못했어요. 다시 시도해 주세요');
    }
  });
}
$('#btn-save').addEventListener('click', saveImage);
$('#btn-copy').addEventListener('click', copyImage);
document.addEventListener('keydown', (e) => {
  const mod = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
  if (mod && k === 's') { e.preventDefault(); saveImage(); }
  if (mod && isTextField(e.target) && (k === 'b' || k === 'i' || k === 'u' || (k === 'h' && e.shiftKey))) {
    e.preventDefault(); wrapSel(e.target, k === 'b' ? '**' : k === 'i' ? '*' : k === 'u' ? '__' : '=='); return;
  }
  if (mod && (k === 'z' || k === 'y') && !(e.target.closest && e.target.closest('input, textarea, select'))) {
    e.preventDefault(); if (k === 'y' || e.shiftKey) redo(); else undo(); return;
  }
  if (e.key === 'Escape') { closeMenu(); closePickMenu(); if (isMobile()) app.classList.remove('sheet-open'); }
});

/* =========================================================
   더 보기 메뉴 · 확인 창 · 토스트
   ========================================================= */
const menu = $('#menu');
function closeMenu() { menu.hidden = true; $('#btn-more').setAttribute('aria-expanded', 'false'); }
$('#btn-more').addEventListener('click', (e) => {
  e.stopPropagation();
  menu.hidden = !menu.hidden;
  $('#btn-more').setAttribute('aria-expanded', String(!menu.hidden));
});
document.addEventListener('click', (e) => { if (!menu.hidden && !e.target.closest('.menu-wrap')) closeMenu(); });
menu.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  closeMenu();
  if (b.dataset.act === 'export-json') {
    download(new Blob([JSON.stringify({ app: 'maint-niniing', state, images: usedImages() })], { type: 'application/json' }), `${fileBase()}.json`);
    toast('작업 파일을 내보냈어요');
  } else if (b.dataset.act === 'reset') {
    if (!(await ask('처음부터 다시 만들까요?', '적은 내용과 이미지가 모두 지워져요. 스킨 · 글꼴 · 판형은 그대로예요.', '초기화', true))) return;
    const keep = { text: state.text, skin: { ...state.skin, image: null }, layout: state.layout, scale: state.scale };
    state = normalize({ ...keep }); IMG = {};
    fillForm(); schedule();
    toast('초기화했어요');
  }
});
$('#file-import').addEventListener('change', async (e) => {
  const f = e.target.files[0]; if (!f) return;
  closeMenu();
  try {
    const d = JSON.parse(await f.text());
    if (!d || !d.state) throw new Error('bad');
    IMG = d.images || {}; state = normalize(d.state);
    fillForm(); schedule(); toast('작업 파일을 불러왔어요');
  } catch (err) { toast('불러올 수 없는 파일이에요'); }
  e.target.value = '';
});
function askText(title, sub, ph = '') {
  return new Promise((res) => {
    const inp = $('#modal-input');
    inp.hidden = false; inp.value = ''; inp.placeholder = ph;
    ask(title, sub, '넣기').then((ok) => { inp.hidden = true; inp.onkeydown = null; res(ok ? inp.value : null); });
    setTimeout(() => inp.focus(), 0);
    inp.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); $('#modal-ok').click(); } if (e.key === 'Escape') $('#modal-cancel').click(); };
  });
}
function ask(title, sub, okLabel = '확인', danger = false) {
  return new Promise((res) => {
    const m = $('#modal'), ok = $('#modal-ok'), cancel = $('#modal-cancel');
    $('#modal-title').textContent = title;
    $('#modal-sub').textContent = sub;
    ok.textContent = okLabel;
    ok.className = 'btn ' + (danger ? 'btn-danger' : 'btn-primary');
    m.hidden = false; ok.focus();
    const done = (v) => { m.hidden = true; ok.onclick = cancel.onclick = m.onclick = null; res(v); };
    ok.onclick = () => done(true);
    cancel.onclick = () => done(false);
    m.onclick = (ev) => { if (ev.target === m) done(false); };
  });
}
let toastTimer = 0;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* =========================================================
   시작
   ========================================================= */
fillForm();
render();
dbGet('state')
  .then((d) => { if (d && d.state) { IMG = d.images || {}; state = normalize(d.state); fillForm(); render(); } })
  .catch(() => {})
  .finally(() => { loaded = true; cur = snap(); past = []; future = []; histBtns(); });
if (document.fonts) document.fonts.addEventListener('loadingdone', () => render());
})();
