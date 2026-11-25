// Sign-up form: sends the name and email to a Google Apps Script that adds a row
// to a Google Sheet. Used by every page that has the sign-up section (#signup-form).

// The Google Apps Script web app URL (ends in /exec). Change it here only.
const SIGNUP_URL = "https://script.google.com/macros/s/AKfycbwCTBARC0v1gLV2SYjtUNpL6HxmidhJWbOSMsfgOc1Jd3bvEf6MCANBeYCJ5yMMyfbO/exec";

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  const status = document.getElementById("form-status");
  const submitButton = signupForm.querySelector("button[type=submit]");

  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!SIGNUP_URL) {
      status.textContent = "Sign-up isn't connected yet.";
      return;
    }
    submitButton.disabled = true;
    status.textContent = "Sending…";
    try {
      const response = await fetch(SIGNUP_URL, { method: "POST", body: new URLSearchParams(new FormData(signupForm)) });
      const result = await response.json();
      if (!result.ok) throw new Error("rejected");
      signupForm.reset();
      status.textContent = "Thanks, you're on the list!";
    } catch (err) {
      status.textContent = "Sorry, something went wrong. Please try again.";
    }
    submitButton.disabled = false;
  });
}
