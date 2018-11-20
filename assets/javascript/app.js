///////////////////////////////////////////////////////////////////////////////////////
// VARIABLES //////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

var movies = [
    "Breaking Bad",
    "Jojo's Bizarre Adventure",
    "Aliens",
    "The Thing",
    "Robocop"
];

///////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS //////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

function renderButtons(btnArr) {
    $("#button-row").empty();
    for (i = 0; i < btnArr.length; i++) {
        var newbtn = $("<button>" + btnArr[i] + "</button>");
        newbtn.attr("class", "movie");
        newbtn.attr("data-name", btnArr[i]);
        $("#button-row").append(newbtn);
    }
}

// add the gifs to the page
function makeImgDivs(i, results, seriesDiv) {
    // create a new div to put pictures in
    var gifDiv = $("<div>");

    // create a new <P> tag with the rating included
    var rating = results.data[i].rating;
    var p = $("<p>").text("Rating: " + rating);

    // create a new image element with the source URL
    var lkImg = $("<img>");
    lkImg.attr("src", results.data[i].images.fixed_height_still.url);

    // create a title
    var giftitletext = results.data[i].title;
    var gifTitle = $("<p>").text("Title: " + giftitletext);
    gifTitle.attr("class", "bold-text");

    // add "picture" class, data-still (still URL), data-animate (animated URL), and data-state (still/animated)
    lkImg.attr("class", "picture");
    lkImg.attr("data-state", "still");
    lkImg.attr("data-still", results.data[i].images.fixed_height_still.url);
    lkImg.attr("data-animate", results.data[i].images.fixed_height.url);

    // append the image and rating to the new div, then prepend the new div onto the "gif-row" part of the page.
    gifDiv.append(gifTitle);
    gifDiv.append(lkImg);
    gifDiv.append(p);
    seriesDiv.append(gifDiv);
}

// add series/movie info to the page
function makeInfoDivs(results, seriesDiv) {
    var infoDiv = $("<div>");

    if (results.Response != "False") {
        // create a new <p> tag with the series rating
        var rating = results.Rated;
        var ratingP = $("<p>").text("Media Rating: " + rating);

        // create a new <p> tag with the series plot
        var plot = results.Plot;
        var plotP = $("<p>").text("Plot: " + plot);

        // create a new <p> tag with the series release date
        var release = results.Released;
        var releaseP = $("<p>").text("Released: " + release);

        // create a new <p> tag with the series title
        var title = results.Title;
        var titleP = $("<p>").text("Title: " + title);
        titleP.attr("class", "bold-text");

        infoDiv.append(titleP);
        infoDiv.append(releaseP);
        infoDiv.append(plotP);
        infoDiv.append(ratingP);
        // $("#gif-row").append(infoDiv);

        seriesDiv.prepend(infoDiv);
    } else {
        var errorText = results.Error;
        var errorTextP = $("<p>").text(errorText);

        infoDiv.append(errorTextP);
        seriesDiv.prepend(infoDiv);
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// ON CLICK FUNCTIONALITY /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// grab gifs from each movie/show button
$(document).on("click", ".movie", function(event) {
    event.preventDefault();
    //console.log($(this).attr("data-name"));
    queryGif =
        "https://api.giphy.com/v1/gifs/search?q=" +
        $(this).attr("data-name") +
        "&api_key=evehAkPj4A9F79zKh9bn6msPax8979uD&limit=10";

    queryInfo =
        "http://www.omdbapi.com/?t=" +
        $(this).attr("data-name") +
        "&apikey=e3499611";

    // create a new div for text and gifs to go into
    var seriesDiv = $("<div>");
    $("#gif-row").prepend(seriesDiv);
    seriesDiv.attr("class", "seriesdiv");

    // query both giphy and omdb
    $.ajax({
        url: queryInfo,
        method: "GET"
    }).then(function(results) {
        console.log(results);
        makeInfoDivs(results, seriesDiv);
    });

    $.ajax({
        url: queryGif,
        method: "GET"
    }).then(function(results) {
        console.log(results);
        for (var i = 0; i < results.data.length; i++) {
            makeImgDivs(i, results, seriesDiv);
        }
    });
});

// pause/play gifs
$(document).on("click", ".picture", function() {
    event.preventDefault();
    console.log($(this));
    if ($(this).attr("data-state") === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
});

// add movies/tv shows to the page
$(document).on("click", "#add-movie", function() {
    event.preventDefault();
    console.log($("#movie-input").val());
    var newMovie = $("#movie-input").val();
    console.log(newMovie);
    movies.push(newMovie);
    renderButtons(movies);
    $("#movie-input").val("");
});

///////////////////////////////////////////////////////////////////////////////////////
// INITIALIZE PAGE ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

renderButtons(movies);
