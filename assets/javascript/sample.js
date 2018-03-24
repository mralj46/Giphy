var tags = ["Basketball", "Football", "Baseball", "Tennis", "Soccor", "Golf"];

// Function for displaying sport pic
  function renderButtons() {

    $("#tags").empty();

    for (var i = 0; i < tags.length; i++) {
      $("#tags").append('<button class="tag-buttons btn btn-primary">' + tags[i] + '</button>');
    }      

  } 

// Add tags function // 

$(document).on('click', '#addTag', function(event) {

  event.preventDefault();

  var newTag = $("#category").val().trim();
  tags.push(newTag);

  $("#tags").append('<button class="tag-buttons btn btn-primary">' + newTag + '</button>');

});

// Tag button function //

$(document).on('click', '.tag-buttons', function(event) {

  // Keeps page from reloading //
  event.preventDefault();

  var type = this.innerText;
  console.log(this.innerText);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&limit=10&api_key=o2GikRiMbJ3gVtUMOntZGbSqdcIsMMXm";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    for (var i = 0; i < response.data.length; i++) {
        console.log(response);
      $("#photo").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');
    }  
  });

  //$("#photo").empty();

});
renderButtons();


$('body').on('click', '.gif', function() {
    var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});