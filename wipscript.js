console.log("we are connected")

// TOGGLE FUNCTION
// click event
function togglePanel(buttonId, panelClass) {
    const addToggle = document.querySelector(`#${buttonId}`)
    const photoPanel = document.querySelector(`.${panelClass}`)
    addToggle.addEventListener("click", () => {
        //console.log("it's a button!")
        photoPanel.classList.toggle("hide")
    })//end of toggle Event Listener
}//end of togglePanel function
togglePanel("about", "panel0")
togglePanel("engagement", "panel1")
togglePanel("family", "panel2")
togglePanel("settings", "panel3")

//IMAGE & QUOTE PUT ON PANEL
//mouseover event and access public API
function addPhotosToPanel(imageSRC, panelParam, photoTitle, photoHeight) {
    let photo = document.createElement("img");
    photo.src = imageSRC;
    photo.alt = photoTitle;
    photo.title = photoTitle;
    photo.style.height = photoHeight + "px";
    photo.addEventListener("mouseover", () => {
        //console.log("mouseover works!"),
            photo.style.filter = "blur(2px)",
            setTimeout(() => {
                photo.style.filter = "blur(0px)";
                //console.log("timer works")
            }, 500)// end of Timeout, so photo does not stay blurred on mouseover 
    })// end of mouse over event listener
    let photoQuote = document.createElement("p")
    getQuote(photoQuote)
    //get fetch quotes from Quotable API
    function getQuote() {
        fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then(randomQuote => {
                //console.log(randomQuote)
                photoQuote.textContent = randomQuote.content + "   || " + randomQuote.author
                document.querySelector(`.${panelParam}`).append(photo, photoQuote);
            })//end of get fetch random quote second .then
    }// end of getQuotes function
}// end of add photos and quotes to panel function 

//les photos
//I decided not to put it in the db.json so they appear when my local server is not running.
addPhotosToPanel("photos/caengage3.jpg", "panel1", "C & A in Georgetown", 650)
addPhotosToPanel("photos/caengage2.jpg", "panel1", "C & A in Georgetown", 600)
addPhotosToPanel("photos/caengage1.jpg", "panel1", "C & A in Georgetown", 900)
addPhotosToPanel("photos/mtengage2.jpg", "panel1", "M & T at Red Rock Wilderness", 620)
addPhotosToPanel("photos/mtengage3.jpg", "panel1", "M & T at Red Rock Wilderness", 900)
addPhotosToPanel("photos/mtengage1.jpg", "panel1", "M & T at Red Rock Wilderness", 600)
addPhotosToPanel("photos/acengage2.jpg", "panel1", "A & C at the Rust Manor House", 700)
addPhotosToPanel("photos/acengage3.jpg", "panel1", "A & C at the Rust Manor House", 800)
addPhotosToPanel("photos/acengage1.jpg", "panel1", "A & C at the Rust Manor House", 600)
addPhotosToPanel("photos/family1.jpg", "panel2", "Elderly couple sitting outside", 650)
addPhotosToPanel("photos/family2.jpg", "panel2", "Elderly couple walking", 950)
addPhotosToPanel("photos/mombaby1.jpg", "panel2", "Mother holding baby", 900)
addPhotosToPanel("photos/birthday.jpeg", "panel2", "Girl at one year birthday party", 620)
addPhotosToPanel("photos/pregnancy2.jpg", "panel2", "Mother with child", 800)
addPhotosToPanel("photos/pregnancy.jpg", "panel2", "Mother with child", 800)
addPhotosToPanel("photos/lamps.jpg", "panel3", "Little Tokyo, LA", 620)
addPhotosToPanel("photos/kauai.jpg", "panel3", "Trees in Kauai", 900)
addPhotosToPanel("photos/landscape.jpg", "panel3", "Kauai Landscape", 650)
addPhotosToPanel("photos/blueflowers.jpg", "panel3", "Blue flowers in Kauai", 900)
//end of adding photos to their panels



//THE SUGGESTION FORM
//submit event
//will only work when local server is running 
document.querySelector("#suggestionForm").addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    let userObj = {
        place: e.target.userInput.value
    }
    postSuggestion(userObj)
    e.target.reset()
}//end of function handleSubmit

function postSuggestion(userObjParam) {
    fetch("http://localhost:3000/locations", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(userObjParam)
    })
        .then(resp => resp.json())
        .then(jsonData => makeSuggestions(jsonData))//new locations get put on list
}//end of addSuggestion function that calls postObject for post fetch

function getAllLocations() {
    fetch("http://localhost:3000/locations")
        .then(resp => resp.json())
        .then(arrayLocations => {
            //console.log(arrayLocations),
                arrayLocations.forEach(makeSuggestions)// existing locations get put on list
        })//end of second .then in fetch get all locations
}//end of get All Locations fetch function
getAllLocations()

//this will take location suggestions from my local server and put it into the locations list
function makeSuggestions(eachLocation) {
    let ulSuggestions = document.querySelector("#suggestionList")
    let newLocation = document.createElement("li")
    newLocation.textContent = eachLocation.place
    newLocation.id = eachLocation.id
    ulSuggestions.append(newLocation)
}//end of make Suggestions function