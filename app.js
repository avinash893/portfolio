/**
 * Avinash Shah — Portfolio Interactions
 * Email clipboard copy & Scroll spy active navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Copy Email to Clipboard
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastBox');
  const emailText = 'avinash.1kshah@gmail.com';

  function triggerToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText)
          .then(() => triggerToast('✓ Copied: ' + emailText))
          .catch(() => fallbackCopy(emailText));
      } else {
        fallbackCopy(emailText);
      }
    });
  }

  function fallbackCopy(text) {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
      triggerToast('✓ Copied: ' + text);
    } catch (err) {
      triggerToast('Email: ' + text);
    }
    document.body.removeChild(area);
  }

  // 2. Active Navigation Spy on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 140;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
});
