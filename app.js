/**
 * Avinash Shah — Portfolio Interactions
 * Typing animation, copy-to-clipboard toast, and smooth scroll navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Typing Animation ---
  const roles = [
    'Full-Stack Web Developer',
    'Real-Time WebRTC Systems',
    'C++ & OpenGL Graphics Developer',
    'Distributed Systems & Microservices',
    'Game Developer (Unity & C#)'
  ];

  const typingEl = document.getElementById('typingRole');
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    if (!typingEl) return;
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      typingEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1600; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Pause before next
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // --- 2. Copy Email Functionality & Toast ---
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  const userEmail = 'avinash.1kshah@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(userEmail).then(() => {
        showToast('✓ Email copied to clipboard: ' + userEmail);
      }).catch(() => {
        const dummy = document.createElement('textarea');
        dummy.value = userEmail;
        document.body.appendChild(dummy);
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        showToast('✓ Email copied: ' + userEmail);
      });
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- 3. Navigation Active State on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navItem) navItem.classList.add('active');
      } else {
        if (navItem) navItem.classList.remove('active');
      }
    });
  });
});
