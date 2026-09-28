/*
 * calendar.js
 * -----------
 * Fetches events from /api/events and draws them two ways:
 *   1. A month calendar grid (with colored dots per event)
 *   2. A simple list (already rendered by Jinja on first load, but
 *      redrawn here after a filter change)
 *
 * Also handles the Calendar/List view toggle buttons.
 */

let calendarState = {
  viewMonth: new Date(), // which month the calendar grid is showing
};

document.addEventListener("DOMContentLoaded", function () {
  // Show the month of the first upcoming event by default, if we can find one.
  fetchEvents("all").then(function (events) {
    if (events.length > 0) {
      calendarState.viewMonth = new Date(events[0].date + "T00:00:00");
    }
    drawCalendar(events);
  });

  // View toggle buttons (Calendar vs List)
  const viewButtons = document.querySelectorAll(".view-btn");
  viewButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      viewButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const isCalendar = btn.dataset.view === "calendar";
      document.getElementById("calendar-view").style.display = isCalendar ? "block" : "none";
      document.getElementById("list-view").style.display = isCalendar ? "none" : "flex";
    });
  });
});

// Called by filters.js whenever the category filter changes.
window.refreshEvents = function () {
  fetchEvents(window.currentCategory).then(function (events) {
    drawCalendar(events);
    drawList(events);
  });
};

function fetchEvents(category) {
  return fetch("/api/events?category=" + encodeURIComponent(category))
    .then((res) => res.json())
    .catch(() => []);
}

function drawCalendar(events) {
  const grid = document.getElementById("calendar-grid");
  const label = document.getElementById("calendar-month-label");
  grid.innerHTML = "";

  const month = calendarState.viewMonth.getMonth();
  const year = calendarState.viewMonth.getFullYear();
  const monthNames = ["January","February","March","April","May","June",
                       "July","August","September","October","November","December"];
  label.textContent = monthNames[month] + " " + year;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty cells before day 1
  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";

    const dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
    const dayEvents = events.filter((e) => e.date === dateStr);

    cell.innerHTML = '<div class="calendar-day__number">' + day + "</div>";

    dayEvents.forEach(function (event) {
      const dot = document.createElement("span");
      dot.className = "calendar-day__dot calendar-day__dot--" + event.category;
      dot.title = event.name;
      dot.addEventListener("click", function () {
        window.openEventModal(event.id);
      });
      cell.appendChild(dot);
    });

    grid.appendChild(cell);
  }
}

function drawList(events) {
  const listView = document.getElementById("list-view");
  listView.innerHTML = "";

  events.forEach(function (event) {
    const card = document.createElement("article");
    card.className = "event-card";
    card.dataset.eventId = event.id;
    card.innerHTML =
      '<span class="event-card__dot event-card__dot--' + event.category + '"></span>' +
      '<div class="event-card__date">' + event.date + "</div>" +
      '<div class="event-card__name">' + event.name + "</div>" +
      '<div class="event-card__category">' + event.category.toUpperCase() + "</div>";

    card.addEventListener("click", function () {
      window.openEventModal(event.id);
    });

    listView.appendChild(card);
  });
}
