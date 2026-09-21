const details = document.querySelector('#detalle');
document.querySelector('#openButton').addEventListener('click', () => {
  details.scrollIntoView({ behavior: 'smooth' });
  flowers(18);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function flowers(total = 28) {
  const icons = ['🌻', '🌼', '💛', '✨'];
  for (let i = 0; i < total; i++) {
    const petal = document.createElement('span');
    petal.className = 'floating';
    petal.textContent = icons[Math.floor(Math.random() * icons.length)];
    petal.style.setProperty('--left', `${Math.random() * 96}%`);
    petal.style.setProperty('--size', `${1.1 + Math.random() * 1.8}rem`);
    petal.style.setProperty('--duration', `${4 + Math.random() * 4}s`);
    petal.style.animationDelay = `${Math.random() * 1.2}s`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 9500);
  }
}

document.querySelector('#replayButton').addEventListener('click', () => flowers(36));
setTimeout(() => flowers(12), 700);
