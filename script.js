/* =========================================================
   STACKLY TRAVEL — HOMEPAGE JAVASCRIPT
   Homepage Interactions & Animations
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SELECT ELEMENTS
    ===================================================== */

    const destinationCards = document.querySelectorAll(
        ".destination-card"
    );

    const favoriteButtons = document.querySelectorAll(
        ".destination-favorite"
    );

    const searchForm = document.querySelector(
        ".travel-search-form"
    );

    const searchButton = document.querySelector(
        ".travel-search-button"
    );

    const revealElements = document.querySelectorAll(
        ".stackly-reveal"
    );


    /* =====================================================
       2. DESTINATION IMAGE HOVER EFFECT
       Show alternate image of same location
    ===================================================== */

    destinationCards.forEach((card) => {

        const image = card.querySelector(
            ".destination-image"
        );

        if (!image) return;

        const originalImage = image.src;

        const alternateImage =
            image.dataset.hoverImage ||
            image.dataset.alternateImage;

        if (!alternateImage) return;

        let imageChanged = false;

        card.addEventListener("mouseenter", () => {

            if (imageChanged) return;

            imageChanged = true;

            image.src = alternateImage;

        });

        card.addEventListener("mouseleave", () => {

            image.src = originalImage;

            imageChanged = false;

        });

    });


    /* =====================================================
       3. FAVORITE DESTINATION BUTTON
    ===================================================== */

    favoriteButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();

            button.classList.toggle("active");

            const icon = button.querySelector("i");

            if (icon) {

                if (button.classList.contains("active")) {

                    icon.classList.remove("far");

                    icon.classList.add("fas");

                    button.setAttribute(
                        "aria-label",
                        "Remove from favorites"
                    );

                } else {

                    icon.classList.remove("fas");

                    icon.classList.add("far");

                    button.setAttribute(
                        "aria-label",
                        "Add to favorites"
                    );

                }

            }

        });

    });


    /* =====================================================
       4. DESTINATION CARD ANIMATION
    ===================================================== */

    destinationCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 80}ms`;

    });


    /* =====================================================
   5. HOMEPAGE SEARCH FORM — FIXED
===================================================== */

if (searchForm) {

    searchForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const destinationInput =
            document.getElementById("searchDestination");

        const dateInput =
            document.getElementById("searchDate");

        const travelerInput =
            document.getElementById("searchTravelers");


        const destination =
            destinationInput?.value.trim() || "";

        const date =
            dateInput?.value || "";

        const travelers =
            travelerInput?.value || "2";


        /* Validate destination */

        if (!destination) {

            showTravelToast(
                "Please enter your dream destination."
            );

            destinationInput?.focus();

            return;

        }


        /* Get today's local date */

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        const todayString =
            `${year}-${month}-${day}`;


        /* Validate date if selected */

        if (date && date < todayString) {

            showTravelToast(
                "Please select today or a future travel date."
            );

            dateInput?.focus();

            return;

        }


        /* Build package URL */

        const params = new URLSearchParams({

            destination: destination,

            date: date,

            travelers: travelers

        });


        /* Navigate to package details */

        window.location.href =
            `package.html?${params.toString()}`;

    });

}


/* =====================================================
   SET MINIMUM TRAVEL DATE
===================================================== */

const homepageTravelDate =
    document.getElementById("searchDate");

if (homepageTravelDate) {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    homepageTravelDate.min =
        `${year}-${month}-${day}`;

}

    /* =====================================================
       6. SEARCH BUTTON LOADING EFFECT
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener("mouseenter", () => {

            searchButton.style.transform =
                "translateY(-3px)";

        });

        searchButton.addEventListener("mouseleave", () => {

            searchButton.style.transform =
                "translateY(0)";

        });

    }


    /* =====================================================
       7. SCROLL REVEAL ANIMATION
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       8. AUTO APPLY REVEAL TO IMPORTANT SECTIONS
    ===================================================== */

    const animatedSections = document.querySelectorAll(
        ".section-header, " +
        ".destination-card, " +
        ".experience-content, " +
        ".experience-image-area, " +
        ".featured-card, " +
        ".travel-benefit-card, " +
        ".travel-cta-content"
    );


    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.1
            }

        );


        animatedSections.forEach((element) => {

            element.classList.add(
                "stackly-reveal"
            );

            sectionObserver.observe(element);

        });

    }


    /* =====================================================
       9. HERO PARALLAX EFFECT
    ===================================================== */

    const hero = document.querySelector(
        ".home-hero"
    );

    const heroBackground = document.querySelector(
        ".hero-background-image"
    );


    if (
        hero &&
        heroBackground &&
        window.matchMedia("(min-width: 768px)").matches
    ) {

        hero.addEventListener("mousemove", (event) => {

            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;


            const moveX = (x - 0.5) * 12;

            const moveY = (y - 0.5) * 12;


            heroBackground.style.transform =
                `scale(1.08) translate(${moveX}px, ${moveY}px)`;

        });


        hero.addEventListener("mouseleave", () => {

            heroBackground.style.transform =
                "scale(1)";

        });

    }


    /* =====================================================
       10. COUNTER ANIMATION
    ===================================================== */

    const counters = document.querySelectorAll(
        "[data-counter]"
    );


    function animateCounter(counter) {

        const target = Number(
            counter.dataset.counter
        );

        const duration = 1800;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );


            const easeOut =
                1 - Math.pow(1 - progress, 4);


            const currentValue =
                Math.floor(target * easeOut);


            counter.textContent =
                currentValue.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.5
            }

        );


        counters.forEach((counter) => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       11. DESTINATION CARD TILT EFFECT
    ===================================================== */

    if (
        window.matchMedia("(min-width: 1024px)").matches
    ) {

        destinationCards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -3;

                const rotateY =
                    ((x - centerX) / centerX) * 3;


                card.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       12. NEWSLETTER SUBMISSION
    ===================================================== */

    const newsletterForm = document.querySelector(
        ".newsletter-form"
    );


    if (newsletterForm) {

        newsletterForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const emailInput =
                newsletterForm.querySelector(
                    'input[type="email"]'
                );

            const email =
                emailInput?.value.trim();


            if (!email) {

                showTravelToast(
                    "Please enter your email address."
                );

                return;

            }


            showTravelToast(
                "Thank you! You are subscribed to Stackly Travel."
            );


            newsletterForm.reset();

        });

    }


    /* =====================================================
       13. SMOOTH SCROLL TO DESTINATIONS
    ===================================================== */

    const exploreButtons = document.querySelectorAll(
        '[href="#destinations"], ' +
        '[href="#trending"], ' +
        '[href="#explore"]'
    );


    exploreButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            const targetId =
                button.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });


    /* =====================================================
       14. TOAST NOTIFICATION
    ===================================================== */

    function showTravelToast(message) {

        let toast = document.querySelector(
            ".stackly-travel-toast"
        );


        if (!toast) {

            toast = document.createElement("div");

            toast.className =
                "stackly-travel-toast";

            document.body.appendChild(toast);

        }


        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;


        toast.classList.add("show");


        clearTimeout(toast.timeoutId);


        toast.timeoutId = setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

    }


    /* =====================================================
       15. TOAST STYLES
    ===================================================== */

    const toastStyles = document.createElement(
        "style"
    );


    toastStyles.textContent = `

        .stackly-travel-toast {

            position: fixed;

            bottom: 30px;

            right: 30px;

            z-index: 99999;

            display: flex;

            align-items: center;

            gap: 12px;

            padding: 16px 24px;

            background: #101d3a;

            color: white;

            border-radius: 12px;

            box-shadow:
                0 15px 40px rgba(0,0,0,0.2);

            opacity: 0;

            transform: translateY(30px);

            pointer-events: none;

            transition:
                opacity 0.35s ease,
                transform 0.35s ease;

            font-size: 14px;

        }


        .stackly-travel-toast.show {

            opacity: 1;

            transform: translateY(0);

        }


        .stackly-travel-toast i {

            color: #e99a62;

            font-size: 20px;

        }


        @media(max-width:480px){

            .stackly-travel-toast {

                left: 15px;

                right: 15px;

                bottom: 20px;

                font-size: 12px;

            }

        }

    `;


    document.head.appendChild(
        toastStyles
    );


    /* =====================================================
       16. IMAGE LOADING OPTIMIZATION
    ===================================================== */

    document.querySelectorAll(
        ".destination-image, .featured-image"
    ).forEach((image) => {

        image.loading = "lazy";

        image.decoding = "async";

    });


    /* =====================================================
       17. HOMEPAGE READY
    ===================================================== */

    console.log(
        "STACKLY TRAVEL Homepage Initialized Successfully!"
    );

});