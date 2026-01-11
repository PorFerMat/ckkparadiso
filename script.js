// DOM Elements
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const newsletterForm = document.getElementById('newsletterForm');

// Mobile Menu Toggle
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        hamburger.innerHTML = mobileMenu.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Toast Notification
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('active');
    }, 10);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('active');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('active');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }, 4000);
}

// Newsletter Form
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;

        // In a real app, this would send data to a server
        newsletterForm.reset();
        showToast('Thanks for subscribing! Check your email for updates.', 'success');
    });
}

// Scroll Animation Functionality
function initScrollAnimations() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // If element has a progress bar, animate it
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    // Get the width from style attribute
                    const width = progressFill.style.width;
                    progressFill.style.width = '0%';

                    setTimeout(() => {
                        progressFill.style.width = width;
                    }, 300);
                }

                // Update this section in your initScrollAnimations function:

                // If element has counter, animate it
                const counters = entry.target.querySelectorAll('.stat-number, .growth-number, .percentage');
                counters.forEach(counter => {
                    if (!counter.hasAttribute('data-counted')) {
                        // Skip elements with dash in their text (ranges)
                        if (counter.textContent.includes('-') && counter.textContent.includes('$')) {
                            counter.setAttribute('data-counted', 'true');
                            return; // Skip animation for ranges
                        }
                        animateCounter(counter);
                        counter.setAttribute('data-counted', 'true');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => {
        observer.observe(el);
    });

    // Also add animation to hero elements on page load
    window.addEventListener('load', () => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .floating-img');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, index * 200);
        });
    });
}

// Counter animation function
function animateCounter(element) {
    const text = element.textContent;
    const target = parseInt(text.replace(/[^0-9]/g, ''));
    const isCurrency = text.includes('$');
    const suffix = text.replace(/[0-9$-]/g, '');
    const prefix = text.includes('$') ? '$' : '';

    if (isNaN(target)) return;

    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (isCurrency) {
            element.textContent = `${prefix}${Math.floor(current).toLocaleString()}${suffix}`;
        } else {
            element.textContent = `${Math.floor(current)}${suffix}`;
        }
    }, 30);
}

// Add animation classes to elements in other pages
function addAnimationClasses() {
    // Add animation to page headers
    const pageHeaders = document.querySelectorAll('.page-header h1, .page-header p');
    pageHeaders.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Add animation to content cards
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.setAttribute('data-delay', (index * 100).toString());

        // Add animation to headings inside cards
        const cardHeadings = card.querySelectorAll('h2, h3');
        cardHeadings.forEach(heading => {
            heading.classList.add('animate-fade-in');
        });
    });

    // Add animation to team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.classList.add('animate-scale');
        member.setAttribute('data-delay', (index * 200).toString());
    });

    // Add animation to service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.classList.add('animate-slide-left');
        item.setAttribute('data-delay', (index * 150).toString());
    });

    // Add animation to press releases
    const pressReleases = document.querySelectorAll('.press-release');
    pressReleases.forEach((release, index) => {
        release.classList.add('animate-slide-right');
        release.setAttribute('data-delay', (index * 150).toString());
    });

    // Add animation to FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.classList.add('animate-fade-in');
        item.setAttribute('data-delay', (index * 100).toString());
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    addAnimationClasses();

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Add animation to navigation on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');

        if (navbar) {
            if (currentScroll > 100) {
                navbar.style.padding = '15px 0';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';

                if (currentScroll > lastScroll && currentScroll > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.style.padding = '20px 0';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScroll = currentScroll;
    });

    // Initialize page-specific scripts based on current page
    if (currentPage === 'contact.html') {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Simple validation
                let isValid = true;
                const requiredFields = contactForm.querySelectorAll('[required]');

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.style.borderColor = '#f44336';
                        isValid = false;
                    } else {
                        field.style.borderColor = '';
                    }
                });

                if (isValid) {
                    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showToast('Please fill in all required fields.', 'error');
                }
            });
        }
    }

    if (currentPage === 'products.html') {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));

                    // Add active class to clicked button
                    button.classList.add('active');

                    const filter = button.getAttribute('data-filter');

                    // Show/hide products based on filter
                    productCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }
    }
});