const galleryImages = [
  {
    src: "assets/images/gallery/DSC_6885%202.jpg",
    alt: "Daniel and Salome gallery photo 1"
  },
  {
    src: "assets/images/gallery/DSC_6885.jpg",
    alt: "Daniel and Salome gallery photo 2"
  },
  {
    src: "assets/images/gallery/DSC_6909_1.jpg",
    alt: "Daniel and Salome gallery photo 3"
  },
  {
    src: "assets/images/gallery/DSC_6914.jpg",
    alt: "Daniel and Salome gallery photo 4"
  },
  {
    src: "assets/images/gallery/DSC_69142.jpg",
    alt: "Daniel and Salome gallery photo 5"
  },
  {
    src: "assets/images/gallery/DSC_6941.jpg",
    alt: "Daniel and Salome gallery photo 6"
  },
  {
    src: "assets/images/gallery/DSC_6953.jpg",
    alt: "Daniel and Salome gallery photo 7"
  },
  {
    src: "assets/images/gallery/DSC_6954.jpg",
    alt: "Daniel and Salome gallery photo 8"
  },
  {
    src: "assets/images/gallery/DSC_6958.jpg",
    alt: "Daniel and Salome gallery photo 9"
  },
  {
    src: "assets/images/main/main-invitation.jpg",
    alt: "Daniel Ngandwe and Salome Prisca Sila"
  }
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
  const hasMultipleImages = galleryImages.length > 1;

  previousButton.hidden = !hasMultipleImages;
  nextButton.hidden = !hasMultipleImages;
  galleryDots.hidden = !hasMultipleImages;

  if (hasMultipleImages) {
    galleryTimer = window.setInterval(() => {
      showGalleryImage(galleryIndex + 1);
    }, 3000);
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
