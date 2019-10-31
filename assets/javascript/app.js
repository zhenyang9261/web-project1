/* Store recipe's Ids */
var idList = [];
var apiKey = "17c14845089c4d569f3be69637ca970a";

$(document).ready(function () {
    /* Open the modal html on click to show recipe description*/
    $('.modal').modal();

    /* Store input ingredient's name */
    var ingredients = [];

    /* Function makes API request for three recipes. 
       It uses the ingredients argument as search term. */
    function getRecipe(ingredients) {

        idList.length = 0;
        var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients + "&number=3&apiKey=" + apiKey;

        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function (response) {

            $("#recipe-div").empty();

            response.forEach(function (recipe) {

                idList.push(recipe.id);

                $.ajax({

                    url: "https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=" + apiKey,
                    method: "GET"
                }).then(function (summary) {

                    var column = $('<div class="col s12 m7 l4">')
                    var card = $('<div class="card">');
                    var cardImage = $('<div class="card-image">')
                    var image = $('<img>')
                    image.attr('src', recipe.image);
                    var span = $('<span class="shadow-text card-title">');
                    span.text(recipe.title);
                    var fab = $('<button data-target="modal1" class="btn-floating halfway-fab waves-effect waves-light teal modal-trigger"><i class="material-icons orange lighten-1">unfold_more</i></button>')
                    var actionDiv = $('<div class="card-action text-size">');
                    var makeThis = $('<a id="instructionsButton" href="#">Make This!</a>');
                    makeThis.attr("data-id", recipe.id);
                    fab.attr('data-summary', summary.summary);
                    actionDiv.append([makeThis]);
                    cardImage.append([image, span, fab]);
                    card.append([cardImage, actionDiv]);
                    column.append(card);

                    $("#recipe-div").append(column);

                    $(".modal-trigger").on("click", function () {
                        var summary = $(this).attr("data-summary");
                        $(".modal-content").html("<h4> Recipe Summary </h4>" + summary);
                    })
                });
            });
            /* Call functions to create object containing all the recipe's instructions */
            getInstructions();
        });
    }

    /* Add click event to get recipe button */
    $("#get-recipe-button").on("click", function () {

        /* Clear ingredients array */
        ingredients.length = 0;

        /* Store all list elements from ingredients-list */
        var elements = $(".ingredients-list ul").children();

        /* Loop through ingredients-list and get each element text(ingredient name) and 
           store it in ingredients variable */
        $.each(elements, function (i, value) {
            ingredients.push(value.firstChild.data);
        });

        /* If ingredients array is empty prevent call to getRecipe function */
        if (ingredients.length > 0) {
            getRecipe(ingredients.join(","));
        }
    });

    /* Add click event to back-button */
    $("#back-button").on("click", function (e) {
        e.preventDefault();

        /* Toggle animation effect on recipe-instructions and recipe-div */
        $("#recipe-instructions").toggle("fold");
        $("#recipe-div").toggle("fold");
    });

    $("#recipe-instructions").hide();

    /* Variable store instructions list */
    var instructionsObj = {};

    /* Function creates a list of recipe instructions */
    function getInstructions() {

        /* Loop through id list */
        idList.forEach(function (id) {

            /* Create instructions list data structure */
            instructionsObj[id] = { steps: [] };

            $.ajax({
                url: "https://api.spoonacular.com/recipes/" + id + "/analyzedInstructions?apiKey=" + apiKey,
                method: "GET"

            }).then(function (instructions) {

                if (instructions[0]) {
                    /* Get instructions from API response and store it in global variable */
                    instructions[0].steps.forEach(function (step) {
                        instructionsObj[id].steps.push(step);
                    });
                } else {
                    instructionsObj[id].steps.push({ step: false });
                }
            });
        });
    }

    /* Add click event to instructionsButton */
    $(document).on("click", "#instructionsButton", function (e) {
        e.preventDefault();

        /* Clear instructions list cards */
        $("#instructions-list").empty();

        /* Create instructions list based on recipe Id */
        instructionsObj[$(this).attr("data-id")].steps.forEach(function (step) {
            if (step.step) {
                $("#instructions-list").append("<li>" + step.step + "</li>");
            } else {
                $("#instructions-list").append("<p>Instructions are currently unavailable for this recipe, please try another recipe.</p>");
            }
        });

        /* Toggle animation effect on recipe-instructions and recipe-div */
        $("#recipe-instructions").toggle("fold"); // Display recipe instructions
        $("#recipe-div").toggle("fold"); // Hide recipe cards
    });
});
