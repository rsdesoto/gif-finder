///////////////////////////////////////////////////////////////////////////////////////
// VARIABLES //////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

var movies = [
    "Breaking Bad",
    "Jojo's Bizarre Adventure",
    "Aliens",
    "The Thing"
];

var queryURL;

function renderButtons(btnArr) {
    $("#button-row").empty();
    for (i = 0; i < btnArr.length; i++) {
        var newbtn = $("<button>" + btnArr[i] + "</button>");
        newbtn.attr("class", "movie");
        newbtn.attr("data-name", btnArr[i]);
        $("#button-row").append(newbtn);
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS //////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// add the gifs to the page
function makeImgDivs(i, results) {
    // create a new div to put pictures in
    var gifDiv = $("<div>");

    // create a new <P> tag with the rating included
    var rating = results.data[i].rating;
    var p = $("<p>").text("Rating: " + rating);

    // create a new image element with the source URL
    var lkImg = $("<img>");
    lkImg.attr("src", results.data[i].images.fixed_height_still.url);

    // add "picture" class, data-still (still URL), data-animate (animated URL), and data-state (still/animated)
    lkImg.attr("class", "picture");
    lkImg.attr("data-state", "still");
    lkImg.attr("data-still", results.data[i].images.fixed_height_still.url);
    lkImg.attr("data-animate", results.data[i].images.fixed_height.url);

    // append the image and rating to the new div, then prepend the new div onto the "gif-row" part of the page.
    gifDiv.append(lkImg);
    gifDiv.append(p);
    $("#gif-row").prepend(gifDiv);
}

///////////////////////////////////////////////////////////////////////////////////////
// ON CLICK FUNCTIONALITY /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

renderButtons(movies);

// grab gifs from each movie/show button
$(document).on("click", ".movie", function(event) {
    //console.log($(this).attr("data-name"));
    queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        $(this).attr("data-name") +
        "&api_key=evehAkPj4A9F79zKh9bn6msPax8979uD&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(results) {
        console.log(results);
        for (var i = 0; i < results.data.length; i++) {
            makeImgDivs(i, results);
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
});
