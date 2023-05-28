const API_KEY = "42933772093fed5078670fc2a6ed5b74";

const search = document.querySelector(".search");
search.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.key === "Enter") {
    getLocation(search.value);
  }
}

async function getLocation(query) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
  );

  const data = await res.json();
  console.log(data);

  displayResults(data);
}
function displayResults(data) {
  let city = document.querySelector(".location--city");
  city.innerText = `${data.name}, ${data.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location--date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current--temp");
  temp.innerHTML = `${Math.ceil(data.main.temp - 273.15)} <span>°C</span>`;

  let condition = document.querySelector(".current--weather");

  condition.innerText = data.weather[0].main;

  let minmax = document.querySelector(".current--hi-low");
  minmax.innerHTML = `${Math.ceil(data.main.temp_min - 273.15)}°C / ${Math.ceil(
    data.main.temp_max - 273.15
  )}°C`;
}
function dateBuilder(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = days[date.getDay()];
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${weekDay}, ${day} ${month} ${year}`;
}
