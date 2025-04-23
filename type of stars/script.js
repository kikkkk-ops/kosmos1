document.addEventListener('DOMContentLoaded', function() {
   
    createStarBackground();
    

    initMobileNav();
    

    initStarModal();
    
    
    initStarMap();
    
    
    const script = document.createElement('script');
    script.src = 'star-classification.js';
    document.body.appendChild(script);
});


function createStarBackground() {
    const starsContainer = document.querySelector('.stars-bg');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star-bg');
        
    
        const size = Math.random() * 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        
     
        const duration = 2 + Math.random() * 3;
        star.style.animationDuration = `${duration}s`;
        
        
        const delay = Math.random() * 5;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}


function initMobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
       
        nav.classList.toggle('nav-active');
        
      
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
       
        burger.classList.toggle('toggle');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}


function initStarModal() {
    const starCards = document.querySelectorAll('.star-card');
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.close-button');
    
 
    const starData = {
        'main-sequence': {
            title: 'Звезди от Главната Последователност',
            description: 'Звездите от главната последователност са в най-стабилната и продължителна фаза от своя живот. В тази фаза, те изгарят водород в ядрата си чрез ядрен синтез, превръщайки го в хелий и освобождавайки огромно количество енергия. Нашето Слънце е типична звезда от главната последователност и се намира приблизително в средата на своя 10-милиарден живот в тази фаза.',
            characteristics: [
                'Температура: 2,500 - 50,000 K',
                'Маса: 0.08 - 150 слънчеви маси',
                'Радиус: 0.1 - 10 слънчеви радиуса',
                'Продължителност на живота: от милиони до трилиони години',
                'Цвят: от червен до син, в зависимост от температурата',
                'Примери: Слънцето, Алфа Кентавър A, Сириус A'
            ]
        },
        'red-giant': {
            title: 'Червени Гиганти',
            description: 'Когато звезда с маса подобна на Слънцето изчерпи водорода в ядрото си, тя навлиза в следващата фаза от своя живот - червен гигант. Ядрото се свива и нагрява, докато външните слоеве се разширяват и охлаждат, придавайки на звездата червеникав цвят. Диаметърът на звездата може да се увеличи стотици пъти, поглъщайки близките планети.',
            characteristics: [
                'Температура: 3,500 - 5,000 K',
                'Маса: 0.3 - 8 слънчеви маси',
                'Радиус: 10 - 100 слънчеви радиуса',
                'Продължителност на живота: стотици милиони години',
                'Цвят: червен до оранжев',
                'Примери: Алдебаран, Арктур, Бетелгейзе'
            ]
        },
        'white-dwarf': {
            title: 'Бели Джуджета',
            description: 'Белите джуджета са остатъци от звезди с маса подобна на Слънцето, които са изчерпали ядреното си гориво. След фазата на червен гигант, звездата изхвърля външните си слоеве, формирайки планетарна мъглявина, а ядрото остава като бяло джудже. Тези обекти са изключително плътни - с маса подобна на Слънцето, но с размер подобен на Земята.',
            characteristics: [
                'Температура: 8,000 - 40,000 K',
                'Маса: 0.17 - 1.33 слънчеви маси',
                'Радиус: около 0.01 слънчеви радиуса (подобен на Земята)',
                'Плътност: около 1,000,000 пъти по-голяма от водата',
                'Цвят: бял до синкав',
                'Примери: Сириус B, Процион B'
            ]
        },
        'neutron': {
            title: 'Неутронни Звезди',
            description: 'Неутронните звезди се формират при колапса на масивни звезди по време на свръхнова експлозия. Те са изключително плътни - чайна лъжичка от материята на неутронна звезда би тежала милиарди тонове на Земята. Въпреки огромната си маса, неутронните звезди са само около 20 км в диаметър. Някои неутронни звезди, наречени пулсари, излъчват регулярни импулси от радиовълни и други електромагнитни лъчения.',
            characteristics: [
                'Температура: около 1,000,000 K на повърхността',
                'Маса: 1.4 - 2.16 слънчеви маси',
                'Радиус: около 10 км',
                'Плътност: около 10^17 кг/м³',
                'Скорост на въртене: до стотици пъти в секунда',
                'Примери: Пулсарът в Рака, PSR J0348+0432'
            ]
        },
        'supergiant': {
            title: 'Свръхгиганти',
            description: 'Свръхгигантите са най-масивните и най-ярките звезди във Вселената. Те имат кратък живот от само няколко милиона години, но през това време излъчват енергия, еквивалентна на милиони слънца. Тези звезди завършват живота си в драматични свръхнови експлозии, обогатявайки междузвездната среда с тежки елементи.',
            characteristics: [
                'Температура: 3,500 - 40,000 K',
                'Маса: 8 - 150+ слънчеви маси',
                'Радиус: 30 - 1000+ слънчеви радиуса',
                'Продължителност на живота: 1 - 20 милиона години',
                'Светимост: 30,000 - 1,000,000 пъти по-ярки от Слънцето',
                'Примери: Бетелгейзе, Антарес, Ригел'
            ]
        },
        'black-hole': {
            title: 'Черни Дупки',
            description: 'Черните дупки са региони от пространството, където гравитацията е толкова силна, че нищо, дори светлината, не може да избяга от тях. Те се формират, когато много масивна звезда колапсира под собствената си гравитация в края на живота си. Черните дупки не могат да бъдат наблюдавани директно, но тяхното присъствие може да бъде установено чрез ефектите им върху околната материя и светлина.',
            characteristics: [
                'Маса: от 3 до милиарди слънчеви маси',
                'Размер: зависи от масата (хоризонт на събитията)',
                'Гравитация: толкова силна, че изкривява пространство-времето',
                'Видове: звездни, свръхмасивни, първични',
                'Примери: Стрелец A* (в центъра на Млечния път), Cygnus X-1'
            ]
        }
    };
    

    starCards.forEach(card => {
        card.addEventListener('click', () => {
            const starType = card.getAttribute('data-star');
            const data = starData[starType];
            
            if (data) {
               
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-description').textContent = data.description;
                
             
                const modalImage = document.getElementById('modal-image');
                modalImage.innerHTML = '';
                const starDiv = document.createElement('div');
                starDiv.classList.add('star');
                starDiv.classList.add(`${starType}-star`);
                starDiv.style.width = '150px';
                starDiv.style.height = '150px';
                modalImage.appendChild(starDiv);
                
         
                const characteristicsList = document.createElement('ul');
                data.characteristics.forEach(characteristic => {
                    const li = document.createElement('li');
                    li.textContent = characteristic;
                    characteristicsList.appendChild(li);
                });
                
                const modalCharacteristics = document.getElementById('modal-characteristics');
                modalCharacteristics.innerHTML = '<h4>Характеристики:</h4>';
                modalCharacteristics.appendChild(characteristicsList);
                
             
                modal.style.display = 'block';
            }
        });
    });
    
   
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
  
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}


function initStarMap() {
    
    const starCanvas = document.getElementById('star-canvas');
    if (!starCanvas) return;
    
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, starCanvas.clientWidth / starCanvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(starCanvas.clientWidth, starCanvas.clientHeight);
    renderer.setClearColor(0x0a0e17);
    starCanvas.appendChild(renderer.domElement);
    
   
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
   
    const stars = [];
    const starTypes = {
        'main-sequence': { color: 0xffcc00, size: 1.2, count: 100 },  
        'red-giant': { color: 0xff0000, size: 2.0, count: 30 },       
        'white-dwarf': { color: 0xe0e0ff, size: 0.8, count: 20 },     
        'neutron': { color: 0x00ffff, size: 0.7, count: 10 },         
        'supergiant': { color: 0x0040ff, size: 2.5, count: 15 }       
    };
    
   
    Object.keys(starTypes).forEach(type => {
        const { color, size, count } = starTypes[type];
        
       
        const geometry = new THREE.SphereGeometry(size, 32, 32);
        
       
        const material = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 2.0, 
            roughness: 0.1,         
            metalness: 0.9           
        });
        
        
        for (let i = 0; i < count; i++) {
            const star = new THREE.Mesh(geometry, material);
            
         
            star.position.x = (Math.random() - 0.5) * 100;
            star.position.y = (Math.random() - 0.5) * 100;
            star.position.z = (Math.random() - 0.5) * 100;
            
           
            const glow = new THREE.PointLight(color, 2.5, size * 15);  
            star.add(glow);
        
            star.userData.type = type;
            
            scene.add(star);
            stars.push(star);
        }
    });
    
   
    camera.position.z = 50;
    

    const rotateButton = document.getElementById('rotate');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const starSelect = document.getElementById('star-select');
    
    let isRotating = false;
    
   
    rotateButton.addEventListener('click', () => {
        isRotating = !isRotating;
        rotateButton.textContent = isRotating ? 'Спри въртенето' : 'Завъртане';
    });
    
  
    zoomInButton.addEventListener('click', () => {
        if (camera.position.z > 10) {
            camera.position.z -= 5;
        }
    });
    
   
    zoomOutButton.addEventListener('click', () => {
        if (camera.position.z < 100) {
            camera.position.z += 5;
        }
    });
    
   
    starSelect.addEventListener('change', () => {
        const selectedType = starSelect.value;
        
        stars.forEach(star => {
            if (selectedType === 'all' || star.userData.type === selectedType) {
                star.visible = true;
            } else {
                star.visible = false;
            }
        });
    });
    
 
    function animate() {
        requestAnimationFrame(animate);
        
    
        if (isRotating) {
            scene.rotation.y += 0.002;
            scene.rotation.x += 0.001;
        }
        
      
        stars.forEach(star => {
            const scale = 0.95 + 0.1 * Math.sin(Date.now() * 0.001 + Math.random() * 10);
            star.scale.set(scale, scale, scale);
        });
        
        renderer.render(scene, camera);
    }
    
   
    animate();
    
   
    window.addEventListener('resize', () => {
        camera.aspect = starCanvas.clientWidth / starCanvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(starCanvas.clientWidth, starCanvas.clientHeight);
    });
}


import * as THREE from 'three';