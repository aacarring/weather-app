function getWeather() {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let location = document.getElementById("location");
    let feelsLike = document.getElementById("feels-like");
  
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "c636bf9dabdbd12b76b9ca1995f40721";
  
    location.innerHTML = "Locating...";
  
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
            data.name + ", " + data.sys.country + " (" + latitude + "°, " + longitude + "°)";
            description.innerHTML = data.weather[0].main;
        });
    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  }
  
  getWeather();
  