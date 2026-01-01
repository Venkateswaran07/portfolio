document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select all sections to animate
    const sections = document.querySelectorAll('.section-title, .glass-card, .skill-category');

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // Smooth scroll for nav links (optional override if native scroll-behavior fails)
    // Smooth scroll for nav links (excluding live demo buttons)
    document.querySelectorAll('a[href^="#"]:not(.btn)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore empty hash
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // Hero Image Click Animation
    const heroCircle = document.querySelector('.hero-circle');
    if (heroCircle) {
        // Add entrance animation class on load
        heroCircle.classList.add('hero-pop-in');

        // Cleanup entrance animation after it finishes to prevent style conflicts
        heroCircle.addEventListener('animationend', (e) => {
            if (e.animationName === 'popIn') {
                heroCircle.classList.remove('hero-pop-in');
            }
        });

        heroCircle.addEventListener('click', () => {
            // Remove class if it exists to allow re-triggering
            heroCircle.classList.remove('hero-click-effect');

            // Force reflow
            void heroCircle.offsetWidth;

            // Add class back
            heroCircle.classList.add('hero-click-effect');
        });
    }

    // Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Construct Gmail link
            const subject = encodeURIComponent(`Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=venkates338@gmail.com&su=${subject}&body=${body}`;

            // Open Gmail in new tab
            window.open(gmailLink, '_blank');

            // Show success feedback
            alert('Opening your email client to send the message!');
            contactForm.reset();
        });
    }
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle'); // For hamburger animation
        });

        // Close menu when a link is clicked
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            });
        });
    }
});
