
/* =========================================================
   STACKLY TRAVEL — FLIGHTS PAGE
   SEARCH + DEMO RESULTS + BOOKING + TAKEOFF ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================== */

    const flightSearchForm = document.getElementById("flightSearchForm");
    const flightFrom = document.getElementById("flightFrom");
    const flightTo = document.getElementById("flightTo");
    const flightDeparture = document.getElementById("flightDeparture");
    const flightReturn = document.getElementById("flightReturn");
    const flightReturnGroup = document.getElementById("flightReturnGroup");
    const flightTravelers = document.getElementById("flightTravelers");

    const flightSwapBtn =
        document.getElementById("flightSwapButton") ||
        document.getElementById("flightSwapBtn");

    const flightSearchMessage = document.getElementById("flightSearchMessage");
    const flightResults = document.getElementById("flightResults");
    const flightBookingAnimation =
        document.getElementById("flightBookingAnimation");

    const tripTypeInputs = document.querySelectorAll('input[name="tripType"]');

    let currentSearch = null;
    let selectedFlight = null;
    let bookingInProgress = false;


    /* =========================================
       DATE SETUP
    ========================================== */

    function getLocalDateString(date = new Date()) {
        const localDate = new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
        );

        return localDate.toISOString().split("T")[0];
    }

    const today = getLocalDateString();

    if (flightDeparture) flightDeparture.min = today;
    if (flightReturn) flightReturn.min = today;

    if (flightDeparture && flightReturn) {
        flightDeparture.addEventListener("change", () => {
            flightReturn.min = flightDeparture.value || today;

            if (
                flightReturn.value &&
                flightReturn.value < flightDeparture.value
            ) {
                flightReturn.value = "";
            }
        });
    }


    /* =========================================
       TRIP TYPE
    ========================================== */

    function updateTripType() {
        const selectedTrip = document.querySelector(
            'input[name="tripType"]:checked'
        );

        if (!selectedTrip) return;

        tripTypeInputs.forEach((input) => {
            const label = input.closest(".flight-trip-option");

            if (label) {
                label.classList.toggle("active", input.checked);
            }
        });

        const isOneWay =
            selectedTrip.value === "oneWay" ||
            selectedTrip.value === "one-way";

        if (flightReturnGroup && flightReturn) {
            flightReturnGroup.style.display = isOneWay ? "none" : "";
            flightReturn.required = !isOneWay;

            if (isOneWay) {
                flightReturn.value = "";
            }
        }
    }

    tripTypeInputs.forEach((input) => {
        input.addEventListener("change", updateTripType);
    });

    updateTripType();


    /* =========================================
       SWAP CITIES
    ========================================== */

    if (flightSwapBtn && flightFrom && flightTo) {
        flightSwapBtn.addEventListener("click", () => {
            const temp = flightFrom.value;

            flightFrom.value = flightTo.value;
            flightTo.value = temp;

            flightSwapBtn.classList.add("flight-swap-animated");

            setTimeout(() => {
                flightSwapBtn.classList.remove("flight-swap-animated");
            }, 400);
        });
    }


    /* =========================================
       MESSAGE HELPER
    ========================================== */

    function showFlightMessage(message, type = "success") {
        if (!flightSearchMessage) return;

        flightSearchMessage.textContent = message;
        flightSearchMessage.className =
            "flight-search-message show " + type;
    }

    function hideFlightMessage() {
        if (!flightSearchMessage) return;

        flightSearchMessage.textContent = "";
        flightSearchMessage.className = "flight-search-message";
    }


    /* =========================================
       DATE FORMATTER
    ========================================== */

    function formatDate(dateString) {
        if (!dateString) return "Not selected";

        const date = new Date(dateString + "T00:00:00");

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }


    /* =========================================
       DEMO FLIGHT DATA GENERATOR
       These are sample flights, not live airline data.
    ========================================== */

    function generateDemoFlights(search) {
        const airlines = [
            {
                name: "STACKLY Air",
                code: "SA",
                icon: "✈️",
                price: 4599,
                departureTime: "06:20",
                arrivalTime: "08:45",
                duration: "2h 25m"
            },
            {
                name: "SkyWay Airlines",
                code: "SW",
                icon: "🌤️",
                price: 5299,
                departureTime: "10:15",
                arrivalTime: "12:50",
                duration: "2h 35m"
            },
            {
                name: "AeroVista",
                code: "AV",
                icon: "🌎",
                price: 6199,
                departureTime: "15:40",
                arrivalTime: "18:05",
                duration: "2h 25m"
            }
        ];

        return airlines.map((airline, index) => ({
            ...airline,
            id: `FL-${Date.now()}-${index}`,
            from: search.from,
            to: search.to,
            departure: search.departure,
            returnDate: search.returnDate,
            tripType: search.tripType,
            travelers: Number(search.travelers),
            totalPrice: airline.price * Number(search.travelers)
        }));
    }


    /* =========================================
       RENDER FLIGHT RESULTS
    ========================================== */

    function renderFlightResults(flights) {
        if (!flightResults) return;

        flightResults.innerHTML = `
            <div class="flight-results-heading">
                <span class="flight-section-label">AVAILABLE DEMO FLIGHTS</span>

                <h2>
                    Flights from
                    <span>${escapeHTML(currentSearch.from)}</span>
                    to
                    <span>${escapeHTML(currentSearch.to)}</span>
                </h2>

                <p>
                    ${formatDate(currentSearch.departure)}
                    ${currentSearch.returnDate
                        ? ` · Return ${formatDate(currentSearch.returnDate)}`
                        : " · One-way"}
                    · ${currentSearch.travelers} traveler(s)
                </p>

                <div class="flight-demo-notice">
                    Demo flight listings — prices and schedules are illustrative.
                </div>
            </div>

            <div class="flight-results-list">
                ${flights.map((flight) => `
                    <article class="flight-result-card">

                        <div class="flight-result-airline">
                            <div class="flight-airline-icon">${flight.icon}</div>

                            <div>
                                <strong>${flight.name}</strong>
                                <span>${flight.code} · Demo flight</span>
                            </div>
                        </div>

                        <div class="flight-result-route">

                            <div class="flight-result-time">
                                <strong>${flight.departureTime}</strong>
                                <span>${escapeHTML(flight.from)}</span>
                            </div>

                            <div class="flight-result-duration">
                                <span>${flight.duration}</span>
                                <div class="flight-duration-line">✈</div>
                                <small>${currentSearch.tripType === "oneWay" ? "One way" : "Round trip"}</small>
                            </div>

                            <div class="flight-result-time">
                                <strong>${flight.arrivalTime}</strong>
                                <span>${escapeHTML(flight.to)}</span>
                            </div>

                        </div>

                        <div class="flight-result-price">
                            <span>Per traveler</span>
                            <strong>₹${flight.price.toLocaleString("en-IN")}</strong>
                            <small>Total ₹${flight.totalPrice.toLocaleString("en-IN")}</small>

                            <button
                                type="button"
                                class="flight-book-btn"
                                data-book-flight="${flight.id}">

                                Book Flight →
                            </button>
                        </div>

                    </article>
                `).join("")}
            </div>
        `;

        flightResults.classList.add("show");

        flightResults.querySelectorAll("[data-book-flight]").forEach((button) => {
            button.addEventListener("click", () => {
                const flightId = button.dataset.bookFlight;

                selectedFlight = flights.find(
                    (flight) => flight.id === flightId
                );

                if (selectedFlight) {
                    bookSelectedFlight(button);
                }
            });
        });
    }


    /* =========================================
       ESCAPE HTML
    ========================================== */

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, (character) => {
            const replacements = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return replacements[character];
        });
    }


    /* =========================================
       SEARCH SUBMIT
    ========================================== */

    if (flightSearchForm) {
        flightSearchForm.addEventListener("submit", (event) => {
            event.preventDefault();

            hideFlightMessage();

            const from = flightFrom?.value.trim() || "";
            const to = flightTo?.value.trim() || "";
            const departure = flightDeparture?.value || "";
            const returnDate = flightReturn?.value || "";
            const travelers = Number(flightTravelers?.value || 1);

            const selectedTrip = document.querySelector(
                'input[name="tripType"]:checked'
            );

            const selectedTripValue = selectedTrip?.value || "roundTrip";

            const tripType =
                selectedTripValue === "oneWay" ||
                selectedTripValue === "one-way"
                    ? "oneWay"
                    : "roundTrip";


            if (!from) {
                showFlightMessage("Please enter your departure city.", "error");
                flightFrom?.focus();
                return;
            }

            if (!to) {
                showFlightMessage("Please enter your destination city.", "error");
                flightTo?.focus();
                return;
            }

            if (from.toLowerCase() === to.toLowerCase()) {
                showFlightMessage(
                    "Departure and destination cities cannot be the same.",
                    "error"
                );

                flightTo?.focus();
                return;
            }

            if (!departure) {
                showFlightMessage("Please select your departure date.", "error");
                flightDeparture?.focus();
                return;
            }

            if (departure < today) {
                showFlightMessage(
                    "Departure date cannot be in the past.",
                    "error"
                );

                flightDeparture?.focus();
                return;
            }

            if (tripType === "roundTrip" && !returnDate) {
                showFlightMessage("Please select your return date.", "error");
                flightReturn?.focus();
                return;
            }

            if (
                tripType === "roundTrip" &&
                returnDate < departure
            ) {
                showFlightMessage(
                    "Return date must be on or after the departure date.",
                    "error"
                );

                flightReturn?.focus();
                return;
            }

            currentSearch = {
                from,
                to,
                departure,
                returnDate: tripType === "roundTrip" ? returnDate : null,
                travelers,
                tripType
            };

            try {
                sessionStorage.setItem(
                    "stacklyFlightSearch",
                    JSON.stringify(currentSearch)
                );
            } catch (error) {
                console.warn("Could not save flight search.", error);
            }

            showFlightMessage(
                `Searching ${tripType === "oneWay" ? "one-way" : "round-trip"} flights from ${from} to ${to}...`,
                "success"
            );

            if (flightBookingAnimation) {
                flightBookingAnimation.classList.remove("show");
                flightBookingAnimation.setAttribute("aria-hidden", "true");
            }

            const flights = generateDemoFlights(currentSearch);

            renderFlightResults(flights);

            flightResults?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }


    /* =========================================
       SAVE FLIGHT BOOKING
    ========================================== */

    function bookSelectedFlight(button) {
        if (!selectedFlight || bookingInProgress) return;

        bookingInProgress = true;

        if (button) {
            button.disabled = true;
            button.textContent = "Booking...";
        }

        const bookingId =
            "STK-FLT-" + Math.floor(100000 + Math.random() * 900000);

        const booking = {
            id: bookingId,
            destination: selectedFlight.to,
            location: `${selectedFlight.from} → ${selectedFlight.to}`,
            type: "Flight",
            image: "",
            startDate: selectedFlight.departure,
            endDate: selectedFlight.returnDate || selectedFlight.departure,
            guests: selectedFlight.travelers,
            price: selectedFlight.totalPrice,
            status: "upcoming",
            description:
                `${selectedFlight.name} flight from ${selectedFlight.from} to ${selectedFlight.to}. ` +
                `${selectedFlight.departureTime} - ${selectedFlight.arrivalTime}. ` +
                `${selectedFlight.tripType === "oneWay" ? "One-way" : "Round-trip"}.`
        };

        try {
            const existingBookings = JSON.parse(
                localStorage.getItem("stacklyTravelBookings") || "[]"
            );

            if (!Array.isArray(existingBookings)) {
                throw new Error("Invalid booking storage format");
            }

            existingBookings.unshift(booking);

            localStorage.setItem(
                "stacklyTravelBookings",
                JSON.stringify(existingBookings)
            );

            sessionStorage.setItem(
                "stacklyLastFlightBooking",
                JSON.stringify(booking)
            );

            showFlightBookingSuccess(booking);

        } catch (error) {
            console.error("Flight booking save failed:", error);

            showFlightMessage(
                "Unable to save your booking. Please check browser storage and try again.",
                "error"
            );

            if (button) {
                button.disabled = false;
                button.textContent = "Book Flight →";
            }

            bookingInProgress = false;
        }
    }


    /* =========================================
       BOOKING SUCCESS + PLANE TAKEOFF
    ========================================== */

    function showFlightBookingSuccess(booking) {
        if (!flightBookingAnimation) {
            showFlightMessage(
                "Flight booking saved successfully! Booking ID: " + booking.id,
                "success"
            );

            bookingInProgress = false;
            return;
        }

        flightBookingAnimation.innerHTML = `
            <div class="flight-animation-sky">

                <span class="flight-animation-cloud cloud-one">☁</span>
                <span class="flight-animation-cloud cloud-two">☁</span>
                <span class="flight-animation-cloud cloud-three">☁</span>

                <div class="flight-animation-plane">✈️</div>

            </div>

            <div class="flight-booking-success-content">

                <div class="flight-success-icon">✓</div>

                <span class="flight-success-label">
                    BOOKING CONFIRMED
                </span>

                <h2>
                    Flight Booked
                    <span>Successfully!</span>
                </h2>

                <p>
                    Your journey from
                    <strong>${escapeHTML(booking.location)}</strong>
                    is ready for takeoff!
                </p>

                <div class="flight-confirmation-details">
                    <span>Booking ID</span>
                    <strong>${escapeHTML(booking.id)}</strong>

                    <span>Travel Date</span>
                    <strong>${formatDate(booking.startDate)}</strong>

                    <span>Travelers</span>
                    <strong>${booking.guests}</strong>

                    <span>Total Amount</span>
                    <strong>₹${booking.price.toLocaleString("en-IN")}</strong>
                </div>

                <a
                    href="bookings.html?booking=${encodeURIComponent(booking.id)}"
                    class="flight-confirmation-btn">

                    View My Bookings →
                </a>

            </div>
        `;

        flightBookingAnimation.classList.add("show");
        flightBookingAnimation.setAttribute("aria-hidden", "false");

        flightBookingAnimation.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        showFlightMessage(
            "Your demo flight booking has been saved successfully!",
            "success"
        );

        setTimeout(() => {
            bookingInProgress = false;
        }, 1800);
    }


    /* =========================================
       ROUTE CARD AUTOFILL
    ========================================== */

    document.querySelectorAll("[data-flight-destination]").forEach((button) => {
        button.addEventListener("click", () => {
            const destination = button.dataset.flightDestination;

            if (flightTo && destination) {
                flightTo.value = destination;

                setTimeout(() => {
                    flightFrom?.focus();
                }, 250);
            }
        });
    });


    /* =========================================
       REVEAL ANIMATIONS
    ========================================== */

    const flightRevealElements = document.querySelectorAll(
        ".flight-route-card, .flight-benefit-card, .flight-search-heading, .flight-routes-heading, .flight-benefits-heading"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("flight-reveal-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        flightRevealElements.forEach((element, index) => {
            element.classList.add("flight-reveal");
            element.style.transitionDelay =
                `${Math.min(index % 4, 3) * 100}ms`;

            revealObserver.observe(element);
        });
    } else {
        flightRevealElements.forEach((element) => {
            element.classList.add("flight-reveal-visible");
        });
    }


    /* =========================================
       SMOOTH INTERNAL SCROLL
    ========================================== */

    document.querySelectorAll('.flights-page a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* =========================================
       ACCESSIBILITY: REDUCED MOTION
    ========================================== */

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.documentElement.classList.add("reduce-flight-motion");
    }


    console.log("STACKLY Travel Flights Page Initialized ✈️");

});
