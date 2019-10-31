$(function () {

    /* Store input ingredients */
    var ingredientsList = [];

    /* Add click event to input-ingredients__button */
    $("#input-ingredients__button").click(function () {
        
        /* Regular expressions pattern to match only words with a-z letters and spaces*/
        var regex = /[a-zA-Z\s]+/gm;

        /* Store user input ingredients in local variable and push to global variable  */
        var input = $("#user-input-ingredients").val().match(regex);

        /* Loop through input ingredients */
        input.forEach(function (ingredient) {
            $.ajax({
                url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredient + "&number=1&apiKey=b52ff59b76aa49f2873c01370b4d2a33",
                method: "GET"
            }).then(function (response) {

                /* If api response is empty, ingredient will not be added to ingredients list */
                if (response.length > 0) {

                    /* Prevent repeated ingredients in ingredients list variable */
                    if (!ingredientsList.includes(ingredient)) {
                        ingredientsList.push(ingredient);
                        var li = $("<li class='collection-item'>").html(ingredient);
                        $(".ingredients-list ul").append(li);
                    }
                }
            });
        });
        /* Clear user ingredients input */
        $("#user-input-ingredients").val("");
    });
});
