$(document).ready(function() {

    // because of browser security features, we need to use a CORS proxy to
    //  access insecure json data
    var corsUrl = "https://crossorigin.me/";

    // don't need cors for this geolocation server
    var latLonUrl = "https://freegeoip.net/json/";

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
        descr = weatherJSON.currently.summary;
        icon = weatherJSON.currently.icon;
        summary = weatherJSON.minutely.summary;
        temp = weatherJSON.currently.temperature;

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
        var weathICON = "";
        // case strings provided by dark sky api
        switch (icon) {
            case "clear-day":
                weathICON = "wi-day-sunny";
                break;
            case "clear-night":
                weathICON = "wi-night-clear";
                break;
            case "partly-cloudy-day":
                weathICON = "wi-day-cloudy";
                break;
            case "partly-cloudy-night":
                weathICON = "wi-night-cloudy";
                break;
            case "cloudy":
                weathICON = "wi-cloudy";
                break;
            case "rain":
                weathICON = "wi-rain";
                break;
            case "snow":
                weathICON = "wi-snow";
                break;
            case "sleet":
                weathICON = "wi-sleet";
                break;
            case "fog":
                weathICON = "wi-fog";
                break;
                // next two are not implemented, but could be in the future
            case "thunderstorm":
                weathICON = "wi-thunderstorm";
                break;
            case "hail":
                weathICON = "wi-hail";
                break;
                // fallback for any undefined or unimplemented icons
            default:
                weathICON = "wi-na";
        }
        return "<h1><i class='wi " + weathICON + "'></i></h1>";
    }

});
