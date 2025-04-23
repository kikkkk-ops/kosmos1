document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');
    const body = document.body;

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        lightIcon.classList.toggle('active');
        darkIcon.classList.toggle('active');
    });

    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sideNav = document.querySelector('.side-nav');

    menuToggle.addEventListener('click', function() {
        sideNav.classList.toggle('open');
    });

    // Close side nav when clicking outside
    document.addEventListener('click', function(event) {
        if (!sideNav.contains(event.target) && !menuToggle.contains(event.target) && sideNav.classList.contains('open')) {
            sideNav.classList.remove('open');
        }
    });

    // Navigation active state
    const navLinks = document.querySelectorAll('.chapter-nav a');
    const sections = document.querySelectorAll('section');

    // Update active navigation link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Sun structure interactive layer buttons
    const layerButtons = document.querySelectorAll('.layer-button');
    const layerDetails = document.querySelectorAll('.layer-detail');

    layerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const layer = button.getAttribute('data-layer');
            
            // Update active button
            layerButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Update active layer detail
            layerDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            document.getElementById(`${layer}-detail`).classList.add('active');
        });
    });

    // Solar cycle interactive controls
    const cycleControls = document.querySelectorAll('.cycle-control');
    const cycleDetails = document.querySelectorAll('.cycle-detail');
    const cycleStages = document.querySelectorAll('.cycle-stage');

    cycleControls.forEach(control => {
        control.addEventListener('click', () => {
            const stage = control.getAttribute('data-stage');
            
            // Update active control
            cycleControls.forEach(ctrl => {
                ctrl.classList.remove('active');
            });
            control.classList.add('active');
            
            // Update active cycle stage
            cycleStages.forEach(s => {
                s.classList.remove('active');
            });
            document.querySelector(`.cycle-stage.${stage}`).classList.add('active');
            
            // Update active cycle detail
            cycleDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            document.getElementById(`${stage}-info`).classList.add('active');
        });
    });

    // Lifecycle stage interactive controls
    const lifecycleControls = document.querySelectorAll('.lifecycle-control');
    const lifecycleStages = document.querySelectorAll('.lifecycle-stage');

    lifecycleControls.forEach(control => {
        control.addEventListener('click', () => {
            const stage = control.getAttribute('data-stage');
            
            // Update active control
            lifecycleControls.forEach(ctrl => {
                ctrl.classList.remove('active');
            });
            control.classList.add('active');
            
            // Update active lifecycle stage
            lifecycleStages.forEach(s => {
                s.classList.remove('active');
            });
            document.querySelector(`.lifecycle-stage.${stage}`).classList.add('active');
        });
    });

    // Sun model view controls
    const sunControls = document.querySelectorAll('.sun-control');
    const sunModel = document.querySelector('.sun-3d');

    sunControls.forEach(control => {
        control.addEventListener('click', () => {
            const view = control.getAttribute('data-view');
            
            // Update active control
            sunControls.forEach(ctrl => {
                ctrl.classList.remove('active');
            });
            control.classList.add('active');
            
            // Change sun model appearance based on selected view
            switch(view) {
                case 'surface':
                    sunModel.style.background = 'radial-gradient(circle, #fff700, #ffcc00, #ff9900)';
                    sunModel.style.boxShadow = '0 0 50px rgba(255, 204, 0, 0.5)';
                    break;
                case 'corona':
                    sunModel.style.background = 'radial-gradient(circle, #fff700, #ffcc00, #ff9900)';
                    sunModel.style.boxShadow = '0 0 80px rgba(255, 100, 0, 0.8)';
                    break;
                case 'magnetic':
                    sunModel.style.background = 'radial-gradient(circle, #fff700, #ffcc00, #ff6600)';
                    sunModel.style.backgroundSize = 'cover';
                    sunModel.style.boxShadow = '0 0 30px rgba(0, 100, 255, 0.5)';
                    break;
            }
        });
    });

    // Glossary search functionality
    const glossarySearchInput = document.querySelector('.glossary-search-input');
    const glossaryItems = document.querySelectorAll('.glossary-item');

    if (glossarySearchInput) {
        glossarySearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            glossaryItems.forEach(item => {
                const term = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (term.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (sideNav.classList.contains('open')) {
                    sideNav.classList.remove('open');
                }
                
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Make the CTA button scroll to overview section
    document.querySelector('.cta-button').addEventListener('click', function() {
        const overviewSection = document.getElementById('overview');
        window.scrollTo({
            top: overviewSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});