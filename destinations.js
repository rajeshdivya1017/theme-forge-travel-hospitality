/* =========================================================
   STACKLY TRAVEL — DESTINATIONS PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. DESTINATION FILTERS
    ===================================================== */

    const filterButtons = document.querySelectorAll(
        ".destination-filter"
    );

    const destinationCards = document.querySelectorAll(
        ".destination-card"
    );

    const noResultsMessage = document.querySelector(
        ".destination-no-results"
    );


    if (filterButtons.length && destinationCards.length) {

        filterButtons.forEach((button) => {

            button.addEventListener("click", () => {

                const selectedFilter = button.dataset.filter;

                // Active button
                filterButtons.forEach((filterButton) => {
                    filterButton.classList.remove("active");
                });

                button.classList.add("active");


                let visibleCards = 0;


                destinationCards.forEach((card) => {

                    const categories = (
                        card.dataset.category || ""
                    ).split(" ");

                    const shouldShow =
                        selectedFilter === "all" ||
                        categories.includes(selectedFilter);


                    if (shouldShow) {

                        card.hidden = false;

                        card.classList.remove("filter-hidden");

                        card.classList.remove("filter-visible");

                        // Restart animation
                        void card.offsetWidth;

                        card.classList.add("filter-visible");

                        visibleCards++;

                    } else {

                        card.hidden = true;

                        card.classList.remove("filter-visible");

                        card.classList.add("filter-hidden");

                    }

                });


                // No results state
                if (noResultsMessage) {

                    noResultsMessage.hidden = visibleCards !== 0;

                }

            });

        });

    }



    /* =====================================================
       2. DESTINATION FAVORITES / WISHLIST
    ===================================================== */

    const favoriteButtons = document.querySelectorAll(
        ".destination-favorite"
    );

    const FAVORITES_STORAGE_KEY =
        "stacklyTravelDestinationFavorites";


    function getSavedFavorites() {

        try {

            const savedFavorites = localStorage.getItem(
                FAVORITES_STORAGE_KEY
            );

            return savedFavorites
                ? JSON.parse(savedFavorites)
                : [];

        } catch (error) {

            console.warn(
                "Could not load destination favorites.",
                error
            );

            return [];

        }

    }


    function saveFavorites(favorites) {

        try {

            localStorage.setItem(
                FAVORITES_STORAGE_KEY,
                JSON.stringify(favorites)
            );

        } catch (error) {

            console.warn(
                "Could not save destination favorites.",
                error
            );

        }

    }


    let favorites = getSavedFavorites();


    favoriteButtons.forEach((button) => {

        const card = button.closest(".destination-card");

        const destinationName = card
            ?.querySelector("h3")
            ?.textContent
            ?.trim();


        if (!destinationName) return;


        // Restore saved state
        if (favorites.includes(destinationName)) {

            button.classList.add("active");

            button.innerHTML = "♥";

            button.setAttribute(
                "aria-label",
                `Remove ${destinationName} from favorites`
            );

        }


        button.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();


            const isFavorite = favorites.includes(
                destinationName
            );


            if (isFavorite) {

                favorites = favorites.filter(
                    (item) => item !== destinationName
                );

                button.classList.remove("active");

                button.innerHTML = "♡";

                button.setAttribute(
                    "aria-label",
                    `Add ${destinationName} to favorites`
                );


            } else {

                favorites.push(destinationName);

                button.classList.add("active");

                button.innerHTML = "♥";

                button.setAttribute(
                    "aria-label",
                    `Remove ${destinationName} from favorites`
                );


                // Small animation
                button.animate(
                    [
                        {
                            transform: "scale(1)"
                        },
                        {
                            transform: "scale(1.3)"
                        },
                        {
                            transform: "scale(1)"
                        }
                    ],
                    {
                        duration: 350,
                        easing: "ease-out"
                    }
                );

            }


            saveFavorites(favorites);

        });

    });



    /* =====================================================
       3. DESTINATION IMAGE HOVER SWAP
    ===================================================== */

    /* =====================================================
   3. DESTINATION IMAGE HOVER SWAP
===================================================== */

const destinationImageContainers = document.querySelectorAll(
    ".destination-card-image"
);

destinationImageContainers.forEach((container) => {

    const image = container.querySelector("img[data-hover-image]");

    if (!image) return;

    const originalImage = image.getAttribute("src");
    const hoverImage = image.getAttribute("data-hover-image");

    if (!originalImage || !hoverImage) return;

    // Preload hover image
    const preloadImage = new Image();
    preloadImage.src = hoverImage;

    // Desktop hover
    container.addEventListener("mouseenter", () => {

        if (window.matchMedia("(hover: hover)").matches) {
            image.src = hoverImage;
        }

    });

    container.addEventListener("mouseleave", () => {

        image.src = originalImage;

    });

    // Touch screen preview
    container.addEventListener("touchstart", () => {

        if (!window.matchMedia("(hover: hover)").matches) {

            image.src = hoverImage;

            window.setTimeout(() => {
                image.src = originalImage;
            }, 1200);

        }

    }, { passive: true });

});


    /* =====================================================
       4. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".destinations-page .stackly-reveal"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });


    } else {

        // Fallback for older browsers
        revealElements.forEach((element) => {

            element.classList.add("revealed");

        });

    }



    /* =====================================================
       5. DESTINATION CARD STAGGER ANIMATION
    ===================================================== */

    destinationCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${(index % 3) * 80}ms`;

    });



    /* =====================================================
       6. SMOOTH SCROLL FOR DESTINATION ANCHORS
    ===================================================== */

    document.querySelectorAll(
        '.destinations-page a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;


            const targetElement = document.querySelector(
                targetId
            );


            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });



    /* =====================================================
       7. HERO PARALLAX EFFECT
    ===================================================== */

    const heroSection = document.querySelector(
        ".destinations-hero"
    );


    if (
        heroSection &&
        window.matchMedia("(hover: hover)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        window.addEventListener("scroll", () => {

            const scrollPosition = window.scrollY;

            if (scrollPosition < heroSection.offsetHeight) {

                heroSection.style.backgroundPositionY =
                    `${scrollPosition * 0.35}px`;

            }

        }, {
            passive: true
        });

    }



    /* =====================================================
       8. INITIAL PAGE STATE
    ===================================================== */

    // Show all destinations initially
    destinationCards.forEach((card) => {

        card.hidden = false;

    });


    if (noResultsMessage) {

        noResultsMessage.hidden = true;

    }


    console.log(
        "STACKLY Destinations page initialized successfully."
    );

});