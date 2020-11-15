const currencyEl_one = document.getElementById('currency-one'); //get dom element for the select element for currency one
const amountEl_one = document.getElementById('amount-one'); // get dom element for the input element amount one
const currencyEl_two = document.getElementById('currency-two'); // get dom element for the select element for currency two
const amountEl_two = document.getElementById('amount-two'); // get dom element for the input element for amount two

const rateEl = document.getElementById('rate'); // get dom element for the div rate
const swap = document.getElementById('swap'); // get dom element for the button swap

// Functions

// Fetchj exchange rates and update the DOM
function calculate() {
    // console.log('RAN');
    const currency_one = currencyEl_one.value; //extract the currency code of currency one
    const currency_two = currencyEl_two.value; // extract the currency code of currency two
    // console.log(currency_one, currency_two);

    fetch(` https://v6.exchangerate-api.com/v6/9c3bd20da7190e8168ad41a9/latest/${currency_one}`) // fetch the details from the exchangerate api for currency one code
    .then(res => res.json()) // convert the fetched item into json
    .then(data => { // extracting data from the json array
        // console.log(data);
        const rate = data.conversion_rates[currency_two]; // extract the conversion rate for currency one from currency two from the array conversion_rates in the json object
        // console.log(rate);
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`; // edit the rate div to output the conversion rate from currency one to currency two

        amountEl_two.value = (amountEl_one.value * rate).toFixed(2); // display the amount of currency two exchanged from amount currency one upto two decimal places
    });
}

// Event listners
currencyEl_one.addEventListener('change', calculate); // if the currency one select encounters any change, for example: change of currency, fire the calculate function
amountEl_one.addEventListener('input', calculate); // if the amount one input encounters an input action, for example: changing the value, fire the calculate function
currencyEl_two.addEventListener('change', calculate); // if the currency two select encounters any change, for example: change of currency, fire the calculate function
amountEl_two.addEventListener('input', calculate); // if the amount two input encounters an input action, for example: changing the value, fire the calculate function

swap.addEventListener('click', () => { // if the swap button is clicked fire this callback function
    // exchange the currency codes of currency one and currency two and fire the calculate function
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate(); //initial fire of calculate function for whenever the page is loaded

