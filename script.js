const details = document.querySelector('#detalle');
const music = document.querySelector('#backgroundMusic');
const musicToggle = document.querySelector('#musicToggle');
const pageThread = document.querySelector('.page-thread-line');

music.volume = .42;
const startMusic = () => music.play()
  .then(() => musicToggle.classList.remove('paused'))
  .catch(() => musicToggle.classList.add('paused'));
startMusic();
document.addEventListener('pointerdown', startMusic, { once: true });

document.querySelector('#openButton').addEventListener('click', () => {
  startMusic();
  details.scrollIntoView({ behavior: 'smooth' });
  flowers(18);
});

musicToggle.addEventListener('click', () => {
  if (music.paused) startMusic();
  else {
    music.pause();
    musicToggle.classList.add('paused');
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function flowers(total = 28) {
  const icons = ['💛', '✨'];
  for (let i = 0; i < total; i++) {
    const naturalFlower = Math.random() > .35;
    const petal = document.createElement(naturalFlower ? 'img' : 'span');
    petal.className = `floating${naturalFlower ? ' floating-flower' : ''}`;
    if (naturalFlower) {
      petal.src = 'sunflowers-real.png';
      petal.alt = '';
    } else petal.textContent = icons[Math.floor(Math.random() * icons.length)];
    petal.style.setProperty('--left', `${Math.random() * 96}%`);
    petal.style.setProperty('--size', naturalFlower ? `${42 + Math.random() * 48}px` : `${1.1 + Math.random() * 1.8}rem`);
    petal.style.setProperty('--duration', `${4 + Math.random() * 4}s`);
    petal.style.animationDelay = `${Math.random() * 1.2}s`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 9500);
  }
}

document.querySelector('#replayButton').addEventListener('click', () => flowers(36));
setTimeout(() => flowers(12), 700);

document.querySelectorAll('.reason-card').forEach(card => {
  card.addEventListener('click', () => {
    const isOpen = card.classList.toggle('open');
    card.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) flowers(5);
  });
});

const secretDialog = document.querySelector('#secretDialog');
document.querySelector('#secretButton').addEventListener('click', () => {
  secretDialog.showModal();
  flowers(14);
});
document.querySelector('#dialogClose').addEventListener('click', () => secretDialog.close());
secretDialog.addEventListener('click', event => {
  if (event.target === secretDialog) secretDialog.close();
});

const drawPageThread = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const rawProgress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 1;
  const progress = .02 + rawProgress * .98;
  pageThread.style.strokeDashoffset = String(1 - progress);
};
drawPageThread();
addEventListener('scroll', drawPageThread, { passive: true });
addEventListener('resize', drawPageThread);
