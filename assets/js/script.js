'use strict';

/* =========================
   Helper function
========================= */
const elementToggleFunc = (elem) => {
  elem.classList.toggle("active");
};

/* =========================
   Sidebar toggle
========================= */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", () => {
    elementToggleFunc(sidebar);
  });
}

/* =========================
   Testimonials modal
========================= */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn?.addEventListener("click", testimonialsModalFunc);
overlay?.addEventListener("click", testimonialsModalFunc);

/* =========================
   Custom select & filter
========================= */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select?.addEventListener("click", () => {
  elementToggleFunc(select);
});

const filterFunc = (selectedValue) => {
  filterItems.forEach(item => {
    if (selectedValue === "all" || item.dataset.category === selectedValue) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const value = item.textContent.toLowerCase();
    selectValue.textContent = item.textContent;
    elementToggleFunc(select);
    filterFunc(value);
  });
});

let lastClickedBtn = filterBtns[0];

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.toLowerCase();
    filterFunc(value);
    lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

/* =========================
   Contact form validation
========================= */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (form?.checkValidity()) {
      formBtn?.removeAttribute("disabled");
    } else {
      formBtn?.setAttribute("disabled", "");
    }
  });
});

/* =========================
   PAGE NAVIGATION (FIXED)
========================= */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", () => {

    const targetPage = link.textContent.trim().toLowerCase();

    // Remove active from all nav buttons
    navigationLinks.forEach(btn => btn.classList.remove("active"));

    // Hide all pages
    pages.forEach(page => page.classList.remove("active"));

    // Activate matched page
    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
        link.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

  });
});

/* =========================
   EMAILJS CONFIGURATION
========================= */
// Initialize EmailJS with your public key
// Get your public key from: https://dashboard.emailjs.com/admin/account
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// Handle form submission
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable button during submission
    formBtn.setAttribute("disabled", "");
    formBtn.innerHTML = '<ion-icon name="hourglass"></ion-icon><span>Sending...</span>';

    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        "YOUR_SERVICE_ID_HERE",     // Replace with your Service ID
        "YOUR_TEMPLATE_ID_HERE",    // Replace with your Template ID
        form
      );

      // Success message
      alert("Message sent successfully! Thank you for contacting me.");
      form.reset();
      formBtn.removeAttribute("disabled");
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send message. Please try again later.");
      formBtn.removeAttribute("disabled");
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    }
  });
}

