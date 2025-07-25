// Responsive mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  navToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Optional: close menu on mobile after click
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Insert Webex chat widget into #live-chat-container
  (function loadWebexWidget() {
    const container = document.getElementById('live-chat-container');
    if (!container) return;
    const chatDiv = document.createElement('div');
    chatDiv.id = 'divicw';
    chatDiv.setAttribute('data-bind', 'A0993777-C0CF-4DE8-BF2D-57859A20A5A7');
    chatDiv.setAttribute('data-org', '');
    container.appendChild(chatDiv);

    const scriptUrl = 'https://attachments.apac2.webexengage.com/widget/js/imichatinit.js';
    try {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 0) {
            container.insertAdjacentHTML('beforeend', '<div style="color:#C5001A">Live chat is not supported by your browser.</div>');
            return;
          }
          const script = document.createElement('script');
          script.innerHTML = xhr.responseText;
          chatDiv.parentNode.insertBefore(script, chatDiv.nextSibling);
        }
      };
      xhr.open('GET', scriptUrl, true);
      xhr.send();
    } catch (err) {
      console.error(err);
      container.insertAdjacentHTML('beforeend', '<div style="color:#C5001A">Live chat failed to load.</div>');
    }
  })();
});
