const main = document.getElementById('main'); // get the dom for the main element
const addUserBtn = document.getElementById('add-user'); // get the dom for the add user button
const doubleBtn = document.getElementById('double'); // get the dom for the double money button
const showMillionairesBtn = document.getElementById('show-millionaires'); // get the dom for the show million button
const sortBtn = document.getElementById('sort'); // get the dom for the sort button
const calculateWealthBtn = document.getElementById('calculate-wealth'); // get the dom for the caLculate wealth

let data = []; // initial array
// Generating the first three users
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api'); // fetch the array from randomuser.me
    const data = await res.json();
    const user = data.results[0]; // extract the user object containing the details of the users name

    const newUser = { // creating a new object storing the name from the api and money for each user
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    // console.log(newUser);
    addData(newUser); // adding the user to the data array
}

// Double everyone's money
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2};
    });

    updateDOM();
}

// Sorts users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// Filter only millionaires
function showMillionares() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc +=user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// Add new object to the data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}



// Update DOM
function updateDOM(providedData = data) {
    // Clear the main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as money https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listner
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionares);
calculateWealthBtn.addEventListener('click', calculateWealth);