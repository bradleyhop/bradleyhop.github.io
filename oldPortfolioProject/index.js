// Can't import files unless from server therefore no local json
//      - Chrome security et al
var projects = [
    {
        cardTitle : "Free Code Camp JavaScript Exercises",
        desc      : "Github repository of my solutions to freecodecamp.com javascript algorithm challenges. Includes the beginning, intermediate, and advanced problems with the problem stated, my solution, and test calls.",
        link      : "https://github.com/bradleyhop/freeCodeCampAlgorithms",
        screencap : "assets/fccAlgo.png",
        alt       : "screen capture of github repository for fcc javascript exercises"
    },
    {
        cardTitle : "WikiPedia Search App",
        desc      : "Search for Wikipedia articles, get a list of matches with links to the articles, and a random article button just for fun! For freecodecamp.com intermediate front end projects.",
        link      : "wikiSearchApp/index.html",
        screencap : "assets/wikiSearch.png",
        alt       : "screen capture of wikipedia search app"
    },
    {
        cardTitle : "So Meta!",
        desc      : "Github repository for this website. Contains all code for this page, as well as all the code for the SPA projects listed therein.",
        link      : "https://github.com/bradleyhop/bradleyhop.github.io",
        screencap : "assets/githubIO.png",
        alt       : "screen capture of github repository for this portfolio hub site"
    },
    {
        cardTitle : "Random Quotes Generator",
        desc      : "Fetches random quotes about computing from online api. This is the first version I made. I wanted to emulate a terminal feel. For freecodecamp.com intermediate front end projects.",
        link      : "randomQuotes/random.html",
        screencap : "assets/randomGen.png",
        alt       : "screen capture of random quote generator project"
    },
    {
        cardTitle : "Weather App",
        desc      : "SPA for weather. Collects geolocation from reported IP, then fetches json for that location from online api. Converts C to F degrees on click. Icon changes based on reported weather. For freecodecamp.com intermediate front end projects.",
        link      : "weatherApp/weather.html",
        screencap : "assets/weatherApp.png",
        alt       : "screen capture of weather application based on reported geolocation"
    },
    {
        cardTitle : "Twitch.tv Online",
        desc      : "SPA that uses the twitchtv JSON API. From a list of users, generates card components based on whether a user is online, offline, or non-existing. For freecodecamp.com intermediate front end projects.",
        link      : "twitchOnline/onlineTwitch.html",
        screencap : "assets/twitch.png",
        alt       : "screen caputure of twitch use onine status"
    },
    {
        cardTitle : "Current WIP",
        desc      : "Project currently working on. I'll save my SPA's here on github, but this project isn't finished. CURRENTLY: Javascript Calculator for fCC",
        link      : "JScalculator/index.html",
        screencap : "assets/transparent-wip-gif.gif",
        alt       : "work in progress graphic"
    }
];


function makeCards(cardContent) {
    //var cardBody = document.getElementById('cardBody');
    var div = "";

    for (let i in projects) {
        // template for card html
        //  includes bootstrap grid settings
        div +=
            `<div class='card col-sm-5'>
            <img class='card-img-top' src=' ${cardContent[i].screencap} ' alt='
            ${cardContent[i].alt}'/>
                <div class='card-block'>
                <h4 class='card-title'> ${cardContent[i].cardTitle} </h4>
                <p class='card-text'> ${cardContent[i].desc}  </p>
                <a href=' ${cardContent[i].link} ' target='_blank'
                class='btn'>Go see!</a>
                </div>
            </div>`;
    }

    return div;
}


$(document).ready(function() {

    $(".portCards").append(makeCards(projects));

});
