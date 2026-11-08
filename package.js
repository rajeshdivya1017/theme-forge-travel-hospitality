/* =========================================================
   STACKLY TRAVEL — PACKAGE DETAILS & BOOKING FLOW
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. URL PARAMETERS
    ===================================================== */

    const params = new URLSearchParams(window.location.search);

    const destinationParam =
        params.get("destination") || "Maldives";

    const dateParam =
        params.get("date") || "";

    const travelersParam =
        params.get("travelers") || "2";


    /* =====================================================
       2. DESTINATION DATA
    ===================================================== */

    const destinationData = {

        "maldives": {
            name: "Maldives",
            description:
                "Experience crystal-clear waters, white sandy beaches and luxurious island escapes.",
            overview:
                "Discover the breathtaking Maldives, a tropical paradise known for its turquoise lagoons, beautiful coral reefs and peaceful island resorts.",
            highlights: [
                "Crystal-clear beaches",
                "Luxury island resorts",
                "Snorkeling and diving",
                "Sunset cruises"
            ],
            duration: "5–7 Days",
            bestTime: "November – April",
            language: "Dhivehi, English",
            currency: "Maldivian Rufiyaa",
            price: 899
        },

        "switzerland": {
            name: "Switzerland",
            description:
                "Explore stunning alpine mountains, peaceful lakes and charming Swiss villages.",
            overview:
                "Switzerland offers spectacular mountain scenery, beautiful lakes, scenic train journeys and charming European towns.",
            highlights: [
                "Swiss Alps",
                "Scenic train journeys",
                "Beautiful mountain lakes",
                "Charming villages"
            ],
            duration: "6–8 Days",
            bestTime: "June – September",
            language: "German, French, Italian",
            currency: "Swiss Franc",
            price: 1299
        },

        "dubai": {
            name: "Dubai",
            description:
                "Discover futuristic architecture, desert adventures and luxury shopping.",
            overview:
                "Dubai combines modern skyscrapers, luxurious experiences, traditional markets and exciting desert adventures.",
            highlights: [
                "Burj Khalifa",
                "Desert safari",
                "Luxury shopping",
                "Dubai Marina"
            ],
            duration: "4–6 Days",
            bestTime: "November – March",
            language: "Arabic, English",
            currency: "UAE Dirham",
            price: 799
        },

        "bali": {
            name: "Bali",
            description:
                "Enjoy tropical beaches, green rice terraces and peaceful island culture.",
            overview:
                "Bali is a tropical destination featuring lush landscapes, traditional temples, beautiful beaches and unique culture.",
            highlights: [
                "Ubud rice terraces",
                "Tropical beaches",
                "Traditional temples",
                "Waterfalls"
            ],
            duration: "5–7 Days",
            bestTime: "April – October",
            language: "Indonesian",
            currency: "Indonesian Rupiah",
            price: 749
        },

        "japan": {
            name: "Japan",
            description:
                "Experience Japanese culture, modern cities and breathtaking landscapes.",
            overview:
                "Japan blends traditional temples, modern cities, seasonal landscapes and exceptional food experiences.",
            highlights: [
                "Mount Fuji",
                "Tokyo city experience",
                "Traditional temples",
                "Japanese cuisine"
            ],
            duration: "7–10 Days",
            bestTime: "March – May",
            language: "Japanese",
            currency: "Japanese Yen",
            price: 1499
        },

        "thailand": {
            name: "Thailand",
            description:
                "Explore vibrant cities, tropical islands and unforgettable local cuisine.",
            overview:
                "Thailand is famous for its tropical beaches, vibrant street markets, cultural temples and welcoming atmosphere.",
            highlights: [
                "Phuket beaches",
                "Bangkok city",
                "Island adventures",
                "Thai cuisine"
            ],
            duration: "5–7 Days",
            bestTime: "November – March",
            language: "Thai",
            currency: "Thai Baht",
            price: 699
        },

        "paris": {
            name: "Paris",
            description:
                "Experience romantic streets, iconic landmarks and French culture.",
            overview:
                "Paris is known for its iconic architecture, museums, elegant streets, French cuisine and romantic atmosphere.",
            highlights: [
                "Eiffel Tower",
                "Louvre Museum",
                "Seine river cruise",
                "French cuisine"
            ],
            duration: "4–6 Days",
            bestTime: "April – June",
            language: "French",
            currency: "Euro",
            price: 1199
        },

        "manali": {
            name: "Manali",
            description:
                "Enjoy mountain adventures, scenic valleys and peaceful Himalayan landscapes.",
            overview:
                "Manali is a beautiful mountain destination with snow-covered peaks, scenic valleys and exciting outdoor activities.",
            highlights: [
                "Himalayan mountain views",
                "Solang Valley",
                "Adventure activities",
                "Mountain cafes"
            ],
            duration: "4–6 Days",
            bestTime: "October – June",
            language: "Hindi",
            currency: "Indian Rupee",
            price: 399
        }

    };


    /* =====================================================
       3. FIND DESTINATION
    ===================================================== */

    const normalizedDestination =
        destinationParam.trim().toLowerCase();

    let destination = destinationData[
        normalizedDestination
    ];


    // Handle destination names with country names
    if (!destination) {

        const matchingKey = Object.keys(destinationData)
            .find((key) => {

                return normalizedDestination.includes(key);

            });

        if (matchingKey) {

            destination = destinationData[matchingKey];

        }

    }


    // Generic fallback for unknown destinations
    if (!destination) {

        const formattedName = destinationParam
            .split(/[\s-]+/)
            .map((word) => {

                return word.charAt(0).toUpperCase() +
                    word.slice(1).toLowerCase();

            })
            .join(" ");

        destination = {

            name: formattedName,

            description:
                `Discover beautiful experiences and attractions in ${formattedName}.`,

            overview:
                `Explore ${formattedName} with STACKLY Travel and create unforgettable travel memories.`,

            highlights: [
                "Explore local attractions",
                "Discover local culture",
                "Enjoy local cuisine",
                "Create memorable experiences"
            ],

            duration: "5–7 Days",
            bestTime: "Check local seasons",
            language: "Local language",
            currency: "Local currency",
            price: 499

        };

    }



    /* =====================================================
       4. SELECT PAGE ELEMENTS
    ===================================================== */

    const titleElement =
        document.getElementById("packageDestinationTitle");

    const descriptionElement =
        document.getElementById("packageDestinationDescription");

    const breadcrumbElement =
        document.getElementById("packageBreadcrumbDestination");

    const overviewTitleElement =
        document.getElementById("packageOverviewTitle");

    const overviewDescriptionElement =
        document.getElementById("packageOverviewDescription");

    const aboutElement =
        document.getElementById("packageAboutText");

    const durationElement =
        document.getElementById("packageDuration");

    const bestTimeElement =
        document.getElementById("packageBestTime");

    const languageElement =
        document.getElementById("packageLanguage");

    const currencyElement =
        document.getElementById("packageCurrency");

    const destinationInput =
        document.getElementById("packageBookingDestination");

    const dateInput =
        document.getElementById("packageBookingDate");

    const travelerInput =
        document.getElementById("packageBookingTravelers");

    const priceElement =
        document.getElementById("packageStartingPrice");

    const highlightsContainer =
        document.getElementById("packageHighlights");



    /* =====================================================
       5. UPDATE DESTINATION CONTENT
    ===================================================== */

    document.title =
        `${destination.name} Travel Package | STACKLY Travel`;

    if (titleElement) {
        titleElement.textContent = destination.name;
    }

    if (descriptionElement) {
        descriptionElement.textContent =
            destination.description;
    }

    if (breadcrumbElement) {
        breadcrumbElement.textContent =
            destination.name;
    }

    if (overviewTitleElement) {
        overviewTitleElement.textContent =
            `Discover ${destination.name}`;
    }

    if (overviewDescriptionElement) {
        overviewDescriptionElement.textContent =
            destination.overview;
    }

    if (aboutElement) {
        aboutElement.textContent =
            destination.overview;
    }

    if (durationElement) {
        durationElement.textContent =
            destination.duration;
    }

    if (bestTimeElement) {
        bestTimeElement.textContent =
            destination.bestTime;
    }

    if (languageElement) {
        languageElement.textContent =
            destination.language;
    }

    if (currencyElement) {
        currencyElement.textContent =
            destination.currency;
    }

    if (destinationInput) {
        destinationInput.value =
            destination.name;
    }

    if (priceElement) {
        priceElement.textContent =
            `$${destination.price.toLocaleString("en-US")}`;
    }



    /* =====================================================
       6. RENDER HIGHLIGHTS
    ===================================================== */

    if (highlightsContainer) {

        highlightsContainer.innerHTML = "";

        destination.highlights.forEach((highlight, index) => {

            const icons = [
                "fa-star",
                "fa-location-dot",
                "fa-camera",
                "fa-heart"
            ];

            const item = document.createElement("div");

            item.className = "package-highlight-item";

            const icon = document.createElement("span");

            icon.className = "package-highlight-icon";

            const iconElement = document.createElement("i");

            iconElement.className =
                `fa-solid ${icons[index % icons.length]}`;

            icon.appendChild(iconElement);


            const text = document.createElement("span");

            text.textContent = highlight;


            item.appendChild(icon);

            item.appendChild(text);

            highlightsContainer.appendChild(item);

        });

    }



    /* =====================================================
       7. TRAVEL DATE
    ===================================================== */

    function getTodayLocalDate() {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }


    const todayString = getTodayLocalDate();

    if (dateInput) {

        dateInput.min = todayString;

        if (dateParam && dateParam >= todayString) {

            dateInput.value = dateParam;

        } else {

            dateInput.value = "";

        }

    }



    /* =====================================================
       8. TRAVELERS
    ===================================================== */

    if (travelerInput) {

        const parsedTravelers =
            Number.parseInt(travelersParam, 10);

        if (
            Number.isInteger(parsedTravelers) &&
            parsedTravelers >= 1 &&
            parsedTravelers <= 5
        ) {

            travelerInput.value =
                String(parsedTravelers);

        } else {

            travelerInput.value = "2";

        }

    }



    /* =====================================================
       9. BOOK TRIP BUTTON
       Saves booking in existing bookings localStorage
    ===================================================== */

    const bookButton =
        document.getElementById("packageBookButton");

    if (bookButton) {

        bookButton.addEventListener("click", () => {

            const selectedDate =
                dateInput?.value || "";

            const selectedTravelers =
                Number(travelerInput?.value || 2);


            /* Validate travel date */

            if (!selectedDate) {

                showPackageMessage(
                    "Please select your travel date."
                );

                dateInput?.focus();

                return;

            }


            if (selectedDate < todayString) {

                showPackageMessage(
                    "Please select a future travel date."
                );

                dateInput?.focus();

                return;

            }


            /* Validate travelers */

            if (
                !Number.isInteger(selectedTravelers) ||
                selectedTravelers < 1
            ) {

                showPackageMessage(
                    "Please select a valid number of travelers."
                );

                travelerInput?.focus();

                return;

            }


            /* Calculate demo total */

            const totalPrice =
                destination.price * selectedTravelers;


            /* Calculate end date (5-day demo trip) */

            const startDate =
                new Date(`${selectedDate}T12:00:00`);

            const endDate =
                new Date(startDate);

            endDate.setDate(
                endDate.getDate() + 5
            );


            const endDateString = [
                endDate.getFullYear(),

                String(
                    endDate.getMonth() + 1
                ).padStart(2, "0"),

                String(
                    endDate.getDate()
                ).padStart(2, "0")

            ].join("-");


            /* Booking object compatible with bookings.js */

            const booking = {

                id: generateBookingId(),

                destination: destination.name,

                location: destination.name,

                type: "Travel Package",

                image: "",

                startDate: selectedDate,

                endDate: endDateString,

                guests: selectedTravelers,

                price: totalPrice,

                status: "upcoming",

                description:
                    `STACKLY Travel package for ${selectedTravelers} traveler(s).`

            };


            /* Read existing bookings */

            let bookings = [];

            try {

                const storedBookings =
                    localStorage.getItem(
                        "stacklyTravelBookings"
                    );

                if (storedBookings) {

                    const parsedBookings =
                        JSON.parse(storedBookings);

                    if (Array.isArray(parsedBookings)) {

                        bookings = parsedBookings;

                    }

                }

            } catch (error) {

                console.error(
                    "Could not read bookings:",
                    error
                );

                showPackageMessage(
                    "Unable to access saved bookings. Please try again."
                );

                return;

            }


            /* Save booking */

            bookings.unshift(booking);

            try {

                localStorage.setItem(
                    "stacklyTravelBookings",
                    JSON.stringify(bookings)
                );

            } catch (error) {

                console.error(
                    "Could not save booking:",
                    error
                );

                showPackageMessage(
                    "Unable to save your booking. Please try again."
                );

                return;

            }


            /* Redirect to My Bookings */

            const bookingParams = new URLSearchParams({

                booking: booking.id,

                destination: destination.name

            });


            window.location.href =
                `bookings.html?${bookingParams.toString()}`;

        });

    }



    /* =====================================================
       10. BOOKING ID
    ===================================================== */

    function generateBookingId() {

        const randomNumber = Math.floor(
            100000 + Math.random() * 900000
        );

        return `STK-${new Date().getFullYear()}-${randomNumber}`;

    }



    /* =====================================================
       11. USER MESSAGE
    ===================================================== */

    function showPackageMessage(message) {

        let messageElement =
            document.getElementById("packageMessage");

        if (!messageElement) {

            messageElement =
                document.createElement("div");

            messageElement.id = "packageMessage";

            messageElement.className =
                "package-form-message";

            bookButton?.insertAdjacentElement(
                "beforebegin",
                messageElement
            );

        }

        messageElement.textContent = message;

        messageElement.style.display = "block";

        messageElement.style.marginTop = "15px";

        messageElement.style.padding = "12px";

        messageElement.style.borderRadius = "8px";

        messageElement.style.background = "#fff1f0";

        messageElement.style.color = "#b42318";

        messageElement.style.fontSize = "13px";

        messageElement.setAttribute(
            "role",
            "alert"
        );

    }



    /* =====================================================
       12. SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        '.package-page a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});