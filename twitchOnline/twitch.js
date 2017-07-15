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
var myStreams = ["stockstream", "gamesdonequick", "noopkat", "bdx_inc",
    "vidtendo", "itmejp", "lobosjr", "dansgaming", "cirno_tv", "lulusoccer",
    "rivkaworks"];



function notExistingDisplay(usr) {
    // show that the user doesn't exist
    let notExist =
        "<div class='resultItem card error-color hoverable'>" +
        "<div class='card-content text-primary-color'>" +
        "<div class='valign-wrapper'>" +
        "<i class='material-icons errorIcon'>error</i>" +
        "<span class='card-title'>" +
        usr.display_name + "</span></div>" +
        "<p class='secondary-text-color'>" + usr.notFound + "</p>"  +
        "</div></div>";

    $("#all").append(notExist);
    $("#notExist").append(notExist);
}


function notOnlineDisplay(usr) {
    // show user/channel info and appropriate html
    let notOnline =
        "<div class='resultItem card dark-primary-color hoverable'>" +
        "<div class='card-content white-text'>";
    if (usr.logoLink) {
        notOnline += "<div class='valign-wrapper'>" +
            "<img class='circle cardImg' src='" + usr.logoLink + "'/>" +
            "<span class='card-title'>" + usr.display_name +
            "</span></div>";
    } else {
        notOnline += "<span class='card-title'>" + usr.display_name + "</span>";
    }
    if (usr.bio) {
        notOnline += "<p>" + usr.bio + "</p>";
    }
    notOnline += "</div><div class='card-action notOnlineLink'><a href='" + usr.page +
        "'>Go To channel</a>" + "</div></div>";

    $("#all").append(notOnline);
    $("#offline").append(notOnline);
}


function onlineDisplay(usr) {
    // user/channel info and current stream
    let curStream =
        "<div class='resultItem card online-color-dark hoverable'>";
    if (usr.online.preview) {
        curStream += "<div class='card-image'><img src='" +
            usr.online.preview + "'></div>";
    }
    curStream += "<div class='card-content white-text'>";
    if (usr.logoLink) {
        curStream += "<div class='valign-wrapper'>" +
            "<img class='circle cardImg' src='" + usr.logoLink + "'/>" +
            "<span class='card-title'>" + usr.display_name +
            "</span></div>";
    } else {
        curStream += "<span class='card-title'>" + usr.display_name +
            "</span>";
    }
    if (usr.bio) {
        curStream += "<p>" + usr.bio + "</p>";
    }
    curStream += "<br><p class='streamInfo'>" + usr.online.content + " -<br>" +
        usr.online.status + "</p>";
    curStream += "</div><div class='card-action'><a href='" + usr.page +
        "'>Go To channel</a>" + "<a href='" + usr.online.linkToStream + "'>" +
        "Go To stream</a>" + "</div></div>";

    $("#all").append(curStream);
    $("#online").append(curStream);
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
                    tmpObj.page         = "https://twitch.tv/" + user_name;
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
                    tmpObj.online              = { };
                    tmpObj.online.content      = streams.stream.game;
                    tmpObj.online.status       = streams.stream.channel.status;
                    tmpObj.online.linkToStream = streams.stream.channel.url;
                    tmpObj.online.preview      = streams.stream.preview.large;
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
