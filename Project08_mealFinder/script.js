// DOM elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');


// Functions

// Search meal and fetch from Api
function searchMeal(e) {
    e.preventDefault(); // prevents the default function of the submit event from refreshing the page


    // clear single meal
    single_mealEl.innerHTML = '';

    // Get search term
    const term = search.value;
    // console.log(term);

    // Check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`) //fetch the data for the perticular term from the api
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`; 

            if (data.meals === null) {
                resultHeading.innerHTML = '<p>There are no search results. Try again!</p>'; // if no results are found
            } else {
                // Creating a dom element to be inserted into the html to display the dishes found
                mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <div class = "meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `)
                .join(''); 
            }
        });
        // Clear search text
        search.value = '';
    } else {
        alert('Please enter a search term!');
    }
}

// Fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0]; //overcoming the eccentricities of the api, even though it returns a single object, it returns in the form of an array with a single element
        // console.log(meal);
        addMealtoDOM(meal); //displaying the meal info in the website
    });
}

// Fetch random meal from API
function getRandomMeal() {
    // Clear meals and heading
    meals.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0]; //overcoming the eccentricities of the api, even though it returns a single object, it returns in the form of an array with a single element

        addMealtoDOM(meal); // displaying the meal info on the website
    })
}

// Add meal to dom
function addMealtoDOM(meal) {
    const ingredients = []; // array to store the ingredients and their measurements. Another eccentricity of the api, rather than saving the info into an array they store each ingredient in a seperate variable. 

    for (let i = 1; i <=20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`) //converting the multiple variables into a single array of strings
        } else {
            break; //if the ingredient variable is empty, break the loop
        }
    }
    // console.log(ingredients);

    // displaying the details in the website
    single_mealEl.innerHTML = `
        <div class = "single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing =>`<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}



// Event Listners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => { // extracting the id of the specific meal
    const mealInfo = e.path.find(item => {
        if (
            item.classList
        ) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    
    if (mealInfo) { // if mealinfo does contain the id attribute
        const mealID = mealInfo.getAttribute('data-mealid');
        // console.log(mealID);
        getMealById(mealID);
    }
});