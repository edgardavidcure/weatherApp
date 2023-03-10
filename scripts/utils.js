function kelvinToCelsius(temperature) {
  return Math.round(parseFloat(temperature) - 273.15);
}

function kelvinToFahrenheit(temperature) {
  return Math.round((kelvinToCelsius(temperature) * 1.8) + 32);
}

function capitalize(text) {
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

function mpsToMph(mps) {
  return parseFloat(mps * 2.236936).toFixed(1);
}

function getWindChill(fahrenheitTemperature, mph) {
  if (fahrenheitTemperature <= 50 && mph > 3.0) {
    return parseFloat((35.74 + (0.6215 * fahrenheitTemperature) - (35.75 * (mph ** 0.16)) + (0.4275 * fahrenheitTemperature * (mph ** 0.16))).toFixed(1));
  }
  return 0;
}