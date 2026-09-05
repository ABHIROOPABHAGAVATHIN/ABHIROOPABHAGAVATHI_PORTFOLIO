/* ==========================================================================
   ABHIROOPA BHAGAVATHI N - PORTFOLIO INTERACTIVE LOGIC (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 0. Initialize EmailJS
    // ----------------------------------------------------------------------
    const PUBLIC_KEY = "njTQ_pFaRq5ufAKFb";
    const SERVICE_ID = "service_jqn4xas";
    const TEMPLATE_ID_NOTIFICATION = "template_o5588i2";
    const TEMPLATE_ID_AUTOREPLY = "template_8pqz4zm";

    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: PUBLIC_KEY });
    }

    // ----------------------------------------------------------------------
    // 1. Theme Switcher (Dark / Light Mode)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            
            showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
        });
    }

    // ----------------------------------------------------------------------
    // 2. Navbar Sticky Scroll & Active Link Tracking
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        if (!navbar) return;
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // ----------------------------------------------------------------------
    // 3. Mobile Navigation Menu Drawer
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('open');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 4. Scroll Reveal Animations (IntersectionObserver)
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.glass-card, .timeline-item, .hero-content, .hero-visual, .learning-card');
    
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------------------------------------
    // 5. Project Filtering Tabs
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 6. Project Detail Modal Content & Data
    // ----------------------------------------------------------------------
    const projectData = {
        finvigil: {
            title: "FinVigil Central — Credit Underwriting & AML Surveillance Backend",
            type: "Event-Driven Backend • Java & Spring Boot (In Progress)",
            tech: ["Java", "Spring Boot", "Drools", "RabbitMQ", "Redis", "PostgreSQL"],
            description: `
                <p><strong>Overview:</strong> Event-driven loan underwriting and Anti-Money Laundering (AML) surveillance backend architecture designed to decouple high-latency financial risk decisioning from HTTP API request paths.</p>
                <br>
                <h4>Key Features & Architecture:</h4>
                <ul style="padding-left: 1.2rem; margin-top: 0.5rem; line-height: 1.6;">
                    <li><strong>RabbitMQ Async Decoupling:</strong> Implemented RabbitMQ messaging queues to offload credit underwriting tasks asynchronously, keeping REST API response times sub-second.</li>
                    <li><strong>Drools Rules Engine:</strong> Designed a declarative, auditable Drools rule set evaluating DTI (Debt-to-Income) ratios, credit scores, and employment verification checks with clear trigger logs.</li>
                    <li><strong>Redis Sliding-Window AML Detection:</strong> Built real-time heuristics using Redis sliding-window counters to flag AML transaction structuring and rapid transfer anomalies.</li>
                    <li><strong>PostgreSQL Audit Schema:</strong> Formulated relational database schemas for applicants, loans, transactions, and AML alerts with immutable audit history logs.</li>
                </ul>
            `
        },
        logsage: {
            title: "LogSage AI — Log File Anomaly Explainer",
            type: "AI & Full-Stack Python Tool",
            tech: ["Python", "Streamlit", "Groq API", "Ollama", "SQLite", "Plotly", "ReportLab"],
            description: `
                <p><strong>Overview:</strong> AI-powered log analysis platform parsing system logs, identifying anomalies, and generating plain-language diagnostic explanations for engineering teams.</p>
                <br>
                <h4>Architectural Highlights:</h4>
                <ul style="padding-left: 1.2rem; margin-top: 0.5rem; line-height: 1.6;">
                    <li><strong>Dual-Engine LLM Analysis:</strong> Integrated cloud-based Groq API LLM processing alongside local Ollama execution with an automated rule-based fallback system for high reliability.</li>
                    <li><strong>Interactive Streamlit Dashboard:</strong> Engineered a streamlined dashboard featuring log upload, real-time severity tracking, Plotly incident timelines, and SQLite storage.</li>
                    <li><strong>Automated PDF/CSV Export:</strong> Generated formatted incident reports using ReportLab for audit records and team sharing.</li>
                </ul>
            `
        },
        retail: {
            title: "Online Retail Sales Dashboard",
            type: "Business Intelligence & Analytics",
            tech: ["Power BI", "DAX Measures", "Data Cleaning", "Data Modeling", "Sales Analytics"],
            description: `
                <p><strong>Overview:</strong> Executive business intelligence dashboard transforming raw e-commerce transaction data into interactive analytics visualizers.</p>
                <br>
                <h4>Key Highlights:</h4>
                <ul style="padding-left: 1.2rem; margin-top: 0.5rem; line-height: 1.6;">
                    <li><strong>Data Preprocessing & Modeling:</strong> Performed comprehensive data cleaning, null handling, and entity-relationship modeling across sales datasets.</li>
                    <li><strong>DAX KPI Calculations:</strong> Formulated dynamic DAX expressions to compute sales growth rates, customer retention rates, average order values (AOV), and category revenues.</li>
                    <li><strong>Executive Visualizations:</strong> Built multi-page dashboards surfacing trend analysis and regional performance indicators for data-driven decisions.</li>
                </ul>
            `
        }
    };

    const projectModal = document.getElementById('project-modal');
    const closeProjectModalBtn = document.getElementById('close-project-modal');
    const projectModalOverlay = document.getElementById('project-modal-overlay');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectContent = document.getElementById('modal-project-content');

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-project');
            const data = projectData[key];
            if (data && projectModal && modalProjectTitle && modalProjectContent) {
                modalProjectTitle.textContent = data.title;
                modalProjectContent.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-primary); background: rgba(59, 130, 246, 0.1); padding: 0.2rem 0.6rem; border-radius: 4px;">${data.type}</span>
                    </div>
                    <div>${data.description}</div>
                    <div style="margin-top: 1.5rem;">
                        <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem;">Tech Stack:</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                            ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                `;
                projectModal.classList.add('active');
                projectModal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    function closeProjectModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            projectModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);
    if (projectModalOverlay) projectModalOverlay.addEventListener('click', closeProjectModal);

    // ----------------------------------------------------------------------
    // 7. Resume Preview Modal
    // ----------------------------------------------------------------------
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtn = document.getElementById('open-resume-btn');
    const closeResumeModalBtn = document.getElementById('close-resume-modal');
    const resumeModalOverlay = document.getElementById('resume-modal-overlay');

    if (openResumeBtn && resumeModal) {
        openResumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            resumeModal.setAttribute('aria-hidden', 'false');
        });
    }

    function closeResumeModal() {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            resumeModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);
    if (resumeModalOverlay) resumeModalOverlay.addEventListener('click', closeResumeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeResumeModal();
        }
    });

    // ----------------------------------------------------------------------
    // 8. Contact Form Handling (EmailJS Real Dual-Flow Integration)
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const subjectInput = document.getElementById('user-subject');
    const messageInput = document.getElementById('user-message');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            [nameInput, emailInput, messageInput].forEach(i => {
                if (i) i.classList.remove('invalid');
            });

            const nameVal = nameInput ? nameInput.value.trim() : '';
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const subjectVal = subjectInput ? subjectInput.value.trim() : '';
            const messageVal = messageInput ? messageInput.value.trim() : '';

            if (!nameVal) {
                if (nameInput) nameInput.classList.add('invalid');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal || !emailRegex.test(emailVal)) {
                if (emailInput) emailInput.classList.add('invalid');
                isValid = false;
            }

            if (!messageVal) {
                if (messageInput) messageInput.classList.add('invalid');
                isValid = false;
            }

            if (isValid) {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = `
                        <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"></circle></svg>
                        <span>Sending...</span>
                    `;
                }

                const templateParams = {
                    user_name: nameVal,
                    user_email: emailVal,
                    subject: subjectVal || 'Portfolio Contact Inquiry',
                    message: messageVal
                };

                // Real EmailJS dual-flow dispatching
                Promise.all([
                    emailjs.send(SERVICE_ID, TEMPLATE_ID_NOTIFICATION, templateParams, PUBLIC_KEY),
                    emailjs.send(SERVICE_ID, TEMPLATE_ID_AUTOREPLY, templateParams, PUBLIC_KEY)
                ]).then(() => {
                    contactForm.reset();
                    showToast("Thank you! Your message has been sent. A confirmation email has been dispatched to your inbox.", "success");
                }).catch(err => {
                    console.error("EmailJS Error:", err);
                    showToast("Unable to send message right now. Please email directly at abhiroopabhagavathivsb27@gmail.com.", "error");
                }).finally(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = `
                            <span class="btn-text">Send Message</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        `;
                    }
                });

            } else {
                showToast('Please fill out all required fields correctly.', 'error');
            }
        });
    }

    // Dynamic keyframe animation for button spinner
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
    document.head.appendChild(style);

    // ----------------------------------------------------------------------
    // 9. Copy to Clipboard Tools
    // ----------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email');
    const copyPhoneBtn = document.getElementById('copy-phone');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('abhiroopabhagavathi@gmail.com').then(() => {
                showToast('Email address copied to clipboard!');
            });
        });
    }

    if (copyPhoneBtn) {
        copyPhoneBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('7418111939').then(() => {
                showToast('Phone number copied to clipboard!');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 10. Back To Top Button
    // ----------------------------------------------------------------------
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------------------------
    // Helper: Toast Notification Handler
    // ----------------------------------------------------------------------
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
});
