/* Makes API call to get random joke and append it to HTML initial page load */
$(function () {

    var queryURL = "https://api.spoonacular.com/food/jokes/random?apiKey=6582ae904ea0418f99c41f720bf50fbf"

    $.ajax({

        url: queryURL,
        method: "GET"

    }).then(function (response) {

        $("#recipe-div").html("<h5>Please enter your ingredients to begin. For now, here is a joke!</h5>" + "<hr>" + "<p id='joke-text'>" + response.text + "</p>");

    });
});