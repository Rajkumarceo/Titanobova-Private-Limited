// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        const payload = { name, email, phone, subject, message };
        const endpoint = 'http://localhost:4000/api/contacts';
        // Ensure form has correct action/method for non-JS fallback
        try {
            contactForm.setAttribute('action', endpoint);
            contactForm.setAttribute('method', 'post');
        } catch (e) {
            // ignore if DOM not ready
        }
        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(async (res) => {
            const ctype = res.headers.get('content-type') || '';
            let body = null;
            if (ctype.includes('application/json')) body = await res.json().catch(() => null);
            else body = await res.text().catch(() => null);

            if (!res.ok) {
                const msg = (body && body.message) || (typeof body === 'string' && body) || 'Submission failed';
                throw new Error(msg);
            }

            alert('Thank you! Your message has been submitted.');
            contactForm.reset();
        })
        .catch((err) => {
            // Provide clearer feedback for common failure modes
            console.error('Contact submit error:', err);
            if (err.message && err.message.toLowerCase().includes('cors')) {
                alert('Could not submit: CORS/Network blocked. Ensure backend is running at http://localhost:4000 and CORS allows this origin.');
            } else if (err.message && err.message.match(/failed|submission/i)) {
                alert('Could not submit your message. Server returned an error.');
            } else {
                alert('Could not submit your message. Please try again.');
            }
        });
    });
}

// Get current year for footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
});

// Scroll to top functionality (minimal)
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

console.log('Titanobova Website - JavaScript initialized successfully');
