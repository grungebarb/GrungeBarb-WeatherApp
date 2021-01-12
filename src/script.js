// Current Date
function formatTime(time) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[time.getDay()];
  let date = time.getDate();
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let fullDate = `${day} ${date}, ${hour}:${minutes}h`;
  return fullDate;
}
let currentDate = new Date();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime(currentDate);

// On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
function showTemperature(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(response.data.main.temp)}ºC`;
  //let currentTemperature = Math.round(response.data.main.temp);
  //let showCurrentTemp = document.querySelector("#current-temperature");
  //showCurrentTemp.innerHTML = `${currentTemperature}ºC`;
  // Here should be something about #current-place (button "Current"), in what I have to get 1st latitude and longitude of the user, 2nd the api url for display it, and 3rd, display it. But I will do it tomorrow
}

function search(city) {
  let apiKey = `b89a2bda363f782379e90e985a8aa5e3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#typed-city").value;
  search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

search("Moralzarzal");


// Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `b89a2bda363f782379e90e985a8aa5e3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);  
}

function showCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPlaceBtn = document.querySelector("#current-place");
currentPlaceBtn.addEventListener("click", showCurrentTemp);