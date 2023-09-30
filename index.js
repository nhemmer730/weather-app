 let now = new Date();
  let currentDateTime = document.querySelector("#currentDateTime");

  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();

  let days =[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  currentDateTime.innerHTML = `${day}, ${month} ${date}, ${year}  ${hours}:${minutes}`;

 function displayWeatherCondition(response) {
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

}

function searchCity(city) {
  let apiKey ="d5dd31649081791d17cdb524d42767c1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayWeatherCondition);
}

function showCity(event){
    let city = document.querySelector("#city-input").value;
    event.preventDefault();
   searchCity(city);
}

function findLocation(position) {
  let apiKey ="d5dd31649081791d17cdb524d42767c1";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
 axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", showCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Boston");
