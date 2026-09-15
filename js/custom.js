const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-group').forEach((el) => observer.observe(el));

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('shadow-md');
  } else {
    header.classList.remove('shadow-md');
  }
});

// Mobile Nav Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
  const menuIcon = mobileMenuBtn.querySelector('i');

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    menuIcon.classList.toggle('fa-bars', !isOpen);
    menuIcon.classList.toggle('fa-xmark', isOpen);
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMobileMenu();
  });
}

// Review Slider
const reviewTrack = document.querySelector('.review-slider-track');
if (reviewTrack) {
  const slides = reviewTrack.querySelectorAll('.review-slide');
  const dots = document.querySelectorAll('.review-dot');
  const prevBtn = document.querySelector('.review-prev');
  const nextBtn = document.querySelector('.review-next');
  let current = 0;
  let autoplay;

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    reviewTrack.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function startAutoplay() {
    autoplay = setInterval(() => goToSlide(current + 1), 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(current - 1);
    resetAutoplay();
  });
  nextBtn.addEventListener('click', () => {
    goToSlide(current + 1);
    resetAutoplay();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoplay();
    });
  });

  goToSlide(0);
  startAutoplay();
}

// Quick Enquiry Modal
const popupOverlay = document.getElementById('popupModal');
if (popupOverlay) {
  const popupClose = document.getElementById('popupClose');
  const popupDismiss = document.getElementById('popupDismiss');

  function openPopup() {
    if (sessionStorage.getItem('popupDismissed')) return;
    popupOverlay.classList.add('is-open');
    popupOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popupOverlay.classList.remove('is-open');
    popupOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    sessionStorage.setItem('popupDismissed', 'true');
  }

  setTimeout(openPopup, 5000);

  popupClose.addEventListener('click', closePopup);
  popupDismiss.addEventListener('click', closePopup);
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) closePopup();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOverlay.classList.contains('is-open')) closePopup();
  });
}
