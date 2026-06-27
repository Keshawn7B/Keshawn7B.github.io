window.__portfolioErrors = [];
window.addEventListener('error', event => {
  window.__portfolioErrors.push({ type: 'error', message: event.message, source: event.filename, line: event.lineno, column: event.colno });
});
window.addEventListener('unhandledrejection', event => {
  window.__portfolioErrors.push({ type: 'unhandledrejection', message: String(event.reason && (event.reason.message || event.reason)) });
});

const projects = [
  {
    title: 'LaunchPack — AI Promoter Prompt Builder',
    type: 'AI + Web Tool',
    tags: ['software', 'ai'],
    status: 'Shipped public demo',
    summary: 'A static tool that turns a rough product, game, service, or project idea into a copy-paste prompt kit for ChatGPT, Gemini, Claude, Grok, Copilot, or local models.',
    why: 'Shows product thinking, prompt-system design, privacy-conscious static deployment, and polished browser UX without exposing API keys.',
    links: [
      ['Live demo', 'https://keshawn7b.github.io/launchpack/'],
      ['Code', 'https://github.com/Keshawn7B/launchpack']
    ]
  },
  {
    title: 'Personal AI Automation System',
    type: 'AI Workflow / Systems',
    tags: ['software', 'ai'],
    status: 'Private system, public-safe summary',
    summary: 'A cross-platform assistant workflow for planning, coding support, automations, reminders, project work, and tool orchestration across local development and messaging channels.',
    why: 'Demonstrates systems thinking: tool access, memory boundaries, privacy guardrails, scheduled automation, and real execution instead of chatbot-only output.',
    links: [['GitHub profile', 'https://github.com/Keshawn7B']]
  },
  {
    title: 'Microcontroller for Autonomous Systems',
    type: 'Research / Embedded Systems',
    tags: ['embedded'],
    status: 'USC research profile',
    summary: 'Undergraduate research work connected to autonomous systems, Arduino systems, and circuit design through the University of South Carolina Ultrasonics group.',
    why: 'Adds hardware credibility and proves the portfolio is not limited to web pages — it connects code, electronics, and physical systems.',
    links: [['USC research profile', 'https://research.cec.sc.edu/banerjee/people/mr-keshawn-blakely']]
  },
  {
    title: 'Signal Garden',
    type: 'Creative Web Experience',
    tags: ['creative', 'software'],
    status: 'Shipped public demo',
    summary: 'An interactive mental-weather constellation site: part creative coding experiment, part mood interface, part polished web artifact.',
    why: 'Shows taste, interaction design, front-end polish, and willingness to build things that are memorable instead of generic.',
    links: [
      ['Live demo', 'https://keshawn7b.github.io/signal-garden/'],
      ['Code', 'https://github.com/Keshawn7B/signal-garden']
    ]
  },
  {
    title: 'Bio Hack Lab',
    type: 'Interactive Web Experiment',
    tags: ['software', 'creative'],
    status: 'Shipped public demo',
    summary: 'A browser-based interactive experiment around health, optimization, and futuristic lab-style UI concepts.',
    why: 'Demonstrates rapid prototyping, visual systems, and the ability to package an idea into something people can actually click through.',
    links: [
      ['Live demo', 'https://keshawn7b.github.io/bio-hack-lab/'],
      ['Code', 'https://github.com/Keshawn7B/bio-hack-lab']
    ]
  },
  {
    title: 'Student Scheduler UX Prototype',
    type: 'Coursework / Product Design',
    tags: ['software'],
    status: 'Archived coursework',
    summary: 'A student scheduling concept developed through problem statements, personas, storyboards, sketches, paper prototype, and a hi-fi prototype.',
    why: 'Useful as early evidence of product thinking: user pain, ideation, prototyping, and interface design before implementation polish.',
    links: [['Archive', 'Files/Student Scheduler Prototype-html (1)/preview.html']]
  },
  {
    title: 'Zero-Budget Roblox Action Game',
    type: 'Game / Systems Design',
    tags: ['creative', 'software'],
    status: 'In progress',
    summary: 'A Roblox action-game direction focused on fast dashes, parries, training rooms, boss encounters, and tight combat feel under zero-budget constraints.',
    why: 'Shows ambition, systems design, and a bias toward playable polish — useful for demonstrating iteration even before a finished release.',
    links: [['GitHub profile', 'https://github.com/Keshawn7B']]
  }
];

const grid = document.querySelector('#projectGrid');
const chips = [...document.querySelectorAll('.chip')];
const profileUrl = 'https://www.linkedin.com/in/keshawn-blakely';

function renderProjects(filter = 'all') {
  const visible = filter === 'all' ? projects : projects.filter(project => project.tags.includes(filter));
  grid.innerHTML = visible.map((project, index) => `
    <article class="project-card reveal" style="--delay:${index * 55}ms">
      <div class="project-orb" aria-hidden="true">${String(index + 1).padStart(2, '0')}</div>
      <div class="project-meta"><span>${project.type}</span><span>${project.status}</span></div>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <div class="why"><strong>Why it matters:</strong> ${project.why}</div>
      <div class="tag-row">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="project-links">${project.links.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`).join('')}</div>
    </article>
  `).join('');
  observeReveals();
}

chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  renderProjects(chip.dataset.filter);
}));

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#copyProfile')?.addEventListener('click', event => {
  const button = event.currentTarget;
  const showFallback = () => { button.textContent = profileUrl; };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(profileUrl)
      .then(() => { button.textContent = 'Copied LinkedIn link'; })
      .catch(showFallback)
      .finally(() => setTimeout(() => { button.textContent = 'Copy profile link'; }, 2200));
  } else {
    showFallback();
    setTimeout(() => { button.textContent = 'Copy profile link'; }, 3200);
  }
});

let observer;
function observeReveals() {
  const items = [...document.querySelectorAll('.reveal:not(.seen)')];
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('seen'));
    return;
  }
  observer ||= new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('seen');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

renderProjects();
observeReveals();
