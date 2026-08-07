const galleryImages = [
  {
    src: "assets/images/gallery/optimized/dsc_6885-2.jpg",
    alt: "Daniel and Salome gallery photo 1"
  },
  {
    src: "assets/images/gallery/optimized/dsc_6885.jpg",
    alt: "Daniel and Salome gallery photo 2"
  },
  {
    src: "assets/images/gallery/optimized/dsc_6909_1.jpg",
    alt: "Daniel and Salome gallery photo 3"
  },
  {
    src: "assets/images/gallery/optimized/dsc_6914.jpg",
    alt: "Daniel and Salome gallery photo 4"
  },
  {
    src: "assets/images/gallery/optimized/dsc_69142.jpg",
    alt: "Daniel and Salome gallery photo 5"
  },
  {
    src: "assets/images/gallery/optimized/dsc_6941.jpg",
    alt: "Daniel and Salome gallery photo 6"
  },
  {
    src: "assets/images/gallery/optimized/dsc_6953.jpg",
    alt: "Daniel and Salome gallery photo 7"
  },
  {
    src: "assets/images/gallery/optimized/dsc_6954.jpg",
    alt: "Daniel and Salome gallery photo 8"
  },
  {
    src: "assets/images/gallery/optimized/dsc_6958.jpg",
    alt: "Daniel and Salome gallery photo 9"
  }
];

const revealElements = document.querySelectorAll(".reveal");
const galleryBackdrop = document.getElementById("galleryBackdrop");
const galleryImage = document.getElementById("galleryImage");
const galleryCounter = document.getElementById("galleryCounter");
const galleryDots = document.getElementById("galleryDots");
const galleryProgress = document.getElementById("galleryProgress");
const galleryThumbnails = document.getElementById("galleryThumbnails");
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
  galleryThumbnails.innerHTML = "";

  galleryImages.forEach((image, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.classList.toggle("is-active", index === galleryIndex);
    dot.addEventListener("click", () => showGalleryImage(index));
    galleryDots.appendChild(dot);

    const thumbnail = document.createElement("button");
    const thumbnailImage = document.createElement("img");

    thumbnail.type = "button";
    thumbnail.className = "gallery-thumbnail";
    thumbnail.classList.toggle("is-active", index === galleryIndex);
    thumbnail.setAttribute("aria-label", `Show gallery photo ${index + 1}`);
    thumbnailImage.src = image.src;
    thumbnailImage.alt = "";
    thumbnailImage.loading = "lazy";
    thumbnail.appendChild(thumbnailImage);
    thumbnail.addEventListener("click", () => {
      showGalleryImage(index);
      startGalleryRotation();
    });
    galleryThumbnails.appendChild(thumbnail);
  });
}

function restartProgress() {
  galleryProgress.style.animation = "none";
  galleryProgress.offsetHeight;
  galleryProgress.style.animation = "";
}

function preloadNextImage() {
  const nextImage = galleryImages[(galleryIndex + 1) % galleryImages.length];
  const preload = new Image();
  preload.src = nextImage.src;
}

function showGalleryImage(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  const image = galleryImages[galleryIndex];

  galleryBackdrop.classList.add("is-changing");
  galleryImage.classList.add("is-changing");

  window.setTimeout(() => {
    galleryBackdrop.src = image.src;
    galleryImage.src = image.src;
    galleryImage.alt = image.alt;
    galleryCounter.textContent = `Portrait ${String(galleryIndex + 1).padStart(
      2,
      "0"
    )} / ${String(galleryImages.length).padStart(2, "0")}`;
    galleryBackdrop.classList.remove("is-changing");
    galleryImage.classList.remove("is-changing");
    renderDots();
    restartProgress();
    preloadNextImage();
  }, 180);
}

function startGalleryRotation() {
  window.clearInterval(galleryTimer);
  const hasMultipleImages = galleryImages.length > 1;

  previousButton.hidden = !hasMultipleImages;
  nextButton.hidden = !hasMultipleImages;
  galleryDots.hidden = !hasMultipleImages;
  galleryProgress.hidden = !hasMultipleImages;
  galleryThumbnails.hidden = !hasMultipleImages;

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
