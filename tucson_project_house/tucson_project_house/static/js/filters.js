/*
 * filters.js
 * ----------
 * Handles the All / Music / Fashion / Film filter buttons above the
 * calendar. Clicking a button just updates `window.currentCategory`
 * and asks calendar.js to redraw — this file doesn't know or care
 * HOW the calendar/list is drawn, it only tracks which filter is active.
 */

window.currentCategory = "all";

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("#event-filters .filter-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach((b) => b.classList.remove("is-active"));
      button.classList.add("is-active");

      window.currentCategory = button.dataset.category;

      if (typeof window.refreshEvents === "function") {
        window.refreshEvents();
      }
    });
  });
});
