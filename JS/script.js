const BASE = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const Dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of Dropdowns) {
  for (let currcode in countryList) {
    let option = document.createElement("option");
    option.innerText = currcode;
    option.value = currcode;
    if (select.name === "from" && currcode === "USD") option.selected = true;
    if (select.name === "to" && currcode === "INR") option.selected = true;
    select.append(option);
  }

  select.addEventListener("change", (evt) => updateFlag(evt.target));
}

// Update flag when currency changes
function updateFlag(element) {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

// Convert currency on button click
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE}/${fromcurr.value.toLowerCase()}.json`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

    let finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching data. Please try again!";
    console.error(error);
  }
});
