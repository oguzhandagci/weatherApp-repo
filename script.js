let weather = {
   apiKey: "250e79ecd3f58165aeaa01a3dcdb39a9",
  fetchWeather: function (zip) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?zip="+ zip +",us&appid=" + this.apiKey +"&units=imperial"
        )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, temp_min, temp_max } = data.main;
    const { speed } = data.wind;
    const time = new Date();
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = parseFloat(temp).toFixed(1) + " °F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + "mph";
    document.querySelector(".weather").classList.remove("loading");
    document.querySelector(".lowTemp").innerText = "Lowest: " + temp_min;
    document.querySelector(".highTemp").innerText = "Highest: " + temp_max;
    document.querySelector(".date").innerText = "Date: " + time;
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')"
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  weather.fetchWeather("28012");