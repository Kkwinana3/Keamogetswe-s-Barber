document.addEventListener("DOMContentLoaded", () => {

    
    // 1. IMAGE GALLERY LIGHTBOX FUNCTIONALITY
    
    const galleryImages = document.querySelectorAll(".gallery-img");
    const modal = document.getElementById("lightboxModal");
    const modalImg = document.getElementById("lightboxImg");
    const closeBtn = document.querySelector(".lightbox-close");

    if (modal && modalImg && galleryImages.length > 0) {
        // Open Lightbox when clicking any gallery image
        galleryImages.forEach(img => {
            img.addEventListener("click", () => {
                modal.style.display = "flex";
                modalImg.src = img.src;
                modalImg.alt = img.alt;
            });
        });

        // Close Lightbox when clicking the "X" close button
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }

        // Close Lightbox when clicking outside the image area
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

   
    // 2. ENQUIRY FORM VALIDATION & AJAX RESPONSE
    
    const enquiryForm = document.getElementById("enquiryForm");
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Clear previous errors & response box
            document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
            const responseBox = document.getElementById("responseMessage");
            responseBox.style.display = "none";

            let isValid = true;
            const name = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("serviceType").value;
            const date = document.getElementById("preferredDate").value;

            // Name validation
            if (name.length < 2) {
                document.getElementById("nameError").textContent = "Please enter your full name (at least 2 characters).";
                isValid = false;
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById("emailError").textContent = "Please enter a valid email address.";
                isValid = false;
            }

            // South African phone number validation (10 digits starting with 0)
            const phoneRegex = /^0[0-9]{9}$/;
            if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
                document.getElementById("phoneError").textContent = "Please enter a valid 10-digit SA phone number (e.g., 0821234567).";
                isValid = false;
            }

            // Service category selection
            if (!service) {
                document.getElementById("serviceError").textContent = "Please choose a service category.";
                isValid = false;
            }

            // Date selection
            if (!date) {
                document.getElementById("dateError").textContent = "Please select a preferred date.";
                isValid = false;
            }

            if (!isValid) return;

            // Simulate AJAX asynchronous submission
            responseBox.style.display = "block";
            responseBox.style.backgroundColor = "#e8f4fd";
            responseBox.style.color = "#004085";
            responseBox.innerHTML = "<em>Processing your enquiry and checking availability...</em>";

            setTimeout(() => {
                let costDetails = "";
                switch (service) {
                    case "standard-cut":
                        costDetails = `Standard Cut & Style: R120. Slot reserved for ${date}.`;
                        break;
                    case "beard-treatment":
                        costDetails = `Beard Conditioning & Trim: R80. Barber available on ${date}.`;
                        break;
                    case "vip-package":
                        costDetails = `VIP Deluxe Package: R250. Booking confirmed for ${date}.`;
                        break;
                    case "sponsor":
                        costDetails = "Thank you for your sponsorship inquiry! Management will email you shortly.";
                        break;
                }

                responseBox.style.backgroundColor = "#d4edda";
                responseBox.style.color = "#155724";
                responseBox.innerHTML = `<strong>Enquiry Processed Successfully!</strong><br>${costDetails}`;
                enquiryForm.reset();
            }, 1200);
        });
    }

    
    // 3. CONTACT FORM VALIDATION
    
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            let isValid = true;
            document.querySelectorAll("#contactForm .error-msg").forEach(el => el.textContent = "");

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const msg = document.getElementById("messageBody").value.trim();

            if (name.length < 2) {
                document.getElementById("contactNameError").textContent = "Name is required.";
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById("contactEmailError").textContent = "A valid email is required.";
                isValid = false;
            }

            if (msg.length < 10) {
                document.getElementById("messageError").textContent = "Message must be at least 10 characters long.";
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }


    // 4. DYNAMIC SEARCH / FILTER FOR PRODUCTS & SERVICES
    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".card, .product-card, .service-card");

    if (searchInput && cards.length > 0) {
        searchInput.addEventListener("keyup", (e) => {
            const query = e.target.value.toLowerCase();
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(query) ? "block" : "none";
            });
        });
    }

});
