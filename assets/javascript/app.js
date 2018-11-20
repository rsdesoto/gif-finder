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
        // console.log($(this).attr("data-name"));
        // for the # of results in the results array

        for (var i = 0; i < results.data.length; i++) {
            // create a new div
            var gifDiv = $("<div>");

            // collect the rating of the gif in question
            var rating = results.data[i].rating;

            // create a new <p> tag with the rating included
            var p = $("<p>").text("Rating: " + rating);

            // create a new image element with the source URL
            var lkImg = $("<img>");
            lkImg.attr("src", results.data[i].images.fixed_height_still.url);

            lkImg.attr("class", "picture");
            lkImg.attr("data-state", "still");
            lkImg.attr(
                "data-still",
                results.data[i].images.fixed_height_still.url
            );
            lkImg.attr("data-animate", results.data[i].images.fixed_height.url);

            //results.data[i].images.fixed_height.url is for animated

            // prepend the image and the rating and prepend to the page
            gifDiv.append(lkImg);
            gifDiv.append(p);

            // console.log(p);
            // console.log(lkImg);

            $("#gif-row").prepend(gifDiv);
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
