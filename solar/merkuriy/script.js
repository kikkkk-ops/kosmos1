// Theme Toggle
const themeIcons = document.querySelectorAll('.theme-icon');
const root = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    themeIcons.forEach(icon => {
        icon.classList.remove('active');
        if ((savedTheme === 'light' && icon.classList.contains('fa-sun')) ||
            (savedTheme === 'dark' && icon.classList.contains('fa-moon'))) {
            icon.classList.add('active');
        }
    });
} else {
    // Default to dark theme
    root.setAttribute('data-theme', 'dark');
    document.querySelector('.fa-moon').classList.add('active');
}

themeIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const newTheme = icon.classList.contains('fa-sun') ? 'light' : 'dark';
        
        // Update theme
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update active icon
        themeIcons.forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
    });
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
        
        if (control.textContent === 'Външен вид') {
            planet3D.style.transform = 'translate(-50%, -50%) rotateY(0)';
        } else {
            planet3D.style.transform = 'translate(-50%, -50%) rotateY(180deg)';
        }
    });
});

// Structure Diagram Layers
const layerButtons = document.querySelectorAll('.layer-button');
const layers = document.querySelectorAll('.layer');
const layerDetails = document.querySelectorAll('.layer-detail');

layerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const layerType = button.dataset.layer;
        
        layerButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        
        layers.forEach(layer => {
            if (layer.classList.contains(layerType)) {
                layer.classList.add('active');
            } else {
                layer.classList.remove('active');
            }
        });
        
        layerDetails.forEach(detail => {
            if (detail.dataset.layer === layerType) {
                detail.classList.add('active');
            } else {
                detail.classList.remove('active');
            }
        });
    });
});

// Surface Features
const features = document.querySelectorAll('.feature');
const featureDetails = document.querySelectorAll('.feature-detail');

features.forEach(feature => {
    feature.addEventListener('click', () => {
        const featureType = feature.classList[1];
        
        featureDetails.forEach(detail => {
            if (detail.dataset.feature === featureType) {
                detail.classList.add('active');
            } else {
                detail.classList.remove('active');
            }
        });
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation
const sections = document.querySelectorAll('.section');

function checkScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
checkScroll();

// Glossary Search
const glossarySearch = document.querySelector('.glossary-search-input');
const glossaryItems = document.querySelectorAll('.glossary-item');

glossarySearch.addEventListener('input', () => {
    const searchTerm = glossarySearch.value.toLowerCase();
    
    glossaryItems.forEach(item => {
        const term = item.querySelector('h3').textContent.toLowerCase();
        const definition = item.querySelector('p').textContent.toLowerCase();
        
        if (term.includes(searchTerm) || definition.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Particle Background Animation
const particles = document.querySelectorAll('.particles, .particles2, .particles3');

function animateParticles() {
    particles.forEach(particle => {
        const speed = Math.random() * 2 + 1;
        const direction = Math.random() * 360;
        const x = Math.cos(direction) * speed;
        const y = Math.sin(direction) * speed;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Planet Rotation
function rotatePlanet() {
    const planet = document.querySelector('.hero-planet');
    let rotation = 0;
    
    setInterval(() => {
        rotation += 0.1;
        planet.style.transform = `rotate(${rotation}deg)`;
    }, 50);
}

rotatePlanet();

// Orbit Animation
const mercury = document.querySelector('.mercury');
let orbitAngle = 0;

function animateOrbit() {
    orbitAngle += 0.5;
    const radius = 100;
    const x = Math.cos(orbitAngle * Math.PI / 180) * radius;
    const y = Math.sin(orbitAngle * Math.PI / 180) * radius;
    
    mercury.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animateOrbit);
}

animateOrbit();

// Glitch Effect
const glitch = document.querySelector('.glitch');

function createGlitch() {
    const text = glitch.textContent;
    const glitchText = document.createElement('span');
    glitchText.className = 'glitch-text';
    glitchText.textContent = text;
    glitch.appendChild(glitchText);
    
    setInterval(() => {
        if (Math.random() > 0.9) {
            glitchText.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            glitchText.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else {
            glitchText.style.transform = 'translate(0, 0)';
            glitchText.style.color = 'inherit';
        }
    }, 50);
}

createGlitch();

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .info-box, .fact-card').forEach(element => {
    observer.observe(element);
}); 