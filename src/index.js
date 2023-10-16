
function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function (day) {
    
    forecastHTML =
        forecastHTML + 
        `        
        <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" />
       <div class="weather-forecast-temperatures">
         <span class="weather-forecast-max">18  </span>
          <span class="weather-forecast-min"> 12  </span>
        </div>
     </div>
      `;
     });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "9faada74e0td93b882032b77odf27ad4";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=9faada74e0td93b882032b77odf27ad4& units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#weather-icon");
   
    celsiusTemperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = (response.data.city);
    descriptionElement.innerHTML = (response.data.condition.description);
    humidityElement.innerHTML = (response.data.temperature.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon_url}.png`);
    iconElement.setAttribute("alt", response.data.condition.description);

    getForecast(response.data.coordinates);
}

function search(city) {
    let apiKey = "9faada74e0td93b882032b77odf27ad4";
   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=9faada74e0td93b882032b77odf27ad4&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(displayFahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Boston");