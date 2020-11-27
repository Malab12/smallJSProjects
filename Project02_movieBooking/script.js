// LS: Local Storage

const container = document.querySelector('.container'); //returns the dom for container div
const seats = document.querySelectorAll('.row .seat:not(.occupied'); // returns node list of non-occupied seats
const count = document.querySelector('#count'); // returns the dom of the span with id count
const total = document.querySelector('#total'); // returns the dom of the span with id total
const movieSelect = document.querySelector('#movie'); // returns the dom of the select with id movie

populateUI(); //function call at the start when the page is loaded/reloaded to display previous changes in the local storage

//price of ticket according to the movie selected
let ticketPrice = +movieSelect.value; //converting the string into a number

//  Save selected movie index and price
function setmovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex); // saves the current index of movie to ls
    localStorage.setItem('selectedMoviePrice', moviePrice); // saves the current price per ticket to ls
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); // returns a node list containing all the seat divs with the class selected

    // Copy the selected seats into an array (spread ...)
    // Map through the array
    // Return a new array index

    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); // creates an array from the selectedSeats node list containing the index of the selected seats from the array created from the node list of total seats.


    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex)); // saving the array containing the index of the current selected seats into the LS by converting into a JSON string first


    const selectedSeatsCount = selectedSeats.length; //number of seats selected

    count.innerText = selectedSeatsCount; //updates the number of seats selected
    total.innerText = selectedSeatsCount * ticketPrice; // updates the ticket price based on the number of seats selected
}


// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // extracting the array containing the index of selected seats from previous state from the LS

    if (selectedSeats !== null && selectedSeats.length > 0) { // if the array exists and is nonempty
        seats.forEach((seat, index) => { 
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected'); // for each seat in the array add the class "selected" to it inorder to display the seats selected in the previous state
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); // return the index of the movie selected in the previous state
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex; //set the current index as the previous index
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value; //get the ticket price value of the current movie selected
    setmovieData(e.target.selectedIndex, e.target.value); // save the values into LS
    updateSelectedCount(); // update the total no seats and their price
})

// Seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) { // if the target contains the class seat and does not contain the class occupied
        e.target.classList.toggle('selected'); // toggle the class selected onto the current target
        updateSelectedCount(); // update the total no seats and their price
    }
});

// Initial count and total set
updateSelectedCount(); // update the total no seats and their price to the previous state everytime the page is loaded/ reloaded