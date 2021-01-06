function getWeather() {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let location = document.getElementById("location");
    let feelsLike = document.getElementById("feels-like");
  
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "c636bf9dabdbd12b76b9ca1995f40721";
  
    location.innerHTML = "Hold tight while we locate...";
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      let url =
        api +
        "?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKey +
        "&units=imperial";
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let temp = data.main.temp.toFixed(0);
            feelsLike.innerHTML = "Feels like " + data.main.feels_like.toFixed(0) + "° F";
            temperature.innerHTML = temp + "° F";
            location.innerHTML =
            data.name + ", " + data.sys.country;
            description.innerHTML = data.weather[0].main;
            if (data.weather[0].main === "Clouds") {
                description.innerHTML += ` <i class="fas fa-cloud"></i>`;
            } else if (data.weather[0].main === "Rain") {
                description.innerHTML += ` <i class="fas fa-cloud-rain"></i>`;
            } else if (data.weather[0].main === "Snow") {
                description.innerHTML += ` <i class="far fa-snowflake"></i>`;
            } else if (data.weather[0].main === "Clear") {
                description.innerHTML += ` <i class="fas fa-sun"></i>`;
            } else if (data.weather[0].main === "Thunderstorm") {
                description.innerHTML += ` <i class="fas fa-bolt"></i>`;
            }
        });
    }
  
    function error() {
      location.innerHTML = "Uh-oh...unable to retrieve your location.";
    }
  }
  
  getWeather();
  