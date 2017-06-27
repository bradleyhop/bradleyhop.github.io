// to bypass any cross-origin errors
var corsUrl = "https://cors-anywhere.herokuapp.com/";
// fCC twitch api pass-through
var twitchAPI = "https://wind-bow.gomix.me/twitch-api/";
// array of people who regularly stream
var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck",
    "habathcx", "RobotCaleb", "noobs2ninjas"];
// array of nonexisting accounts
var nonStreams = ["brunofin", "comster404"];

// array of twitch apis to jsons to get diff info about users
// users = if live, and what is streaming if so; null if not live
// channels = verbose! info about user
// streams = succinct info about user
var twitchJSONs = ["/users/", "/channels/", "/streams/"];

function isOnline(lookUrl) {
    $.ajax({
        url: lookUrl,
        type: 'GET',
        dataType: 'json'
    })
    .done(function(data) {
        // look to see if null
        if (data.stream === null) {
            return false;
        } else {
            return true;
        }
    })
    .fail(function(error) {
        console.log("error checking if online: " + error);
    });
}

$(document).ready(function() {

    let allStreams = streams.concat(nonStreams);

    for (let i = 0; i < allStreams.length; i++) {
        let searchUrl = corsUrl + twitchAPI + "/streams/" + allStreams[i];

        console.log(isOnline(searchUrl));

        if (isOnline(searchUrl)) {
            // call for more info and build
            console.log(allStreams[i] + " is online");
        } else {
            // not online and build
            console.log(allStreams[i] + " is NOT online");
        }
    }

});
