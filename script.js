document.addEventListener("DOMContentLoaded", () => {
  const city = document.querySelector(".city-input");
  const searchBtn = document.querySelector(".search-button");
  const weatherIcon = document.querySelector(".weather-icon");
  const weatherBox = document.querySelector(".weather");
  const errorMsg = document.querySelector(".error");

  weatherBox.classList.add("hidden");
  errorMsg.classList.add("hidden");

  searchBtn.addEventListener("click", () => {
    checkWeather();
  });

  async function checkWeather() {
    try {
      const cityName = city.value.trim();
      if (!cityName) return;
      const API_KEY = `7badc0e69be4d8493ce07374fb4fb427`;
      const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      const response = await fetch(api_url);
      const data = await response.json();

      if (!response.ok) {
        weatherBox.classList.add("hidden");
        errorMsg.classList.remove("hidden");
        return;
      } else {
        console.log(data);
        weatherBox.classList.remove("hidden");
        errorMsg.classList.add("hidden");

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
          Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML =
          data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "./assets/icons/clouds.png";
        } else if (data.weather[0].main == "Clear") {
          weatherIcon.src = "./assets/icons/clear.png";
        } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "./assets/icons/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
          weatherIcon.src = "./assets/icons/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
          weatherIcon.src = "./assets/icons/mist.png";
        } else if (data.weather[0].main == "Snow") {
          weatherIcon.src = "./assets/icons/snow.png";
        }
        city.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  }
});
