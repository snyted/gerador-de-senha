const securityIndicatorBarEl = document.querySelector(
  "#security-indicator-bar"
);
const inputPasswordEl = document.querySelector("#password");
const uppercaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");

let passwordLength = 16;

function generatePassword() {
  let chars = "abcdefghjkmnpqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numbersChars = "123456789";
  const symbolChars = "?!@&*()[]";

  if (uppercaseCheckEl.checked) {
    chars += upperCaseChars;
    console.log(upperCaseChars.checked);
  }

  if (numberCheckEl.checked) {
    chars += numbersChars;
  }

  if (symbolCheckEl.checked) {
    chars += symbolChars;
  }

  let password = "";

  for (let index = 0; index < passwordLength; index++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    console.log(randomIndex);
    password = password + chars.substring(randomIndex, randomIndex + 1);
  }

  inputPasswordEl.value = password;
  calculateQuality();
  calculateFontSize();
}

function calculateQuality() {
  const percent = Math.round(
    (passwordLength / 64) * 25 +
      (uppercaseCheckEl.checked ? 15 : 0) +
      (numberCheckEl.checked ? 25 : 0) +
      (symbolCheckEl.checked ? 35 : 0)
  );

  securityIndicatorBarEl.style.width = `${percent}%`;

  if (percent > 69) {
    securityIndicatorBarEl.classList.remove("critical");
    securityIndicatorBarEl.classList.remove("warning");
    securityIndicatorBarEl.classList.add("safe");
  } else if (percent > 39) {
    securityIndicatorBarEl.classList.remove("critical");
    securityIndicatorBarEl.classList.remove("safe");
    securityIndicatorBarEl.classList.add("warning");
  } else {
    securityIndicatorBarEl.classList.remove("warning");
    securityIndicatorBarEl.classList.remove("safe");
    securityIndicatorBarEl.classList.add("critical");
  }

  if (percent >= 100) {
    securityIndicatorBarEl.classList.add("completed");
  } else {
    securityIndicatorBarEl.classList.remove("completed");
  }
}

function calculateFontSize() {
  if (passwordLength > 45) {
    inputPasswordEl.classList.remove("font-sm");
    inputPasswordEl.classList.remove("font-xs");
    inputPasswordEl.classList.add("font-xxs");
  } else if (passwordLength > 32) {
    inputPasswordEl.classList.remove("font-sm");
    inputPasswordEl.classList.add("font-xs");
    inputPasswordEl.classList.remove("font-xxs");
  } else if (passwordLength > 22) {
    inputPasswordEl.classList.add("font-sm");
    inputPasswordEl.classList.remove("font-xs");
    inputPasswordEl.classList.remove("font-xxs");
  } else {
    inputPasswordEl.classList.remove("font-sm");
    inputPasswordEl.classList.remove("font-xs");
    inputPasswordEl.classList.remove("font-xxs");
  }
}

function passwordCopy() {
  navigator.clipboard.writeText(inputPasswordEl.value);
}

function rotationSlider() {
  const passwordLengthElement = document.querySelector("#password-length");
  passwordLengthElement.addEventListener("input", function () {
    passwordLength = passwordLengthElement.value;
    document.querySelector("#password-length-text").innerText = passwordLength;

    generatePassword();
  });
}
rotationSlider();

// Evento das checkbox
uppercaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

document.querySelector("#copy").addEventListener("click", passwordCopy);
document.querySelector("#icon-copy").addEventListener("click", passwordCopy);
document.querySelector("#refresh").addEventListener("click", generatePassword);

generatePassword();
