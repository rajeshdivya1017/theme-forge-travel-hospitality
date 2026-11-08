/* =========================================================
   STACKLY TRAVEL — COMMON JAVASCRIPT
   Shared Header | Footer | Preloader | Animations
========================================================= */


/* =========================================================
   1. COMMON HEADER
========================================================= */

function createStacklyHeader() {

    const headerContainer =
        document.getElementById("site-header");

    if (!headerContainer) return;

    headerContainer.innerHTML = `

        <header class="site-header" id="stacklyHeader">

            <div class="header-container">

                <a href="index.html" class="header-logo">

                    <img
                        src="assets/stackly logo.webp"
                        alt="STACKLY Travel"
                    >

                </a>

                <nav
                    class="header-navigation"
                    id="headerNavigation"
                >

                    <a href="index.html">Home</a>
                    <a href="destinations.html">Destinations</a>
                    <a href="hotels.html">Hotels</a>
                    <a href="flights.html">Flights</a>
                    <a href="bookings.html">My Bookings</a>
                    <a href="about.html">About</a>
                    <a href="contact.html">Contact</a>

                </nav>

                <a
                    href="destinations.html"
                    class="header-action"
                >
                    Explore Now
                </a>

                <button
                    class="menu-toggle"
                    id="menuToggle"
                    aria-label="Toggle navigation"
                    aria-expanded="false"
                >
                    ☰
                </button>

            </div>

        </header>

    `;

}


/* =========================================================
   2. COMMON FOOTER
========================================================= */

function createStacklyFooter() {

    const footerContainer =
        document.getElementById("site-footer");

    if (!footerContainer) return;

    const currentYear = new Date().getFullYear();

    footerContainer.innerHTML = `

        <footer class="site-footer">

            <div class="footer-container">

                <div class="footer-grid">

                    <div class="footer-column">

                        <a
                            href="index.html"
                            class="footer-logo"
                        >

                            <img
                                src="assets/stackly logo.webp"
                                alt="STACKLY Travel"
                            >

                        </a>

                        <p class="footer-description">

                            Discover extraordinary destinations,
                            unforgettable journeys, and beautiful
                            experiences around the world with
                            STACKLY Travel.

                        </p>

                    </div>

                    <div class="footer-column">

                        <h3>Quick Links</h3>

                        <a href="index.html">Home</a>
                        <a href="destinations.html">Destinations</a>
                        <a href="hotels.html">Hotels</a>
                        <a href="flights.html">Flights</a>

                    </div>

                    <div class="footer-column">

                        <h3>Company</h3>

                        <a href="about.html">About Us</a>
                        <a href="contact.html">Contact Us</a>
                        <a href="bookings.html">My Bookings</a>

                    </div>

                    <div class="footer-column">

                        <h3>Get in Touch</h3>

                        <a href="mailto:travel@stackly.com">
                            travel@stackly.com
                        </a>

                        <a href="tel:+919876543210">
                            +91 98765 43210
                        </a>

                        <a href="contact.html">
                            Contact Support
                        </a>

                    </div>

                </div>

                <div class="footer-bottom">

                    <p>
                        © ${currentYear}
                        STACKLY Travel.
                        All rights reserved.
                    </p>

                    <p>
                        Explore the World with STACKLY
                    </p>

                </div>

            </div>

        </footer>

    `;

}


/* =========================================================
   3. PRELOADER HTML — EARTH + AIRPLANE ORBIT
========================================================= */

function createStacklyPreloader() {

    if (document.getElementById("stacklyPreloader")) {
        return;
    }

    const preloader = document.createElement("div");

    preloader.className =
        "stackly-preloader flight-preloader";

    preloader.id = "stacklyPreloader";

    preloader.innerHTML = `

        <div class="flight-preloader-bg">

            <div class="flight-stars"></div>

            <div class="flight-cloud flight-cloud-one"></div>
            <div class="flight-cloud flight-cloud-two"></div>
            <div class="flight-cloud flight-cloud-three"></div>

        </div>

        <div class="flight-preloader-content">

            <div class="flight-brand">

                <img
                    src="assets/stackly logo.webp"
                    alt="STACKLY Travel"
                    class="preloader-logo"
                >

                <p class="flight-tagline">
                    YOUR JOURNEY BEGINS HERE
                </p>

            </div>

            <div class="flight-animation-scene">

                <div class="flight-orbit orbit-one"></div>
                <div class="flight-orbit orbit-two"></div>

                <div class="flight-earth">

                    <div class="flight-earth-map">

                        <span class="earth-continent continent-one"></span>
                        <span class="earth-continent continent-two"></span>
                        <span class="earth-continent continent-three"></span>

                    </div>

                    <div class="flight-earth-shine"></div>

                </div>

                <div class="flight-plane-orbit">

                    <div class="flight-plane-wrapper">

                        <div class="flight-plane-3d">

                            <svg
                                class="flight-plane-svg"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="Flying airplane"
                            >

                                <defs>

                                    <linearGradient
                                        id="planeBodyGradient"
                                        x1="0"
                                        y1="0"
                                        x2="1"
                                        y2="1"
                                    >

                                        <stop offset="0%" stop-color="#ffffff"/>
                                        <stop offset="45%" stop-color="#dbeafe"/>
                                        <stop offset="100%" stop-color="#64748b"/>

                                    </linearGradient>

                                    <linearGradient
                                        id="planeWingGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >

                                        <stop offset="0%" stop-color="#60a5fa"/>
                                        <stop offset="100%" stop-color="#1d4ed8"/>

                                    </linearGradient>

                                </defs>

                                <path
                                    d="M256 22
                                    C278 80 286 145 292 205
                                    L435 300
                                    C453 313 449 333 427 329
                                    L299 293
                                    L315 420
                                    L366 458
                                    L366 480
                                    L256 447
                                    L146 480
                                    L146 458
                                    L197 420
                                    L213 293
                                    L85 329
                                    C63 333 59 313 77 300
                                    L220 205
                                    C226 145 234 80 256 22 Z"
                                    fill="url(#planeBodyGradient)"
                                />

                                <path
                                    d="M256 230 L420 315 L290 278 Z"
                                    fill="url(#planeWingGradient)"
                                />

                                <path
                                    d="M256 230 L92 315 L222 278 Z"
                                    fill="#2563eb"
                                />

                                <path
                                    d="M256 365 L320 438 L256 420 L192 438 Z"
                                    fill="#1d4ed8"
                                />

                                <ellipse
                                    cx="256"
                                    cy="100"
                                    rx="16"
                                    ry="32"
                                    fill="#38bdf8"
                                />

                            </svg>

                        </div>

                    </div>

                </div>

            </div>

            <div class="flight-loading-info">

                <h2>Preparing Your Adventure</h2>

                <p>
                    Taking you to extraordinary destinations
                </p>

            </div>

            <div class="flight-progress-wrapper">

                <div class="flight-progress-track">

                    <div
                        class="preloader-progress-bar flight-progress-bar"
                        id="preloaderProgressBar"
                    ></div>

                    <span
                        class="flight-progress-plane"
                        id="flightProgressPlane"
                        aria-hidden="true"
                    >
                        ✈
                    </span>

                </div>

                <div class="flight-progress-details">

                    <span>LOADING EXPERIENCE</span>

                    <span>
                        <span id="preloaderPercentage">0</span>%
                    </span>

                </div>

            </div>

        </div>

    `;

    document.body.prepend(preloader);

}
/* =========================================================
   4. PRELOADER INITIALIZATION
========================================================= */

function initializeStacklyPreloader() {

    const preloader =
        document.getElementById("stacklyPreloader");

    const progressBar =
        document.getElementById("preloaderProgressBar");

    const percentage =
        document.getElementById("preloaderPercentage");

    const progressPlane =
        document.getElementById("flightProgressPlane");

    if (!preloader || !progressBar || !percentage) return;

    if (preloader.dataset.initialized === "true") return;

    preloader.dataset.initialized = "true";

    document.body.classList.add("preloader-active");

    let progress = 0;
    let isFinished = false;

    const startTime = Date.now();
    const minimumLoadingTime = 950;

    function updateProgress(value) {

        progress = Math.max(0, Math.min(100, value));

        progressBar.style.width = `${progress}%`;

        percentage.textContent =
            String(Math.floor(progress));

        if (progressPlane) {

            progressPlane.style.left =
                `${Math.min(97, Math.max(2, progress))}%`;

        }

    }

    const loadingInterval = setInterval(() => {

        if (!isFinished && progress < 92) {

            progress += Math.max(
                0.35,
                (92 - progress) * 0.055
            );

            updateProgress(Math.min(92, progress));

        }

    }, 70);


    function finishPreloader() {

        if (isFinished) return;

        isFinished = true;

        const remaining = Math.max(
            0,
            minimumLoadingTime - (Date.now() - startTime)
        );

        setTimeout(() => {

            clearInterval(loadingInterval);

            const initialProgress = progress;
            const duration = 450;
            const started = performance.now();

            function complete(now) {

                const t = Math.min(
                    1,
                    (now - started) / duration
                );

                const eased =
                    1 - Math.pow(1 - t, 3);

                updateProgress(
                    initialProgress +
                    (100 - initialProgress) * eased
                );

                if (t < 1) {

                    requestAnimationFrame(complete);

                } else {

                    setTimeout(() => {

                        preloader.classList.add(
                            "preloader-hidden"
                        );

                        document.body.classList.remove(
                            "preloader-active"
                        );

                        setTimeout(() => {
                            preloader.remove();
                        }, 850);

                    }, 250);

                }

            }

            requestAnimationFrame(complete);

        }, remaining);

    }

    if (document.readyState === "complete") {

        finishPreloader();

    } else {

        window.addEventListener(
            "load",
            finishPreloader,
            { once: true }
        );

    }

}

/* =========================================================
   5. MOBILE NAVIGATION — BACKGROUND SCROLL LOCK
========================================================= */

function initializeStacklyNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navigation =
        document.getElementById("headerNavigation");

    if (!menuToggle || !navigation) return;

    let savedScrollY = 0;

    function openMenu() {

        savedScrollY = window.scrollY;

        navigation.classList.add("mobile-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.innerHTML = "&times;";

        /* LOCK BACKGROUND SCROLL */

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {

        navigation.classList.remove("mobile-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.innerHTML = "☰";

        /* RESTORE BACKGROUND SCROLL */

        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";

        window.scrollTo(0, savedScrollY);
    }

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navigation.classList.contains("mobile-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    /* CLOSE MENU WHEN NAV LINK CLICKED */

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    /* CLOSE MENU WHEN CLICKING OUTSIDE */

    document.addEventListener("click", event => {

        if (
            navigation.classList.contains("mobile-open") &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }

    });

    /* CLOSE MENU WITH ESCAPE */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navigation.classList.contains("mobile-open")
        ) {
            closeMenu();
        }

    });

}
/* =========================================================
   6. ACTIVE NAVIGATION LINK
========================================================= */

function initializeActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const navigationLinks =
        document.querySelectorAll(
            ".header-navigation a"
        );

    navigationLinks.forEach(link => {

        const linkPage =
            link.getAttribute("href")
                .split("/")
                .pop()
                .toLowerCase();

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   7. HEADER SCROLL EFFECT
========================================================= */

function initializeHeaderScroll() {

    const header =
        document.getElementById("stacklyHeader");

    if (!header) return;

    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();

}


/* =========================================================
   8. SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".stackly-reveal"
        );

    if (!revealElements.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );

    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   9. PAGE INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* COMMON BACKGROUND */

    const background =
        document.createElement("div");

    background.className =
        "stackly-page-background";

    document.body.prepend(background);


    /* HEADER */

    createStacklyHeader();


    /* FOOTER */

    createStacklyFooter();


    /* PRELOADER */

    createStacklyPreloader();


    /* MOBILE NAVIGATION */

    initializeStacklyNavigation();


    /* ACTIVE NAVIGATION */

    initializeActiveNavigation();


    /* HEADER SCROLL EFFECT */

    initializeHeaderScroll();


    /* SCROLL REVEAL */

    initializeScrollReveal();


    /* START PRELOADER */

    initializeStacklyPreloader();

});