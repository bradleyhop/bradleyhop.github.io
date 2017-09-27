$(document).ready(function() {

    // because of browser security features, we need to use a CORS proxy to
    //  access insecure json data, at least on codepen.io
    const corsUrl = "https://crossorigin.me/";
    const corsAltUrl =  "https://cors-anywhere.herokuapp.com/";

    // don't need cors for this geolocation server
    const latLonUrl = "https://freegeoip.net/json/";

    // variables we need for all our callbacks
    var town, state;

    // keeping track of temp scale -
    // our requested json returns Fahrenheit by default
    var temp, tempScale = "F";


    // get the location of the client's computer
    $.ajax({
        url: latLonUrl,
        type: "GET",
        dataType: "json",
        success: cbLatLon,
        error: handleError
    });

    function cbLatLon(latLonJSON) {
        town = latLonJSON.city;
        state = latLonJSON.region_code;

        // plugin in are geolocation to our weather api
        let weatherUrl =
            corsAltUrl +
            "https://api.darksky.net/forecast/" +
            "90eedb52d58f0b2c4511b99509405653/" +
            latLonJSON.latitude +
            "," +
            latLonJSON.longitude +
            "?exclude=hourly,daily,alerts,flags";

        // get the weather json
        $.ajax({
            url      : weatherUrl,
            dataType : "json",
            success  : cbWeather,
            error    : handleError
        });
    }

    function cbWeather(weatherJSON) {
        // display our weather info!!
        $(".weather").html(
            "<h1>" + town +
            ", " +
            state +
            "</h1>"
        );
        $(".weather").append(
            "<div><h1>" +
            "<div class=temp>" +
            weatherJSON.currently.temperature.toFixed(1) +
            " &degF<br></div>" +
            "</h1></div>" +
            "<div class=summary><h3>" +
            weatherJSON.minutely.summary +
            "</h3></div>"
        );

        $(".weather").append(showWeather(weatherJSON.currently.icon));

        // put temp changing funcion here!!
        $(".temp").click(function() {
            $(this).html(
                changeTemp(temp, tempScale).toFixed(1) + " &deg" + tempScale
            );
        });
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
        return undefined;
    }

    function showWeather(icon) {
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
