const bgImage = document.getElementById("bgImage");
const bgName = document.getElementById("bgName");

// target = where the scroll really is, current = where the animation is
let target = 0;
let current = 0;

// Lower number = slower, softer glide. Higher = snappier.
const smoothing = 0.08;

function getProgress() {
  const maxScroll = window.innerHeight;
  return Math.min(window.scrollY / maxScroll, 1);
}

function animate() {
  target = getProgress();

  // Move a small part of the way toward the target every frame
  current += (target - current) * smoothing;

  // Stop tiny leftover movement
  if (Math.abs(target - current) < 0.0005) {
    current = target;
  }

  // Background zooms out from 1.25 to 1.0
  const scale = 1.25 - current * 0.25;
  bgImage.style.transform = "scale(" + scale + ")";

  // Big name fades out and drifts up slightly
  bgName.style.opacity = 1 - current;
  bgName.style.transform =
    "translate(-50%, calc(-50% - " + current * 40 + "px))";

  requestAnimationFrame(animate);
}

animate();

// ---------- Inquiry form ----------

// ACCESS KEY from web3forms.com. Delete the placeholder text below and paste your key between the quotes.
// The inquiries are delivered to the email address you registered with the service.
const ACCESS_KEY = "PASTE_YOUR_ACCESS_KEY_HERE";

// WhatsApp number from his TikTok bio, digits only. Used for the optional chat link.
const WHATSAPP_NUMBER = "18764906032";

const form = document.getElementById("inquiryForm");
const formStatus = document.getElementById("formStatus");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const serviceSelect = document.getElementById("service");
const houseDetails = document.getElementById("houseDetails");

// Capitalize the first letter of every word in a name, as they type
function capitalizeName(value) {
  return value.replace(/(^|[\s'-])([a-z])/g, function (match, start, letter) {
    return start + letter.toUpperCase();
  });
}

document.querySelectorAll(".name-input").forEach(function (input) {
  input.addEventListener("input", function () {
    const cursor = input.selectionStart;
    input.value = capitalizeName(input.value);
    input.setSelectionRange(cursor, cursor);
  });
});

// Check the email format
const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

function checkEmail() {
  const good = emailPattern.test(emailInput.value.trim());
  emailError.hidden = good || emailInput.value.trim() === "";
  return good;
}

emailInput.addEventListener("blur", checkEmail);

// Show the house questions only when House plans is chosen
serviceSelect.addEventListener("change", function () {
  houseDetails.hidden = serviceSelect.value !== "House plans";
});

// ---------- Phone number auto-format: +1 (876) 555-1234 ----------
const phoneInput = document.getElementById("phone");

function formatPhone(raw) {
  let digits = raw.replace(/\D/g, "");

  // Drop a leading 1 (the country code), we add it back ourselves
  if (digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);

  if (digits.length === 0) {
    return "";
  }
  if (digits.length <= 3) {
    return "+1 (" + digits;
  }
  if (digits.length <= 6) {
    return "+1 (" + digits.slice(0, 3) + ") " + digits.slice(3);
  }
  return (
    "+1 (" +
    digits.slice(0, 3) +
    ") " +
    digits.slice(3, 6) +
    "-" +
    digits.slice(6)
  );
}

phoneInput.addEventListener("input", function () {
  phoneInput.value = formatPhone(phoneInput.value);
  updateSendButton();
});

// ---------- Parishes and towns ----------
// Towns and communities are common examples. Every parish also has an
// "Other" choice so nobody gets stuck. Add or remove names any time.
const PARISHES = {
  Kingston: [
    "Downtown Kingston",
    "New Kingston",
    "Half Way Tree",
    "Rae Town",
    "Tivoli Gardens",
    "Vineyard Town",
    "Allman Town",
    "Cross Roads",
    "Rockfort",
    "Mountain View",
  ],
  "St. Andrew": [
    "Meadowbrook",
    "Havendale",
    "Barbican",
    "Constant Spring",
    "Mona",
    "Hope Pastures",
    "Liguanea",
    "Stony Hill",
    "Red Hills",
    "Cherry Gardens",
    "Norbrook",
    "Jacks Hill",
    "Papine",
    "Gordon Town",
  ],
  "St. Catherine": [
    "Spanish Town",
    "Portmore",
    "Old Harbour",
    "Linstead",
    "Bog Walk",
    "Ewarton",
    "Gregory Park",
    "Greater Portmore",
    "Edgewater",
    "Sligoville",
  ],
  Clarendon: [
    "May Pen",
    "Chapelton",
    "Lionel Town",
    "Frankfield",
    "Hayes",
    "Race Course",
    "Rocky Point",
    "Four Paths",
  ],
  Manchester: [
    "Mandeville",
    "Christiana",
    "Porus",
    "Williamsfield",
    "Spur Tree",
    "Cross Keys",
    "Walderston",
  ],
  "St. Elizabeth": [
    "Black River",
    "Santa Cruz",
    "Junction",
    "Balaclava",
    "Malvern",
    "Southfield",
    "Siloah",
  ],
  Westmoreland: [
    "Savanna-la-Mar",
    "Negril",
    "Whitehouse",
    "Bluefields",
    "Grange Hill",
    "Frome",
    "Darliston",
  ],
  Hanover: [
    "Lucea",
    "Hopewell",
    "Sandy Bay",
    "Green Island",
    "Orange Bay",
    "Kendal",
  ],
  "St. James": [
    "Montego Bay",
    "Anchovy",
    "Adelphi",
    "Montpelier",
    "Mt. Salem",
    "Reading",
    "Cambridge",
    "Catherine Hall",
    "Ironshore",
  ],
  Trelawny: [
    "Falmouth",
    "Clark's Town",
    "Duncans",
    "Albert Town",
    "Wakefield",
    "Rio Bueno",
    "Martha Brae",
  ],
  "St. Ann": [
    "St. Ann's Bay",
    "Ocho Rios",
    "Runaway Bay",
    "Discovery Bay",
    "Brown's Town",
    "Moneague",
    "Claremont",
    "Priory",
  ],
  "St. Mary": [
    "Port Maria",
    "Annotto Bay",
    "Oracabessa",
    "Highgate",
    "Gayle",
    "Richmond",
    "Boscobel",
  ],
  Portland: [
    "Port Antonio",
    "Buff Bay",
    "Manchioneal",
    "Hope Bay",
    "Fellowship",
    "Long Bay",
    "Boston",
  ],
  "St. Thomas": [
    "Morant Bay",
    "Yallahs",
    "Bath",
    "Golden Grove",
    "Port Morant",
    "Seaforth",
    "Leith Hall",
  ],
};

const parishSelect = document.getElementById("parish");
const townSelect = document.getElementById("town");
const locationInput = document.getElementById("location");
const locationChoice = document.getElementById("locationChoice");

// Fill the parish dropdown
Object.keys(PARISHES).forEach(function (name) {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  parishSelect.appendChild(option);
});

// Show the parish list only when they say they know the location
locationChoice.addEventListener("change", function () {
  const knows = locationChoice.value === "specify";
  parishSelect.hidden = !knows;
  parishSelect.required = knows;
  if (!knows) {
    parishSelect.value = "";
    townSelect.hidden = true;
    townSelect.required = false;
    townSelect.value = "";
    locationInput.hidden = true;
    locationInput.required = false;
    locationInput.value = "";
  }
  updateSendButton();
});

// When a parish is picked, fill the town list for that parish
parishSelect.addEventListener("change", function () {
  const towns = PARISHES[parishSelect.value] || [];

  townSelect.innerHTML = '<option value="">Choose a town or community</option>';
  const seen = {};
  towns.forEach(function (name) {
    if (seen[name]) {
      return;
    }
    seen[name] = true;
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    townSelect.appendChild(option);
  });

  const other = document.createElement("option");
  other.value = "other";
  other.textContent = "Other, I will type it";
  townSelect.appendChild(other);

  const hasParish = parishSelect.value !== "";
  townSelect.hidden = !hasParish;
  townSelect.required = hasParish;
  townSelect.value = "";
  locationInput.hidden = true;
  locationInput.required = false;
  locationInput.value = "";
  updateSendButton();
});

// If they pick Other, show a box to type the place
townSelect.addEventListener("change", function () {
  const typeIt = townSelect.value === "other";
  locationInput.hidden = !typeIt;
  locationInput.required = typeIt;
  if (!typeIt) {
    locationInput.value = "";
  }
  updateSendButton();
});

// Turn the chosen location into one line for the message
function locationText() {
  if (locationChoice.value !== "specify") {
    return "To be discussed";
  }
  const town =
    townSelect.value === "other"
      ? locationInput.value.trim() || "Not given"
      : townSelect.value;
  return town + ", " + parishSelect.value;
}

// ---------- Send button stays faded until the form is complete ----------
const sendBtn = document.getElementById("sendBtn");
const consentBox = document.getElementById("consent");

function updateSendButton() {
  sendBtn.disabled = !(
    form.checkValidity() &&
    consentBox.checked &&
    emailPattern.test(emailInput.value.trim())
  );
}

form.addEventListener("input", updateSendButton);
form.addEventListener("change", updateSendButton);
updateSendButton();

// Show or hide a text box depending on the dropdown above it
function linkChoice(selectId, inputId) {
  const select = document.getElementById(selectId);
  const input = document.getElementById(inputId);

  select.addEventListener("change", function () {
    const specify = select.value === "specify";
    input.hidden = !specify;
    input.required = specify;
    if (!specify) {
      input.value = "";
    }
  });
}

linkChoice("sizeChoice", "size");

// Read a field, or say "To be discussed" if they chose that
function getChoice(selectId, inputId) {
  const select = document.getElementById(selectId);
  if (select.value === "specify") {
    return document.getElementById(inputId).value.trim() || "To be discussed";
  }
  return select.value;
}

// Extra lines about the house, only if House plans was chosen
function houseSummary() {
  if (serviceSelect.value !== "House plans") {
    return "";
  }
  const val = (id) => document.getElementById(id).value.trim() || "Not given";
  return (
    "Bedrooms: " +
    val("bedrooms") +
    "\n" +
    "Bathrooms: " +
    val("bathrooms") +
    "\n" +
    "Floors: " +
    val("floors") +
    "\n" +
    "Style: " +
    val("style") +
    "\n" +
    "Must-have features: " +
    val("features") +
    "\n"
  );
}

function buildMessage() {
  const get = (id) => document.getElementById(id).value.trim() || "Not given";

  return (
    "New project inquiry from the website\n\n" +
    "Name: " +
    get("firstName") +
    " " +
    get("lastName") +
    "\n" +
    "Email: " +
    get("email") +
    "\n" +
    "Phone or WhatsApp: " +
    get("phone") +
    "\n" +
    "Needs: " +
    get("service") +
    "\n" +
    "Project type: " +
    get("type") +
    "\n" +
    houseSummary() +
    "Plot location: " +
    locationText() +
    "\n" +
    "Land size: " +
    getChoice("sizeChoice", "size") +
    "\n" +
    "Budget (JMD): " +
    get("budget") +
    "\n" +
    "Start: " +
    get("timeline") +
    "\n\n" +
    "Idea:\n" +
    get("details")
  );
}

// Show a clear colored message under the Send button
// type can be 'warning', 'error' or 'info'
function showStatus(text, type) {
  formStatus.textContent = text;
  formStatus.className = "form-alert " + type;
  formStatus.hidden = false;
  formStatus.scrollIntoView({ behavior: "smooth", block: "center" });
}

// One button: sends the inquiry in the background, the visitor stays on the page.
// It shows a loading message, then a thank-you message once it really went through.
const formCard = document.querySelector(".inquiry-form");
const thankYouBox = document.getElementById("thankYouBox");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!checkEmail()) {
    emailInput.focus();
    return;
  }

  // Until a real key is pasted in, be honest instead of pretending it was sent
  if (ACCESS_KEY === "PASTE_YOUR_ACCESS_KEY_HERE") {
    showStatus(
      "Sending is not switched on yet. Please contact us on WhatsApp for now.",
      "warning",
    );
    return;
  }

  const subject =
    "Project inquiry from " +
    document.getElementById("firstName").value.trim() +
    " " +
    document.getElementById("lastName").value.trim();

  const message = buildMessage();

  // Loading state: lock the button and say we are sending
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";
  showStatus("Sending your inquiry, please wait.", "info");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: subject,
        from_name: "Javanie's Studio website",
        name:
          document.getElementById("firstName").value.trim() +
          " " +
          document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        message: message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      // Sent for real: swap the form for the thank-you message, no page change
      formCard.hidden = true;
      thankYouBox.hidden = false;
      thankYouBox.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      throw new Error(result.message || "Send failed");
    }
  } catch (error) {
    // Something went wrong: say so honestly and let them try again
    showStatus(
      "Sorry, your inquiry could not be sent. Please try again, or contact us on WhatsApp.",
      "error",
    );
    sendBtn.textContent = "Send My Inquiry";
    updateSendButton();
  }
});
