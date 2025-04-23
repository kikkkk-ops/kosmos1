document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const root = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = document.querySelector('.fa-sun');
    const moonIcon = document.querySelector('.fa-moon');

    // Theme functions
    function setLightTheme() {
        root.setAttribute('data-theme', 'light');
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
        localStorage.setItem('theme', 'light');
    }

    function setDarkTheme() {
        root.setAttribute('data-theme', 'dark');
        moonIcon.classList.add('active');
        sunIcon.classList.remove('active');
        localStorage.setItem('theme', 'dark');
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setLightTheme();
    } else {
        setDarkTheme();
    }

    // Theme click handlers
    sunIcon.addEventListener('click', setLightTheme);
    moonIcon.addEventListener('click', setDarkTheme);

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const sideNav = document.querySelector('.side-nav');

    menuToggle.addEventListener('click', () => {
        sideNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Navigation Links
    const navLinks = document.querySelectorAll('.chapter-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideNav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Orbit Animation
    const jupiter = document.querySelector('.jupiter');
    const jupiterOrbit = document.querySelector('.jupiter-orbit');
    
    function setupOrbit() {
        const orbitSize = 300; // Fixed size for orbit
        const jupiterSize = 30; // Fixed size for Jupiter
        
        // Set up the orbit container
        jupiterOrbit.style.width = orbitSize + 'px';
        jupiterOrbit.style.height = orbitSize + 'px';
        
        // Set up Jupiter
        jupiter.style.width = jupiterSize + 'px';
        jupiter.style.height = jupiterSize + 'px';
        jupiter.style.top = -(jupiterSize / 2) + 'px';
        jupiter.style.left = '50%';
        jupiter.style.marginLeft = -(jupiterSize / 2) + 'px';
        jupiter.style.transformOrigin = `50% ${(orbitSize / 2) + (jupiterSize / 2)}px`;
    }

    setupOrbit();
    window.addEventListener('resize', setupOrbit);

    // Scroll Animation
    const sections = document.querySelectorAll('section');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.chapter-nav a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    const mainContent = document.querySelectorAll('section');
    const glossaryItems = document.querySelectorAll('.glossary-item');

    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        mainContent.forEach(section => {
            const text = section.textContent.toLowerCase();
            section.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
        
        glossaryItems.forEach(item => {
            const term = item.querySelector('h3')?.textContent.toLowerCase() || '';
            const definition = item.querySelector('p')?.textContent.toLowerCase() || '';
            item.style.display = term.includes(searchTerm) || definition.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Planet Model Controls
    const planetControls = document.querySelectorAll('.planet-control');
    const planet3D = document.querySelector('.planet-3d');

    planetControls.forEach(control => {
        control.addEventListener('click', () => {
            planetControls.forEach(c => c.classList.remove('active'));
            control.classList.add('active');
            
            if (control.textContent.includes('Външен')) {
                planet3D.style.transform = 'translate(-50%, -50%)';
                planet3D.style.background = 'radial-gradient(circle, var(--primary-color) 0%, var(--secondary-color) 100%)';
            } else {
                planet3D.style.transform = 'translate(-50%, -50%) scale(0.8)';
                planet3D.style.background = 'radial-gradient(circle, #E27B58 0%, #C1440E 30%, #8B2E0E 60%, #5A1E0E 100%)';
            }
        });
    });

    // Particles Animation
    const particles = document.querySelectorAll('.particles, .particles2, .particles3');
    particles.forEach(particle => {
        const speed = Math.random() * 2 + 1;
        particle.style.animationDuration = `${speed}s`;
    });
}); 