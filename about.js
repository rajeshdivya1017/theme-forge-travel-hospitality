/* =========================================================
   STACKLY TRAVEL — ABOUT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SCROLL REVEAL ANIMATION
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".about-story-content, .about-story-image, " +
        ".about-mission-card, .about-why-image, " +
        ".about-why-content, .about-stat-item, " +
        ".about-cta-content"
    );

    revealElements.forEach((element) => {
        element.classList.add("about-reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("about-revealed");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =========================================
       STATISTICS COUNTER ANIMATION
    ========================================== */

    const statNumbers = document.querySelectorAll(
        ".about-stat-item h3[data-count]"
    );

    const animateCounter = (element) => {

        const target = Number(element.dataset.count);

        if (!Number.isFinite(target)) {
            return;
        }

        const duration = 1800;
        const startTime = performance.now();

        const formatValue = (value) => {

            if (target >= 10000) {
                return Math.floor(value / 1000) + "K+";
            }

            if (target === 100) {
                return Math.floor(value) + "%";
            }

            return Math.floor(value) + "+";

        };

        const updateCounter = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            // Smooth ease-out animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = target * easedProgress;

            element.textContent = formatValue(currentValue);

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                element.textContent = formatValue(target);

            }

        };

        requestAnimationFrame(updateCounter);

    };


    const statsSection = document.querySelector(
        ".about-stats-section"
    );

    if (statsSection && statNumbers.length > 0) {

        let countersStarted = false;

        const statsObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting &&
                        !countersStarted
                    ) {

                        countersStarted = true;

                        statNumbers.forEach((counter) => {
                            animateCounter(counter);
                        });

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.3
            }
        );

        statsObserver.observe(statsSection);

    }


    /* =========================================
       SMOOTH SCROLL FOR ABOUT PAGE LINKS
    ========================================== */

    const aboutLinks = document.querySelectorAll(
        '.about-page a[href^="#"]'
    );

    aboutLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       HERO CONTENT ENTRANCE
    ========================================== */

    const heroContent = document.querySelector(
        ".about-hero-content"
    );

    if (heroContent) {

        heroContent.classList.add("about-hero-loaded");

    }

});