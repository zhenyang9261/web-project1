var idList = [];

$(document).ready(function(){
    // open the modal html on click
    $('.modal').modal();

// global varible for storing the recipe IDs retunred
var recipeList = []



    var ingredients = [];

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

                idList.push(recipe.id);

                $.ajax({

                    url: "https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=85ab2a52cb47409d9017011e0eab106e",
                    method: "GET"
                }).then(function (summary) {

                    var column = $('<div class="col s12 m7 l4">')
                    var card = $('<div class="card">');
                    var cardImage = $('<div class="card-image">')
                    var image = $('<img>')
                    image.attr('src', recipe.image);
                    var span = $('<span class="shadow-text card-title">');
                    span.text(recipe.title);
                    var fab = $('<button data-target="modal1" class="btn-floating halfway-fab waves-effect waves-light teal modal-trigger"><i class="material-icons">unfold_more</i></button>')
                    var actionDiv = $('<div class="card-action text-size">');
                    var makeThis = $('<a id="instructionsButton" href="#">Make This!</a>');
                    makeThis.attr("data-id", recipe.id);
                    fab.attr('data-summary', summary.summary);
                    actionDiv.append([makeThis]);
                    cardImage.append([image, span, fab]);
                    card.append([cardImage, actionDiv]);
                    column.append(card);

                    $("#recipe-div").append(column);

                    $(".modal-trigger").on("click", function() {
                        console.log(this);
                        var summary = $(this).attr("data-summary");
                        $(".modal-content").html("<h4> Recipe Summary </h4>" + summary);
                    })

                });

            });

            // Call functions to create object with instructions list
            getInstructions();

        });
    }

    /* Add click event to input-ingredients__button */

    $("#input-ingredients__button").click(function () {

        // emptying the ingredients list to allow for extra enttries if user adds anothe item after clicking the get recipe buttons
        $(".ingredients-list ul").empty();

        // Store user input ingredients in local variable and push to global variable 
        var input = $("#user-input-ingredients").val();
        ingredients.push(input);

        /* Clear user ingredients input */

        $("#user-input-ingredients").val("");

        /* Store list array of ingredients */

        var ingredientsList = ingredients.toString().split(",");

        /* Loop through ingredients list and creates a list element with the ingredient text and
           then append it to ingredients list HTML */

        ingredientsList.forEach(function (ingredient) {

            var li = $("<li class='collection-item'>").html(ingredient);


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
                url: "https://api.spoonacular.com/recipes/" + id + "/analyzedInstructions?apiKey=fb9dbf3da08c4a75970b831b8b66aac9",
                method: "GET"

            }).then(function (instructions) {

                // Get instructions from API response and store it in global variable
                instructions[0].steps.forEach(function (step) {

                    instructionsObj[id].steps.push(step);
                });
            });
        });
    }

    $(document).on("click", "#instructionsButton", function (e) {
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
