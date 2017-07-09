// to bypass any cross-origin errors
const corsUrl = "https://cors-anywhere.herokuapp.com/";
// fCC twitch api pass-through
const twitchAPI = "https://wind-bow.gomix.me/twitch-api/";
// array of people who regularly stream as recommended by fCC
var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck",
    "habathcx", "RobotCaleb", "noobs2ninjas"];
// array of nonexisting accounts
var nonStreams = ["brunofin", "comster404"];
// array of some of my own account additions
var myStreams = ["stockstream", "gamesdonequick"];

function notExistingDisplay(usr) {
    // show that the user doesn't exist
    //console.log("notExistingDisplay fired for: " + usr.display_name);
    let notExist = "<div class='col s12 notExist'>" +
        usr.display_name + "</div>";
    $("#all").append(notExist);
    $("#notExist").append(notExist);
}

function notOnlineDisplay(usr) {
    // show user/channel info and appropriate html
    //console.log("notOnlineDisplay fired for: " + usr.display_name);
    let offline = "<div class='col s12 offline'>" +
        usr.display_name + "</div>";
    $("#all").append(offline);
    $("#offline").append(offline);
}

function onlineDisplay(usr) {
    // user/channel info and current stream
    //console.log("onlineDisplay fired for: " + usr.display_name);
    let online = "<div class='col s12 online'>" +
        usr.display_name + "</div>";
    $("#all").append(online);
    $("#online").append(online);
}

$(document).ready(function() {
    //$('ul.tabs').tabs();

    let allStreams = streams.concat(nonStreams, myStreams);
    console.log(allStreams.length);

    let progressBar = "<div class='progress'>" +
                        "<div class='indeterminate'></div>" +
                      "</div>";
    $(".indicator").html(progressBar);

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

            }).done( () => {
                // clear the load progress bar
                $(".indicator").empty();
            } )
            .catch( error => {
                console.log(error);
            });// end $.getJSON

    });// end allStreams.forEach

});// end document.ready
