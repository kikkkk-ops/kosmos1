// DOM елементи
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const sideNav = document.querySelector('.side-nav');
const searchInput = document.querySelector('.search-bar input');
const glossarySearchInput = document.querySelector('.glossary-search-input');
const navLinks = document.querySelectorAll('.chapter-nav a');
const sections = document.querySelectorAll('.section');
const planetControls = document.querySelectorAll('.planet-control');
const stormSystem = document.querySelector('.storm-system');

// Тема
const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Превключване на иконите
    document.querySelectorAll('.theme-icon').forEach(icon => {
        icon.classList.toggle('active');
    });
};

// Проверка за запазена тема
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
    if (savedTheme === 'light') {
        document.querySelectorAll('.theme-icon').forEach(icon => {
            icon.classList.toggle('active');
        });
    }
}

// Мобилно меню
const toggleMenu = () => {
    sideNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
};

// Търсене
const handleSearch = (searchTerm) => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        const isMatch = text.includes(searchTerm.toLowerCase());
        section.style.opacity = isMatch || searchTerm === '' ? '1' : '0.3';
    });
};

// Търсене в речника
const handleGlossarySearch = (searchTerm) => {
    const items = document.querySelectorAll('.glossary-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const isMatch = text.includes(searchTerm.toLowerCase());
        item.style.display = isMatch || searchTerm === '' ? 'block' : 'none';
    });
};

// Активна секция при скролване
const setActiveSection = () => {
    const scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
};

// Контроли на планетния модел
const togglePlanetView = (view) => {
    const planet = document.querySelector('.planet-3d');
    if (!planet) {
        const planetModel = document.querySelector('.planet-model');
        const planet3d = document.createElement('div');
        planet3d.className = 'planet-3d';
        planet3d.setAttribute('data-view', view);
        planetModel.appendChild(planet3d);
    } else {
        planet.setAttribute('data-view', view);
    }
    
    planetControls.forEach(control => {
        control.classList.toggle('active', control.dataset.view === view);
    });
};

// Анимация на бурите
const animateStorms = () => {
    const windStreams = document.querySelectorAll('.wind-streams');
    const darkSpots = document.querySelectorAll('.dark-spot');
    
    windStreams.forEach((stream, index) => {
        stream.style.animationDuration = `${5 + index * 2}s`;
    });
    
    darkSpots.forEach((spot, index) => {
        spot.style.animationDelay = `${index * 0.5}s`;
    });
};

// Частици за фона
const createParticles = () => {
    const container = document.querySelector('.particles-container');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
    }
};

// Плавно скролване
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
    });
};

// Event listeners
themeToggle.addEventListener('click', toggleTheme);
menuToggle.addEventListener('click', toggleMenu);
searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
glossarySearchInput?.addEventListener('input', (e) => handleGlossarySearch(e.target.value));
window.addEventListener('scroll', setActiveSection);
planetControls.forEach(control => {
    control.addEventListener('click', (e) => {
        e.preventDefault();
        togglePlanetView(control.dataset.view);
    });
});
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(link.getAttribute('href'));
    });
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateStorms();
    setActiveSection();
}); 