function insertTime() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let currentTime = `${day} ${hour}:${minute}`;
  document.querySelector("#current-time").innerHTML = currentTime;
}

function defaultCity() {
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tabriz&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemp);
}

function searchCity() {
  let cityForm = document.querySelector("#city-search");
  cityForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let cityName = document.querySelector("#city").value;
    document.querySelector("h1").innerHTML = cityName;
    let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(currentTemp);
  });
}

function currentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = temperature;

  let humidity = response.data.main.humidity;
  let humidityelement = document.querySelector("#humidity");
  humidityelement.innerHTML = humidity;

  let wind = response.data.wind.speed;
  let windelement = document.querySelector("#wind");
  windelement.innerHTML = wind;

  let description = response.data.weather[0].description;
  let descElement = document.querySelector("#weather-desc");
  descElement.innerHTML = description;

  let city = response.data.name;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = city;
}

function currentCity() {
  let currentCityEl = document.querySelector("#current-city");
  currentCityEl.addEventListener("click", function (event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(currentPosition);
  });
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}

insertTime();
defaultCity();
searchCity();
currentCity();
