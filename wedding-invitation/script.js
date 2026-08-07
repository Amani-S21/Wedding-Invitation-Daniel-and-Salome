const revealElements = document.querySelectorAll(".reveal");

// Reveal each invitation section as guests scroll.
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

document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const fullName = formData.get("fullName").toString().trim();
  const guestCount = formData.get("guestCount").toString().trim();
  const attendance = formData.get("attendance");

  // WhatsApp requires the message to be URL encoded inside the wa.me link.
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
