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

    let allStreams = streams.concat( nonStreams );

    // build are usr object and push them onto our array
    allStreams.forEach( strm =>  {
        // need to set key value for object as user name
        //  can use [] with es6 - change all . below
        let tmpObj = { strm: {} };
        let usersUrl = corsUrl + twitchAPI + "users/" + strm;

        $.getJSON( usersUrl ).then( users => {
            // check first to see if user is valid
            if ( users.status == 404 ) {
                tmpObj.strm.valid = false;
                tmpObj.strm.notFound = users.message;
                //        break;
            } else {
                tmpObj.strm.valid = true;
                tmpObj.strm.logo = users.logo;
                tmpObj.strm.bio = users.bio;
            }
            let streamsUrl = corsUrl + twitchAPI + "streams/" + strm;
            return $.getJSON( streamsUrl );
        }).then( streams => {
            // check to see if user is online, and what they're streaming
            if ( streams == null ) {
                tmpObj.strm.online = false;
            } else {
                tmpObj.strm.online = {};
                tmpObj.strm.online.linkToStream = streams.game;
                tmpObj.strm.online.preview = streams.preview_medium;
            }
            // push user info to array
            twitchInfos.push( tmpObj );
        }).catch( error => {
            console.log( error );
        });
    });// end $.getJSON

    console.log(twitchInfos);

});// end document.ready
