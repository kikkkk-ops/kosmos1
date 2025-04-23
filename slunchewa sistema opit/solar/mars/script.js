// Theme Toggle
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcons = document.querySelectorAll('.theme-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    themeIcons.forEach(icon => {
        icon.classList.toggle('active', 
            (savedTheme === 'light' && icon.classList.contains('fa-sun')) ||
            (savedTheme === 'dark' && icon.classList.contains('fa-moon'))
        );
    });
}

themeToggle.addEventListener('click', (e) => {
    if (e.target.classList.contains('theme-icon')) {
        const isLight = e.target.classList.contains('fa-sun');
        root.setAttribute('data-theme', isLight ? 'light' : 'dark');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        themeIcons.forEach(icon => {
            icon.classList.toggle('active', 
                (isLight && icon.classList.contains('fa-sun')) ||
                (!isLight && icon.classList.contains('fa-moon'))
            );
        });
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const sideNav = document.querySelector('.side-nav');

menuToggle.addEventListener('click', () => {
    sideNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Planet Model Controls
const planetControls = document.querySelectorAll('.planet-control');
const planet3D = document.querySelector('.planet-3d');

planetControls.forEach(control => {
    control.addEventListener('click', () => {
        planetControls.forEach(c => c.classList.remove('active'));
        control.classList.add('active');
        
        if (control.textContent === 'Вътрешен строеж') {
            planet3D.style.transform = 'translate(-50%, -50%) scale(0.8)';
            planet3D.style.background = 'radial-gradient(circle, #FF6B6B 0%, #E27B58 50%, #C1440E 100%)';
        } else {
            planet3D.style.transform = 'translate(-50%, -50%) scale(1)';
            planet3D.style.background = 'var(--primary-color)';
        }
    });
});

// Structure Layer Controls
const layerButtons = document.querySelectorAll('.layer-button');
const layers = document.querySelectorAll('.layer');
const layerDetails = document.querySelectorAll('.layer-detail');

layerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const layer = button.dataset.layer;
        
        layerButtons.forEach(btn => btn.classList.remove('active'));
        layers.forEach(l => l.classList.remove('active'));
        layerDetails.forEach(detail => detail.classList.remove('active'));
        
        button.classList.add('active');
        document.querySelector(`.layer.${layer}`).classList.add('active');
        document.querySelector(`.layer-detail[data-layer="${layer}"]`).classList.add('active');
    });
});

// Surface Feature Controls
const features = document.querySelectorAll('.feature');
const featureDetails = document.querySelectorAll('.feature-detail');

features.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
        const featureType = feature.classList[1];
        featureDetails.forEach(detail => {
            detail.classList.toggle('active', detail.dataset.feature === featureType);
        });
    });
});

// Orbit Animation
const mars = document.querySelector('.mars');
const marsOrbit = document.querySelector('.mars-orbit');

function updateOrbit() {
    const date = new Date();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    const progress = (seconds * 1000 + milliseconds) / 5000; // 5 seconds per orbit
    
    const angle = progress * 2 * Math.PI;
    const radius = 100;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    mars.style.transform = `translate(${x}px, ${y}px)`;
    marsOrbit.style.borderColor = `rgba(255, 255, 255, ${0.2 + Math.sin(angle) * 0.3})`;
    
    requestAnimationFrame(updateOrbit);
}

updateOrbit();

// Scroll Animation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.chapter-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
const glossarySearch = document.querySelector('.glossary-search-input');
const glossaryItems = document.querySelectorAll('.glossary-item');

function filterItems(searchTerm, items) {
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm.toLowerCase()) ? 'block' : 'none';
    });
}

searchInput.addEventListener('input', (e) => {
    filterItems(e.target.value, document.querySelectorAll('.info-box, .fact-card'));
});

glossarySearch.addEventListener('input', (e) => {
    filterItems(e.target.value, glossaryItems);
});

// Particles Animation
const particles = document.querySelectorAll('.particles, .particles2, .particles3');

particles.forEach(particle => {
    const speed = Math.random() * 2 + 1;
    particle.style.animationDuration = `${speed}s`;
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (sideNav.classList.contains('active')) {
                sideNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
}); 