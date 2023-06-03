const citySelectorElement = document.getElementById("city-selector");
const weatherWidgetElement = document.getElementById("weatherWidget");
const imageElement = document.getElementById("weatherImg");
const descriptionElement = document.getElementById("description");
const temperatureElement = document.getElementById('temp');
const locationElement = document.getElementById('location');
const windSpeedElement = document.getElementById('windSpeed');
const windChillElement = document.getElementById("windChill");

const citiesId = {
  montclair: 5374232,
  upland: 5404915,
  ranchoCucamonga: 5385955,
  claremont: 5337696,
  losAngeles: 5368361,
  chino: 5336545,
  sanFrancisco: 5391959,
  sanDiego: 5391811,
}
const weatherImagesUrls = {
  "Clear Sky": "images/clearsky-icon.png",
  "Few Clouds": "images/fewclouds-icon.png",
  "Scattered Clouds": "images/scatteredclouds-icon.png",
  "Broken Clouds": "images/brokenclouds-icon.png",
  "Shower Rain": "images/showerrain-icon.png",
  "Rain": "images/rain-icon.png",
  "Thunderstorm": "images/thunderstorm-icon.png",
  "Snow": "images/snow-icon.png",
  "Mist": "images/mist-icon.png",
}

citySelectorElement.addEventListener("change", async (event) => {
  weatherWidgetElement.style.display = "block";
  const key = event.target.value;
  const cityId = citiesId[key];
  const weatherData = await getWeatherData(cityId);
  drawWeather(weatherData);
});

function drawWeather(d) {
  const fahrenheit = kelvinToFahrenheit(d.main.temp);

  const rawDescription = d.weather[0].description;
  const capitalizedDescription = capitalize(rawDescription);
  let iconUrl = weatherImagesUrls[capitalizedDescription];
  if (!iconUrl || iconUrl === undefined) {
    iconUrl = `https://openweathermap.org/img/w/${d.weather[0].icon}.png`;
  }

  const windSpeed = d.wind.speed;
  const mph = mpsToMph(windSpeed);
  const windChill = getWindChill(fahrenheit, mph);

  descriptionElement.innerText = capitalizedDescription;
  imageElement.setAttribute("src", iconUrl);
  imageElement.setAttribute("alt", capitalizedDescription);
  temperatureElement.innerHTML = fahrenheit + '&deg; F';
  locationElement.innerHTML = d.name;
  windSpeedElement.innerHTML = `Wind Speed: ${mph} mph`;

  if (windChill === 0) {
    windChillElement.innerHTML = `Wind Chill: N/A`;
  } else {
    windChillElement.innerHTML = `Wind Chill: ${windChill}&deg;`;
  }
}