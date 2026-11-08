/* =========================================================
   STACKLY TRAVEL — CONTACT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("contactFormMessage");

    if (!contactForm) return;


    /* =====================================================
       FORM VALIDATION & SUBMISSION
    ===================================================== */

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("contactName");
        const email = document.getElementById("contactEmail");
        const phone = document.getElementById("contactPhone");
        const subject = document.getElementById("contactSubject");
        const message = document.getElementById("contactMessage");
        const consent = document.getElementById("contactConsent");

        if (!name || !email || !subject || !message) {
            return;
        }

        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const phoneValue = phone ? phone.value.trim() : "";
        const subjectValue = subject.value.trim();
        const messageValue = message.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phonePattern =
            /^[+]?[\d\s()-]{7,20}$/;


        /* Clear previous message */

        if (formMessage) {
            formMessage.textContent = "";
            formMessage.className = "contact-form-message";
        }


        /* Name validation */

        if (nameValue.length < 2) {
            showFormMessage(
                "Please enter your name.",
                "error"
            );

            name.focus();
            return;
        }


        /* Email validation */

        if (!emailPattern.test(emailValue)) {
            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            email.focus();
            return;
        }


        /* Phone validation — optional */

        if (
            phoneValue &&
            !phonePattern.test(phoneValue)
        ) {
            showFormMessage(
                "Please enter a valid phone number.",
                "error"
            );

            phone.focus();
            return;
        }


        /* Subject validation */

        if (!subjectValue) {
            showFormMessage(
                "Please select a subject.",
                "error"
            );

            subject.focus();
            return;
        }


        /* Message validation */

        if (messageValue.length < 10) {
            showFormMessage(
                "Please enter at least 10 characters in your message.",
                "error"
            );

            message.focus();
            return;
        }


        /* Consent validation */

        if (consent && !consent.checked) {
            showFormMessage(
                "Please agree to the privacy policy.",
                "error"
            );

            consent.focus();
            return;
        }


        /* =================================================
           FRONTEND DEMO SUBMISSION
        ================================================= */

        showFormMessage(
            "Thank you for contacting STACKLY Travel! Our team will reach you soon.",
            "success"
        );

        contactForm.reset();

    });


    /* =====================================================
       FORM MESSAGE HELPER
    ===================================================== */

    function showFormMessage(text, type) {

        if (!formMessage) return;

        formMessage.textContent = text;

        formMessage.className =
            `contact-form-message ${type}`;

        formMessage.setAttribute(
            "role",
            "status"
        );

        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }


    /* =====================================================
       INPUT ERROR RESET
    ===================================================== */

    contactForm.querySelectorAll("input, textarea, select")
        .forEach((field) => {

            field.addEventListener("input", () => {

                if (formMessage) {
                    formMessage.textContent = "";
                    formMessage.className =
                        "contact-form-message";
                }

            });

        });


    /* =====================================================
       FAQ ACCORDION
       Only one FAQ opens at a time
    ===================================================== */

    const faqItems = document.querySelectorAll(
        ".contact-faq-item"
    );

    faqItems.forEach((item) => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            faqItems.forEach((otherItem) => {

                if (otherItem !== item) {
                    otherItem.open = false;
                }

            });

        });

    });


    /* =====================================================
       CONTACT PAGE SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".contact-info-card, " +
        ".contact-form-info, " +
        ".contact-form-wrapper, " +
        ".contact-faq-item, " +
        ".contact-cta-content"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "contact-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {

            element.classList.add(
                "contact-reveal"
            );

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "contact-visible"
            );

        });

    }

});