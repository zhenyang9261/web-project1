var recipeList = [];

var instructionsList = [
    {
        "name": "",
        "steps": [
            {
                "number": 1,
                "step": "Preheat oven to 350 degrees.In a medium bowl, combine the apples, sugar, cinnamon, cloves and salt. Toss until well-combined.",
                "ingredients": [
                    {
                        "id": 2010,
                        "name": "cinnamon",
                        "image": "cinnamon.jpg"
                    },
                    {
                        "id": 9003,
                        "name": "apple",
                        "image": "apple.jpg"
                    },
                    {
                        "id": 19335,
                        "name": "sugar",
                        "image": "sugar-in-bowl.png"
                    },
                    {
                        "id": 2047,
                        "name": "salt",
                        "image": "salt.jpg"
                    }
                ],
                "equipment": [
                    {
                        "id": 404783,
                        "name": "bowl",
                        "image": "bowl.jpg"
                    },
                    {
                        "id": 404784,
                        "name": "oven",
                        "image": "oven.jpg"
                    }
                ]
            },
            {
                "number": 2,
                "step": "Add the apples to a deep oval baking dish.",
                "ingredients": [
                    {
                        "id": 9003,
                        "name": "apple",
                        "image": "apple.jpg"
                    }
                ],
                "equipment": [
                    {
                        "id": 404646,
                        "name": "baking pan",
                        "image": "roasting-pan.jpg"
                    }
                ]
            },
            {
                "number": 3,
                "step": "Spread out into an even layer.In a small bowl, stir together the oats, flour and brown sugar. Set aside.",
                "ingredients": [
                    {
                        "id": 19334,
                        "name": "brown sugar",
                        "image": "dark-brown-sugar.png"
                    },
                    {
                        "id": 20081,
                        "name": "all purpose flour",
                        "image": "flour.png"
                    },
                    {
                        "id": 8120,
                        "name": "oats",
                        "image": "rolled-oats.jpg"
                    }
                ],
                "equipment": [
                    {
                        "id": 404783,
                        "name": "bowl",
                        "image": "bowl.jpg"
                    }
                ]
            },
            {
                "number": 4,
                "step": "Heat the butter in a small pan until melted. Continue swirling over a medium flame until the butter turns a golden brown color.",
                "ingredients": [
                    {
                        "id": 1001,
                        "name": "butter",
                        "image": "butter-sliced.jpg"
                    }
                ],
                "equipment": [
                    {
                        "id": 404645,
                        "name": "frying pan",
                        "image": "pan.png"
                    }
                ]
            },
            {
                "number": 5,
                "step": "Remove from heat and stir into the oats mixture until well combined.Sprinkle the oats mixture over the apples.Slide the baking dish into the oven and cook for 45 minutes, until golden on top and bubbling at the sides.",
                "ingredients": [
                    {
                        "id": 9003,
                        "name": "apple",
                        "image": "apple.jpg"
                    },
                    {
                        "id": 8120,
                        "name": "oats",
                        "image": "rolled-oats.jpg"
                    }
                ],
                "equipment": [
                    {
                        "id": 404646,
                        "name": "baking pan",
                        "image": "roasting-pan.jpg"
                    },
                    {
                        "id": 404784,
                        "name": "oven",
                        "image": "oven.jpg"
                    }
                ],
                "length": {
                    "number": 45,
                    "unit": "minutes"
                }
            },
            {
                "number": 6,
                "step": "Remove from the oven and let cool slightly before serving.",
                "ingredients": [],
                "equipment": [
                    {
                        "id": 404784,
                        "name": "oven",
                        "image": "oven.jpg"
                    }
                ]
            }
        ]
    }
];

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
            responseObj.forEach(function (response) {
                var objList = {};
                objList.id = response.id;
                objList.img = response.image;
                objList.title = response.title;
                recipeList.push(objList);
           })

            $("#recipe-div").empty();

            response.forEach(function (recipe) {


                $.ajax({

                    url: "https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=0286efeb2caf42acb2448ecf6ec3249b",
                    method: "GET"
                }).then(function (summary) {

                    $("#recipe-div").append(" <div class='col s12 m7 l4'> <div class='card'> <div class='card-image'> <img src='" + recipe.image + "'><span class='shadow-text card-title'>" + recipe.title + "</span> </div> <div class='card-content text-size'> <p>" + summaryObj.summary + "</p> </div> <div class='card-action text-size'> <a href='#'>Make This!</a> </div> </div> </div>");
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
    });

    $("#recipe-div").on("click", ".card-action", function(e){
        console.log("clicked");
        e.preventDefault();
        $("#recipe-instructions").toggle("fold");
        $("#recipe-div").toggle("fold");
        
    });

    $("#back-button").on("click", function (e) {
        console.log("clicked");
        e.preventDefault();
        $("#recipe-instructions").toggle("fold");
        $("#recipe-div").toggle("fold");

    });

    $("#recipe-instructions").hide();




var responseObj = [
    {
        "id": 534573,
        "title": "Brown Butter Apple Crumble",
        "image": "https://spoonacular.com/recipeImages/534573-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "missedIngredients": [
            {
                "id": 2010,
                "amount": 0.5,
                "unit": "tsp",
                "unitLong": "teaspoons",
                "unitShort": "tsp",
                "aisle": "Spices and Seasonings",
                "name": "cinnamon",
                "original": "1/2 tsp cinnamon",
                "originalString": "1/2 tsp cinnamon",
                "originalName": "cinnamon",
                "metaInformation": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg"
            },
            {
                "id": 8120,
                "amount": 0.5,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Cereal",
                "name": "oats",
                "original": "1/2 cup uncooked oats (not instant)",
                "originalString": "1/2 cup uncooked oats (not instant)",
                "originalName": "uncooked oats (not instant)",
                "metaInformation": [
                    "uncooked",
                    "(not instant)"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg"
            }
        ],
        "usedIngredients": [
            {
                "id": 9003,
                "amount": 4.0,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Produce",
                "name": "apples",
                "original": "4 apples, peeled, cored and sliced",
                "originalString": "4 apples, peeled, cored and sliced",
                "originalName": "apples, peeled, cored and sliced",
                "metaInformation": [
                    "cored",
                    "peeled",
                    "sliced"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
            }
        ],
        "unusedIngredients": [],
        "likes": 7
    },
    {
        "id": 556470,
        "title": "Apple fritters",
        "image": "https://spoonacular.com/recipeImages/556470-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 0,
        "missedIngredientCount": 3,
        "missedIngredients": [
            {
                "id": 14003,
                "amount": 2.0,
                "unit": "tablespoons",
                "unitLong": "tablespoons",
                "unitShort": "Tbsp",
                "aisle": "Alcoholic Beverages",
                "name": "beer",
                "original": "2 tablespoons of lager beer",
                "originalString": "2 tablespoons of lager beer",
                "originalName": "lager beer",
                "metaInformation": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/beer.jpg"
            },
            {
                "id": 1123,
                "amount": 1.0,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Milk, Eggs, Other Dairy",
                "name": "egg",
                "original": "1 egg",
                "originalString": "1 egg",
                "originalName": "egg",
                "metaInformation": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/egg.png"
            },
            {
                "id": 1059003,
                "amount": 2.0,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Produce",
                "name": "red delicious apples",
                "original": "2 Golden Delicious apples",
                "originalString": "2 Golden Delicious apples",
                "originalName": "Golden Delicious apples",
                "metaInformation": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/red-delicious-apples.png"
            }
        ],
        "usedIngredients": [],
        "unusedIngredients": [
            {
                "id": 9003,
                "amount": 1.0,
                "unit": "serving",
                "unitLong": "serving",
                "unitShort": "serving",
                "aisle": "Produce",
                "name": "apples",
                "original": "apples",
                "originalString": "apples",
                "originalName": "apples",
                "metaInformation": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
            }
        ],
        "likes": 243
    },
    {
        "id": 47732,
        "title": "Apple Tart",
        "image": "https://spoonacular.com/recipeImages/47732-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 0,
        "missedIngredientCount": 3,
        "missedIngredients": [
            {
                "id": 2048,
                "amount": 0.75,
                "unit": "tsp",
                "unitLong": "teaspoons",
                "unitShort": "tsp",
                "aisle": "Oil, Vinegar, Salad Dressing",
                "name": "apple cider vinegar",
                "original": "3/4 tsp apple cider vinegar",
                "originalString": "3/4 tsp apple cider vinegar",
                "originalName": "apple cider vinegar",
                "metaInformation": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apple-cider-vinegar.jpg"
            },
            {
                "id": 1089003,
                "amount": 2.5,
                "unit": "lbs",
                "unitLong": "pounds",
                "unitShort": "lb",
                "aisle": "Produce",
                "name": "granny smith apples",
                "original": "6 - 7 medium Granny Smith apples (about 2 1/2 lbs)",
                "originalString": "6 - 7 medium Granny Smith apples (about 2 1/2 lbs)",
                "originalName": "- 7 medium Granny Smith apples (about",
                "metaInformation": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/grannysmith-apple.png"
            },
            {
                "id": 1145,
                "amount": 4.5,
                "unit": "oz",
                "unitLong": "ounces",
                "unitShort": "oz",
                "aisle": "Milk, Eggs, Other Dairy",
                "name": "unsalted butter",
                "original": "9 tbsp (4 1/2 oz) cold unsalted butter, cut into cubes",
                "originalString": "9 tbsp (4 1/2 oz) cold unsalted butter, cut into cubes",
                "originalName": "tbsp cold unsalted butter, cut into cubes",
                "metaInformation": [
                    "unsalted",
                    "cold",
                    "cut into cubes"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg"
            }
        ],
        "usedIngredients": [],
        "unusedIngredients": [
            {
                "id": 9003,
                "amount": 1.0,
                "unit": "serving",
                "unitLong": "serving",
                "unitShort": "serving",
                "aisle": "Produce",
                "name": "apples",
                "original": "apples",
                "originalString": "apples",
                "originalName": "apples",
                "metaInformation": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
            }
        ],
        "likes": 0
    }
];

var summaryObj = {
    summary: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,"
};


instructionsList[0].steps.forEach(function(step){
    $("#instructions-list").append("<li>"+step.step+"</li>");
});

});


