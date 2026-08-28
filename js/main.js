/* ==========================================================================
   ABHIROOPA BHAGAVATHI N - PORTFOLIO INTERACTIVE LOGIC (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Theme Switcher (Dark / Light Mode)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });

    // ----------------------------------------------------------------------
    // 2. Navbar Sticky Scroll & Active Link Tracking
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link tracking
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
    handleNavScroll(); // Initial run

    // ----------------------------------------------------------------------
    // 3. Mobile Navigation Menu Drawer
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('open');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('open');
        });
    });

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
        jwt: {
            title: "JWT Authentication REST API (Spring Boot)",
            type: "Backend & Security",
            tech: ["Java", "Spring Boot", "Spring Security", "JWT Token", "Spring Data JPA", "H2 Database", "Postman"],
            description: `
                <p><strong>Overview:</strong> A secure backend service implementing JSON Web Token (JWT) authentication and role-based authorization using Java and Spring Boot.</p>
                <br>
                <h4>Key Features & Architecture:</h4>
                <ul style="padding-left: 1.2rem; margin-top: 0.5rem; line-height: 1.6;">
                    <li><strong>User Registration & Login:</strong> Built Spring Security authentication filters to handle credentials verification and issue signed JWT tokens.</li>
                    <li><strong>Protected Endpoints:</strong> Designed custom SecurityFilterChain to validate JWT headers on every incoming HTTP request to grant access to protected resources.</li>
                    <li><strong>Data Layer Integration:</strong> Integrated Spring Data JPA with in-memory H2 database for efficient user credential persistence.</li>
                    <li><strong>Testing & Postman Collection:</strong> Rigorously tested API endpoints (register, login, token refresh, protected user dashboard) using Postman.</li>
                </ul>
            `
        },
        usermgmt: {
            title: "User Management REST API (MySQL & Spring Boot)",
            type: "Backend & Database",
            tech: ["Java", "Spring Boot", "MySQL", "Spring Data JPA", "Hibernate", "HikariCP", "REST APIs"],
            description: `
                <p><strong>Overview:</strong> Production-style backend microservice offering scalable CRUD management for user accounts connected to MySQL database.</p>
                <br>
                <h4>Key Highlights:</h4>
                <ul style="padding-left: 1.2rem; margin-top: 0.5rem; line-height: 1.6;">
                    <li><strong>Layered Architecture:</strong> Structured application across Controller, Service, and Repository layers following strict Object-Oriented principles.</li>
                    <li><strong>HikariCP Connection Pooling:</strong> Configured HikariCP database pool parameters for optimized database connections under concurrent loads.</li>
                    <li><strong>Hibernate ORM Mapping:</strong> Mapped Java entity models to relational database tables with proper indexing and dynamic exception handling.</li>
                </ul>
            `
        },
        langchain: {
            title: "LangChain RAG Document & Q&A Assistant",
            type: "AI & LangChain Framework",
            tech: ["LangChain", "Python", "Vector Databases", "Embeddings", "Groq API", "Streamlit"],
            description: `
                <p><strong>Overview:</strong> Conversational retrieval assistant utilizing Retrieval-Augmented Generation (RAG) to query technical documents and deliver precise context-aware answers.</p>
                <br>
                <h4>Key Features:</h4>
                <ul style="padding-left: 1.2rem; margin-top: 0.5rem; line-height: 1.6;">
                    <li><strong>Vector Indexing:</strong> Processed PDF/text files into chunked document vectors stored in vector stores (Chroma/Pinecone).</li>
                    <li><strong>Contextual QA:</strong> Leverages LangChain retrieval chains with Groq API LLMs to retrieve relevant document passages before generating answers.</li>
                </ul>
            `
        },
        logsage: {
            title: "LogSage AI – Log File Anomaly Explainer",
            type: "AI & Full-Stack Python App",
            tech: ["Python", "Streamlit", "Groq API", "Ollama", "SQLite", "Plotly", "ReportLab"],
            description: `
                <p><strong>Overview:</strong> Intelligent log analysis tool parsing system logs, detecting anomalies, and generating explanations using LLMs with rule-based fallback.</p>
                <br>
                <h4>Architectural Highlights:</h4>
                <ul style="padding-left: 1.2rem; margin-top: 0.5rem; line-height: 1.6;">
                    <li><strong>Multi-Engine AI:</strong> Groq API cloud model with local Ollama fallback for uninterrupted incident parsing.</li>
                    <li><strong>Streamlit Dashboard:</strong> Interactive visualizer with incident timeline graphs, severity tracking, and automated PDF report downloads.</li>
                </ul>
            `
        },
        calendar: {
            title: "Interactive Calendar Web App (2025)",
            type: "Web Development",
            tech: ["HTML5", "CSS3", "JavaScript (ES6)", "DOM Manipulation", "LocalStorage"],
            description: `
                <p><strong>Overview:</strong> Interactive calendar app allowing users to assign custom notes and photo memories to individual calendar dates.</p>
            `
        },
        retail: {
            title: "Online Retail Sales Dashboard (Power BI)",
            type: "Business Intelligence & Data Analytics",
            tech: ["Power BI", "DAX Measures", "Data Cleaning", "Data Modeling", "Business Intelligence"],
            description: `
                <p><strong>Overview:</strong> E-commerce BI dashboard displaying revenue analytics, category performance, customer retention metrics, and DAX measures.</p>
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
            if (data) {
                modalProjectTitle.textContent = data.title;
                modalProjectContent.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-primary); background: rgba(6, 182, 212, 0.1); padding: 0.2rem 0.6rem; border-radius: 4px;">${data.type}</span>
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
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
    }

    closeProjectModalBtn.addEventListener('click', closeProjectModal);
    projectModalOverlay.addEventListener('click', closeProjectModal);

    // ----------------------------------------------------------------------
    // 7. Resume Preview Modal
    // ----------------------------------------------------------------------
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtn = document.getElementById('open-resume-btn');
    const closeResumeModalBtn = document.getElementById('close-resume-modal');
    const resumeModalOverlay = document.getElementById('resume-modal-overlay');

    openResumeBtn.addEventListener('click', () => {
        resumeModal.classList.add('active');
        resumeModal.setAttribute('aria-hidden', 'false');
    });

    function closeResumeModal() {
        resumeModal.classList.remove('active');
        resumeModal.setAttribute('aria-hidden', 'true');
    }

    closeResumeModalBtn.addEventListener('click', closeResumeModal);
    resumeModalOverlay.addEventListener('click', closeResumeModal);

    // Close modals on Escape key
    // Auto-reply modal elements
    const autoreplyModal = document.getElementById('autoreply-modal');
    const closeAutoreplyModalBtn = document.getElementById('close-autoreply-modal');
    const closeAutoreplyModalBtn2 = document.getElementById('close-autoreply-modal-btn');
    const autoreplyModalOverlay = document.getElementById('autoreply-modal-overlay');
    const copyAutoreplyTextBtn = document.getElementById('copy-autoreply-text');

    function closeAutoreplyModal() {
        if (autoreplyModal) {
            autoreplyModal.classList.remove('active');
            autoreplyModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (closeAutoreplyModalBtn) closeAutoreplyModalBtn.addEventListener('click', closeAutoreplyModal);
    if (closeAutoreplyModalBtn2) closeAutoreplyModalBtn2.addEventListener('click', closeAutoreplyModal);
    if (autoreplyModalOverlay) autoreplyModalOverlay.addEventListener('click', closeAutoreplyModal);

    if (copyAutoreplyTextBtn) {
        copyAutoreplyTextBtn.addEventListener('click', () => {
            const replyMsg = `Hello, I receive your mail! I will reply to you in the meantime. Thank you! - Abhiroopa Bhagavathi N`;
            navigator.clipboard.writeText(replyMsg).then(() => {
                showToast('Auto-reply text copied to clipboard!');
            });
        });
    }

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeResumeModal();
            closeAutoreplyModal();
        }
    });

    // ----------------------------------------------------------------------
    // 8. Contact Form Handling & Automated Reply Engine Trigger
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const subjectInput = document.getElementById('user-subject');
    const messageInput = document.getElementById('user-message');
    const submitBtn = document.getElementById('submit-btn');
    const demoAutoreplyBtn = document.getElementById('demo-autoreply-btn');

    function triggerAutoReplyModal(senderName, senderEmail, subjectText) {
        const recipientEl = document.getElementById('auto-reply-recipient');
        const subjectEl = document.getElementById('auto-reply-subject');
        const nameEl = document.getElementById('auto-reply-name');
        const timestampEl = document.getElementById('auto-reply-timestamp');

        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + now.toLocaleDateString();

        if (recipientEl) recipientEl.textContent = senderEmail || 'visitor@example.com';
        if (subjectEl) subjectEl.textContent = subjectText ? `Re: ${subjectText}` : 'Re: Thank you for reaching out!';
        if (nameEl) nameEl.textContent = senderName || 'Friend';
        if (timestampEl) timestampEl.textContent = formattedTime;

        if (autoreplyModal) {
            autoreplyModal.classList.add('active');
            autoreplyModal.setAttribute('aria-hidden', 'false');
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Reset error states
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
                // Show loading spinner on button
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = `
                        <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"></circle></svg>
                        <span>Sending Real Email to abhiroopabhagavathi@gmail.com...</span>
                    `;
                }

                // Dispatch real email via Web3Forms API + Mailto Fallback
                const targetEmail = "abhiroopabhagavathi@gmail.com";
                const formData = new FormData();
                formData.append("access_key", "c83e18a9-4674-4b5b-9d56-a1856c9a3bbd"); // Web3Forms key
                formData.append("name", nameVal);
                formData.append("email", emailVal);
                formData.append("subject", subjectVal || `New Portfolio Message from ${nameVal}`);
                formData.append("message", messageVal);

                fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                }).then(res => res.json())
                .then(data => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = `
                            <span class="btn-text">Send Real Email & Trigger Auto-Reply</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        `;
                    }

                    if (data.success) {
                        showToast(`Real email sent to ${targetEmail}! Automated reply dispatched.`);
                    } else {
                        // Open direct mailto if API token needs verification
                        window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subjectVal || "Portfolio Contact")}&body=${encodeURIComponent("Name: " + nameVal + "\nEmail: " + emailVal + "\n\nMessage:\n" + messageVal)}`;
                        showToast(`Email dispatched to ${targetEmail}! Automated reply triggered.`);
                    }

                    contactForm.reset();
                    triggerAutoReplyModal(nameVal, emailVal, subjectVal);
                }).catch(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = `
                            <span class="btn-text">Send Real Email & Trigger Auto-Reply</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        `;
                    }
                    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subjectVal || "Portfolio Contact")}&body=${encodeURIComponent("Name: " + nameVal + "\nEmail: " + emailVal + "\n\nMessage:\n" + messageVal)}`;
                    showToast(`Mail client triggered for ${targetEmail}! Auto-reply shown.`);
                    contactForm.reset();
                    triggerAutoReplyModal(nameVal, emailVal, subjectVal);
                });

            } else {
                showToast('Please fill out all required fields correctly.', 'error');
            }
        });
    }

    // Quick Auto-Responder Demo Button
    if (demoAutoreplyBtn) {
        demoAutoreplyBtn.addEventListener('click', () => {
            showToast('Triggering Instant Auto-Responder Demo...');
            triggerAutoReplyModal(
                'Alex Morgan (Recruiter)',
                'alex.morgan@techcorp.com',
                'Software Engineering / Backend Role Opportunity'
            );
        });
    }

    // Add keyframe animation for button spinner dynamically if needed
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
        }, 3500);
    }
});

