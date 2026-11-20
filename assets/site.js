/* Health Care General Hospital — shared config, logo, header & footer.
   Load right after the Tailwind CDN script on every page. */

const SITE = {
  name: 'Health Care',
  sub: 'General Hospital',
  phone: '01234567890',            // every number on the site uses this
  email: 'info@yourhospital.com',  // TODO: real email
  address: '[Hospital Address], Dhaka', // TODO: real address
};

window.tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: '#13B3A9', dark: '#0B7F78', deep: '#086A64', tint: '#E8F8F6', soft: '#C9EFEB' },
        navy: { DEFAULT: '#136DA9', dark: '#0E5585', tint: '#EAF3FA' },
        ink: { DEFAULT: '#1D2D3E', soft: '#556B82', mute: '#6A7F94' },
        canvas: '#F5F7F8',
        line: { DEFAULT: '#D9DEE3', soft: '#E8ECEF' },
        neg: { DEFAULT: '#AA0808', tint: '#FFEAF0' },
        crit: { DEFAULT: '#B44F00', tint: '#FEF7F0' },
        pos: { DEFAULT: '#256F3A', tint: '#F1FDF6' },
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: { field: '4px', btn: '8px', card: '12px' },
      boxShadow: {
        card: '0 0 0 1px rgba(0,0,0,.06), 0 2px 8px rgba(0,0,0,.08)',
        pop: '0 0 0 1px rgba(34,54,73,.12), 0 10px 30px rgba(34,54,73,.18)',
      },
    },
  },
};

/* ---------- Fonts + logo styles ---------- */
document.head.insertAdjacentHTML('beforeend', `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
  html{scroll-behavior:smooth}
  body{font-family:Manrope,system-ui,sans-serif}
  :focus-visible{outline:2px solid #136DA9;outline-offset:2px}
  .grid>*{min-width:0}
  input:not([type=checkbox]):not([type=radio]),select,textarea{width:100%;min-width:0}
  img,svg{max-width:100%}

  /* Interactive logo */
  .hc-logo{--draw:1.1s;display:inline-flex;align-items:center;gap:.75rem;cursor:pointer;-webkit-tap-highlight-color:transparent}
  .hc-mark{overflow:visible}
  .hc-heart{stroke-dasharray:1;stroke-dashoffset:1;animation:hc-draw var(--draw) cubic-bezier(.65,0,.35,1) .1s forwards}
  .hc-cross-pop{transform-box:fill-box;transform-origin:center;transform:scale(0) rotate(-90deg);animation:hc-pop .55s cubic-bezier(.34,1.56,.64,1) calc(var(--draw) - .15s) forwards}
  .hc-pulse{transform-box:fill-box;transform-origin:center;opacity:0}
  .hc-word{display:flex;flex-direction:column;line-height:1}
  .hc-word b{font-family:Montserrat,sans-serif;font-weight:800;color:#13B3A9;letter-spacing:.01em}
  .hc-word span{color:#136DA9;font-weight:600;letter-spacing:.06em;margin-top:.2em}
  .hc-word b,.hc-word span{opacity:0;transform:translateX(-6px);animation:hc-in .5s ease-out forwards}
  .hc-word b{animation-delay:.5s}.hc-word span{animation-delay:.7s}

  .hc-logo:hover .hc-heart-g,.hc-logo:focus-visible .hc-heart-g{animation:hc-beat 1s ease-in-out infinite}
  .hc-logo:hover .hc-cross,.hc-logo:focus-visible .hc-cross{transform:rotate(90deg)}
  .hc-cross{transform-box:fill-box;transform-origin:center;transition:transform .45s cubic-bezier(.34,1.56,.64,1)}
  .hc-logo.is-clicked .hc-pulse{animation:hc-ring .8s ease-out}
  .hc-heart-g{transform-box:fill-box;transform-origin:center}

  .hc-logo--light .hc-word b,.hc-logo--light .hc-word span{color:#fff}
  .hc-logo--light .hc-heart{stroke:#fff}

  @keyframes hc-draw{to{stroke-dashoffset:0}}
  @keyframes hc-pop{to{transform:scale(1) rotate(0)}}
  @keyframes hc-in{to{opacity:1;transform:none}}
  @keyframes hc-beat{0%,40%,100%{transform:scale(1)}15%{transform:scale(1.08)}28%{transform:scale(.97)}}
  @keyframes hc-ring{0%{opacity:.5;transform:scale(.6)}100%{opacity:0;transform:scale(1.6)}}

  /* ECG line under hero logo */
  .hc-ecg path{stroke-dasharray:1;stroke-dashoffset:1;animation:hc-draw 2.4s linear 1.2s infinite}

  @media (prefers-reduced-motion:reduce){
    *{animation:none!important;transition:none!important}
    .hc-heart{stroke-dashoffset:0}.hc-cross-pop,.hc-cross{transform:none}
    .hc-word b,.hc-word span{opacity:1;transform:none}
    .hc-ecg path{stroke-dashoffset:0}
  }
</style>`);

/* ---------- Logo (SVG recreated from the brand sheet) ---------- */
function hcMark(size = 44, light = false) {
  const cross = light ? '#FFFFFF' : '#136DA9';
  return `<svg class="hc-mark" width="${size}" height="${size}" viewBox="0 0 200 200" aria-hidden="true">
    <circle class="hc-pulse" cx="100" cy="100" r="92" fill="none" stroke="#13B3A9" stroke-width="6"/>
    <g class="hc-heart-g">
      <path class="hc-heart" pathLength="1" fill="none" stroke="#13B3A9" stroke-width="28" stroke-linejoin="miter"
        d="M44 95 V63 A43 43 0 0 1 130 63 V72 H145 A36 42.5 0 0 1 145 157 H105"/>
    </g>
    <g class="hc-cross-pop"><path class="hc-cross" fill="${cross}" d="M30 117h28v26h26v28H58v26H30v-26H4v-28h26z"/></g>
  </svg>`;
}
function hcLogo({ size = 44, light = false, href = 'index.html', textSize = 'text-xl' } = {}) {
  return `<a href="${href}" class="hc-logo ${light ? 'hc-logo--light' : ''}" aria-label="${SITE.name} ${SITE.sub} — home">
    ${hcMark(size, light)}
    <span class="hc-word"><b class="${textSize}">HEALTH CARE</b><span class="text-[0.7rem] sm:text-xs">General Hospital</span></span>
  </a>`;
}

/* Restart the draw animation + pulse ring on click/tap (navigates after a beat) */
document.addEventListener('click', (e) => {
  const logo = e.target.closest('.hc-logo');
  if (!logo) return;
  logo.classList.remove('is-clicked'); void logo.offsetWidth; logo.classList.add('is-clicked');
  const replay = (sel) => logo.querySelectorAll(sel).forEach((el) => { el.style.animation = 'none'; void el.getBoundingClientRect(); el.style.animation = ''; });
  replay('.hc-heart'); replay('.hc-cross-pop');
  const here = location.pathname.split('/').pop() || 'index.html';
  if (logo.getAttribute('href') === here) e.preventDefault();
});

/* ---------- Icons ---------- */
const ICON = {
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  pulse: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  amb: '<rect x="1" y="7" width="15" height="10" rx="1"/><path d="M16 10h4l3 3v4h-7M8 10v4M6 12h4"/><circle cx="5.5" cy="18" r="1.5"/><circle cx="18.5" cy="18" r="1.5"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
const icon = (name, size = 18, cls = '') => `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="miter" aria-hidden="true">${ICON[name]}</svg>`;

/* ---------- Header ---------- */
const NAV = [
  { label: 'Home', href: 'index.html' },
  { label: 'About Us', href: 'about.html' },
  { label: 'Departments', href: 'departments.html' },
  { label: 'Doctors', href: 'doctors.html' },
  { label: 'Medical Tests', children: [
    { label: 'Test Price & Package List', href: 'test-prices.html' },
    { label: 'Dengue Test', href: 'dengue-test.html' },
  ]},
  { label: 'Resources', children: [
    { label: 'Patient Tools', href: 'tools.html' },
    { label: 'Health Blog', href: 'blog.html' },
  ]},
  { label: 'Contact', href: 'contact.html' },
];

function renderHeader() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const active = (h) => h === here;
  const desktop = NAV.map((n) => n.children
    ? `<div class="relative group">
        <button class="flex items-center gap-1 px-3 py-2 rounded-btn hover:bg-teal-tint font-semibold ${n.children.some((c) => active(c.href)) ? 'text-teal-dark' : ''}" aria-haspopup="true">${n.label}${icon('chev', 16)}</button>
        <div class="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block">
          <div class="w-64 bg-white rounded-card shadow-pop p-2">
            ${n.children.map((c) => `<a href="${c.href}" class="block px-3 py-2.5 rounded-btn hover:bg-teal-tint ${active(c.href) ? 'text-teal-dark font-bold' : ''}">${c.label}</a>`).join('')}
          </div>
        </div>
      </div>`
    : `<a href="${n.href}" class="px-3 py-2 rounded-btn hover:bg-teal-tint font-semibold ${active(n.href) ? 'text-teal-dark' : ''}" ${active(n.href) ? 'aria-current="page"' : ''}>${n.label}</a>`).join('');

  const mobile = NAV.flatMap((n) => n.children ? n.children : [n])
    .map((n) => `<a href="${n.href}" class="px-3 py-3 rounded-btn hover:bg-teal-tint font-semibold ${active(n.href) ? 'text-teal-dark' : ''}">${n.label}</a>`).join('');

  const tel = `tel:${SITE.phone}`;
  document.getElementById('site-header').outerHTML = `
  <div class="bg-navy text-white text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
      <p class="hidden md:block text-white/85">${SITE.address}</p>
      <div class="flex flex-wrap gap-x-5 gap-y-1">
        <a href="${tel}" class="hover:underline">Hotline <b>${SITE.phone}</b></a>
        <a href="${tel}" class="hover:underline">Ambulance <b>${SITE.phone}</b></a>
        <a href="${tel}" class="hover:underline">Emergency <b class="text-[#FFD0D0]">${SITE.phone}</b></a>
      </div>
    </div>
  </div>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-line-soft">
    <div class="max-w-7xl mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between gap-6">
      ${hcLogo({ size: 46 })}
      <nav class="hidden lg:flex items-center gap-1" aria-label="Main">${desktop}</nav>
      <div class="flex items-center gap-2">
        <a href="index.html#appointment" class="hidden sm:inline-flex items-center h-11 px-5 rounded-btn bg-teal-dark text-white font-bold hover:bg-teal-deep transition-colors">Book Appointment</a>
        <button id="menuBtn" class="lg:hidden grid place-items-center w-11 h-11 rounded-btn hover:bg-teal-tint" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">${icon('menu', 22)}</button>
      </div>
    </div>
    <nav id="mobileNav" class="hidden lg:hidden border-t border-line-soft bg-white" aria-label="Mobile">
      <div class="px-4 py-3 grid gap-1">${mobile}
        <a href="index.html#appointment" class="mt-2 text-center px-3 py-3 rounded-btn bg-teal-dark text-white font-bold">Book Appointment</a>
      </div>
    </nav>
  </header>`;

  const btn = document.getElementById('menuBtn'), nav = document.getElementById('mobileNav');
  btn.addEventListener('click', () => btn.setAttribute('aria-expanded', !nav.classList.toggle('hidden')));
}

/* ---------- Footer ---------- */
function renderFooter() {
  const tel = `tel:${SITE.phone}`;
  document.getElementById('site-footer').outerHTML = `
  <footer class="bg-[#0C3F63] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        ${hcLogo({ size: 50, light: true })}
        <p class="mt-4 text-white/75">Advanced, affordable care for every family — 24 hours a day.</p>
      </div>
      <div>
        <h2 class="font-display font-bold">Contact</h2>
        <ul class="mt-3 grid gap-2 text-white/85">
          <li>Hotline: <a href="${tel}" class="hover:text-white underline-offset-2 hover:underline">${SITE.phone}</a></li>
          <li>Ambulance: <a href="${tel}" class="hover:text-white underline-offset-2 hover:underline">${SITE.phone}</a></li>
          <li>Emergency: <a href="${tel}" class="hover:text-white underline-offset-2 hover:underline">${SITE.phone}</a></li>
          <li>WhatsApp: <a href="https://wa.me/88${SITE.phone}" class="hover:text-white underline-offset-2 hover:underline">${SITE.phone}</a></li>
          <li><a href="mailto:${SITE.email}" class="hover:text-white underline-offset-2 hover:underline">${SITE.email}</a></li>
          <li>${SITE.address}</li>
        </ul>
      </div>
      <div>
        <h2 class="font-display font-bold">Explore</h2>
        <ul class="mt-3 grid gap-2 text-white/85">
          <li><a href="departments.html" class="hover:text-white hover:underline">Departments</a></li>
          <li><a href="doctors.html" class="hover:text-white hover:underline">Find a Doctor</a></li>
          <li><a href="test-prices.html" class="hover:text-white hover:underline">Test Price &amp; Packages</a></li>
          <li><a href="dengue-test.html" class="hover:text-white hover:underline">Dengue Test</a></li>
          <li><a href="tools.html" class="hover:text-white hover:underline">Patient Tools</a></li>
          <li><a href="blog.html" class="hover:text-white hover:underline">Health Blog</a></li>
        </ul>
      </div>
      <div>
        <h2 class="font-display font-bold">Quick Links</h2>
        <ul class="mt-3 grid gap-2 text-white/85">
          <li><a href="about.html" class="hover:text-white hover:underline">About Us</a></li>
          <li><a href="contact.html" class="hover:text-white hover:underline">Contact &amp; Branches</a></li>
          <li><a href="contact.html#faq" class="hover:text-white hover:underline">FAQ</a></li>
          <li><a href="#" class="hover:text-white hover:underline">Terms and Conditions</a></li>
          <li><a href="#" class="hover:text-white hover:underline">Refund Policy</a></li>
          <li><a href="#" class="hover:text-white hover:underline">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10">
      <p class="max-w-7xl mx-auto px-4 sm:px-8 py-5 text-xs text-white/65">© ${new Date().getFullYear()} Health Care General Hospital. All rights reserved.</p>
    </div>
  </footer>
  <a href="tel:${SITE.phone}" class="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 inline-flex items-center justify-center gap-2 w-14 h-14 sm:w-auto sm:h-12 sm:px-5 rounded-full bg-neg text-white font-bold shadow-pop hover:brightness-110" aria-label="Call emergency ${SITE.phone}">
    ${icon('pulse', 22)}<span class="hidden sm:inline">Emergency</span>
  </a>`;
}

document.addEventListener('DOMContentLoaded', () => { renderHeader(); renderFooter(); });
