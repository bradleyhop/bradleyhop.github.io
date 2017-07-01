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
    return $.ajax({
        url: lookUrl,
        type: 'GET',
        dataType: 'json'
    })
        .fail(function(error) {
            console.log("error checking if online: " + error);
        });
}

$(document).ready(function() {

    let allStreams = streams.concat(nonStreams);

    // test to see which channels are currently streaming
    allStreams.forEach( el =>  {
        let searchUrl = corsUrl + twitchAPI + "/streams/" + el;

        let streaming = isOnline(searchUrl).done( data => {
            // data object return has element stream
            if (data.stream === null) {
                console.log(el + " is NOT streaming");
            } else {
                console.log(el + " IS streaming");
            }
        });
    });

});
