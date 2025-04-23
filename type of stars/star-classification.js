
function initHRDiagram() {
    const canvas = document.getElementById('hr-diagram-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
   
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
  
    const starData = [
        { type: 'O', temp: 40000, luminosity: 100000, color: '#9bb0ff', radius: 10, label: 'O-тип' },
        { type: 'B', temp: 20000, luminosity: 10000, color: '#aabfff', radius: 8, label: 'B-тип' },
        { type: 'A', temp: 9000, luminosity: 100, color: '#cad7ff', radius: 6, label: 'A-тип' },
        { type: 'F', temp: 7000, luminosity: 10, color: '#f8f7ff', radius: 5, label: 'F-тип' },
        { type: 'G', temp: 5500, luminosity: 1, color: '#fff4ea', radius: 4, label: 'G-тип (Слънце)' },
        { type: 'K', temp: 4500, luminosity: 0.1, color: '#ffd2a1', radius: 3, label: 'K-тип' },
        { type: 'M', temp: 3000, luminosity: 0.01, color: '#ffcc6f', radius: 2, label: 'M-тип' },
        { type: 'White Dwarf', temp: 10000, luminosity: 0.001, color: '#ffffff', radius: 2, label: 'Бяло джудже' },
        { type: 'Red Giant', temp: 3500, luminosity: 1000, color: '#ff6347', radius: 12, label: 'Червен гигант' },
        { type: 'Supergiant', temp: 4000, luminosity: 100000, color: '#ff4500', radius: 15, label: 'Свръхгигант' }
    ];
    
   
    const mainSequenceStars = [];
    for (let i = 0; i < 50; i++) {
        
        const temp = 3000 + Math.random() * 37000;
        let luminosity;
        
      
        if (temp < 5000) {
            luminosity = Math.pow(temp / 5800, 4);
        } else {
            luminosity = Math.pow(temp / 5800, 5);
        }
        
        
        luminosity *= (0.8 + Math.random() * 0.4);
        
        let color;
        if (temp > 30000) color = '#9bb0ff';
        else if (temp > 10000) color = '#aabfff';
        else if (temp > 7500) color = '#cad7ff';
        else if (temp > 6000) color = '#f8f7ff';
        else if (temp > 5200) color = '#fff4ea';
        else if (temp > 3700) color = '#ffd2a1';
        else color = '#ffcc6f';
        
        mainSequenceStars.push({
            temp: temp,
            luminosity: luminosity,
            color: color,
            radius: 2 + Math.random() * 3,
            label: ''
        });
    }
    
    for (let i = 0; i < 10; i++) {
        mainSequenceStars.push({
            temp: 8000 + Math.random() * 20000,
            luminosity: 0.0001 + Math.random() * 0.01,
            color: '#ffffff',
            radius: 1 + Math.random(),
            label: ''
        });
    }
    
   
    for (let i = 0; i < 10; i++) {
        mainSequenceStars.push({
            temp: 3000 + Math.random() * 2000,
            luminosity: 100 + Math.random() * 900,
            color: '#ff6347',
            radius: 8 + Math.random() * 4,
            label: ''
        });
    }
    
   
    const allStars = [...starData, ...mainSequenceStars];
    
   
    function drawHRDiagram() {
        // Изчистване на канваса
        ctx.fillStyle = '#0a0e17';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Дефиниране на граници на диаграмата
        const margin = 50;
        const width = canvas.width - 2 * margin;
        const height = canvas.height - 2 * margin;
        
        // Скали за температура и светимост
        const tempMin = 2000;
        const tempMax = 50000;
        const lumMin = 0.0001;
        const lumMax = 1000000;
        
        // Функции за преобразуване на стойности в координати
        const tempToX = (temp) => margin + width - (width * (Math.log10(temp) - Math.log10(tempMin)) / (Math.log10(tempMax) - Math.log10(tempMin)));
        const lumToY = (lum) => margin + height - (height * (Math.log10(lum) - Math.log10(lumMin)) / (Math.log10(lumMax) - Math.log10(lumMin)));
        
        // Изчертаване на осите
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // X ос (температура)
        ctx.moveTo(margin, margin + height);
        ctx.lineTo(margin + width, margin + height);
        
        // Y ос (светимост)
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, margin + height);
        
        ctx.stroke();
        
        // Етикети на осите
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        
        // Етикет на X оста
        ctx.fillText('Температура (K)', margin + width / 2, margin + height + 40);
        
        // Етикет на Y оста
        ctx.save();
        ctx.translate(margin - 40, margin + height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Светимост (L☉)', 0, 0);
        ctx.restore();
        
        // Деления по X оста (температура)
        const tempTicks = [3000, 5000, 10000, 20000, 30000, 40000];
        ctx.textAlign = 'center';
        ctx.fillStyle = '#aaa';
        ctx.font = '12px Arial';
        
        tempTicks.forEach(temp => {
            const x = tempToX(temp);
            
            ctx.beginPath();
            ctx.moveTo(x, margin + height);
            ctx.lineTo(x, margin + height + 5);
            ctx.stroke();
            
            ctx.fillText(temp.toLocaleString(), x, margin + height + 20);
        });
        
        // Деления по Y оста (светимост)
        const lumTicks = [0.001, 0.01, 0.1, 1, 10, 100, 1000, 10000, 100000];
        ctx.textAlign = 'right';
        
        lumTicks.forEach(lum => {
            const y = lumToY(lum);
            
            ctx.beginPath();
            ctx.moveTo(margin, y);
            ctx.lineTo(margin - 5, y);
            ctx.stroke();
            
            ctx.fillText(lum === 1 ? '1 (Слънце)' : lum.toLocaleString(), margin - 10, y + 4);
        });
        
        // Изчертаване на спектралните класове
        const spectralClasses = [
            { label: 'O', temp: 40000 },
            { label: 'B', temp: 20000 },
            { label: 'A', temp: 9000 },
            { label: 'F', temp: 7000 },
            { label: 'G', temp: 5500 },
            { label: 'K', temp: 4500 },
            { label: 'M', temp: 3000 }
        ];
        
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        
        spectralClasses.forEach(cls => {
            const x = tempToX(cls.temp);
            ctx.fillText(cls.label, x, margin - 10);
        });
        
        // Изчертаване на звездите
        allStars.forEach(star => {
            const x = tempToX(star.temp);
            const y = lumToY(star.luminosity);
            
            // Изчертаване на звездата
            ctx.beginPath();
            ctx.arc(x, y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();
            
            // Добавяне на етикет, ако има такъв
            if (star.label) {
                ctx.fillStyle = '#fff';
                ctx.font = '12px Arial';
                ctx.textAlign = 'left';
                ctx.fillText(star.label, x + star.radius + 5, y + 4);
            }
        });
        
        // Изчертаване на главната последователност
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        
        // Точки за главната последователност
        const msPoints = [
            { temp: 40000, lum: 100000 },
            { temp: 30000, lum: 20000 },
            { temp: 20000, lum: 5000 },
            { temp: 10000, lum: 100 },
            { temp: 7500, lum: 10 },
            { temp: 6000, lum: 1.5 },
            { temp: 5500, lum: 1 },
            { temp: 4500, lum: 0.3 },
            { temp: 3500, lum: 0.05 },
            { temp: 3000, lum: 0.01 }
        ];
        
        ctx.moveTo(tempToX(msPoints[0].temp), lumToY(msPoints[0].lum));
        
        for (let i = 1; i < msPoints.length; i++) {
            ctx.lineTo(tempToX(msPoints[i].temp), lumToY(msPoints[i].lum));
        }
        
        ctx.stroke();
        
        // Добавяне на етикет "Главна последователност"
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Главна последователност', margin + width / 2, margin + height - 20);
    }
    
    // Изчертаване на диаграмата
    drawHRDiagram();
    
    // Адаптиране на размера при промяна на прозореца
    window.addEventListener('resize', () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        drawHRDiagram();
    });
}

// Функция за инициализиране на карусела с факти
function initFactsCarousel() {
    const factCards = document.querySelectorAll('.fact-card');
    const prevButton = document.getElementById('prev-fact');
    const nextButton = document.getElementById('next-fact');
    
    if (!factCards.length || !prevButton || !nextButton) return;
    
    let currentFactIndex = 0;
    
    // Функция за показване на текущия факт
    function showCurrentFact() {
        factCards.forEach((card, index) => {
            if (index === currentFactIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
    
    // Слушатели за бутоните
    prevButton.addEventListener('click', () => {
        currentFactIndex = (currentFactIndex - 1 + factCards.length) % factCards.length;
        showCurrentFact();
    });
    
    nextButton.addEventListener('click', () => {
        currentFactIndex = (currentFactIndex + 1) % factCards.length;
        showCurrentFact();
    });
    
    // Автоматично превъртане на фактите
    let autoScrollInterval = setInterval(() => {
        currentFactIndex = (currentFactIndex + 1) % factCards.length;
        showCurrentFact();
    }, 10000);
    
    // Спиране на автоматичното превъртане при взаимодействие с потребителя
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(() => {
                currentFactIndex = (currentFactIndex + 1) % factCards.length;
                showCurrentFact();
            }, 10000);
        });
    });
}

// Функция за инициализиране на теста
function initQuiz() {
    const quizStart = document.getElementById('quiz-start');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const startButton = document.getElementById('start-quiz');
    const submitButton = document.getElementById('submit-answer');
    const restartButton = document.getElementById('restart-quiz');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const scoreDisplay = document.getElementById('score-display');
    const resultDetails = document.getElementById('result-details');
    
    if (!quizStart || !quizQuestions || !quizResults || !startButton || !submitButton || !restartButton || !questionContainer || !optionsContainer || !scoreDisplay || !resultDetails) return;
    
    // Въпроси за теста
    const questions = [
        {
            question: 'Коя е най-близката звезда до Земята?',
            options: ['Проксима Кентавър', 'Алфа Кентавър A', 'Сириус', 'Слънцето'],
            correctAnswer: 3,
            explanation: 'Слънцето е най-близката звезда до Земята, на разстояние от около 150 милиона километра (1 астрономическа единица).'
        },
        {
            question: 'Кой цвят звезди са най-горещи?',
            options: ['Червени', 'Жълти', 'Бели', 'Сини'],
            correctAnswer: 3,
            explanation: 'Сините звезди са най-горещите звезди с температури над 30,000 келвина.'
        },
        {
            question: 'Какво се случва, когато звезда с маса подобна на Слънцето изчерпи ядреното си гориво?',
            options: ['Превръща се в черна дупка', 'Превръща се в неутронна звезда', 'Превръща се в бяло джудже', 'Експлодира като свръхнова'],
            correctAnswer: 2,
            explanation: 'Звезда с маса подобна на Слънцето ще се превърне в червен гигант, а след това ще изхвърли външните си слоеве, формирайки планетарна мъглявина, а ядрото ще остане като бяло джудже.'
        },
        {
            question: 'Какво представлява главната последователност в диаграмата на Херцшпрунг-Ръсел?',
            options: ['Последователност от звезди, подредени по възраст', 'Последователност от звезди, подредени по маса', 'Стабилна фаза в живота на звездите, когато изгарят водород в ядрата си', 'Последователност от звезди, подредени по разстояние от Земята'],
            correctAnswer: 2,
            explanation: 'Главната последователност е стабилна фаза в живота на звездите, когато те изгарят водород в ядрата си чрез ядрен синтез.'
        },
        {
            question: 'Какво е свръхнова?',
            options: ['Нова звезда, която се е формирала наскоро', 'Експлозивна смърт на масивна звезда', 'Звезда, която е по-ярка от нормалните звезди', 'Звезда, която се движи с много висока скорост'],
            correctAnswer: 1,
            explanation: 'Свръхнова е експлозивната смърт на масивна звезда, която може да бъде толкова ярка, че за кратко да надмине яркостта на цялата галактика.'
        },
        {
            question: 'Какво е пулсар?',
            options: ['Звезда, която пулсира и променя размера си', 'Бързо въртяща се неутронна звезда, която излъчва регулярни импулси', 'Звезда, която периодично променя яркостта си', 'Черна дупка, която поглъща материя'],
            correctAnswer: 1,
            explanation: 'Пулсарите са бързо въртящи се неутронни звезди, които излъчват тесни лъчи от електромагнитно лъчение. Когато тези лъчи преминават през линията на наблюдение от Земята, ние ги възприемаме като регулярни импулси.'
        },
        {
            question: 'Какво е черна дупка?',
            options: ['Регион от пространството без звезди', 'Студена звезда, която не излъчва светлина', 'Регион от пространството с толкова силна гравитация, че нищо не може да избяга от него', 'Дупка в междузвездната материя'],
            correctAnswer: 2,
            explanation: 'Черната дупка е регион от пространството, където гравитацията е толкова силна, че нищо, дори светлината, не може да избяга от нея след като премине хоризонта на събитията.'
        },
        {
            question: 'Какво е спектрален клас на звездите?',
            options: ['Класификация на звездите според тяхната маса', 'Класификация на звездите според тяхната възраст', 'Класификация на звездите според техния химичен състав', 'Класификация на звездите според тяхната температура и цвят'],
            correctAnswer: 3,
            explanation: 'Спектралният клас е система за класификация на звездите според тяхната температура и цвят, използвайки буквите O, B, A, F, G, K, M (от най-горещите към най-хладните).'
        },
        {
            question: 'Колко приблизително звезди има в Млечния път?',
            options: ['Няколко милиона', 'Няколко милиарда', 'Стотици милиарди', 'Трилиони'],
            correctAnswer: 2,
            explanation: 'Млечният път съдържа между 100 и 400 милиарда звезди.'
        },
        {
            question: 'Какво е светлинна година?',
            options: ['Времето, за което Земята обикаля около Слънцето', 'Разстоянието, което светлината изминава за една година', 'Времето, за което една звезда свети', 'Яркостта на звезда, измерена за период от една година'],
            correctAnswer: 1,
            explanation: 'Светлинната година е разстоянието, което светлината изминава във вакуум за една година, приблизително 9.46 трилиона километра.'
        }
    ];
    
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    
    // Функция за показване на текущия въпрос
    function showCurrentQuestion() {
        const question = questions[currentQuestionIndex];
        
        // Създаване на HTML за въпроса
        questionContainer.innerHTML = `
            <h3>Въпрос ${currentQuestionIndex + 1} от ${questions.length}</h3>
            <p>${question.question}</p>
        `;
        
        // Създаване на HTML за опциите
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.textContent = option;
            optionDiv.dataset.index = index;
            
            optionDiv.addEventListener('click', () => {
                // Премахване на избора от всички опции
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Избиране на текущата опция
                optionDiv.classList.add('selected');
            });
            
            optionsContainer.appendChild(optionDiv);
        });
    }
    
    // Функция за показване на резултатите
    function showResults() {
        quizQuestions.style.display = 'none';
        quizResults.style.display = 'block';
        
        // Показване на резултата
        scoreDisplay.textContent = `Вашият резултат: ${score} от ${questions.length} точки`;
        
        // Създаване на детайли за отговорите
        resultDetails.innerHTML = '';
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('result-question');
            questionDiv.innerHTML = `
                <p><strong>Въпрос ${index + 1}:</strong> ${question.question}</p>
                <p><strong>Вашият отговор:</strong> ${question.options[userAnswer]} ${isCorrect ? '✓' : '✗'}</p>
                ${!isCorrect ? `<p><strong>Правилен отговор:</strong> ${question.options[question.correctAnswer]}</p>` : ''}
                <p><strong>Обяснение:</strong> ${question.explanation}</p>
            `;
            
            resultDetails.appendChild(questionDiv);
        });
    }
    
    // Слушател за бутона за стартиране на теста
    startButton.addEventListener('click', () => {
        quizStart.style.display = 'none';
        quizQuestions.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        showCurrentQuestion();
    });
    
    // Слушател за бутона за изпращане на отговор
    submitButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('.option.selected');
        
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.dataset.index);
            userAnswers[currentQuestionIndex] = userAnswer;
            
            // Проверка дали отговорът е правилен
            if (userAnswer === questions[currentQuestionIndex].correctAnswer) {
                score++;
            }
            
            // Преминаване към следващия въпрос или показване на резултатите
            currentQuestionIndex++;
            
            if (currentQuestionIndex < questions.length) {
                showCurrentQuestion();
            } else {
                showResults();
            }
        } else {
            alert('Моля, изберете отговор!');
        }
    });
    
    // Слушател за бутона за рестартиране на теста
    restartButton.addEventListener('click', () => {
        quizResults.style.display = 'none';
        quizQuestions.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        showCurrentQuestion();
    });
}

// Инициализиране на диаграмата на Херцшпрунг-Ръсел, карусела с факти и теста
document.addEventListener('DOMContentLoaded', function() {
    initHRDiagram();
    initFactsCarousel();
    initQuiz();
});