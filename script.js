document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // NAVIGATION ACTIVE STATE
    // =========================
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");

    const setActiveNav = () => {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (window.scrollY >= top - height / 3) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href").includes(current)
            );
        });
    };

    window.addEventListener("scroll", setActiveNav);


    // =========================
    // SMOOTH SCROLL
    // =========================
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // =========================
    // 3D TILT (OPTIMISÉ)
    // =========================
    const tiltElements = document.querySelectorAll("[data-tilt]");

    tiltElements.forEach(el => {

        let rafId = null;

        el.addEventListener("mousemove", (e) => {

            if (rafId) cancelAnimationFrame(rafId);

            rafId = requestAnimationFrame(() => {

                const rect = el.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;

                el.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;
            });
        });

        el.addEventListener("mouseleave", () => {
            el.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
        });
    });


    // =========================
    // SCROLL REVEAL (PERFORMANCE OPTIMIZED)
    // =========================
    const revealElements = document.querySelectorAll(
        ".bento-item, .about-text, .contact-card"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));


    // =========================
    // DARK MODE TOGGLE
    // =========================
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            // Save preference
            const isDark = document.body.classList.contains("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // Load theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }


    // =========================
    // SCROLL TO TOP BUTTON
    // =========================
    const scrollTopBtn = document.querySelector(".scroll-top");

    window.addEventListener("scroll", () => {
        if (!scrollTopBtn) return;

        scrollTopBtn.classList.toggle(
            "show",
            window.scrollY > 500
        );
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // =========================
    // CONTACT FORM (CLEAN UX)
    // =========================
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector(".submit-btn");

            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = "Envoi...";

            setTimeout(() => {

                btn.textContent = "Message envoyé ✓";
                btn.style.background = "#10b981";

                setTimeout(() => {
                    contactForm.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = "";
                }, 2000);

            }, 1200);
        });
    }


    // =========================
    // HERO PARALLAX (LIGHT)
    // =========================
    const heroContent = document.querySelector(".hero-content");

    window.addEventListener("scroll", () => {

        if (!heroContent) return;

        const scrollY = window.scrollY;

        if (scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            heroContent.style.opacity = 1 - scrollY / window.innerHeight;
        }
    });


    // =========================
    // MOBILE MENU (READY FOR FUTURE)
    // =========================
    const hamburger = document.querySelector(".hamburger-menu");
    const sideNav = document.querySelector(".side-nav");

    if (hamburger && sideNav) {
        hamburger.addEventListener("click", () => {
            sideNav.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }


    // =========================
    // LOG (optional branding)
    // =========================
    console.log("%c🚀 Portfolio loaded successfully",
        "color:#8b5cf6;font-size:14px;font-weight:bold;");
});