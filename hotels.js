/* =========================================================
   STACKLY TRAVEL — HOTELS PAGE
   Hotel filters, favorites, image hover, search and reveal
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. HOTEL FILTERING
    ===================================================== */

    const filterButtons = document.querySelectorAll(".hotel-filter-btn");
    const hotelCards = document.querySelectorAll(".hotel-card");

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;

            // Active button styling
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            // Filter hotel cards
            hotelCards.forEach((card) => {

                const categories = card.dataset.category || "";

                const shouldShow =
                    selectedFilter === "all" ||
                    categories.split(" ").includes(selectedFilter);

                if (shouldShow) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       2. HOTEL FAVORITES
    ===================================================== */

    const favoriteButtons = document.querySelectorAll(
        ".hotel-favorite-btn"
    );

    const FAVORITES_KEY = "stacklyTravelHotelFavorites";

    let favoriteHotels = [];

    try {

        favoriteHotels = JSON.parse(
            localStorage.getItem(FAVORITES_KEY) || "[]"
        );

    } catch (error) {

        favoriteHotels = [];

    }


    favoriteButtons.forEach((button, index) => {

        const hotelCard = button.closest(".hotel-card");

        const hotelName =
            hotelCard?.querySelector("h3")?.textContent.trim() ||
            `hotel-${index + 1}`;

        // Restore favorite state
        if (favoriteHotels.includes(hotelName)) {

            button.classList.add("favorited");
            button.innerHTML = "♥";

        }


        button.addEventListener("click", () => {

            const isFavorited = button.classList.toggle(
                "favorited"
            );

            if (isFavorited) {

                button.innerHTML = "♥";

                if (!favoriteHotels.includes(hotelName)) {
                    favoriteHotels.push(hotelName);
                }

            } else {

                button.innerHTML = "♡";

                favoriteHotels = favoriteHotels.filter(
                    (name) => name !== hotelName
                );

            }

            localStorage.setItem(
                FAVORITES_KEY,
                JSON.stringify(favoriteHotels)
            );

        });

    });


    /* =====================================================
       3. HOTEL IMAGE HOVER CHANGE
    ===================================================== */

    const hotelImages = document.querySelectorAll(
        ".hotel-card-image img[data-hover-image]"
    );

    hotelImages.forEach((image) => {

        const originalImage = image.getAttribute("src");
        const hoverImage = image.dataset.hoverImage;

        if (!hoverImage) return;

        // Preload hover image
        const preloadImage = new Image();
        preloadImage.src = hoverImage;


        image.addEventListener("mouseenter", () => {

            image.src = hoverImage;

        });


        image.addEventListener("mouseleave", () => {

            image.src = originalImage;

        });


        // Touch devices: swap on card touch
        const card = image.closest(".hotel-card");

        if (card) {

            card.addEventListener("touchstart", () => {

                image.src = hoverImage;

            }, { passive: true });

        }

    });


    /* =====================================================
       4. HOTEL SEARCH VALIDATION
    ===================================================== */

    const hotelSearchForm = document.getElementById(
        "hotelSearchForm"
    );

    const destinationInput = document.getElementById(
        "hotelDestination"
    );

    const checkinInput = document.getElementById(
        "hotelCheckin"
    );

    const checkoutInput = document.getElementById(
        "hotelCheckout"
    );

    const guestsInput = document.getElementById(
        "hotelGuests"
    );

    const searchMessage = document.getElementById(
        "hotelSearchMessage"
    );


    // Prevent selecting past dates
    if (checkinInput && checkoutInput) {

        const today = new Date();

        const localToday = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        checkinInput.min = localToday;
        checkoutInput.min = localToday;


        checkinInput.addEventListener("change", () => {

            checkoutInput.min = checkinInput.value;

            if (
                checkoutInput.value &&
                checkoutInput.value <= checkinInput.value
            ) {

                checkoutInput.value = "";

            }

        });

    }


    if (hotelSearchForm) {

        hotelSearchForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const destination = destinationInput.value.trim();
            const checkin = checkinInput.value;
            const checkout = checkoutInput.value;
            const guests = guestsInput.value;


            // Destination validation
            if (!destination) {

                searchMessage.textContent =
                    "Please enter your destination.";

                destinationInput.focus();

                return;

            }


            // Date validation
            if (!checkin || !checkout) {

                searchMessage.textContent =
                    "Please select your check-in and check-out dates.";

                return;

            }


            if (checkout <= checkin) {

                searchMessage.textContent =
                    "Check-out date must be after check-in date.";

                checkoutInput.focus();

                return;

            }


            // Prepare search URL
            const searchParams = new URLSearchParams({

                destination: destination,
                checkin: checkin,
                checkout: checkout,
                guests: guests

            });


            searchMessage.textContent =
                "Searching stays for " + destination + "...";


            /*
              Frontend demo:
              Redirect to bookings page with search parameters.
              Real hotel availability requires backend/API integration.
            */

            setTimeout(() => {

                window.location.href =
                    `bookings.html?${searchParams.toString()}`;

            }, 500);

        });

    }
        /* =====================================================
       5. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".hotels-page .stackly-reveal"
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

        revealElements.forEach((element) => {

            element.classList.add("revealed");

        });

    }


    /* =====================================================
       6. SMOOTH SCROLL FOR HOTEL PAGE LINKS
    ===================================================== */

    const hotelAnchorLinks = document.querySelectorAll(
        '.hotels-page a[href^="#"]'
    );

    hotelAnchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });


    /* =====================================================
       7. INITIALIZE HOTEL PAGE
    ===================================================== */

    console.log("STACKLY Hotels page initialized successfully.");

});