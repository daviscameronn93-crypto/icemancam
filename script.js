document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Dom Elements
    const header = document.getElementById('site-header');
    const mobileMenuToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const interactiveCard = document.getElementById('hero-interactive-card');

    // ==========================================
    // 1. Sticky Header
    // ==========================================
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ==========================================
    // 2. Mobile Menu Toggle
    // ==========================================
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            navMenu.classList.toggle('open');
            
            // Toggle icon menu / close
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.setAttribute('data-lucide', 'menu');
                } else {
                    icon.setAttribute('data-lucide', 'x');
                }
                lucide.createIcons();
            }
        });
    }

    // Close menu when a link is clicked (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    });

    // ==========================================
    // 3. Scroll Spy Navigation Highlight
    // ==========================================
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section is in the middle view
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ==========================================
    // 4. Interactive Code Card Parallax (3D Tilt)
    // ==========================================
    if (interactiveCard && window.innerWidth > 992) {
        interactiveCard.addEventListener('mousemove', (e) => {
            const rect = interactiveCard.getBoundingClientRect();
            
            // Get mouse position relative to card center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Normalize values (-1 to 1) and scale tilt range
            const rotateX = -(y / (rect.height / 2)) * 10; // Max 10 deg tilt
            const rotateY = (x / (rect.width / 2)) * 10;
            
            interactiveCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        interactiveCard.addEventListener('mouseleave', () => {
            // Reset to baseline styling
            interactiveCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    }

    // ==========================================
    // 5. Contact Form Submissions
    // ==========================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('form-submit-btn');
            const originalHTML = submitBtn.innerHTML;

            // Simple visual loading transition
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <span class="spinner"></span>';

            // Simulate form submission status
            setTimeout(() => {
                submitBtn.style.background = 'hsl(142, 70%, 45%)';
                submitBtn.style.color = '#fff';
                submitBtn.innerHTML = 'Message Sent! <i class="lucide" data-lucide="check"></i>';
                lucide.createIcons();

                // Reset form values
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.innerHTML = originalHTML;
                    lucide.createIcons();
                }, 3000);
            }, 1200);
        });
    }
});
