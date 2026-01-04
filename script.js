/**
 * Prompt Stack Landing Page Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navLinks) {
          navLinks.classList.remove('active');
          mobileMenuBtn?.classList.remove('active');
        }
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.step-card, .stack-card, .model-card, .faq-item, .comparison-col'
  );

  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // Nav background on scroll
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Typing animation for terminal demo
  const terminalLines = document.querySelectorAll('.terminal-line.output');

  if (terminalLines.length > 0) {
    const terminalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateTerminal();
          terminalObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
      terminalObserver.observe(terminalWindow);
    }
  }

  function animateTerminal() {
    terminalLines.forEach((line, index) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(10px)';

      setTimeout(() => {
        line.style.transition = 'opacity 0.3s, transform 0.3s';
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, 500 + (index * 400));
    });
  }

  // Preview window tilt on mouse move
  const previewWindow = document.querySelector('.preview-window');

  if (previewWindow) {
    const heroPreview = document.querySelector('.hero-preview');

    heroPreview?.addEventListener('mousemove', (e) => {
      const rect = heroPreview.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 50;
      const rotateY = (centerX - x) / 50;

      previewWindow.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroPreview?.addEventListener('mouseleave', () => {
      previewWindow.style.transform = 'rotateX(2deg) rotateY(0deg)';
    });
  }

  

  // Console easter egg
  console.log(`
  ⚡ Prompt Stack
  ─────────────────────
  Vibe code on your own computer.

  Interested in how this works?
  Check out: https://github.com/prompt-stack
  `);
});

// Download button tracking (placeholder for analytics)
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Track download clicks
    console.log('Download clicked');

    // Add visual feedback
    btn.style.transform = 'scale(0.98)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 150);
  });
});
