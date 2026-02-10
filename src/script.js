// Navbar scroll effect
const header = document.getElementById("main-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 80);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const icon = this.querySelector('i');
    
    // Toggle icon between menu and close
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('bi-list');
      icon.classList.add('bi-x');
    } else {
      icon.classList.remove('bi-x');
      icon.classList.add('bi-list');
    }
  });

  // Close menu when clicking on a link
  const menuLinks = navLinks.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('bi-x');
      icon.classList.add('bi-list');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-wrapper')) {
      navLinks.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('bi-x');
      icon.classList.add('bi-list');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    this.reset();
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .service-item, .proceso-step, .beneficio-card, .testimonio-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (element.dataset.suffix || '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (element.dataset.suffix || '');
    }
  }, 16);
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const statNumber = entry.target.querySelector('.stat-number');
      const targetValue = parseInt(statNumber.textContent);
      statNumber.dataset.suffix = statNumber.textContent.replace(/[0-9]/g, '');
      animateCounter(statNumber, targetValue);
      entry.target.dataset.animated = 'true';
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(stat => {
  statsObserver.observe(stat);
});

// Responsive background image optimization
function updateHeroBackground() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const width = window.innerWidth;
  
  if (width <= 768) {
    // Mobile: imagen más pequeña
    hero.style.backgroundImage = "linear-gradient(rgba(15, 15, 15, 0.8), rgba(15, 15, 15, 0.8)), url('./img/hero-mobile.webp')";
  } else if (width <= 1200) {
    // Tablet: imagen mediana
    hero.style.backgroundImage = "linear-gradient(rgba(15, 15, 15, 0.75), rgba(15, 15, 15, 0.75)), url('./img/hero-tablet.webp')";
  } else {
    // Desktop: imagen completa
    hero.style.backgroundImage = "linear-gradient(rgba(15, 15, 15, 0.75), rgba(15, 15, 15, 0.75)), url('./img/hero-desktop.webp')";
  }
}

// Ejecutar al cargar
updateHeroBackground();

// Ejecutar al redimensionar (con debounce para performance)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateHeroBackground, 250);
});