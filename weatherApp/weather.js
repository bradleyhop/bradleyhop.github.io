$(document).ready(function() {

  // variables we need for all our callbacks
  var town, state;

  // keeping track of temp scale -
  // our requested json returns Fahrenheit by default
  var temp, tempScale = "C";

  // get latlon
  navigator.geolocation.getCurrentPosition(showPosition);

  function showPosition(position) {
    var latitude = position.coords.latitude.toFixed(4);
    var longitude = position.coords.longitude.toFixed(4);

    console.log(latitude, longitude);

    var weatherUrl =
      "https://api.weather.gov/points/" + latitude + "," + longitude ;
      // below is probably openweather api
      /*
       * "https://fcc-weather-api.glitch.me/api/current?lat=" +
       * latitude +
       * "&lon=" +
       * longitude;
       */

    // get the weather json
    $.ajax({
      url      : weatherUrl,
      success  : cbWeather,
      error    : handleError
    });

  }


  function cbWeather(weatherJSON) {
    console.log(weatherJSON);
    temp = weatherJSON.main.temp;
    // display our weather info!!
    $(".weather").html(
      "<h1>" + weatherJSON.coord.lat +
      ", " +
      weatherJSON.coord.lon +
      "</h1>"
    );
    $(".weather").append(
      "<div><h1>" +
      "<div class=temp>" +
      weatherJSON.main.temp +
      " &degC<br></div>" +
      "</h1></div>" +
      "<div class=summary><h3>" +
      weatherJSON.weather[0].description +
      "</h3></div>"
    );

    // put temp changing funcion here!!
    $(".temp").click(function() {
      $(this).html(
        changeTemp(temp, tempScale).toFixed(1) + " &deg" + tempScale
      );
    });
    // $(".weather").append(showWeather(weatherJSON.currently.icon));

  }

  // common error function for ajax calls
  function handleError(jqXHR, textStatus, error) {
    const errorMessage = `<p style='color:white; font-size: 2rem'>Weather
        data unavailable at this time.<br>Please check your browser and/or
        plugin settings to allow geolocation.</p>`;
    $(".weather").empty().append(errorMessage);
    console.log(error);
  }

  // change from c to f and back
  function changeTemp(deg, type) {
    if (type === "F") {
      temp = (deg - 32) * 5 / 9;
      tempScale = "C";
      return temp;
    } else {
      temp = deg * 9 / 5 + 32;
      tempScale = "F";
      return temp;
    }
  }

  function showWeather(icon) {
    // condition codes found at:
    // https://openweathermap.org/weather-conditions
    // TODO: rewrite for new codes
    const weatherIcon = {
      "clear-day"           : "wi-day-sunny",
      "clear-night"         : "wi-night-clear",
      "partly-cloudy-day"   : "wi-day-cloudy",
      "partly-cloudy-night" : "wi-night-cloudy",
      "cloudy"              : "wi-cloudy",
      "rain"                : "wi-rain",
      "snow"                : "wi-snow",
      "sleet"               : "wi-sleet",
      "fog"                 : "wi-fog",
      // next two are not implemented, but could be in the future
      "thunderstorm"        : "wi-thunderstorm",
      "hail"                : "wi-hail"
    };

    if (weatherIcon[icon] === undefined) {
      return "<h1><i class='wi wi-na'></i></h1>";
    } else {
      return "<h1><i class='wi " + weatherIcon[icon] + "'></i></h1>";
    }
  }

});
