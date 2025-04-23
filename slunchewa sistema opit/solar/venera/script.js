document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcons = document.querySelectorAll('.theme-icon');
    const root = document.documentElement;

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

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeIcons.forEach(icon => {
            icon.classList.toggle('active', 
                (newTheme === 'light' && icon.classList.contains('fa-sun')) ||
                (newTheme === 'dark' && icon.classList.contains('fa-moon'))
            );
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
                planet3D.style.transform = 'translate(-50%, -50%) rotateY(0deg)';
            } else {
                planet3D.style.transform = 'translate(-50%, -50%) rotateY(180deg)';
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
            
            layerButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            layers.forEach(l => {
                if (l.classList.contains(layer)) {
                    l.classList.add('active');
                } else {
                    l.classList.remove('active');
                }
            });
            
            layerDetails.forEach(detail => {
                if (detail.dataset.layer === layer) {
                    detail.classList.add('active');
                } else {
                    detail.classList.remove('active');
                }
            });
        });
    });

    // Atmosphere Visualization
    const atmosphereLayers = document.querySelectorAll('.cloud-layer');
    const atmosphereDetails = document.querySelectorAll('.atmosphere-detail');

    atmosphereLayers.forEach((layer, index) => {
        layer.addEventListener('mouseenter', () => {
            atmosphereDetails.forEach(detail => detail.classList.remove('active'));
            atmosphereDetails[index].classList.add('active');
        });
    });

    // Orbit Animation
    const venus = document.querySelector('.venus');
    let angle = 0;

    function animateOrbit() {
        angle += 0.5;
        const x = Math.cos(angle * Math.PI / 180) * 100;
        const y = Math.sin(angle * Math.PI / 180) * 100;
        venus.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        requestAnimationFrame(animateOrbit);
    }

    animateOrbit();

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
            if (text.includes(searchTerm.toLowerCase())) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
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
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let speedX = (Math.random() - 0.5) * 0.5;
        let speedY = (Math.random() - 0.5) * 0.5;
        
        function animate() {
            x += speedX;
            y += speedY;
            
            if (x < 0 || x > window.innerWidth) speedX *= -1;
            if (y < 0 || y > window.innerHeight) speedY *= -1;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(animate);
        }
        
        animate();
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
                
                // Close mobile menu if open
                if (sideNav.classList.contains('active')) {
                    sideNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
});