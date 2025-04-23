// Функция за инициализиране на 3D визуализацията на Слънчевата система
function initSolarSystem() {
    const canvas = document.getElementById('solarSystemCanvas');
    if (!canvas) return;

    // Създаване на сцена
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Създаване на камера
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 50;
    camera.position.y = 30;
    camera.lookAt(0, 0, 0);
    
    // Създаване на renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Добавяне на контроли
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 100;

    // Променливи за контрол на симулацията
    let simulationSpeed = 1;
    let isPaused = false;
    let isOrbitsVisible = true;
    let startTime = Date.now();
    
    // Създаване на Слънцето
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 1
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    
    // Добавяне на светлина
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const sunLight = new THREE.PointLight(0xffffff, 2, 100);
    scene.add(sunLight);

    // Създаване на планетите
    const planets = [
        { name: 'Меркурий', size: 0.8, distance: 10, color: 0xa6a6a6, speed: 4.1 },
        { name: 'Венера', size: 1.2, distance: 15, color: 0xe6c073, speed: 3.2 },
        { name: 'Земя', size: 1.2, distance: 20, color: 0x1a73e8, speed: 2.8 },
        { name: 'Марс', size: 1, distance: 25, color: 0xc0392b, speed: 2.4 },
        { name: 'Юпитер', size: 3, distance: 32, color: 0xe67e22, speed: 1.9 },
        { name: 'Сатурн', size: 2.5, distance: 38, color: 0xf1c40f, speed: 1.6 },
        { name: 'Уран', size: 1.8, distance: 43, color: 0x00b4d8, speed: 1.4 },
        { name: 'Нептун', size: 1.8, distance: 48, color: 0x2980b9, speed: 1.2 }
    ];
    
    const planetMeshes = planets.map(planet => {
        const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
        const material = new THREE.MeshPhongMaterial({ 
            color: planet.color,
            shininess: 30
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        // Позициониране на планетата
        mesh.position.x = planet.distance;
        
        // Създаване на орбита
        const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.1, planet.distance + 0.1, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            opacity: 0.2,
            transparent: true
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        
        scene.add(orbit);
        scene.add(mesh);
        
        return { mesh, orbit, distance: planet.distance, speed: planet.speed };
    });
    
    // Функции за контрол на симулацията
    function togglePause() {
        isPaused = !isPaused;
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.classList.toggle('active', isPaused);
        }
    }

    function speedUp() {
        if (simulationSpeed < 5) {
            simulationSpeed *= 1.5;
            updateSpeedDisplay();
        }
    }

    function speedDown() {
        if (simulationSpeed > 0.2) {
            simulationSpeed /= 1.5;
            updateSpeedDisplay();
        }
    }

    function resetView() {
        camera.position.set(0, 30, 50);
        camera.lookAt(0, 0, 0);
        controls.reset();
    }

    function toggleOrbits() {
        isOrbitsVisible = !isOrbitsVisible;
        planetMeshes.forEach(planet => {
            planet.orbit.visible = isOrbitsVisible;
        });
        const toggleOrbitsBtn = document.getElementById('toggleOrbitsBtn');
        if (toggleOrbitsBtn) {
            toggleOrbitsBtn.classList.toggle('active', isOrbitsVisible);
        }
    }

    function updateSpeedDisplay() {
        const speedDisplay = document.getElementById('currentSpeed');
        if (speedDisplay) {
            speedDisplay.textContent = `${simulationSpeed.toFixed(1)}x`;
        }
    }

    // Добавяне на event listeners за бутоните
    const pauseBtn = document.getElementById('pauseBtn');
    const speedUpBtn = document.getElementById('speedUpBtn');
    const speedDownBtn = document.getElementById('speedDownBtn');
    const resetViewBtn = document.getElementById('resetViewBtn');
    const toggleOrbitsBtn = document.getElementById('toggleOrbitsBtn');

    if (pauseBtn) pauseBtn.addEventListener('click', togglePause);
    if (speedUpBtn) speedUpBtn.addEventListener('click', speedUp);
    if (speedDownBtn) speedDownBtn.addEventListener('click', speedDown);
    if (resetViewBtn) resetViewBtn.addEventListener('click', resetView);
    if (toggleOrbitsBtn) toggleOrbitsBtn.addEventListener('click', toggleOrbits);
    
    // Анимационен цикъл
    function animate() {
        requestAnimationFrame(animate);
        
        if (!isPaused) {
            const elapsedTime = (Date.now() - startTime) * 0.001; // Време в секунди
            
            // Въртене на планетите
            planetMeshes.forEach((planet, index) => {
                const angle = elapsedTime * planet.speed * simulationSpeed * 0.1;
                planet.mesh.position.x = Math.cos(angle) * planet.distance;
                planet.mesh.position.z = Math.sin(angle) * planet.distance;
                // Въртене на планетата около оста й
                planet.mesh.rotation.y += 0.01 * simulationSpeed;
            });
        }
        
        controls.update();
        renderer.render(scene, camera);
    }
    
    // Стартиране на анимацията
    animate();
    
    // Обработка на преоразмеряване на прозореца
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });

    // Инициализиране на началните стойности на дисплея
    updateSpeedDisplay();
}

// Експортиране на функцията
window.initSolarSystem = initSolarSystem; 