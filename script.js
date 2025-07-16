// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Form Submission with Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');
        
        let isValid = true;
        
        // Reset error states
        this.querySelectorAll('.error').forEach(el => el.remove());
        
        // Name validation
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        }
        
        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        }
        
        // Message validation
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission (replace with actual AJAX call)
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Thank you! Your message has been sent.';
                this.appendChild(successMsg);
                
                // Reset form
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }, 1500);
        }
    });
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    error.style.color = '#e74c3c';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '-0.5rem';
    error.style.marginBottom = '0.5rem';
    input.parentNode.insertBefore(error, input.nextSibling);
    input.style.borderColor = '#e74c3c';
    
    // Remove error when user starts typing
    input.addEventListener('input', function() {
        error.remove();
        this.style.borderColor = '#ddd';
    }, { once: true });
}

// Animate Skills Bars on Scroll with Intersection Observer
const skillBars = document.querySelectorAll('.skill-level');
const skillsSection = document.querySelector('.skills');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const width = bar.classList.contains('html') ? '90%' :
                             bar.classList.contains('css') ? '85%' :
                             bar.classList.contains('js') ? '80%' :
                             bar.classList.contains('react') ? '75%' :
                             bar.classList.contains('c') ? '70%' :
                             bar.classList.contains('python') ? '75%' :
                             bar.classList.contains('sql') ? '80%' :
                             bar.classList.contains('analytics') ? '85%' : '0%';
                
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            
            // Unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);
}

// Project Filter Functionality (if you add filter buttons later)
/*
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});
*/

// Dark/Light Mode Toggle
const modeToggle = document.createElement('div');
modeToggle.className = 'mode-toggle';
modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(modeToggle);

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Add corresponding CSS for dark mode in your style.css:
/*
.dark-mode {
    background-color: #121212;
    color: #f5f5f5;
}

.dark-mode header {
    background-color: #1e1e1e;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.dark-mode .section-title {
    color: #f5f5f5;
}

.dark-mode .project-card,
.dark-mode .skill-category,
.dark-mode .contact-info,
.dark-mode .contact-form {
    background-color: #1e1e1e;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.dark-mode .mode-toggle {
    color: #f5f5f5;
}
*/

// Scroll Reveal Animation
const scrollReveal = ScrollReveal({
    origin: 'bottom',
    distance: '30px',
    duration: 1000,
    reset: true
});

scrollReveal.reveal('.hero-content, .hero-img', { delay: 200, interval: 200 });
scrollReveal.reveal('.about-content > div', { delay: 200, interval: 200 });
scrollReveal.reveal('.skill-category', { delay: 200, interval: 200 });
scrollReveal.reveal('.project-card', { delay: 200, interval: 200 });
scrollReveal.reveal('.contact-container > div', { delay: 200, interval: 200 });