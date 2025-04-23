// DOM Elements
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const sideNav = document.querySelector('.side-nav');
const searchInput = document.querySelector('.search-bar input');
const glossarySearchInput = document.querySelector('.glossary-search-input');
const navLinks = document.querySelectorAll('.chapter-nav a');
const sections = document.querySelectorAll('.section');

// Theme Management
const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    document.querySelectorAll('.theme-icon').forEach(icon => {
        icon.classList.toggle('active');
    });
};

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
    if (savedTheme === 'light') {
        document.querySelectorAll('.theme-icon').forEach(icon => {
            icon.classList.toggle('active');
        });
    }
}

// Mobile Menu
const toggleMenu = () => {
    sideNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
};

// Search Functionality
const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        const shouldShow = text.includes(searchTerm);
        section.style.display = shouldShow ? 'block' : 'none';
    });
};

const handleGlossarySearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const glossaryItems = document.querySelectorAll('.glossary-item');
    glossaryItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const shouldShow = text.includes(searchTerm);
        item.style.display = shouldShow ? 'block' : 'none';
    });
};

// Scroll Animation
const handleScroll = () => {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.chapter-nav a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
};

// Particles Animation
const createParticle = () => {
    const particles = document.querySelector('.particles-container');
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const duration = Math.random() * 3 + 2;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.animation = `float ${duration}s linear infinite`;
    
    particles.appendChild(particle);
    
    setTimeout(() => {
        particles.removeChild(particle);
    }, duration * 1000);
};

// Timeline Animation
const animateTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
};

// Smooth Scrolling
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
    });
};

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
menuToggle.addEventListener('click', toggleMenu);
searchInput.addEventListener('input', handleSearch);
glossarySearchInput?.addEventListener('input', handleGlossarySearch);
window.addEventListener('scroll', handleScroll);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        smoothScroll(targetId);
        if (window.innerWidth < 1024) {
            toggleMenu();
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Create particles
    setInterval(createParticle, 200);

    // Initialize timeline animation
    animateTimeline();

    // Initialize active section highlighting
    handleScroll();
}); 