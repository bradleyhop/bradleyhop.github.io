$(document).ready(function() {

    // because of browser security features, we need to use a CORS proxy to
    //  access insecure json data, at least on codepen.io
    const corsUrl = "https://crossorigin.me/";

    // don't need cors for this geolocation server
    const latLonUrl = "https://freegeoip.net/json/";

    // variables we need for all our callbacks
    var lat, lon, town, state, desc, icon, summary;

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
        // toFixed returns a string, but that's okay for our url
        lat = latLonJSON.latitude.toFixed(2);
        lon = latLonJSON.longitude.toFixed(2);
        town = latLonJSON.city;
        state = latLonJSON.region_code;

        // plugin in are geolocation to our weather api
        var weatherUrl =
            corsUrl +
            "https://api.darksky.net/forecast/" +
            "90eedb52d58f0b2c4511b99509405653/" +
            lat +
            "," +
            lon +
            "?exclude=hourly,daily,alerts,flags";

        // get the weather json
        $.ajax({
            url: weatherUrl,
            type: "GET",
            dataType: "json",
            success: cbWeather,
            error: handleError
        });
    }

    function cbWeather(weatherJSON) {
        descr   = weatherJSON.currently.summary;
        icon    = weatherJSON.currently.icon;
        summary = weatherJSON.minutely.summary;
        temp    = weatherJSON.currently.temperature;

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
            temp.toFixed(1) +
            " &degF<br></div>" +
            descr +
            "</h1></div>" +
            "<div class=summary>" +
            summary +
            "</div>"
        );
        $(".weather").append(showWeather(icon));

        // put temp changing funcion here!!
        $(".temp").click(function() {
            $(this).html(
                changeTemp(temp, tempScale).toFixed(1) + " &deg" + tempScale
            );
        });
    }

    // common error function for ajax calls
    function handleError(jqXHR, textStatus, error) {
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
        var weatherIcon = {
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
