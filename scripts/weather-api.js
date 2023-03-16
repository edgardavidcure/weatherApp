const openWeatherConfig = {
  apiKey: "582b55efa5e27910234adbbf3225cdad",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  imgBaseUrl: "https://openweathermap.org/img/w",
}

async function getWeatherData(cityID) {
  try {
    const url = `${openWeatherConfig.baseUrl}?id=${cityID}&appid=${openWeatherConfig.apiKey}`;
    const response = await fetch(url)
    const jsonResponse = await response.json();
    jsonResponse.imgUrl = `${openWeatherConfig.imgBaseUrl}/${jsonResponse.weather[0].icon}.png`;
    return jsonResponse;
  } catch (error) {
    throw error;
  }
}