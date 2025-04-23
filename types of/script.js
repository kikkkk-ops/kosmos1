document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    

    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
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
    
    window.addEventListener('scroll', setActiveLink);
    
   
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
             
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navList.classList.remove('active');
                }
            }
        });
    });
    

    const factSlides = document.querySelectorAll('.fact-slide');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.facts-section .prev-btn');
    const nextBtn = document.querySelector('.facts-section .next-btn');
    let currentSlide = 0;
    
    if (factSlides.length > 0) {
       
        factSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.slide = index;
            sliderDots.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        

        function showSlide(index) {
            factSlides.forEach(slide => slide.classList.remove('active'));
            factSlides[index].classList.add('active');
            
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }
        
        function goToSlide(index) {
            currentSlide = index;
            showSlide(currentSlide);
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % factSlides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + factSlides.length) % factSlides.length;
            showSlide(currentSlide);
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
        setInterval(nextSlide, 20000);
    }
    
    
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const prevQuestionBtn = document.querySelector('.prev-question-btn');
    const nextQuestionBtn = document.querySelector('.next-question-btn');
    const questionIndicators = document.querySelectorAll('.question-indicator');
    const quizResults = document.querySelector('.quiz-results');
    const scoreElement = document.getElementById('score');
    const resultMessage = document.getElementById('result-message');
    const restartQuizBtn = document.querySelector('.restart-quiz-btn');
    
    let currentQuestion = 0;
    let score = 0;
    let quizCompleted = false;
    
    if (quizQuestions.length > 0) {
        
        function showQuestion(index) {
            quizQuestions.forEach(question => question.classList.remove('active'));
            quizQuestions[index].classList.add('active');
            
            questionIndicators.forEach(indicator => indicator.classList.remove('active'));
            questionIndicators[index].classList.add('active');
            
          
            if (prevQuestionBtn) {
                prevQuestionBtn.disabled = index === 0;
            }
            
            if (nextQuestionBtn) {
                nextQuestionBtn.disabled = index === quizQuestions.length - 1 || !quizCompleted;
                nextQuestionBtn.textContent = index === quizQuestions.length - 1 ? 'Вижте резултата' : 'Следващ въпрос';
            }
        }
        
 
        quizOptions.forEach(option => {
            option.addEventListener('click', function() {
                const questionElement = this.closest('.quiz-question');
                const options = questionElement.querySelectorAll('.quiz-option');
                const feedback = questionElement.querySelector('.question-feedback');
                
               
                if (options[0].disabled) return;
                
                
                options.forEach(opt => opt.disabled = true);
                
             
                if (this.dataset.correct) {
                    this.classList.add('correct');
                    feedback.textContent = 'Правилно!';
                    feedback.style.color = 'green';
                    score++;
                } else {
                    this.classList.add('incorrect');
                    feedback.textContent = 'Грешно. Опитайте отново.';
                    feedback.style.color = 'red';
                    
             
                    options.forEach(opt => {
                        if (opt.dataset.correct) {
                            opt.classList.add('correct');
                        }
                    });
                }
                
           
                if (nextQuestionBtn) {
                    nextQuestionBtn.disabled = false;
                }
                
             
                questionElement.dataset.answered = 'true';
                
               
                checkQuizCompletion();
            });
        });
        
       
        function checkQuizCompletion() {
            const answeredQuestions = document.querySelectorAll('.quiz-question[data-answered="true"]');
            quizCompleted = answeredQuestions.length === quizQuestions.length;
            
            if (quizCompleted && nextQuestionBtn && currentQuestion === quizQuestions.length - 1) {
                nextQuestionBtn.textContent = 'Вижте резултата';
            }
        }
        

        if (prevQuestionBtn) {
            prevQuestionBtn.addEventListener('click', function() {
                if (currentQuestion > 0) {
                    currentQuestion--;
                    showQuestion(currentQuestion);
                }
            });
        }
        
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', function() {
                if (this.textContent === 'Вижте резултата' && quizCompleted) {
                    showResults();
                } else if (currentQuestion < quizQuestions.length - 1) {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                }
            });
        }
   
        questionIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentQuestion = index;
                showQuestion(currentQuestion);
            });
        });
        
        
        function showResults() {
            quizQuestions.forEach(question => question.classList.remove('active'));
            quizResults.classList.add('active');
            
            scoreElement.textContent = score;
            
            if (score === quizQuestions.length) {
                resultMessage.textContent = 'Отлично! Вие сте експерт по космически феномени!';
            } else if (score >= quizQuestions.length * 0.7) {
                resultMessage.textContent = 'Много добре! Имате солидни познания за космоса!';
            } else if (score >= quizQuestions.length * 0.4) {
                resultMessage.textContent = 'Не е лошо, но имате още какво да научите за космическите феномени.';
            } else {
                resultMessage.textContent = 'Имате нужда от повече изучаване на космическите феномени.';
            }
        }
        
      
        if (restartQuizBtn) {
            restartQuizBtn.addEventListener('click', function() {
               
                score = 0;
                currentQuestion = 0;
                quizCompleted = false;
                
          
                quizQuestions.forEach(question => {
                    question.dataset.answered = 'false';
                    const options = question.querySelectorAll('.quiz-option');
                    const feedback = question.querySelector('.question-feedback');
                    
                    options.forEach(option => {
                        option.classList.remove('correct', 'incorrect');
                        option.disabled = false;
                    });
                    
                    feedback.textContent = '';
                });
                
              
                quizResults.classList.remove('active');
                showQuestion(0);
            });
        }
        
       
        showQuestion(0);
    }
    
  
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
           
            this.classList.toggle('active');
        });
    });
    
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            alert('Благодарим за съобщението! Ще се свържем с вас скоро.');
            this.reset();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    

    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
   
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
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
    
    window.addEventListener('scroll', setActiveLink);
    
   
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
              
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navList.classList.remove('active');
                }
            }
        });
    });
    

    const factSlides = document.querySelectorAll('.fact-slide');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.facts-section .prev-btn');
    const nextBtn = document.querySelector('.facts-section .next-btn');
    let currentSlide = 0;
    
    if (factSlides.length > 0) {
     
        factSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.slide = index;
            sliderDots.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
       
        function showSlide(index) {
            factSlides.forEach(slide => slide.classList.remove('active'));
            factSlides[index].classList.add('active');
            
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }
        
        function goToSlide(index) {
            currentSlide = index;
            showSlide(currentSlide);
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % factSlides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + factSlides.length) % factSlides.length;
            showSlide(currentSlide);
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
      
        setInterval(nextSlide, 5000);
    }
    
   
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const prevQuestionBtn = document.querySelector('.prev-question-btn');
    const nextQuestionBtn = document.querySelector('.next-question-btn');
    const questionIndicators = document.querySelectorAll('.question-indicator');
    const quizResults = document.querySelector('.quiz-results');
    const scoreElement = document.getElementById('score');
    const resultMessage = document.getElementById('result-message');
    const restartQuizBtn = document.querySelector('.restart-quiz-btn');
    
    let currentQuestion = 0;
    let score = 0;
    let quizCompleted = false;
    
    if (quizQuestions.length > 0) {
       
        function showQuestion(index) {
            quizQuestions.forEach(question => question.classList.remove('active'));
            quizQuestions[index].classList.add('active');
            
            questionIndicators.forEach(indicator => indicator.classList.remove('active'));
            questionIndicators[index].classList.add('active');
            
        
            if (prevQuestionBtn) {
                prevQuestionBtn.disabled = index === 0;
            }
            
            if (nextQuestionBtn) {
                nextQuestionBtn.disabled = index === quizQuestions.length - 1 || !quizCompleted;
                nextQuestionBtn.textContent = index === quizQuestions.length - 1 ? 'Вижте резултата' : 'Следващ въпрос';
            }
        }
        
      
        quizOptions.forEach(option => {
            option.addEventListener('click', function() {
                const questionElement = this.closest('.quiz-question');
                const options = questionElement.querySelectorAll('.quiz-option');
                const feedback = questionElement.querySelector('.question-feedback');
                
             
                if (options[0].disabled) return;
                
               
                options.forEach(opt => opt.disabled = true);
                
               
                if (this.dataset.correct) {
                    this.classList.add('correct');
                    feedback.textContent = 'Правилно!';
                    feedback.style.color = 'green';
                    score++;
                } else {
                    this.classList.add('incorrect');
                    feedback.textContent = 'Грешно. Опитайте отново.';
                    feedback.style.color = 'red';
                    
                  
                    options.forEach(opt => {
                        if (opt.dataset.correct) {
                            opt.classList.add('correct');
                        }
                    });
                }
                
               
                if (nextQuestionBtn) {
                    nextQuestionBtn.disabled = false;
                }
                
               
                questionElement.dataset.answered = 'true';
                
            
                checkQuizCompletion();
            });
        });
        
        
        function checkQuizCompletion() {
            const answeredQuestions = document.querySelectorAll('.quiz-question[data-answered="true"]');
            quizCompleted = answeredQuestions.length === quizQuestions.length;
            
            if (quizCompleted && nextQuestionBtn && currentQuestion === quizQuestions.length - 1) {
                nextQuestionBtn.textContent = 'Вижте резултата';
            }
        }
        
     
        if (prevQuestionBtn) {
            prevQuestionBtn.addEventListener('click', function() {
                if (currentQuestion > 0) {
                    currentQuestion--;
                    showQuestion(currentQuestion);
                }
            });
        }
        
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', function() {
                if (this.textContent === 'Вижте резултата' && quizCompleted) {
                    showResults();
                } else if (currentQuestion < quizQuestions.length - 1) {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                }
            });
        }
        
     
        questionIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentQuestion = index;
                showQuestion(currentQuestion);
            });
        });
        
       
        function showResults() {
            quizQuestions.forEach(question => question.classList.remove('active'));
            quizResults.classList.add('active');
            
            scoreElement.textContent = score;
            
            if (score === quizQuestions.length) {
                resultMessage.textContent = 'Отлично! Вие сте експерт по космически феномени!';
            } else if (score >= quizQuestions.length * 0.7) {
                resultMessage.textContent = 'Много добре! Имате солидни познания за космоса!';
            } else if (score >= quizQuestions.length * 0.4) {
                resultMessage.textContent = 'Не е лошо, но имате още какво да научите за космическите феномени.';
            } else {
                resultMessage.textContent = 'Имате нужда от повече изучаване на космическите феномени.';
            }
        }
        
       
        if (restartQuizBtn) {
            restartQuizBtn.addEventListener('click', function() {
               
                score = 0;
                currentQuestion = 0;
                quizCompleted = false;
                
              
                quizQuestions.forEach(question => {
                    question.dataset.answered = 'false';
                    const options = question.querySelectorAll('.quiz-option');
                    const feedback = question.querySelector('.question-feedback');
                    
                    options.forEach(option => {
                        option.classList.remove('correct', 'incorrect');
                        option.disabled = false;
                    });
                    
                    feedback.textContent = '';
                });
                
               
                quizResults.classList.remove('active');
                showQuestion(0);
            });
        }
        
      
        showQuestion(0);
    }
    
 
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
           
            this.classList.toggle('active');
        });
    });
    

    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
         
            alert('Благодарим за съобщението! Ще се свържем с вас скоро.');
            this.reset();
        });
    }
});