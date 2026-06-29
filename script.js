const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));

const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenu = () => {
  mobileNav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
};
menuButton?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  document.body.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'Đóng' : 'Menu';
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const tabs = document.querySelectorAll('.stack-tab');
const panels = document.querySelectorAll('.skill-cloud');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-selected', 'false');
    });
    panels.forEach((panel) => panel.classList.remove('is-visible'));
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    document.querySelector(`[data-panel="${tab.dataset.stack}"]`)?.classList.add('is-visible');
  });
});

const cursor = document.querySelector('.cursor-dot');
if (matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add('is-visible');
  });
  document.querySelectorAll('a, button, .project-card, .pipeline article').forEach((item) => {
    item.addEventListener('mouseenter', () => cursor.classList.add('is-large'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('is-large'));
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
