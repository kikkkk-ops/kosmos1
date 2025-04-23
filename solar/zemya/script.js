// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcons = document.querySelectorAll('.theme-icon');
const body = document.body;

function toggleTheme() {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    themeIcons.forEach(icon => {
        icon.classList.toggle('active', 
            (isLight && icon.classList.contains('fa-sun')) || 
            (!isLight && icon.classList.contains('fa-moon'))
        );
    });
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleTheme);

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeIcons.forEach(icon => {
        icon.classList.toggle('active', 
            icon.classList.contains('fa-sun')
        );
    });
}

// Navigation
const menuToggle = document.querySelector('.menu-toggle');
const sideNav = document.querySelector('.side-nav');
const navLinks = document.querySelectorAll('.chapter-nav a');

function toggleNav() {
    sideNav.classList.toggle('open');
}

menuToggle.addEventListener('click', toggleNav);

// Close nav when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 && 
        !sideNav.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        sideNav.classList.contains('open')) {
        toggleNav();
    }
});

// Smooth scroll and active nav link
function setActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);
setActiveNavLink();

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
checkReveal();

// Earth Model Controls
const earthViewControls = document.querySelectorAll('.sun-control');
const earth3DModel = document.querySelector('.sun-3d');

earthViewControls.forEach(control => {
    control.addEventListener('click', () => {
        earthViewControls.forEach(c => c.classList.remove('active'));
        control.classList.add('active');
        
        const view = control.getAttribute('data-view');
        earth3DModel.style.transform = `rotateX(${view === 'top' ? '0deg' : view === 'side' ? '90deg' : '45deg'})`;
    });
});

// Structure Layer Controls
const layerButtons = document.querySelectorAll('.layer-button');
const layerDetails = document.querySelectorAll('.layer-detail');
const layers = document.querySelectorAll('.layer');

layerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const layerId = button.getAttribute('data-layer');
        
        layerButtons.forEach(b => b.classList.remove('active'));
        layerDetails.forEach(d => d.classList.remove('active'));
        layers.forEach(l => l.style.opacity = '0.5');
        
        button.classList.add('active');
        document.querySelector(`.layer-detail[data-layer="${layerId}"]`).classList.add('active');
        document.querySelector(`.layer.${layerId}`).style.opacity = '1';
    });
});

// Atmosphere Layer Controls
const atmosphereLayers = document.querySelectorAll('.atmosphere-layer');
const atmosphereDetails = document.querySelectorAll('.atmosphere-detail');

atmosphereLayers.forEach(layer => {
    layer.addEventListener('mouseenter', () => {
        const layerType = layer.classList[1];
        atmosphereDetails.forEach(detail => {
            if (detail.getAttribute('data-layer') === layerType) {
                detail.style.opacity = '1';
            }
        });
    });
    
    layer.addEventListener('mouseleave', () => {
        atmosphereDetails.forEach(detail => {
            detail.style.opacity = '0.6';
        });
    });
});

// Life Cycle Controls
const lifecycleControls = document.querySelectorAll('.lifecycle-control');
const lifecycleStages = document.querySelectorAll('.lifecycle-stage');
const lifecycleDetails = document.querySelectorAll('.lifecycle-detail');

lifecycleControls.forEach(control => {
    control.addEventListener('click', () => {
        const stage = control.getAttribute('data-stage');
        
        // Remove active class from all controls and stages
        lifecycleControls.forEach(c => c.classList.remove('active'));
        lifecycleStages.forEach(s => s.classList.remove('active'));
        lifecycleDetails.forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked control
        control.classList.add('active');
        
        // Show corresponding stage and detail
        document.querySelector(`.lifecycle-stage[data-stage="${stage}"]`).classList.add('active');
        document.querySelector(`.lifecycle-detail[data-stage="${stage}"]`).classList.add('active');
    });
});

// Climate Cycle Controls
const cycleControls = document.querySelectorAll('.cycle-control');
const cycleStages = document.querySelectorAll('.cycle-stage');
const cycleDetails = document.querySelectorAll('.cycle-detail');

cycleControls.forEach(control => {
    control.addEventListener('click', () => {
        const stage = control.getAttribute('data-stage');
        
        cycleControls.forEach(c => c.classList.remove('active'));
        cycleStages.forEach(s => s.classList.remove('active'));
        cycleDetails.forEach(d => d.classList.remove('active'));
        
        control.classList.add('active');
        document.querySelector(`.cycle-stage[data-stage="${stage}"]`).classList.add('active');
        document.querySelector(`.cycle-detail[data-stage="${stage}"]`).classList.add('active');
    });
});

// Search Functionality
const searchInput = document.querySelector('.search-bar input[type="text"]');
const searchButton = document.querySelector('.search-btn');

function performSearch() {
    const query = searchInput.value.toLowerCase();
    const glossaryItems = document.querySelectorAll('.glossary-item');
    let found = false;
    
    glossaryItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const content = item.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query) || content.includes(query)) {
            item.style.display = 'block';
            found = true;
        } else {
            item.style.display = 'none';
        }
    });
    
    if (!found) {
        // Show no results message
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'Няма намерени резултати';
        document.querySelector('.glossary-items').appendChild(noResults);
    }
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Glossary Search
const glossarySearch = document.querySelector('.glossary-search-input');
const glossaryItems = document.querySelectorAll('.glossary-item');

glossarySearch.addEventListener('input', () => {
    const query = glossarySearch.value.toLowerCase();
    
    glossaryItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const content = item.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query) || content.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Earth-Sun System Animation
const earthSphere = document.querySelector('.earth-sphere');
const earthAtmosphere = document.querySelector('.atmosphere');
const earthMagnetosphere = document.querySelector('.magnetosphere');

function animateEarthSystem() {
    let rotation = 0;
    setInterval(() => {
        rotation += 0.5;
        earthSphere.style.transform = `rotate(${rotation}deg)`;
        earthAtmosphere.style.transform = `rotate(${rotation * 0.8}deg)`;
        earthMagnetosphere.style.transform = `translateX(-20%) rotate(${rotation * 0.3}deg)`;
    }, 50);
}

animateEarthSystem();

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', () => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = tooltipText;
        document.body.appendChild(tooltipElement);
        
        const rect = tooltip.getBoundingClientRect();
        tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`;
        tooltipElement.style.left = `${rect.left + (rect.width - tooltipElement.offsetWidth) / 2}px`;
    });
    
    tooltip.addEventListener('mouseleave', () => {
        document.querySelector('.tooltip').remove();
    });
});

// Add CSS for tooltips
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    .tooltip {
        position: fixed;
        background-color: var(--card-bg);
        color: var(--text-color);
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.9rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        pointer-events: none;
    }
`;
document.head.appendChild(tooltipStyle);