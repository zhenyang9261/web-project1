$(function () {

    var ingredients = "";

    /* Function makes API request for three recipes. 
       It uses the ingredients argument as search term. */

    function getRecipe(ingredients) {

        var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients + "&number=3&apiKey=0286efeb2caf42acb2448ecf6ec3249b";

        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function (response) {

            console.log(response);

            $("#recipe-div").empty();

            response.forEach(function (recipe) {


                $.ajax({

                    url: "https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=0286efeb2caf42acb2448ecf6ec3249b",
                    method: "GET"
                }).then(function (summary) {

                    $("#recipe-div").append(" <div class='col s12 m7 l4'> <div class='card'> <div class='card-image'> <img src='" + recipe.image + "'><span class='card-title'>" + recipe.title + "</span> </div> <div class='card-content text-size'> <p>" + summary.summary + "</p> </div> <div class='card-action text-size'> <a href='#'>Make This!</a> </div> </div> </div>");
                });

            });

        });
    }
    /* Add click event to input-ingredients__button */

    $("#input-ingredients__button").click(function () {

        /* Store user input ingredients in global variable */

        ingredients = $("#user-input-ingredients").val();

        /* Clear user ingredients input */

        $("#user-input-ingredients").val("");

        /* Store list array of ingredients */

        var ingredientsList = ingredients.split(",");

        /* Loop through ingredients list and creates a list element with the ingredient text and
           then append it to ingredients list HTML */

        ingredientsList.forEach(function (ingredient) {

            var li = $("<li class='collection-item'>").text(ingredient);

            $(".ingredients-list ul").append(li);

        });

    });

    $("#get-recipe-button").on("click", function () {

        /* Call getRecipe function to make API request with ingredients argument */

        getRecipe(ingredients); /* Uncomment for testing API only  */

        // new

        // new
    })

});
