var searchForm = $('#searchForm');
var searchInput = document.querySelector("#searchInput");
var recipeCardsToggler = document.querySelector("#recipeCardsToggler");
var coctailCardsToggler = document.querySelector("#coctailCardsToggler");
var landingPageToggler = document.querySelector("#landingPage");
var themeToggler = $('#themeToggler');
var checkMode = document.querySelector("#checkMode");
var nameOne = document.querySelector('#nameOne');
var nameTwo = document.querySelector('#nameTwo');
var nameThree = document.querySelector('#nameThree');
var imgOne = document.querySelector('#imgOne');
var imgTwo = document.querySelector('#imgTwo');
var imgThree = document.querySelector('#imgThree');
var recipeID1 = "";
var recipeID2 = "";
var recipeID3 = "";
var descriptionOne = document.querySelector("#descriptionOne");
var descriptionTwo = document.querySelector("#descriptionTwo");
var descriptionThree = document.querySelector("#descriptionThree");
var recipeLinkOne = document.querySelector("#recipeLinkOne");
var recipeLinkTwo = document.querySelector("#recipeLinkTwo");
var recipeLinkThree = document.querySelector("#recipeLinkThree");
var winePairOne = document.querySelector("#winePairOne");
var winePairTwo = document.querySelector("#winePairTwo");
var winePairThree = document.querySelector("#winePairThree");
var errorCatch = document.querySelector("#errorCatch");

//code for the cocktail API
var cocktailOneName = document.querySelector('#cocktailNameOne');
var cocktailTwoName = document.querySelector('#cocktailNameTwo');
var cocktailThreeName = document.querySelector('#cocktailNameThree');
var cocktailOneImg = document.querySelector('#cocktailOneImg');
var cocktailTwoImg = document.querySelector('#cocktailTwoImg');
var cocktailThreeImg = document.querySelector('#cocktailThreeImg');
var cocktailOneInstructionsOne = document.querySelector('#cocktailOneInstructionsOne');
var cocktailOneInstructionsTwo = document.querySelector('#cocktailOneInstructionsTwo');
var cocktailOneInstructionsThree = document.querySelector('#cocktailOneInstructionsThree');
var cocktailOneInstructionsFour = document.querySelector('#cocktailOneInstructionsFour');
var cocktailOneInstructionsFive = document.querySelector('#cocktailOneInstructionsFive');
var cocktailTwoInstructionsOne = document.querySelector('#cocktailTwoInstructionsOne');
var cocktailTwoInstructionsTwo = document.querySelector('#cocktailTwoInstructionsTwo');
var cocktailTwoInstructionsThree = document.querySelector('#cocktailTwoInstructionsThree');
var cocktailTwoInstructionsFour = document.querySelector('#cocktailTwoInstructionsFour');
var cocktailTwoInstructionsFive = document.querySelector('#cocktailTwoInstructionsFive');
var cocktailThreeInstructionsOne = document.querySelector('#cocktailThreeInstructionsOne');
var cocktailThreeInstructionsTwo = document.querySelector('#cocktailThreeInstructionsTwo');
var cocktailThreeInstructionsThree = document.querySelector('#cocktailThreeInstructionsThree');
var cocktailThreeInstructionsFour = document.querySelector('#cocktailThreeInstructionsFour');
var cocktailThreeInstructionsFive = document.querySelector('#cocktailThreeInstructionsFive');
// Theme Local Storage
var currentTheme = localStorage.getItem("Theme");

function checkTheme(){
  if (localStorage.getItem("Theme") === "dark")
  darkMode();
}
checkTheme();

// Showing the first slide and creating a variable to use in other functions to change slides
var slideIndex = 1;
showCurrent(slideIndex);

// Changing slides with the previous and next arrows
function changeSlides(n) {
  showCurrent(slideIndex += n);
}

// Changing slides with the dots at the bottom
function dotSlide(n) {
  showCurrent(slideIndex = n);
}

// Showing the right slide by changing the slideIndex var and changing the active dot color by moving the active class
function showCurrent(n) {
  var i;
  // Picking up the cards that are used as slides
  var slides = document.getElementsByClassName("cocktailSlideshow");
  // Picking up the dots
  var dot = document.getElementsByClassName("dot");
  // If user clicks to the right too many times and runs out of cards to view, returns to the first one
  if (n > slides.length) {slideIndex = 1}
  // If user clicks to the left too many times and runs out of cards to view, returns to the last one
  if (n < 1) {slideIndex = slides.length}
  // Only display one card, the active one, at a time by changing the style to display:none for the inactive cards
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  // Changing which dots are colored to show as inactive by replacing the active class with blank space when no longer active
  for (i = 0; i < dot.length; i++) {
      dot[i].className = dot[i].className.replace(" active", "");
  }
  // Displaying the chosen card and displaying the correct dot as active
  slides[slideIndex-1].style.display = "block";
  dot[slideIndex-1].className += " active";
}


function inputHandler(event) {
  event.preventDefault();

  // gets users input from the search and clears the form
  var userSearch = $('input[name="searchInput"]').val();
  searchInput.value="";
  console.log(userSearch);
 
  // error if no value entered
  if (!userSearch) {
    console.log('Nothing was searched for!');
    return;
  } else {
      getApi();
      getCocktailOneApi(); 
      getCocktailTwoApi();
      getCocktailThreeApi();
  }

 async function getApi() {
    // calls the API
     var requestUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=b1fb0b783ce64faeafa914d37ad2f19c&query=' + userSearch + " dinner";
     
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.results.length < 3) {
          errorCatch.textContent = "Your search did not yield results. Please try again."
        } else {
        // changes the recipe and coctail cards from hidden to displayed
        landingPageToggler.setAttribute("style", "display: none");
        recipeCardsToggler.setAttribute("style", "display: block");
        coctailCardsToggler.setAttribute("style", "display: block");

        // stores the recipe ID for the second API call
        recipeID1 = data.results[0].id;
        recipeID2 = data.results[1].id;
        recipeID3 = data.results[2].id;
        console.log(recipeID1);
        console.log(recipeID2);
        console.log(recipeID3);

        // Populates the recipe cards with results from API call    
        nameOne.textContent = data.results[0].title;
        imgOne.setAttribute("height", 300);
        imgOne.setAttribute("width", 300);
        imgOne.setAttribute("style", "border-radius: 40px");
        imgOne.setAttribute("src", data.results[0].image);

        nameTwo.textContent = data.results[1].title;
        imgTwo.setAttribute("height", 300);
        imgTwo.setAttribute("width", 300);
        imgTwo.setAttribute("style", "border-radius: 40px");
        imgTwo.setAttribute("src", data.results[1].image);

        nameThree.textContent = data.results[2].title;
        imgThree.setAttribute("height", 300);
        imgThree.setAttribute("width", 300);
        imgThree.setAttribute("style", "border-radius: 40px");
        imgThree.setAttribute("src", data.results[2].image);
        
        // invokes second API call for more specific information using the recipe ID
        getApi2();
        return;
      }
        })

        .catch(function (error) {
          console.log(error);
          
        })
           
  }

  function getApi2() {
    // calls the API a second time with the recipe ID number for more specific information
    
     var requestUrl2 = "https://api.spoonacular.com/recipes/informationBulk?apiKey=b1fb0b783ce64faeafa914d37ad2f19c&ids="+ recipeID1 + "," + recipeID2 + "," + recipeID3 + "&includeNutrition=false";
      
    fetch(requestUrl2)
      .then(function (response2) {
        return response2.json();
      })
      .then(function (data2) {
        console.log(data2);

        // adds descriptions and links to the recipe cards
        descriptionOne.innerHTML = data2[0].summary;
        descriptionTwo.innerHTML = data2[1].summary;
        descriptionThree.innerHTML = data2[2].summary;

        recipeLinkOne.setAttribute("href", data2[0].sourceUrl);
        recipeLinkOne.textContent = data2[0].sourceUrl;
        recipeLinkTwo.setAttribute("href", data2[1].sourceUrl);
        recipeLinkTwo.textContent = data2[1].sourceUrl;
        recipeLinkThree.setAttribute("href", data2[2].sourceUrl);
        recipeLinkThree.textContent = data2[2].sourceUrl;

        winePairOne.textContent = data2[0].winePairing.pairingText;
        winePairTwo.textContent = data2[1].winePairing.pairingText;
        winePairThree.textContent = data2[2].winePairing.pairingText;
       
        })

        .catch(function (error) {
          console.log(error);
          
        })
        
    } 
}

function getCocktailOneApi() {

  var cocktailRequestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  
  fetch(cocktailRequestUrl)
  .then (function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
     //Populates the cocktail cards with results from API call    
    cocktailOneName.textContent = data.drinks[0].strDrink;
    cocktailOneImg.setAttribute("height", 300);
    cocktailOneImg.setAttribute("width", 300);
    cocktailOneImg.setAttribute("style", "border-radius: 40px");
    cocktailOneImg.setAttribute("src", data.drinks[0].strDrinkThumb);
   
    var cocktailOneInstructionsListOne = data.drinks[0].strMeasure1 + " " + data.drinks[0].strIngredient1;
   var cocktailOneInstructionsListTwo = data.drinks[0].strMeasure2 + " " + data.drinks[0].strIngredient2;
   var cocktailOneInstructionsListThree = data.drinks[0].strMeasure3 + " " + data.drinks[0].strIngredient3;
   var cocktailOneInstructionsListFour =data.drinks[0].strMeasure4 + " " + data.drinks[0].strIngredient4;
   var cocktailOneInstructionsListFive = data.drinks[0].strMeasure5 + " " + data.drinks[0].strIngredient5;
    cocktailOneInstructionsListOne = cocktailOneInstructionsListOne.replaceAll("null", "");
    cocktailOneInstructionsListTwo = cocktailOneInstructionsListTwo.replaceAll("null", "");
    cocktailOneInstructionsListThree = cocktailOneInstructionsListThree.replaceAll("null", "");
    cocktailOneInstructionsListFour = cocktailOneInstructionsListFour.replaceAll("null", "");
    cocktailOneInstructionsListFive = cocktailOneInstructionsListFive.replaceAll("null", "");
    cocktailOneInstructionsOne.textContent = cocktailOneInstructionsListOne;
    cocktailOneInstructionsTwo.textContent = cocktailOneInstructionsListTwo;
    cocktailOneInstructionsThree.textContent = cocktailOneInstructionsListThree;
    cocktailOneInstructionsFour.textContent = cocktailOneInstructionsListFour;
    cocktailOneInstructionsFive.textContent = cocktailOneInstructionsListFive;
  })
  }
  function getCocktailTwoApi() {
  
    var cocktailRequestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    
    fetch(cocktailRequestUrl)
    .then (function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
       //Populates the cocktail cards with results from API call    
      cocktailTwoName.textContent = data.drinks[0].strDrink;
      cocktailTwoImg.setAttribute("height", 300);
      cocktailTwoImg.setAttribute("width", 300);
      cocktailTwoImg.setAttribute("style", "border-radius: 40px");
      cocktailTwoImg.setAttribute("src", data.drinks[0].strDrinkThumb);

   var cocktailTwoInstructionsListOne = data.drinks[0].strMeasure1 + " " + data.drinks[0].strIngredient1;
   var cocktailTwoInstructionsListTwo = data.drinks[0].strMeasure2 + " " + data.drinks[0].strIngredient2;
   var cocktailTwoInstructionsListThree = data.drinks[0].strMeasure3 + " " + data.drinks[0].strIngredient3;
   var cocktailTwoInstructionsListFour =data.drinks[0].strMeasure4 + " " + data.drinks[0].strIngredient4;
   var cocktailTwoInstructionsListFive = data.drinks[0].strMeasure5 + " " + data.drinks[0].strIngredient5;
    cocktailTwoInstructionsListOne = cocktailTwoInstructionsListOne.replaceAll("null,", "");
    cocktailTwoInstructionsListTwo = cocktailTwoInstructionsListTwo.replaceAll("null", "");
    cocktailTwoInstructionsListThree = cocktailTwoInstructionsListThree.replaceAll("null", "");
    cocktailTwoInstructionsListFour = cocktailTwoInstructionsListFour.replaceAll("null", "");
    cocktailTwoInstructionsListFive = cocktailTwoInstructionsListFive.replaceAll("null", "");
    cocktailTwoInstructionsOne.textContent = cocktailTwoInstructionsListOne;
    cocktailTwoInstructionsTwo.textContent = cocktailTwoInstructionsListTwo;
    cocktailTwoInstructionsThree.textContent = cocktailTwoInstructionsListThree;
    cocktailTwoInstructionsFour.textContent = cocktailTwoInstructionsListFour;
    cocktailTwoInstructionsFive.textContent = cocktailTwoInstructionsListFive;
    })
    }
    function getCocktailThreeApi() {
  
      var cocktailRequestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      
      fetch(cocktailRequestUrl)
      .then (function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
         //Populates the cocktail cards with results from API call    
        cocktailThreeName.textContent = data.drinks[0].strDrink;
        cocktailThreeImg.setAttribute("height", 300);
        cocktailThreeImg.setAttribute("width", 300);
        cocktailThreeImg.setAttribute("style", "border-radius: 40px");
        cocktailThreeImg.setAttribute("src", data.drinks[0].strDrinkThumb);

   var cocktailThreeInstructionsListOne = data.drinks[0].strMeasure1 + " " + data.drinks[0].strIngredient1;
   var cocktailThreeInstructionsListTwo = data.drinks[0].strMeasure2 + " " + data.drinks[0].strIngredient2;
   var cocktailThreeInstructionsListThree = data.drinks[0].strMeasure3 + " " + data.drinks[0].strIngredient3;
   var cocktailThreeInstructionsListFour =data.drinks[0].strMeasure4 + " " + data.drinks[0].strIngredient4;
   var cocktailThreeInstructionsListFive = data.drinks[0].strMeasure5 + " " + data.drinks[0].strIngredient5;
    cocktailThreeInstructionsListOne = cocktailThreeInstructionsListOne.replaceAll("null,", "");
    cocktailThreeInstructionsListTwo = cocktailThreeInstructionsListTwo.replaceAll("null", "");
    cocktailThreeInstructionsListThree = cocktailThreeInstructionsListThree.replaceAll("null", "");
    cocktailThreeInstructionsListFour = cocktailThreeInstructionsListFour.replaceAll("null", "");
    cocktailThreeInstructionsListFive = cocktailThreeInstructionsListFive.replaceAll("null", "");
    cocktailThreeInstructionsOne.textContent = cocktailThreeInstructionsListOne;
    cocktailThreeInstructionsTwo.textContent = cocktailThreeInstructionsListTwo;
    cocktailThreeInstructionsThree.textContent = cocktailThreeInstructionsListThree;
    cocktailThreeInstructionsFour.textContent = cocktailThreeInstructionsListFour;
    cocktailThreeInstructionsFive.textContent = cocktailThreeInstructionsListFive;
      })
      }
  
  // getCocktailOneApi(); 
  // getCocktailTwoApi();
  // getCocktailThreeApi();

// Invokes inputHandler on user submission
searchForm.on('submit', inputHandler);
themeToggler.on('click', darkMode);
function darkMode() {
  var darkBody = document.querySelector("#body");
  var darkNav = document.querySelector("#navBar");
  var navButton = document.querySelector("#navButton");
  var darkCard1 = document.querySelector("#recipeOne");
  var darkCard2 = document.querySelector("#recipeTwo");
  var darkCard3 = document.querySelector("#recipeThree");
  var searchBtn = document.querySelector("#searchBtn");
  var cocktailCard1 = document.querySelector("#cocktailCard1");
  var cocktailCard2 = document.querySelector("#cocktailCard2");
  var cocktailCard3 = document.querySelector("#cocktailCard3");
  var dropdown = document.querySelector("#dropdown");
  darkBody.classList.toggle("dark-mode");
  darkNav.classList.toggle("navbar-dark");
  dropdown.classList.toggle("dropdown-menu-dark");
  navButton.setAttribute("style", "color:black");
  darkCard1.classList.toggle("recipe-dark");
  darkCard2.classList.toggle("recipe-dark");
  darkCard3.classList.toggle("recipe-dark");
  searchBtn.classList.toggle("searchBtn-dark");
  cocktailCard1.classList.toggle("cocktail-dark");
  cocktailCard2.classList.toggle("cocktail-dark");
  cocktailCard3.classList.toggle("cocktail-dark");

  if (darkBody.classList.contains("dark-mode")) {
    localStorage.setItem("Theme", "dark");
  } else {
    localStorage.setItem("Theme", "light");
    navButton.setAttribute("style", "color:maroon");
  }
}

