var plantSearch = $('#plant-form');
var plantImg = document.querySelector("#plantImg");
var plantInfo = document.querySelector("#plantInfo");
var commonName = document.querySelector("#commonName");
var scientificName = document.querySelector("#scientificName");
var plantDescription = document.querySelector("#plantDescription");
var searchTerm = document.querySelector("#searchTerm");

// create function to handle form submission
function plantInputHandler(event) {
  event.preventDefault();

  // gets users input from the plant-form
  var plant = $('input[name="searchPlant"]').val();
  console.log(plant);

  // error if no value entered
  if (!plant) {
    console.log('No plant item filled out in form!');
    return;
  } else {
      getApi();
      getApi2();
  }
  // This sends a request to the proxy server, which in turn sends the fetch request
  // to Trefle.io, then returns the response
  function getApi() {
    fetch('https://dry-dusk-44988.herokuapp.com/plants', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: 'https://trefle.io/api/v1/species/search?q=' + plant,
        })
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
  
      
        // Appends plantImg to the imgDiv section
        // then sets attribute to image url from returned array
        // var plantImg = document.createElement("img");
        // imgDiv.appendChild(plantImg);
        plantImg.setAttribute("height", 500);
        plantImg.setAttribute("width", 500);
        plantImg.setAttribute("src", data.data[0].image_url);
        searchTerm.textContent = "You searched for: " + plant;
        commonName.textContent = "Common Name: " + data.data[0].common_name;
        scientificName.textContent = "Scientific Name: " + data.data[0].scientific_name;
        plantDescription.textContent = "Description: ";
        return;
    })
    .catch(function (error) {
      console.log(error);
      
    })
    
    }
    // Testing second API call
    function getApi2() {
      fetch('https://dry-dusk-44988.herokuapp.com/plants', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: 'https://trefle.io/api/v1/species/search?q=' + plant,
          })
        })
        .then(function (response2) {
          return response2.json();
        })
        .then(function (data2) {
          console.log(data2);
          return;
      })
      .catch(function (error) {
        console.log(error);
        
      })
      
      }
  
  // clear the form input element
  $('input[name="searchPlant"]').val('');
}

// Plant search form event listener 
plantSearch.on('submit', plantInputHandler);
