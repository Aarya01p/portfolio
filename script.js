/**
 * Aarya Patel — Portfolio Scripts
 * Minimalist, snappy interactive behaviors: theme, mobile nav, copy DOI, contact feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const currentTheme = localStorage.getItem('theme_preference') || 'dark';
  root.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = root.getAttribute('data-theme');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme_preference', nextTheme);
    });
  }

  // 2. Mobile Menu Navigation
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close on navigation click
    navMenu.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // 4. Copy Document ID / DOI
  const copyBtn = document.getElementById('copy-doi-btn');
  const doiValue = document.getElementById('doi-val');

  if (copyBtn && doiValue) {
    copyBtn.addEventListener('click', () => {
      const text = doiValue.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
        showToast(`Document ID ${text} copied to clipboard`);

        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
        }, 2000);
      });
    });
  }

  // 5. Contact Form Submission Feedback
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Message Sent';
        showToast(`Thank you, ${name}. Your message has been sent.`);
        contactForm.reset();

        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
        }, 3000);
      }, 700);
    });
  }

  // 6. Toast Notification Helper
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');

    if (toast && toastText) {
      toastText.textContent = msg;
      toast.classList.add('visible');

      setTimeout(() => {
        toast.classList.remove('visible');
      }, 3500);
    }
  }

  // 7. Footer Current Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
