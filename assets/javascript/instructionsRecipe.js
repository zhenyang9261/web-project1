$(function(){
    $.ajax({
        url: "https://api.spoonacular.com/recipes/324694/analyzedInstructions?apiKey=88df5afa7d444635ad16e4505c402a69",
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
});