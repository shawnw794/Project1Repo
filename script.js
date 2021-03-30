var searchForm = $('#searchForm');
var nameOne = document.querySelector('#nameOne');
var nameTwo = document.querySelector('#nameTwo');
var nameThree = document.querySelector('#nameThree');
var imgOne = document.querySelector('#imgOne');
var imgTwo = document.querySelector('#imgTwo');
var imgThree = document.querySelector('#imgThree');

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

  // gets users input from the search form
  var userSearch = $('input[name="searchInput"]').val();
  console.log(userSearch);

  // error if no value entered
  if (!userSearch) {
    console.log('Nothing was searched for!');
    return;
  } else {
      getApi();
      
  }

  function getApi() {
    // replace `octocat` with anyone else's GitHub username
    var requestUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=254301e6f27a4fd1a78627b0c66f55d4&query=' + userSearch;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
            
        nameOne.textContent = data.results[0].title;
        imgOne.setAttribute("height", 300);
        imgOne.setAttribute("width", 300);
        imgOne.setAttribute("src", data.results[0].image);
        nameTwo.textContent = data.results[1].title;
        imgTwo.setAttribute("height", 300);
        imgTwo.setAttribute("width", 300);
        imgTwo.setAttribute("src", data.results[1].image);
        nameThree.textContent = data.results[2].title;
        imgThree.setAttribute("height", 300);
        imgThree.setAttribute("width", 300);
        imgThree.setAttribute("src", data.results[2].image);
        })
        .catch(function (error) {
          console.log(error);
      
        })
      
  }


}



searchForm.on('submit', inputHandler);