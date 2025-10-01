// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerOffset = 70;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    closeMobileMenu();
}

// Navbar background change on scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Scroll animations
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const windowHeight = window.innerHeight;
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Add scroll animation classes to elements
function addScrollAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('scroll-animate');
        section.style.animationDelay = `${index * 0.1}s`;
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Particle system for background
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    particle.style.opacity = Math.random();
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles periodically
function startParticleSystem() {
    setInterval(createParticle, 300);
}

// Form handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you! Your message has been sent.', 'success');
    contactForm.reset();
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.5s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        default:
            notification.style.background = '#007bff';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Scroll progress bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) {
        // Create scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add stagger animation to child elements
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, options);
    
    // Observe elements
    document.querySelectorAll('.scroll-animate, .reveal').forEach(el => {
        observer.observe(el);
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Skills animation
function animateSkills() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('stagger-item');
    });
}

// Project cards hover effect
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    hamburger?.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => link.addEventListener('click', smoothScroll));
    contactForm?.addEventListener('submit', handleFormSubmit);
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateScrollProgress();
        updateActiveNavLink();
    });
    
    // Initialize components
    addScrollAnimations();
    setupIntersectionObserver();
    animateSkills();
    setupProjectCards();
    
    // Start particle system (optional - can be resource intensive)
    // startParticleSystem();
    
    // Add reveal class to sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    // Add stagger items class to relevant elements
    document.querySelectorAll('.skills-list .skill-tag').forEach(tag => {
        tag.classList.add('stagger-item');
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('stagger-item');
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Add CSS for notifications fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// Export functions for external use (if needed)
window.portfolioFunctions = {
    showNotification,
    toggleMobileMenu,
    smoothScroll
};