$(function () {

    var queryURL = "https://api.spoonacular.com/food/jokes/random?apiKey=b52ff59b76aa49f2873c01370b4d2a33"

        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function (response) {

            console.log(response);
            console.log(response.text);

            $("#recipe-div").html("<h5>Please enter your ingredinets to begin. For now, here is a joke!</h5>" + "<hr>" + "<p id='joke-text'>" + response.text + "</p>");

        });

   


})