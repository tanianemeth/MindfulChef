
var enter = document.getElementById("enter");
var submit = document.getElementById("submit");
var ingredient = document.getElementById("ingredient");
var expirationDate = document.getElementById("expirationDate");
var ul = document.querySelector("ul");
var foods = document.querySelector("#foods");
var ordered = document.querySelector("#ordered");
var output = document.querySelector("#output");
var userMeal;
var userRestriction;
var shoppingList = [];

//recipes
var recipe = [

{
    title : "mango sunshine smoothie",
    diet : "gluten free",
    meal : "breakfast",
    ingredients : ["mango", "milk", "banana", " crushed ice", "honey"]
},


{
    title : "avocado toast",
    diet : "vegan",
    meal: "breakfast",
    ingredients : ["avocado", "salt", "pepper", "bread"]
},

{
    title : "sunny bacon scramble",
    diet : "none",
    meal : "breakfast",
    ingredients : ["eggs", "bacon", "tomato", "onion", "cheese", "spinach", "bread"]
},


{
    title : "BLT",
    diet : "none",
    meal : "lunch",
    ingredients : ["bacon", "lettuce", "tomato"]
},


{
    title : "grilled cheese",
    diet : "vegetarian",
    meal : "lunch",
    ingredients : ["butter", "bread","cheese"]
},

{
    title : " vegan stir fry",
    diet : "vegan",
    meal : "lunch",
    ingredients : ["tofu", "tomato", "onion", "bell pepper", "mushroom", "spinach", "kale", "potato", "olive oil"]
},

{
    title:"beef stirfry",
    diet :"dairy free",
    meal : "lunch",
    ingredients : ["beef", "tofu", "potatos", "brocolli", "onions", "olive oil"]
},

{
    title : "garlic chicken kale salad",
    diet : "gluten free",
    meal : "lunch",
    ingredients : ["garlic", "chicken", "kale", "olive oil", "blsomic vinegar", "pine nuts"]
},


{
    title : "salad",
    diet : "none",
    meal : "lunch",
    ingredients : ["lettuce", "tomato", "carrot"]
},

{
    title : "bbq mac and cheese",
    diet : "none",
    meal : "dinner",
    ingredients : ["macoroni noodles", "bbq sauce", "cheese", "bacon", "butter", "garlic", "milk"]
},

{
    title: "veggie Stir-fry",
    diet : "gluten free",
    meal : "dinner",
    ingredients: ["tofu", "tomatoes", "onions", "bell peppers", "mushrooms", "spinach", "kale", "potatoes", "olive oil"]
}

];

//adds the items from the text file and adds them to a list in the website
//and to the shopping list array
function addItem() {
  let ingredientObj = {
    name:"",
    expirationDate:""
  }
  let ingName = ingredientObj;

  if (ingredient.value.length> 0){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(ingredient.value));
    ul.appendChild(li);
    ingName.name = ingredient.value;
    ingName.expirationDate =   getDateDifference();
    shoppingList.push(ingredientObj);
    ingredient.value = "";

    shoppingList.sort(function(a, b)
    {
      return a.expirationDate - b.expirationDate;
    })
    console.log(shoppingList);
  }

}
function getDateDifference(){
  var duration = new Date(document.getElementById("expirationDate").value) - new Date()
  return duration;
}
var storeRecipes = []

function filter(){
  console.log(userMeal);
    if (userMeal === "Breakfast"){
      var filterBreakfast = function(recipe) {return recipe.meal === "breakfast"}
      storeRecipes = recipe.filter(filterBreakfast)
      return storeRecipes
    }

    else if (userMeal === "Lunch"){
      var filterLunch = function(recipe) {return recipe.meal === "lunch"}
      storeRecipes = recipe.filter(filterLunch)
      return storeRecipes
    }

    else if (userMeal === "Dinner"){
      var filterDinner = function(recipe) {return recipe.meal === "dinner"}
      storeRecipes = recipe.filter(filterDinner)
      return storeRecipes
    }

    //filter by dietary restriction

  else if (userRestriction === "Vegan"){
    var filterVegan = function(recipe) {return recipe.diet === "vegan"}
    storeRecipes = recipe.filter(filterVegan)
    return storeRecipes
  }

  else if (userRestriction === "Vegetarian"){
    var filterVegetarian = function(recipe) {return recipe.diet === "vegetarian"}
    storeRecipes = recipe.filter(filterVegetarian)
    return storeRecipes
  }

  else if(userRestriction === "Gluten free"){
    var filterGF = function(recipe) {return recipe.diet === "gluten free"}
    storeRecipes = recipe.filter(filterGF)
    return storeRecipes
  }

  else if(userRestriction === "Dairy free"){
    var filterDF = function(recipe) {return recipe.diet === "dairy free"}
    storeRecipes = recipe.filter(filterDF)
    return storeRecipes
  }

  else if(userRestriction === "None"){
    var filterNone= function(recipe) {return recipe.diet === "none"}
    storeRecipes = recipe.filter(filterNone)
    return storeRecipes

  }
}
function ingredientMatching(){
  var i = 0;
  var j = 0;
  var k = 0;
  var duplicates = 0;
  var dupArray = [];
  for(i = 0; i < storeRecipes.length ; i++) {
    for(j = 0; j < shoppingList.length; j++) {
      for(k= 0; k < storeRecipes[i].ingredients.length;k++){
        if( shoppingList[j].name === storeRecipes[i].ingredients[k]) {
         duplicates = duplicates + 1;
         //dupArray.push(storeRecipes[i]);
       }
     }
   }
   if(duplicates >= 1){
    dupArray.push(storeRecipes[i]);
    console.log(dupArray);
   }
   duplicates = 0;
  }
  var x = 0;
  var y = 0;
  var z = 0;
  var theEnd = [];
  for(x = 0; x < shoppingList.length; x++){
    for(y =0; y < dupArray.length; y++){
      for(z=0; z < dupArray[y].ingredients.length; z++){
        if(shoppingList[x].name === dupArray[y].ingredients[z]){
          if(!theEnd.includes(dupArray[y])){
            theEnd.push(dupArray[y]);

          }
        }
      }
    }
}
  return theEnd;

}

function display(){
  // Get rid of form
  // Show other stuff

  var x = document.getElementById("my-submit-form");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var x = document.getElementById("output");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }



  userRestriction = document.getElementById("restriction");
  userMeal = document.getElementById("meal").value;

  console.log("submit works");
  var yes = filter();
  console.log(yes);
  var finalRecipes = ingredientMatching();
  console.log(finalRecipes);


  for (i = 0; i<finalRecipes.length; i++){
    var list = document.createElement("li");
    list.appendChild(document.createTextNode(finalRecipes[i].title.concat(": ")));
    for (var j = 0; j < finalRecipes[i].ingredients.length; j++) {
      list.appendChild(document.createTextNode(finalRecipes[i].ingredients[j].concat("\n")));
    }
    foods.appendChild(list);
  }
  output.appendChild(ordered);





  for (i = 0; i<shoppingList.length; i++){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(shoppingList[i].name.concat("       ->       ").concat(Math.round(shoppingList[i].expirationDate/86400000)).concat(" day(s)")));
    ordered.appendChild(li);
  }
  output.appendChild(ordered);

}
enter.addEventListener("keypress", addItem);
enter.addEventListener("click", addItem);
submit.addEventListener("click", display);
submit.addEventListener("keypress", display);
