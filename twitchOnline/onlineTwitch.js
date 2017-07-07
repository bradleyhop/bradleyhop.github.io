// to bypass any cross-origin errors
var corsUrl = "https://cors-anywhere.herokuapp.com/";
// fCC twitch api pass-through
var twitchAPI = "https://wind-bow.gomix.me/twitch-api/";
// array of people who regularly stream
var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck",
    "habathcx", "RobotCaleb", "noobs2ninjas"];
// array of nonexisting accounts
var nonStreams = ["brunofin", "comster404"];

function notExistingDisplay(usr) {
    // show that the user doesn't exist
    console.log("notExistingDisplay fired for: " + usr.display_name);
}

function notOnlineDisplay(usr) {
    // show user/channel info and appropriate html
    console.log("notOnlineDisplay fired for: " + usr.display_name);
}

function onlineDisplay(usr) {
    console.log("onlineDisplay fired for: " + usr.display_name);
}

$(document).ready(function() {

    let allStreams = streams.concat(nonStreams);

    // build are usr object and push them onto our array
    allStreams.forEach( user_name =>  {
        // need to set key value for object as user name
        //  can use [] with es6 - change all . below
        let tmpObj = { };
        let usersUrl = corsUrl + twitchAPI + "users/" + user_name;

        $.getJSON(usersUrl)
            .then( users => {
                // first, set user name in object
                // check first to see if user is valid
                if (users.status === 404) {
                    tmpObj.display_name = user_name;
                    tmpObj.valid        = false;
                    tmpObj.notFound     = users.message;
                } else {
                    tmpObj.display_name = users.display_name;
                    tmpObj.valid        = true;
                    tmpObj.logoLink     = users.logo;
                    tmpObj.bio          = users.bio;
                }
                let streamsUrl = corsUrl + twitchAPI + "streams/" + user_name;
                return $.getJSON(streamsUrl);
            })
            .then( streams => {
                // check to see if user is online, and what they're streaming
                if (streams.stream === null) {
                    tmpObj.online              = false;
                } else {
                    tmpObj.online              = {};
                    tmpObj.online.content      = streams.stream.game;
                    tmpObj.online.status       = streams.stream.channel.status;
                    tmpObj.online.linkToStream = streams.stream.channel.url;
                    tmpObj.online.preview      = streams.stream.preview.medium;
                }

                // test new temp object and send it to appropriate display fn
                if (tmpObj.valid  === false) {
                    notExistingDisplay(tmpObj);
                } else if (tmpObj.online === false) {
                    notOnlineDisplay(tmpObj);
                } else if (typeof tmpObj.online === "object" &&
                    typeof tmpObj.online !== null) {
                    onlineDisplay(tmpObj);
                } else {
                    console.log("Something is wrong with calling the display" +
                        "functions: " + tmpObj.online);
                }
            })
            .catch( error => {
                console.log(error);
            });// end $.getJSON

    });// end allStreams.forEach

    console.log(twitchInfos);

});// end document.ready
