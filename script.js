const galleryImages = [
  {
    src: "assets/images/main/main-invitation.jpg",
    alt: "Daniel Ngandwe and Salome Prisca Sila"
  }
  // Add future gallery photos here:
  // { src: "assets/images/gallery/photo-01.jpg", alt: "Daniel and Salome" }
];

const revealElements = document.querySelectorAll(".reveal");
const galleryImage = document.getElementById("galleryImage");
const galleryDots = document.getElementById("galleryDots");
const previousButton = document.querySelector(".gallery-button.previous");
const nextButton = document.querySelector(".gallery-button.next");
let galleryIndex = 0;
let galleryTimer;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 80, 360)}ms`;
  observer.observe(element);
});

function renderDots() {
  galleryDots.innerHTML = "";

  galleryImages.forEach((image, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.classList.toggle("is-active", index === galleryIndex);
    dot.addEventListener("click", () => showGalleryImage(index));
    galleryDots.appendChild(dot);
  });
}

function showGalleryImage(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  const image = galleryImages[galleryIndex];

  galleryImage.classList.add("is-changing");

  window.setTimeout(() => {
    galleryImage.src = image.src;
    galleryImage.alt = image.alt;
    galleryImage.classList.remove("is-changing");
    renderDots();
  }, 180);
}

function startGalleryRotation() {
  window.clearInterval(galleryTimer);

  if (galleryImages.length > 1) {
    galleryTimer = window.setInterval(() => {
      showGalleryImage(galleryIndex + 1);
    }, 4500);
  }
}

previousButton.addEventListener("click", () => {
  showGalleryImage(galleryIndex - 1);
  startGalleryRotation();
});

nextButton.addEventListener("click", () => {
  showGalleryImage(galleryIndex + 1);
  startGalleryRotation();
});

showGalleryImage(0);
startGalleryRotation();

document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const fullName = formData.get("fullName").toString().trim();
  const guestCount = formData.get("guestCount").toString().trim();
  const attendance = formData.get("attendance");

  const message = `Hello Daniel and Salome,

I would like to confirm my attendance for your wedding.

Name: ${fullName}
Number of guests: ${guestCount}
Attendance: ${attendance}

Thank you.`;

  const whatsappUrl = `https://wa.me/243970241789?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
