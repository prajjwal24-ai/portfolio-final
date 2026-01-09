// Simple and Direct Theme Toggle
(function() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');

    // Set initial theme
    function setInitialTheme() {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (prefersDark ? 'dark' : 'light');
        
        html.setAttribute('data-theme', theme);
        console.log('Initial theme set to:', theme);
    }

    // Toggle theme on button click
    function handleToggle() {
        const current = html.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        console.log('Theme toggled to:', newTheme);
    }

    // Wait for button to be available
    if (themeToggle) {
        themeToggle.addEventListener('click', handleToggle);
        console.log('Theme toggle button ready');
    } else {
        console.warn('Theme toggle button not found');
    }

    // Set theme immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setInitialTheme);
    } else {
        setInitialTheme();
    }
})();

// Smooth Scrolling for Anchors (Optional fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

console.log('Portfolio initialized');

// Reveal Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden-section');
    observer.observe(section);
});

// Typewriter Effect
// Typewriter Effect
const roleElement = document.querySelector('.role');

if (roleElement) {
    const roles = ["Aspiring Software Engineer", "Problem Solver", "Full Stack Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Clear original text for effect
    roleElement.innerHTML = '<span class="role-text"></span><span class="typewriter-cursor">&nbsp;</span>';
    const roleTextElement = roleElement.querySelector('.role-text');

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing after initial load
    setTimeout(type, 1000);
} else {
    console.warn('Typewriter effect: .role element not found');
}
