// DOM Elements
const header = document.getElementById('header');
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('a[href^="#"]');
const chevronDown = document.querySelector('.chevron-down');

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
  
  // Toggle hamburger animation
  const bars = mobileMenuButton.querySelectorAll('div');
  if (bars.length >= 3) {
    bars[0].classList.toggle('transform');
    bars[0].classList.toggle('rotate-45');
    bars[0].classList.toggle('translate-y-2');
    
    bars[1].classList.toggle('opacity-0');
    
    bars[2].classList.toggle('transform');
    bars[2].classList.toggle('-rotate-45');
    bars[2].classList.toggle('-translate-y-2');
  }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navHeight = header ? header.offsetHeight : 0;
      window.scrollTo({
        top: targetElement.offsetTop - navHeight,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    if (mobileNav && mobileNav.classList.contains('active')) {
      mobileNav.classList.remove('active');
      
      // Reset hamburger
      const bars = mobileMenuButton.querySelectorAll('div');
      if (bars.length >= 3) {
        bars[0].classList.remove('transform', 'rotate-45', 'translate-y-2');
        bars[1].classList.remove('opacity-0');
        bars[2].classList.remove('transform', '-rotate-45', '-translate-y-2');
      }
    }
  });
});

// Chevron down click
if (chevronDown) {
  chevronDown.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const navHeight = header ? header.offsetHeight : 0;
      window.scrollTo({
        top: aboutSection.offsetTop - navHeight,
        behavior: 'smooth'
      });
    }
  });
}

// Scroll event for header style change and active link
window.addEventListener('scroll', () => {
  // Header background change on scroll
  if (header) {
    if (window.scrollY > 10) {
      header.classList.remove('py-4');
      header.classList.add('py-2');
    } else {
      header.classList.remove('py-2');
      header.classList.add('py-4');
    }
  }
  
  // Check which section is in view
  const scrollPosition = window.scrollY + 100;
  
  // Get all sections
  const sections = ['home', 'about', 'magazine', 'faculty', 'footer'];
  
  // Find which section is in view
  const currentSection = sections.find(section => {
    const element = document.getElementById(section);
    if (!element) return false;
    
    const top = element.offsetTop;
    const height = element.clientHeight;
    
    return scrollPosition >= top && scrollPosition < top + height;
  });
  
  // Update active link
  if (currentSection) {
    navLinks.forEach(link => {
      // Remove the active class first
      link.classList.remove('text-glow-pink');
      
      // Add active class if this link points to the current section
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('text-glow-pink');
      }
    });
  }
});

// Scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-show');
        }
      });
    }, { threshold: 0.1 });
    
    const hiddenElements = document.querySelectorAll('.fade-hidden');
    hiddenElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const hiddenElements = document.querySelectorAll('.fade-hidden');
    hiddenElements.forEach(el => el.classList.add('fade-show'));
  }
});