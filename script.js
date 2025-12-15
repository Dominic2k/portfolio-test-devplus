const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach((card) => {
            if (filter === "all" || card.dataset.category === filter) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

const timelineItems = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
    }
);

timelineItems.forEach((item) => {
    observer.observe(item);
});

const skillsContainer = document.querySelector(".skills-container");
const skillProgressBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                skillProgressBars.forEach((bar) => {
                    const progress = bar.getAttribute("data-progress");
                    bar.style.width = progress;
                });
                skillObserver.unobserve(skillsContainer);
            }
        });
    },
    {
        threshold: 0.2,
    }
);

if (skillsContainer) {
    skillObserver.observe(skillsContainer);
}

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formMessage = document.querySelector(".form-message");

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add("error");
    const errorDisplay = formGroup.querySelector(".error-message");
    errorDisplay.innerText = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove("error");
    const errorDisplay = formGroup.querySelector(".error-message");
    errorDisplay.innerText = "";
}

function isEmail(email) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;

        if (nameInput.value.trim() === "") {
            showError(nameInput, "Vui lòng nhập tên của bạn.");
            isValid = false;
        } else {
            showSuccess(nameInput);
        }

        if (emailInput.value.trim() === "") {
            showError(emailInput, "Vui lòng nhập email.");
            isValid = false;
        } else if (!isEmail(emailInput.value.trim())) {
            showError(emailInput, "Email không hợp lệ.");
            isValid = false;
        } else {
            showSuccess(emailInput);
        }

        if (messageInput.value.trim() === "") {
            showError(messageInput, "Vui lòng để lại lời nhắn.");
            isValid = false;
        } else {
            showSuccess(messageInput);
        }

        if (isValid) {
            formMessage.textContent =
                "Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.";
            formMessage.className = "form-message success";

            setTimeout(() => {
                contactForm.reset();
                formMessage.style.display = "none";
            }, 4000);
        }
    });
}

const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
    } else {
        backToTopButton.classList.remove("visible");
    }
});
const themeSwitch = document.querySelector(".theme-switch");
const rootHtml = document.documentElement;

function applyTheme(theme) {
    if (theme === "dark") {
        rootHtml.setAttribute("data-theme", "dark");
    } else {
        rootHtml.setAttribute("data-theme", "light");
    }
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
    applyTheme(savedTheme);
}

themeSwitch.addEventListener("click", () => {
    const currentTheme = rootHtml.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
});
