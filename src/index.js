// Dates
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let months = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];

let update = document.querySelector("#current-date");
update.innerHTML = (`Last updated: ${month}, ${day} ${date}, ${hours}:${minutes}`);

if (minutes < 10) {
    minutes = `0${minutes}`;
}
if (hours < 10) {
    hours = `0${hours}`;
}

// Search button
function searchCity(city) {
    let apiKey = "c2fbbf737eacdc69f24df5cfe324721b"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    axios.get(apiUrl).then(displayWeatherCondition);
}

function search(event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;
    searchCity(city);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

// Temperature
function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-display");
    temperatureElement.innerHTML = 14;
}

function convertToFarenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-display");
    temperatureElement.innerHTML = Math.round((14 * 9/5) + 32);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);



// Change of background
let backgroundChange = document.querySelector("#main-content");
   if (hours < 6) {
     backgroundChange.style.backgroundImage = "url('img/night.gif')";
}
    
// Geolocation
function displayWeatherCondition(response) {
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temp-display");
    temperatureElement.innerHTML = temperature;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind-speed");
    let wind = Math.round(response.data.wind.speed);
    windElement.innerHTML = wind;
    let iconElement = document.querySelector("#current-icon");
    iconElement.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchLocation(position) {
    let apiKey = "c2fbbf737eacdc69f24df5cfe324721b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);  
}

let currentLocationButton = document.querySelector("#geolocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Future forecast

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    let forecastHTML = `<div class="row">`;
    
    days.forEach(function (day) {
        forecastHTML = forecastHTML + `
    <div class="col">
<h5 class="weather-forecast-date">
    ${day}
</h5>
<img src="img/04d.png" width="70px" alt="clearnight">
<br>
<p>
    <span class="weather-forecast-max">6°C</span>/
    <span class="weather-forecast-min">4°C</span>
</p>
    </div>
    `;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
displayForecast()

