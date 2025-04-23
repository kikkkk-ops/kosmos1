// Изчакване на зареждането на DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализиране на променливи
    const loader = document.querySelector('.loader-wrapper');
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;

    // Функция за актуализиране на прогрес бара
    function updateProgress() {
        if (progress < 100) {
            progress++;
            progressBar.style.width = progress + '%';
            setTimeout(updateProgress, 30);
        } else {
            // Скриване на loader-а след завършване
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                // Инициализиране на 3D модела
                if (typeof initSolarSystem === 'function') {
                    initSolarSystem();
                }
            }, 500);
        }
    }

    // Стартиране на прогрес бара след зареждане на всички ресурси
    window.addEventListener('load', function() {
        setTimeout(updateProgress, 500);
    });

    // Инициализиране на променливи за основната функционалност
    let activeTab = 'overview';
    let activePlanet = 'sun';
    const exploreBtn = document.getElementById('exploreBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navToggle = document.querySelector('.nav-toggle');
    const planetNavItems = document.querySelectorAll('.planet-nav-item');
    const planetDetails = document.querySelectorAll('.planet-detail');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Функция за плавно скролване
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80; // Височина на хедъра
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Функция за превключване на активната планета
    function switchPlanet(planetId) {
        // Скриване на всички детайли
        planetDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Показване на детайлите за избраната планета
        const selectedPlanet = document.getElementById(`${planetId}-detail`);
        if (selectedPlanet) {
            selectedPlanet.classList.add('active');
            activePlanet = planetId;
        }
        
        // Актуализиране на активния елемент в навигацията
        planetNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-planet') === planetId) {
                item.classList.add('active');
            }
        });

        // Актуализиране на текущата позиция
        const currentPosition = document.getElementById('currentPosition');
        if (currentPosition) {
            const planetNames = {
                'sun': 'Слънце',
                'mercury': 'Меркурий',
                'venus': 'Венера',
                'earth': 'Земя',
                'mars': 'Марс',
                'jupiter': 'Юпитер',
                'saturn': 'Сатурн',
                'uranus': 'Уран',
                'neptune': 'Нептун'
            };
            currentPosition.textContent = planetNames[planetId] || 'Слънчева система';
        }
    }

    // Функция за превключване на активния таб
    function switchTab(tabId) {
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.classList.add('active');
            activeTab = tabId;
        }
        
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            }
        });
    }

    // Събития за навигацията
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Премахване на активния клас от всички линкове
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Добавяне на активен клас към кликнатия линк
            this.classList.add('active');
            
            // Затваряне на мобилното меню, ако е отворено
            const navLinksContainer = document.querySelector('.nav-links');
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
            
            // Извличане на целевата секция и плавно скролване
            const targetId = this.getAttribute('href');
            smoothScroll(targetId);
        });
    });

    // Събитие за мобилното меню
    if (navToggle) {
    navToggle.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });
    }

    // Събития за навигацията на планетите
    planetNavItems.forEach(item => {
        const planetLink = item.querySelector('.planet-link');
        if (planetLink) {
            planetLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const planetId = item.getAttribute('data-planet');
                if (planetId) {
            switchPlanet(planetId);
                }
        });
        }
    });

    // Събития за табовете
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            if (tabId) {
            switchTab(tabId);
            }
        });
    });

    // Инициализиране на началното състояние
    switchPlanet('sun');

    // Събития за бутоните в началната секция
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            smoothScroll('#solar-system');
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            smoothScroll('#sun-and-planets');
        });
    }

    // Инициализиране на анимацията на комета
    initCometAnimation();
});

// Анимация на комета
function initCometAnimation() {
    const canvas = document.getElementById('cometCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let isPlaying = true;

    // Настройка на размера на канваса
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Класс за комета
    class Comet {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = 0;
            this.y = canvas.height / 2;
            this.size = 5;
            this.tailLength = 100;
            this.speed = 2;
            this.particles = [];
            this.color = 'rgba(255, 255, 255, 0.8)';
        }

        update() {
            this.x += this.speed;
            
            // Добавяне на нови частици
            this.particles.unshift({ x: this.x, y: this.y });
            
            // Премахване на стари частици
            if (this.particles.length > this.tailLength) {
                this.particles.pop();
            }

            // Рестартиране на позицията
            if (this.x > canvas.width + this.tailLength) {
                this.reset();
            }
        }

        draw() {
            // Рисуване на ядрото
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Рисуване на опашката
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            for (let i = 0; i < this.particles.length; i++) {
                const particle = this.particles[i];
                const alpha = 1 - (i / this.particles.length);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
                ctx.lineTo(particle.x, particle.y);
            }
            ctx.stroke();
        }
    }

    const comet = new Comet();

    // Анимационен цикъл
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        comet.update();
        comet.draw();

        if (isPlaying) {
            animationId = requestAnimationFrame(animate);
        }
    }

    // Контроли за анимацията
    const playPauseBtn = document.getElementById('playPauseBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                animate();
            } else {
                cancelAnimationFrame(animationId);
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            comet.reset();
            if (!isPlaying) {
                isPlaying = true;
                animate();
            }
        });
    }

    // Стартиране на анимацията
    animate();
}
