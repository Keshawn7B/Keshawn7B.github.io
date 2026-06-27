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
    tags: ['software', 'ai', 'react'],
    status: 'Shipped public demo',
    summary: 'I built this because a lot of good ideas die before they get explained well. LaunchPack helps someone turn a rough product, game, service, or project idea into a stronger prompt kit for modern AI tools — with the kind of UI flow that could grow naturally into a React app.',
    why: 'It reflects how I like to build: practical, privacy-conscious, easy to try, and focused on helping someone move from stuck to started.',
    links: [
      ['Live demo', 'https://keshawn7b.github.io/launchpack/'],
      ['Code', 'https://github.com/Keshawn7B/launchpack']
    ]
  },
  {
    title: 'Personal AI Automation System',
    type: 'AI Workflow / Systems',
    tags: ['software', 'ai', 'react'],
    status: 'Private system, public-safe summary',
    summary: 'A real assistant workflow I use for planning, coding support, reminders, project work, and tool orchestration across local development and messaging channels. The interesting part is not just AI — it is the product surface, boundaries, state, and human workflow around it.',
    why: 'This is where my interest in AI becomes concrete: boundaries, privacy, execution, automation, and making tools actually fit into daily life.',
    links: [['GitHub profile', 'https://github.com/Keshawn7B']]
  },
  {
    title: 'Microcontroller for Autonomous Systems',
    type: 'Research / Embedded Systems',
    tags: ['embedded'],
    status: 'USC research profile',
    summary: 'Undergraduate research work connected to autonomous systems, Arduino systems, and circuit design through the University of South Carolina Ultrasonics group.',
    why: 'I like that this work touches the physical world. It connects code to circuits, signals, constraints, and the kind of engineering you can measure.',
    links: [['USC research profile', 'https://research.cec.sc.edu/banerjee/people/mr-keshawn-blakely']]
  },
  {
    title: 'Signal Garden',
    type: 'Creative Web Experience',
    tags: ['creative', 'software', 'react'],
    status: 'Shipped public demo',
    summary: 'A small interactive “mental weather” constellation. It is part creative coding experiment, part mood interface, and part excuse to make a web page feel less ordinary.',
    why: 'This is the kind of project that shows taste. Not everything useful has to look corporate; sometimes the memorable detail is the point.',
    links: [
      ['Live demo', 'https://keshawn7b.github.io/signal-garden/'],
      ['Code', 'https://github.com/Keshawn7B/signal-garden']
    ]
  },
  {
    title: 'Bio Hack Lab',
    type: 'Interactive Web Experiment',
    tags: ['software', 'creative', 'react'],
    status: 'Shipped public demo',
    summary: 'A browser-based experiment around health, optimization, and futuristic lab-style UI concepts — mostly built to explore how a strong interface can make an idea feel alive.',
    why: 'It shows rapid prototyping and visual direction: taking a loose concept and packaging it into something people can click through.',
    links: [
      ['Live demo', 'https://keshawn7b.github.io/bio-hack-lab/'],
      ['Code', 'https://github.com/Keshawn7B/bio-hack-lab']
    ]
  },
  {
    title: 'Student Scheduler UX Prototype',
    type: 'Coursework / Product Design',
    tags: ['software', 'react'],
    status: 'Archived coursework',
    summary: 'An older student scheduling concept built through problem statements, personas, storyboards, sketches, a paper prototype, and a hi-fi prototype.',
    why: 'I keep this here because it shows the early version of a habit I still care about: understanding people before jumping into implementation.',
    links: [['Archive', 'Files/Student Scheduler Prototype-html (1)/preview.html']]
  },
  {
    title: 'Zero-Budget Roblox Action Game',
    type: 'Game / Systems Design',
    tags: ['creative', 'software', 'react'],
    status: 'In progress',
    summary: 'A Roblox action-game direction focused on fast dashes, parries, training rooms, boss encounters, and tight combat feel under zero-budget constraints.',
    why: 'Games are unforgiving in a useful way: if the timing feels bad, players know immediately. That makes this a fun space to practice systems, feel, and iteration.',
    links: [['GitHub profile', 'https://github.com/Keshawn7B']]
  }
];

const grid = document.querySelector('#projectGrid');
const chips = [...document.querySelectorAll('.chip')];
const profileUrl = 'https://www.linkedin.com/in/keshawn-blakely';
const tagLabels = { react: 'react-ready' };

function renderProjects(filter = 'all') {
  const visible = filter === 'all' ? projects : projects.filter(project => project.tags.includes(filter));
  grid.innerHTML = visible.map((project, index) => `
    <article class="project-card reveal" style="--delay:${index * 55}ms">
      <div class="project-orb" aria-hidden="true">${String(index + 1).padStart(2, '0')}</div>
      <div class="project-meta"><span>${project.type}</span><span>${project.status}</span></div>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <div class="why"><strong>Why it matters:</strong> ${project.why}</div>
      <div class="tag-row">${project.tags.map(tag => `<span>${tagLabels[tag] || tag}</span>`).join('')}</div>
      <div class="project-links">${project.links.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`).join('')}</div>
    </article>
  `).join('');
  observeReveals();
}

chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => {
    c.classList.remove('active');
    c.setAttribute('aria-pressed', 'false');
  });
  chip.classList.add('active');
  chip.setAttribute('aria-pressed', 'true');
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


const componentPills = [...document.querySelectorAll('.component-pill')];
const componentDetail = document.querySelector('#componentDetail');
componentPills.forEach(pill => pill.addEventListener('click', () => {
  componentPills.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-pressed', 'false');
  });
  pill.classList.add('active');
  pill.setAttribute('aria-pressed', 'true');
  if (componentDetail) {
    componentDetail.textContent = pill.dataset.detail;
  }
}));
