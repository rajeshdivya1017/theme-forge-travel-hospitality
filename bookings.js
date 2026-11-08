/* =========================================================
   STACKLY TRAVEL — BOOKINGS PAGE
   Part 1: Booking Data, Storage & Statistics
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       1. DOM ELEMENTS
    ===================================================== */

    const bookingListContainer = document.getElementById(
        "bookingListContainer"
    );

    const bookingEmptyState = document.getElementById(
        "bookingEmptyState"
    );

    const bookingSearchInput = document.getElementById(
        "bookingSearchInput"
    );

    const filterButtons = document.querySelectorAll(
        ".booking-filter-btn"
    );


    /* =====================================================
       2. LOCAL STORAGE KEY
    ===================================================== */

    const STORAGE_KEY = "stacklyTravelBookings";


    /* =====================================================
       3. SAMPLE BOOKINGS
       Demo data for first-time visitors
    ===================================================== */

    const sampleBookings = [

        {
            id: "STK-2026-001",
            destination: "Bali, Indonesia",
            location: "Ubud, Bali",
            type: "Hotel",
            image: "assets/booking/booking-bali.webp",
            startDate: "2026-12-15",
            endDate: "2026-12-20",
            guests: 2,
            price: 1250,
            status: "upcoming",
            description: "Luxury tropical getaway"
        },

        {
            id: "STK-2026-002",
            destination: "Paris, France",
            location: "Paris, France",
            type: "Flight",
            image: "assets/booking/paris,france.webp",
            startDate: "2026-10-10",
            endDate: "2026-10-18",
            guests: 1,
            price: 890,
            status: "completed",
            description: "Round-trip flight to Paris"
        },

        {
            id: "STK-2026-003",
            destination: "Dubai, UAE",
            location: "Dubai, United Arab Emirates",
            type: "Hotel",
            image: "assets/booking/dubai uae.webp",
            startDate: "2026-12-28",
            endDate: "2027-01-02",
            guests: 2,
            price: 1680,
            status: "pending",
            description: "Premium city hotel"
        },

        {
            id: "STK-2026-004",
            destination: "Singapore",
            location: "Singapore",
            type: "Flight",
            image: "assets/booking/singapore.webp",
            startDate: "2026-08-05",
            endDate: "2026-08-12",
            guests: 2,
            price: 740,
            status: "completed",
            description: "Singapore holiday trip"
        },

        {
            id: "STK-2026-005",
            destination: "Maldives",
            location: "Malé, Maldives",
            type: "Hotel",
            image: "assets/booking/maldives.webp",
            startDate: "2026-11-20",
            endDate: "2026-11-25",
            guests: 2,
            price: 2100,
            status: "cancelled",
            description: "Overwater villa reservation"
        }

    ];


    /* =====================================================
       4. LOAD BOOKINGS FROM LOCAL STORAGE
    ===================================================== */

    function loadBookings() {

        try {

            const storedBookings = localStorage.getItem(STORAGE_KEY);

            if (storedBookings) {

                const parsedBookings = JSON.parse(storedBookings);

                if (Array.isArray(parsedBookings)) {
                    return parsedBookings;
                }

            }

        } catch (error) {

            console.error("Unable to load bookings:", error);

        }

        return [...sampleBookings];

    }


    /* =====================================================
       5. SAVE BOOKINGS TO LOCAL STORAGE
    ===================================================== */

    function saveBookings() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(bookings)
            );

        } catch (error) {

            console.error("Unable to save bookings:", error);

        }

    }


    /* =====================================================
       6. BOOKING STATE
    ===================================================== */

    let bookings = loadBookings();

    let currentFilter = "all";

    let currentSearch = "";


    /* =====================================================
       7. DATE FORMATTER
    ===================================================== */

    function formatDate(dateString) {

        if (!dateString) {
            return "Not specified";
        }

        const date = new Date(dateString + "T00:00:00");

        if (Number.isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

    }


    /* =====================================================
       8. PRICE FORMATTER
    ===================================================== */

    function formatPrice(price) {

        const amount = Number(price) || 0;

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }).format(amount);

    }


    /* =====================================================
       9. UPDATE STATISTICS
    ===================================================== */

    function updateBookingStatistics() {

        const total = bookings.length;

        const upcoming = bookings.filter(
            booking => booking.status === "upcoming"
        ).length;

        const completed = bookings.filter(
            booking => booking.status === "completed"
        ).length;

        const pending = bookings.filter(
            booking => booking.status === "pending"
        ).length;

        const cancelled = bookings.filter(
            booking => booking.status === "cancelled"
        ).length;


        /* Overview cards */

        const totalCount = document.getElementById(
            "totalBookingsCount"
        );

        const upcomingCount = document.getElementById(
            "upcomingBookingsCount"
        );

        const completedCount = document.getElementById(
            "completedBookingsCount"
        );

        const pendingCount = document.getElementById(
            "pendingBookingsCount"
        );


        if (totalCount) {
            totalCount.textContent = total;
        }

        if (upcomingCount) {
            upcomingCount.textContent = upcoming;
        }

        if (completedCount) {
            completedCount.textContent = completed;
        }

        if (pendingCount) {
            pendingCount.textContent = pending;
        }


        /* Filter tab counts */

        const filterCounts = {
            allBookingsFilterCount: total,
            upcomingFilterCount: upcoming,
            completedFilterCount: completed,
            pendingFilterCount: pending,
            cancelledFilterCount: cancelled
        };


        Object.entries(filterCounts).forEach(([id, count]) => {

            const element = document.getElementById(id);

            if (element) {
                element.textContent = count;
            }

        });

    }


    /* =====================================================
       10. GET STATUS LABEL
    ===================================================== */

    function getStatusLabel(status) {

        const labels = {
            upcoming: "Upcoming",
            completed: "Completed",
            pending: "Pending",
            cancelled: "Cancelled"
        };

        return labels[status] || "Unknown";

    }


    /* =====================================================
       11. GET FILTERED BOOKINGS
    ===================================================== */

    function getFilteredBookings() {

        return bookings.filter(booking => {

            const matchesFilter =
                currentFilter === "all" ||
                booking.status === currentFilter;

            const searchText = currentSearch.toLowerCase();

            const matchesSearch =
                (booking.destination || "").toLowerCase().includes(searchText) ||
                (booking.location || "").toLowerCase().includes(searchText) ||
                (booking.id || "").toLowerCase().includes(searchText) ||
                (booking.type || "").toLowerCase().includes(searchText);

            return matchesFilter && matchesSearch;

        });

    }


    /* =====================================================
       END OF PART 1
       Continue with Part 2 below
    ===================================================== */


/* =========================================================
   PART 2: RENDER BOOKING CARDS & FILTERS
========================================================= */


/* =====================================================
   12. RENDER BOOKING CARD
===================================================== */

function createBookingCard(booking) {

    const safeImage = booking.image ||
        "assets/booking/booking hero.webp";

    const startDate = formatDate(booking.startDate);
    const endDate = formatDate(booking.endDate);

    const statusLabel = getStatusLabel(booking.status);

    const isCancelled = booking.status === "cancelled";
    const isCompleted = booking.status === "completed";

    return `
        <article class="booking-card">

            <!-- Booking Image -->
            <div class="booking-card-image">

                <img
                    src="${safeImage}"
                    alt="${booking.destination || "Travel destination"}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='assets/booking/booking hero.webp';"
                >

                <span class="booking-type-label">
                    <i class="fa-solid ${
                        booking.type === "Flight"
                            ? "fa-plane"
                            : "fa-hotel"
                    }"></i>

                    ${booking.type || "Travel"}
                </span>

            </div>


            <!-- Booking Details -->
            <div class="booking-card-content">

                <div class="booking-card-top">

                    <div class="booking-card-title-area">

                        <div class="booking-card-location">
                            <i class="fa-solid fa-location-dot"></i>
                            ${booking.location || booking.destination || "Destination"}
                        </div>

                        <h3 class="booking-card-title">
                            ${booking.destination || "Travel Booking"}
                        </h3>

                        <span class="booking-card-id">
                            Booking ID: ${booking.id}
                        </span>

                    </div>

                    <span class="booking-status ${booking.status}">
                        ${statusLabel}
                    </span>

                </div>


                <!-- Booking Information -->
                <div class="booking-card-info">

                    <div class="booking-info-item">

                        <div class="booking-info-icon">
                            <i class="fa-regular fa-calendar"></i>
                        </div>

                        <div class="booking-info-text">

                            <span class="booking-info-label">
                                Check-in / Departure
                            </span>

                            <span class="booking-info-value">
                                ${startDate}
                            </span>

                        </div>

                    </div>


                    <div class="booking-info-item">

                        <div class="booking-info-icon">
                            <i class="fa-regular fa-calendar-check"></i>
                        </div>

                        <div class="booking-info-text">

                            <span class="booking-info-label">
                                Check-out / Return
                            </span>

                            <span class="booking-info-value">
                                ${endDate}
                            </span>

                        </div>

                    </div>


                    <div class="booking-info-item">

                        <div class="booking-info-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>

                        <div class="booking-info-text">

                            <span class="booking-info-label">
                                Travelers
                            </span>

                            <span class="booking-info-value">
                                ${booking.guests || 1} Guest(s)
                            </span>

                        </div>

                    </div>

                </div>


                <!-- Booking Footer -->
                <div class="booking-card-footer">

                    <div class="booking-price-area">

                        <span class="booking-price-label">
                            Total Amount
                        </span>

                        <span class="booking-price">
                            ${formatPrice(booking.price)}
                        </span>

                    </div>


                    <div class="booking-card-actions">

                        <button
                            type="button"
                            class="booking-action-btn primary"
                            data-action="details"
                            data-id="${booking.id}"
                        >
                            <i class="fa-solid fa-eye"></i>
                            View Details
                        </button>


                        ${
                            !isCancelled && !isCompleted
                                ? `
                                    <button
                                        type="button"
                                        class="booking-action-btn cancel"
                                        data-action="cancel"
                                        data-id="${booking.id}"
                                    >
                                        <i class="fa-solid fa-xmark"></i>
                                        Cancel
                                    </button>
                                `
                                : ""
                        }

                    </div>

                </div>

            </div>

        </article>
    `;

}


/* =====================================================
   13. RENDER BOOKINGS
===================================================== */

function renderBookings() {

    if (!bookingListContainer) {
        return;
    }

    const filteredBookings = getFilteredBookings();

    bookingListContainer.innerHTML = "";

    if (filteredBookings.length === 0) {

        if (bookingEmptyState) {
            bookingEmptyState.hidden = false;
        }

        return;

    }

    if (bookingEmptyState) {
        bookingEmptyState.hidden = true;
    }

    bookingListContainer.innerHTML = filteredBookings
        .map(booking => createBookingCard(booking))
        .join("");

}


/* =====================================================
   14. FILTER BUTTON EVENTS
===================================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter || "all";

        renderBookings();

    });

});


/* =====================================================
   15. SEARCH BOOKINGS
===================================================== */

if (bookingSearchInput) {

    bookingSearchInput.addEventListener("input", () => {

        currentSearch = bookingSearchInput.value.trim();

        renderBookings();

    });

}


/* =====================================================
   16. INITIAL RENDER
===================================================== */

saveBookings();

updateBookingStatistics();

renderBookings();


/* =====================================================
   END OF PART 2
   Continue with Part 3 below
===================================================== */
/* =========================================================
   PART 3: BOOKING DETAILS MODAL & CANCELLATION
========================================================= */


/* =====================================================
   17. FIND BOOKING BY ID
===================================================== */

function findBookingById(id) {

    return bookings.find(
        booking => String(booking.id) === String(id)
    );

}


/* =====================================================
   18. CREATE BOOKING DETAILS MODAL
===================================================== */

function createBookingModal() {

    let modal = document.getElementById("bookingDetailsModal");

    if (modal) {
        return modal;
    }

    modal = document.createElement("div");

    modal.id = "bookingDetailsModal";
    modal.className = "booking-details-modal";

    modal.innerHTML = `
        <div class="booking-modal-backdrop"></div>

        <div
            class="booking-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bookingModalTitle"
        >

            <button
                type="button"
                class="booking-modal-close"
                aria-label="Close booking details"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="booking-modal-icon">
                <i class="fa-solid fa-suitcase-rolling"></i>
            </div>

            <h2 id="bookingModalTitle">
                Booking Details
            </h2>

            <div class="booking-modal-body"></div>

        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".booking-modal-close")
        .addEventListener("click", closeBookingModal);

    modal.querySelector(".booking-modal-backdrop")
        .addEventListener("click", closeBookingModal);

    return modal;

}


/* =====================================================
   19. SHOW BOOKING DETAILS
===================================================== */

function showBookingDetails(id) {

    const booking = findBookingById(id);

    if (!booking) {
        return;
    }

    const modal = createBookingModal();

    const modalBody = modal.querySelector(
        ".booking-modal-body"
    );

    modalBody.innerHTML = `
        <div class="booking-modal-destination">

            <img
                src="${booking.image || "assets/booking/booking hero.webp"}"
                alt="${booking.destination || "Destination"}"
                onerror="this.onerror=null;this.src='assets/booking/booking hero.webp';"
            >

            <div>
                <span class="booking-modal-label">
                    Destination
                </span>

                <h3>
                    ${booking.destination || "Travel Booking"}
                </h3>

                <p>
                    ${booking.location || booking.destination || ""}
                </p>
            </div>

        </div>


        <div class="booking-modal-details-grid">

            <div class="booking-modal-detail">
                <span>Booking ID</span>
                <strong>${booking.id}</strong>
            </div>

            <div class="booking-modal-detail">
                <span>Booking Type</span>
                <strong>${booking.type || "Travel"}</strong>
            </div>

            <div class="booking-modal-detail">
                <span>Start Date</span>
                <strong>${formatDate(booking.startDate)}</strong>
            </div>

            <div class="booking-modal-detail">
                <span>End Date</span>
                <strong>${formatDate(booking.endDate)}</strong>
            </div>

            <div class="booking-modal-detail">
                <span>Travelers</span>
                <strong>${booking.guests || 1} Guest(s)</strong>
            </div>

            <div class="booking-modal-detail">
                <span>Status</span>
                <strong class="booking-status ${booking.status}">
                    ${getStatusLabel(booking.status)}
                </strong>
            </div>

        </div>


        <div class="booking-modal-total">

            <span>Total Booking Amount</span>

            <strong>
                ${formatPrice(booking.price)}
            </strong>

        </div>
    `;

    modal.classList.add("show");

    document.body.classList.add("booking-modal-open");

}


/* =====================================================
   20. CLOSE BOOKING MODAL
===================================================== */

function closeBookingModal() {

    const modal = document.getElementById(
        "bookingDetailsModal"
    );

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.classList.remove("booking-modal-open");

}


/* =====================================================
   21. CANCEL BOOKING
===================================================== */

function cancelBooking(id) {

    const booking = findBookingById(id);

    if (!booking) {
        return;
    }

    if (
        booking.status === "cancelled" ||
        booking.status === "completed"
    ) {
        return;
    }

    const confirmation = window.confirm(
        `Are you sure you want to cancel booking ${booking.id} for ${booking.destination}?`
    );

    if (!confirmation) {
        return;
    }

    booking.status = "cancelled";

    saveBookings();

    updateBookingStatistics();

    renderBookings();

    window.alert(
        `Booking ${booking.id} has been cancelled successfully.`
    );

}


/* =====================================================
   22. BOOKING ACTION BUTTONS
===================================================== */

if (bookingListContainer) {

    bookingListContainer.addEventListener("click", event => {

        const button = event.target.closest(
            "button[data-action]"
        );

        if (!button) {
            return;
        }

        const action = button.dataset.action;
        const bookingId = button.dataset.id;

        if (action === "details") {

            showBookingDetails(bookingId);

        }

        if (action === "cancel") {

            cancelBooking(bookingId);

        }

    });

}


/* =====================================================
   23. ESCAPE KEY CLOSES MODAL
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeBookingModal();
    }

});


/* =====================================================
   END OF BOOKINGS JAVASCRIPT
===================================================== */
});