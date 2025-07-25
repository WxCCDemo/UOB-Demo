// Smooth scroll for internal navigation links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
});

// Optional: focus state accessibility improvement for keyboard navigation
document.addEventListener('keyup', function (e) {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
  }
});
