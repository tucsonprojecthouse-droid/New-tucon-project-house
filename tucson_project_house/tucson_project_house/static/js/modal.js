/*
 * modal.js
 * --------
 * Opens and closes the event detail popup. Any other file (calendar.js,
 * or the initial server-rendered list) can trigger it by calling
 * window.openEventModal(eventId).
 */

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("event-modal");
  const closeBtn = document.getElementById("modal-close");
  const backdrop = document.getElementById("modal-backdrop");

  function closeModal() {
    modal.style.display = "none";
  }

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  // Attach click handlers to any event cards already rendered by Jinja
  // on the initial page load (before any filter/view change happens).
  document.querySelectorAll(".event-card").forEach(function (card) {
    card.addEventListener("click", function () {
      window.openEventModal(card.dataset.eventId);
    });
  });
});

window.openEventModal = function (eventId) {
  fetch("/api/events/" + eventId)
    .then((res) => res.json())
    .then(function (event) {
      document.getElementById("modal-flyer").src = event.flyer_image;
      document.getElementById("modal-category").textContent = event.category.toUpperCase();
      document.getElementById("modal-name").textContent = event.name;
      document.getElementById("modal-datetime").textContent = event.date + " · " + event.time;
      document.getElementById("modal-venue").textContent = event.venue;
      document.getElementById("modal-description").textContent = event.description;
      document.getElementById("modal-rsvp").textContent = event.rsvp_status;
      document.getElementById("modal-register-link").href = event.register_url || "#";

      document.getElementById("event-modal").style.display = "flex";
    });
};
