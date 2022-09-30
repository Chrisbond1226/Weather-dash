var APIKey = "d5baf559e7514e298eb794b56f41de50";

$(document).ready(function () {
  $(".btn").on("click", handleWeatherSearch);

  function fetchCityData(city) {
    // api call that gets our lat and lon
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      APIKey;

    // fetch that appends city name to the page and returns the api data in json
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        fetchWeather(data.coord);

        // appending city name to the page
        var cityNameEl = document.createElement("h2");
        cityNameEl.textContent = data.name;
        $(".city-name").append(cityNameEl);
      });
  }

  // async function fetchWeatherr(obj) {}

  async function fetchWeather(locationObj) {
    // renameing lat and lon data from api
    var lat = locationObj.lat;
    var lon = locationObj.lon;

    // 5 day forcast api call
    var weatherURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      APIKey +
      "&units=imperial";

    const response = await fetch(weatherURL);
    const fiveDayData = await response.json();
    renderFiveDay(fiveDayData.list);

    function renderFiveDay(forecastArray) {
      for (var i = 0; i < forecastArray.length; i += 8) {
        let dayObj = forecastArray[i];
        console.log(dayObj);

        const date = document.createElement("h2");
        date.textContent = dayObj.dt_txt;

        const wind = document.createElement("p");
        wind.textContent = dayObj.wind.speed;

        const windName = document.createElement("h2");
        windName.textContent = "Wind Speed";
        windName.className = "border-bottom";

        const description = document.createElement("p");
        description.textContent = dayObj.weather[0].description;

        const mainTempName = document.createElement("h2");
        mainTempName.className = "border-bottom border-success";
        mainTempName.textContent = "Main Temperature";

        const mainTemp = document.createElement("p");
        mainTemp.className = dayObj.weather[0].icon;
        mainTemp.textContent = dayObj.main.temp;
        mainTemp.setAttribute = ("i class", "dayObj.weather[0].icon");

        const cardContainer = document.createElement("div");
        cardContainer.className = "border";
        cardContainer.append(
          date,
          mainTempName,
          mainTemp,
          description,
          windName,
          wind
        );
        $(".five-day").append(cardContainer);
      }
    }
  }

  function handleWeatherSearch(e) {
    e.preventDefault();
    var searchTerm = $(".userInput").val();
    fetchCityData(searchTerm);
  }

  //   function addsTwoNumbers(num1, num2) {
  //     console.log(num1 + num2);
  //   }

  //   addsTwoNumbers(5, 4);
});
