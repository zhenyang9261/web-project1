var apiKey = "85ab2a52cb47409d9017011e0eab106e"
$(function () {

    /* Store input ingredients */
    var ingredientsList = [];

    /* Add click event to input-ingredients__button */
    $("#input-ingredients__button").click(function () {

        /* Regular expressions pattern to match only words with a-z letters and spaces*/
        var regex = /[a-zA-Z\s]+/gm;

        /* Store user input ingredients in local variable and push to global variable  */
        var input = $("#user-input-ingredients").val().match(regex);

        /* Loop through input ingredients if input has any data value*/
        if (input) {
            input.forEach(function (ingredient) {
                $.ajax({
                    url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredient + "&number=1&apiKey=" + apiKey + "",
                    method: "GET"
                }).then(function (response) {

                    /* If api response is empty, ingredient will not be added to ingredients list */
                    if (response.length > 0) {

                        /* Prevent repeated ingredients in ingredients list variable */
                        if (!ingredientsList.includes(ingredient)) {

                            /* Add ingredient to ingredients list */
                            ingredientsList.push(ingredient.trim());

                            /* Create list element and append ingredient name */
                            var li = $("<li class='collection-item'>").html(ingredient);

                            /* Append delete icon button to list element*/
                            li.append('<a href="#!" class="secondary-content delete-button"><i class="material-icons red-text text-lighten-3">delete</i></a>');

                            $(".ingredients-list ul").append(li);
                        }
                    }
                    /* If input is not a valid ingredient, shake the div to notify */
                    else {
                        $("#left-div").effect("shake")
                    }
                });
            });
        }
        /* If no input, shake the div to notify */
        else {
            $("#left-div").effect("shake");
        }
        /* Clear user ingredients input */
        $("#user-input-ingredients").val("");
    });

    /* Add click event to  each delete button next each ingredient */
    $(".ingredients-list").on("click", ".delete-button", function () {

        /* Store ingredient element */
        var ingredientElement = $(this).parent();

        /* Remove ingredient from ingredientsList */
        ingredientsList.splice(ingredientsList.indexOf(ingredientElement[0].firstChild.data), 1);

        /* Remove ingredient Element from HTML */
        ingredientElement.remove();
    });
});
