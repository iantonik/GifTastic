topics=['Tom and Jerry', 'The Flintstones', 'Looney Tunes', 'The Road Runner Show', "Dexter's Laboratory", "Popeye the Sailor", "The Jetsons", "DuckTales", "Pinky and the Brain", "The Smurfs"]

var searchButtons = function(){
    topics.forEach(element => {
        $(`<button type = "button" class="btn btn-sm custombtn" id="${element}">${element}</button>`).appendTo("#searchTopics")
    });
    
}

function newTopic() {
    var term = $("#term-search").val();
    
    topics.push(term);
    $("#searchTopics").empty();
    searchButtons();
}

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

$(document).ready(function(){
    searchButtons();
    $(".get-topic").click(function(){
        newTopic();
    })

    $('body').on('click', '.btn', function(){
        var random = Math.floor((Math.random() * 300) + 1); //random number to randomize (offset) returned gifs.
        getGifs($(this).attr('id'), random);
    })

})


var getGifs = function(val, offset){

    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=dbxE4AeAj1uO5DeV5TkncBQh7eeTaRHB&q=${val}&limit=10&offset=${offset}&lang=en`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var content = response.data;
        for (i=0; i<content.length; i++){
            $("#content").prepend(`<div class="gif-container"><img class="gif" src="${content[i].images.fixed_height_still.url}"><label class="rating">Rating: ${content[i].rating}</label></div>`)
        }


    })
}
