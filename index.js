import "./src/styles/main.scss";
import "@babel/polyfill";
import Forecast from "./src/modules/forecast";
const forecast = new Forecast();
const form = document.querySelector("form");
const cityDets = document.querySelector(".card_details");
const card = document.querySelector(".card");
const cardImg = document.querySelector(".card img");
const cardIcon = document.querySelector(".icon img");

const updateUI = ({ location, conditions }) => {
  const imgSrc = conditions.IsDayTime
    ? "./src/assets/img/day.svg"
    : "./src/assets/img/night.svg";
  cardImg.setAttribute("src", imgSrc);

  const iconSrc = `./src/assets/img/icons/${conditions.WeatherIcon}.svg`;
  cardIcon.setAttribute("src", iconSrc);

  cityDets.innerHTML = `
    <h5 class="my-3">${location.EnglishName}</h5>
    <div class="my-3">${conditions.WeatherText}</div>
    <div class="display-4 my-4"><span>${
      conditions.Temperature.Metric.Value
    }</span><span>&deg;C</span></div>
  `;
  card.classList.remove("d-none");
};
form.addEventListener("submit", e => {
  e.preventDefault();
  const city = form.city.value.trim();
  form.reset();
  forecast
    .updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error));
  localStorage.setItem("city", city);
  window.scrollTo(0, document.body.scrollHeight);
});

const city = localStorage.getItem("city");
if (city) {
  forecast
    .updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error));
}
