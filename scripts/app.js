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
  const capitalizedDescription = capilize(rawDescription);

  const windSpeed = d.wind.speed;
  const mph = mpsToMph(windSpeed);
  const windChill = getWindChill(fahrenheit, mph);

  descriptionElement.innerText = capitalizedDescription;
  imageElement.setAttribute("src", d.imgUrl);
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