/*
 * newsletter.js
 * -------------
 * Handles the "Stay in the Loop" signup form. Right now it just shows a
 * confirmation message — there's no email service connected yet.
 *
 * TO CONNECT A REAL EMAIL SERVICE LATER:
 * Replace the body of the "submit" handler below with a fetch() call to
 * your email provider's API (e.g. Mailchimp, ConvertKit) or to your own
 * backend route that saves the email to your database.
 */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newsletter-form");
  const message = document.getElementById("newsletter-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value;

    // Placeholder behavior — swap this out for a real API call later.
    message.textContent = "Thanks! " + email + " has been added to the list.";
    form.reset();
  });
});
