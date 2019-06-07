// Initial array of movies
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  var movie = $(this).attr("data-name");
  var queryURL = `http://api.giphy.com/v1/gifs/search?q=${movie}&api_key=RpbF7yK9jdJvEIcxqxFvfqB36r3852SI&limit=10`;
  console.log(queryURL)
  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#movies-view").empty();

    console.log(response)

    for (var i = 0; i < response.data.length; i++) {
      var rating = $("<p>")
      rating.text(response.data[i].rating)
      $("#movies-view").append(rating)

// <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">

      var img =$("<img>")
      img.attr("src",response.data[i].images.original_still.url)
     img.attr("data-still",response.data[i].images.original_still.url)
     img.attr("data-animate",response.data[i].images.original.url)
     img.attr("data-state","still")    
     img.attr("class","gif") 
     $("#movies-view").append(img)
    }

    $(document).on("click",".gif", function(){
            
      var datastate=$(this).attr("data-state")    
       var dataanimate=$(this).attr("data-animate")
       var datastill=$(this).attr("data-still")
      if(datastate==="still"){
        $(this).attr("src",dataanimate)
        $(this).attr("data-state","animate")
      }else{
        $(this).attr("src",datastill)
        $(this).attr("data-state","still")
      }
      

    })



    // Puts the entire Movie above the previous movies.
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deletes the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // Loops through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button

    a.attr("class", "movie")
    // Added a data-attribute
    a.attr("data-name", movies[i]);
    // Provided the initial button text
    a.text(movies[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where the add movie button is clicked
$("#add-movie").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var movie = $("#movie-input").val().trim();

  // The movie from the textbox is then added to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();