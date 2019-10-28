
//Store recipe ids
var idList = [];

$(function () {

    var ingredients = "";

    /* Function makes API request for three recipes. 
       It uses the ingredients argument as search term. */
    function getRecipe(ingredients) {

        var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients + "&number=3&apiKey=85ab2a52cb47409d9017011e0eab106e";

        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function (response) {

            $("#recipe-div").empty();

            response.forEach(function (recipe) {

                // Store each recipe id to global variable
                idList.push(recipe.id);

                $.ajax({

                    url: "https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=85ab2a52cb47409d9017011e0eab106e",
                    method: "GET"
                }).then(function (summary) {

                    $("#recipe-div").append(" <div class='col s12 m7 l4'> <div class='card'> <div class='card-image'> <img src='" + recipe.image + "'><span class='shadow-text card-title'>" + recipe.title + "</span> </div> <div class='card-content text-size'> <p>" + summary.summary + "</p> </div> <div class='card-action text-size' data-id=" + recipe.id + "> <a href='#'>Make This!</a> </div> </div> </div>");
                });

            });

            // Call functions to create object with instructions list
            getInstructions();

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

    });

    // Add click event to back-button
    $("#back-button").on("click", function (e) {
        e.preventDefault();
        // Toggle animation effect on recipe-instructions and recipe-div
        $("#recipe-instructions").toggle("fold");
        $("#recipe-div").toggle("fold");

    });

    $("#recipe-instructions").hide();

    // Variable store instructions list
    var instructionsObj = {};

    // Function creates a list of recipe instructions
    function getInstructions() {

        // Loop through id list
        idList.forEach(function (id) {

            // Create instructions list data structure
            instructionsObj[id] = { steps: [] };

            $.ajax({
                url: "https://api.spoonacular.com/recipes/" + id + "/analyzedInstructions?apiKey=85ab2a52cb47409d9017011e0eab106e",
                method: "GET"

            }).then(function (instructions) {

                // Get instructions from API response and store it in global variable
                instructions[0].steps.forEach(function (step) {

                    instructionsObj[id].steps.push(step);
                });
            });
        });
    }

    $(document).on("click", ".card-action", function (e) {
        e.preventDefault();

        // Clear instructions list cards
        $("#instructions-list").empty();

        // Create instructions list based on recipe Id
        instructionsObj[$(this).attr("data-id")].steps.forEach(function (step) {

            $("#instructions-list").append("<li>" + step.step + "</li>");
        });

        // Toggle animation effect on recipe-instructions and recipe-div
        $("#recipe-instructions").toggle("fold");
        $("#recipe-div").toggle("fold");

    });
});

