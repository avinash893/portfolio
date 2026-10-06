/**
 * AVINASH SHAH — BESPOKE EDITORIAL PORTFOLIO INTERACTIONS
 * Live Clock, Interactive Project Filtering, Minimal Clipboard Toast, & Nav Active State
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Live Running IST Clock ---
  const clockEl = document.getElementById('liveClock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    // Indian Standard Time (UTC+05:30)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
    clockEl.textContent = `${timeString} IST (UTC+05:30)`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // --- 2. Interactive Project Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectSpreads = document.querySelectorAll('.project-spread');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectSpreads.forEach(spread => {
        const category = spread.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          spread.classList.remove('hidden');
        } else {
          spread.classList.add('hidden');
        }
      });
    });
  });

  // --- 3. Copy Email to Clipboard ---
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  const emailText = 'avinash.1kshah@gmail.com';

  function triggerToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText)
          .then(() => triggerToast('COPIED: avinash.1kshah@gmail.com'))
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
      triggerToast('COPIED: ' + text);
    } catch (err) {
      triggerToast('MANUAL COPY: ' + text);
    }
    document.body.removeChild(area);
  }

  // --- 4. Section Active Spy on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-anchor');

  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 180;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(a => {
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
});
