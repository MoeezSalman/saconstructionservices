 const slideshows = {
            construction: {
                currentSlide: 0,
                totalSlides: 21
            },
            office: {
                currentSlide: 0,
                totalSlides: 9
            },
            brand: {
                currentSlide: 0,
                totalSlides: 6
            }
        };

        function showSlide(slideshowType, slideIndex) {
            const slideshow = document.getElementById(slideshowType + 'Slideshow');
            const slides = slideshow.querySelectorAll('.slide');
            const dots = slideshow.querySelectorAll('.dot');
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active');
            
            slideshows[slideshowType].currentSlide = slideIndex;
        }

        function changeSlide(slideshowType, direction) {
            const slideshow = slideshows[slideshowType];
            let newSlide = slideshow.currentSlide + direction;
            
            if (newSlide >= slideshow.totalSlides) {
                newSlide = 0;
            } else if (newSlide < 0) {
                newSlide = slideshow.totalSlides - 1;
            }
            
            showSlide(slideshowType, newSlide);
        }

        function currentSlide(slideshowType, slideIndex) {
            showSlide(slideshowType, slideIndex - 1);
        }

        // Auto-advance slideshows
        function autoAdvanceSlideshow(slideshowType, interval) {
            setInterval(() => {
                changeSlide(slideshowType, 1);
            }, interval);
        }

        // Start auto-advance for all slideshows
        autoAdvanceSlideshow('construction', 5000);
        autoAdvanceSlideshow('office', 6000);
        autoAdvanceSlideshow('brand', 7000);

        // Theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;

        // Check for saved theme preference or default to 'dark'
        const currentTheme = localStorage.getItem('theme') || 'dark';
        if (currentTheme === 'light') {
            body.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                body.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'light');
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });