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

var infoTwitch = {};

function isOnline(lookUrl) {
    $.ajax({
        url: lookUrl,
        type: 'GET',
        dataType: 'json'
    })
    .done(function(data) {
    })
    .fail(function(error) {
        console.log("error checking if online: " + error);
    });
}

$(document).ready(function() {

    let allStreams = streams.concat(nonStreams);

    for (let i = 0; i < allStreams.length; i++) {
        let searchUrl = corsUrl + twitchAPI + "/streams/" + allStreams[i];

            if (isOnline(searchUrl) === false) {
                console.log(allStreams[i] + " is NOT online");
            } else {
                console.log(allStreams[i] + " IS online");
            }

    }

});
