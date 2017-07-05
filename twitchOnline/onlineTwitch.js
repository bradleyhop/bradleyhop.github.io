// to bypass any cross-origin errors
var corsUrl = "https://cors-anywhere.herokuapp.com/";
// fCC twitch api pass-through
var twitchAPI = "https://wind-bow.gomix.me/twitch-api/";
// array of people who regularly stream
var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck",
    "habathcx", "RobotCaleb", "noobs2ninjas"];
// array of nonexisting accounts
var nonStreams = ["brunofin", "comster404"];
// array to hold my objects with user info that I'll use to display
var twitchInfos = [];

function notExistingDisplay(usr) {
    // show that the user doesn't exist

}

function notOnlineDisplay(usr) {
    // show user/channel info and appropriate html
}

function onlineDisplay(usr) {

}

$(document).ready(function() {

    let allStreams = streams.concat(nonStreams);

    // build are usr object and push them onto our array
    allStreams.forEach( user_name =>  {
        // need to set key value for object as user name
        //  can use [] with es6 - change all . below
        let tmpObj = { [user_name]: {} };
        let usersUrl = corsUrl + twitchAPI + "users/" + user_name;

        $.getJSON(usersUrl).then( users => {
            // check first to see if user is valid
            if (users.status == 404) {
                tmpObj[user_name].valid = false;
                tmpObj[user_name].notFound = users.message;
            } else {
                tmpObj[user_name].valid = true;
                tmpObj[user_name].logo = users.logo;
                tmpObj[user_name].bio = users.bio;
            }
            let streamsUrl = corsUrl + twitchAPI + "streams/" + user_name;
            return $.getJSON(streamsUrl);
        }).then( streams => {
            // check to see if user is online, and what they're streaming
            if (streams.stream === null) {
                tmpObj[user_name].online = false;
            } else {
                tmpObj[user_name].online = {};
                tmpObj[user_name].online.content =
                    streams.stream.game;
                tmpObj[user_name].online.status =
                    streams.stream.channel.status;
                tmpObj[user_name].online.linkToStream =
                    streams.stream.channel.url;
                tmpObj[user_name].online.preview =
                    streams.stream.preview.medium;
            }
            // push user info to array
            twitchInfos.push(tmpObj);
        }).catch( error => {
            console.log( error );
        });
    });// end $.getJSON

    console.log(twitchInfos);

});// end document.ready
