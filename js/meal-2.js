const loadData = async (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.meals)
}
const displayData = (meals) => {
    // Step-1: container element
    const mealsContainer = document.getElementById('meals-container')
    mealsContainer.innerHTML = ''
    meals.forEach(meal => {
        console.log(meal.idMeal)
        // step-2: create child for each element
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        // step-3: set content for the child
        mealDiv.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text"><span class ="h5 fw-bold">Recipe:</span>
                 ${meal.strInstructions}</p>
                <!-- Button trigger modal -->
                <button onclick= "loadMealDetails(${meal.idMeal})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#mealDetails">Details</button>
            </div>
        </div>
        `
        // step-4: append child
        mealsContainer.appendChild(mealDiv)
    })
}
const searchMeal = () => {
    const searchText = document.getElementById('search-field').value;
    loadData(searchText)
}

const loadMealDetails = async (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0])
}
const displayMealDetails = (meal) => {
    // console.log(meal)
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealDetailsBody = document.getElementById('meal-details-body');
    mealDetailsBody.innerHTML = `
    <img class ="img-fluid" src="${meal.strMealThumb}" alt="">
    <h5 class="my-3">Category: ${meal.strCategory}</h5>
    <h5 class="my-3">Area: ${meal.strArea}</h5>
    <p class="">Instruction: ${meal.strInstructions}</p>
    <h5 class=" ">Youtube: <a target="_blank" href ="${meal.strYoutube}">${meal.strYoutube}</a> </h5>
    <h5 class=" ">Source: <a target="_blank" href ="${meal.strSource}">${meal.strSource}</a></h5>
    `
}

loadData('')