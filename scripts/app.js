
function weatherBalloon( cityID ) {
    var key = "582b55efa5e27910234adbbf3225cdad";
    fetch("https://api.openweathermap.org/data/2.5/weather?id=" + cityID+ "&appid=" + "582b55efa5e27910234adbbf3225cdad").then(function(resp) { 
        return resp.json() 
    }).then(function(data) {
      drawWeather(data);
    }).catch(function() {
      // catch any errors
    });
}
let option = document.querySelector("select");


if (option) option.addEventListener("change", (event) =>  {
    document.getElementById("weatherWidget").style.display = "block"
    if (event.target.value == "montclair"){     
        weatherBalloon( 5374232 );
        console.log("hey")}
    if (event.target.value == "upland"){
        weatherBalloon( 5404915 );}
    if (event.target.value == "ranchoCucamonga"){
        weatherBalloon( 5385955 );}
    if (event.target.value == "claremont"){
        weatherBalloon( 5337696 );}
    if (event.target.value == "losAngeles"){
        weatherBalloon( 5368361 );}
    if (event.target.value == "chino"){
        weatherBalloon( 5336545 );}
    if (event.target.value == "sanFrancisco"){
        weatherBalloon( 5391959 );}
    if (event.target.value == "sanDiego"){
        weatherBalloon( 5391811 );} 
})






function drawWeather( d ) {
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
      var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
    const description = d.weather[0].description.split(" ")
    for (let i = 0; i < description.length; i++){
      description[i] = description[i][0].toUpperCase() + description[i].substr(1);
    }
    const image = document.getElementById("weatherImg");
    
    const capitalizedDescription = description.join(" ")
    document.getElementById("description").innerText = capitalizedDescription
    switch (capitalizedDescription){
      case "Clear Sky":
        iconsrc = "images/clearsky-icon.png";
        break;
      case "Few Clouds":
        iconsrc = "images/fewclouds-icon.png";
        break;
      case "Scattered Clouds":
        iconsrc = "images/scatteredclouds-icon.png"
        break;
      case "Broken Clouds":
        iconsrc = "images/brokenclouds-icon.png";
        break;
      case "Shower Rain":
        iconsrc = "images/showerrain-icon.png";
        break;
      case "Rain":
        iconsrc = "images/rain-icon.png";
        break;
      case "Thunderstorm":
        iconsrc = "images/thunderstorm-icon.png";
        break;
      case "Snow":
        iconsrc = "images/snow-icon.png";
        break;
      case "Mist":
        iconsrc = "images/mist-icon.png";
        break;
      default:
        iconsrc = `https://openweathermap.org/img/w/${d.weather[0].icon}.png`;
    }
    
    image.setAttribute("src", iconsrc)
    image.setAttribute("alt", capitalizedDescription)
      //document.getElementById('description').innerHTML = d.weather[0].description;
      document.getElementById('temp').innerHTML = fahrenheit + '&deg; F';
      document.getElementById('location').innerHTML = d.name;
    const windSpeed = d.wind.speed;
    const mph =  parseFloat(windSpeed * 2.236936).toFixed(1);
    document.getElementById('windSpeed').innerHTML = `Wind Speed: ${mph} mph`
    if (fahrenheit <= 50 && mph > 3.0){
      const windChillVar = parseFloat(35.74 + (0.6215 * fahrenheit) - (35.75 * (mph ** 0.16)) + (0.4275 * fahrenheit * (mph ** 0.16))).toFixed(1);
      document.getElementById("windChill").innerHTML = `Wind Chill: ${windChillVar}&deg;`
    } 
    else {
      const windChillVar = "N/A";
      document.getElementById("windChill").innerHTML = `Wind Chill: ${windChillVar}`
      
    }
    
  }