var movies = [
    "Breaking Bad",
    "Jojo's Bizarre Adventure",
    "Aliens",
    "The Thing"
];

function renderButtons(btnArr) {
    // YOUR CODE GOES HERE

    $("#button-row").empty();
    for (i = 0; i < btnArr.length; i++) {
        var newbtn = $("<button>" + btnArr[i] + "</button>");
        newbtn.attr("class", "movie");
        newbtn.attr("data-name", btnArr[i]);
        $("#button-row").append(newbtn);
    }
}

renderButtons(movies);

// onclick: ajax call

// var queryURL =
//     "https://api.giphy.com/v1/gifs/search?q=the_matrix&api_key=evehAkPj4A9F79zKh9bn6msPax8979uD&limit=10";

var queryURL;

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

$(".movie").on("click", function(event) {
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
