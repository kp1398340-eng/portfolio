// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });

    // Initialize Typed.js
    const typed = new Typed('.typed-text', {
        strings: ['M.Sc. IT Student', 'Python Developer', 'SQL Developer', 'Tkinter GUI Developer'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    });

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#2563EB' },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#2563EB', opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');
    const body = document.body;

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        updateParticlesColor('#06B6D4');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
            updateParticlesColor('#2563EB');
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
            updateParticlesColor('#06B6D4');
        }
    });

    function updateParticlesColor(color) {
        if(window.pJSDom && window.pJSDom.length > 0){
            window.pJSDom[0].pJS.particles.color.value = color;
            window.pJSDom[0].pJS.particles.line_linked.color = color;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    // Set Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize EmailJS (Requires actual credentials to work)
    // Replace YOUR_PUBLIC_KEY with actual EmailJS Public Key
    // emailjs.init("YOUR_PUBLIC_KEY");

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Opening WhatsApp...';
            btn.disabled = true;

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Format message for WhatsApp using bold markdown and emojis
            const whatsappText = `👋 *New Portfolio Inquiry*\n\n👤 *Contact Details*\n• *Name:* ${name}\n• *Email:* ${email}\n\n🏷️ *Subject:* ${subject}\n\n📝 *Message:*\n"${message}"`;
            
            // Your WhatsApp number (with 91 country code for India)
            const whatsappNumber = "917862910946";
            
            // Create WhatsApp API URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

            // Open WhatsApp in a new tab
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                
                // Reset form
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 500);
        });
    }

    // Navbar active state on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
