const apiUrl = "https://www.themealdb.com/api/json/v1/1/"

async function searchApiMealDB(url) {
    try {
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.error(`No Element Found: ${error} Number Error`);
    }
}


//Get static data
async function getDataMealDB(url) {
    const datas = await searchApiMealDB(url);
    dataLength = datas.meals.length;
    var divCards = document.querySelector(".cardsContainer");
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "container");
    if (_filter == 'search.php?s=') {//When the filter is meal name
        //Get meal name data
        selectMeal = Math.floor(Math.random() * dataLength);
        let getName = datas.meals[selectMeal].strMeal;
        //Get instruction data
        let getInstructions = datas.meals[selectMeal].strInstructions;
        //Get ingredient data
        const getIngredientIndex = [];
        for (let key in datas.meals[selectMeal]) {
            if (key.startsWith("strIngredient") && datas.meals[selectMeal][key] !== '') {
                getIngredientIndex.push(datas.meals[selectMeal][key]);
            }
        }
        var Ingredientnonull = getIngredientIndex.filter(function (elemento) {
            return elemento !== null;
        });
        //Get image data
        let getImage = datas.meals[selectMeal].strMealThumb;

        //create div for data
        var onemealCard = document.createElement("div");
        onemealCard.setAttribute("class", "oneMealTarget1");
        var onemealtext = document.createElement("div");
        onemealtext.setAttribute("class", "oneMealtext1");

        var onemealthumb = document.createElement("div");
        onemealthumb.setAttribute("class", "oneMealthumb1");

        var oneimg = document.createElement("img")
        oneimg.setAttribute("src", getImage);

        var onemealname = document.createElement("div");
        onemealname.setAttribute("class", "oneMealname1");
        onemealname.innerHTML = `<p> ${getName} </p>`;

        var onemealinstruction = document.createElement("div");
        onemealinstruction.setAttribute("class", "oneMealinstruction1");
        onemealinstruction.innerHTML = `<p><strong>Instruction - </strong> ${getInstructions} </p>`;

        var onemealingredient = document.createElement("div");
        onemealingredient.setAttribute("class", "oneMealingredient1");
        ing = Ingredientnonull.toString();
        ing = ing.replace(/,/g, ", ");
        onemealingredient.innerHTML = `<p><strong>Ingredient - </strong> ${ing} </p>`;

        onemealthumb.appendChild(oneimg);
        onemealCard.appendChild(onemealthumb);
        onemealtext.appendChild(onemealname);
        onemealtext.appendChild(onemealinstruction);
        onemealtext.appendChild(onemealingredient);
        onemealCard.appendChild(onemealtext);
        divContainer.appendChild(onemealCard);

    } else { //When the filter is other
        let getNames = datas.meals.map(meal => meal.strMeal);
        let getThumb = datas.meals.map(meal => meal.strMealThumb);
        if (dataLength > 18) {
            for (var i = 0; i < 18; i++) {//array of MealsName higher than 18
                var mealCard = document.createElement("div");
                mealCard.setAttribute("class", "mealTarget");
                var mealthumb = document.createElement("div");
                mealthumb.setAttribute("class", "MealThumb");
                var img = document.createElement("img")
                img.setAttribute("src", getThumb[i]);
                var mealname = document.createElement("div");
                mealname.setAttribute("class", "mealName");
                mealname.innerHTML = `<p>${getNames[i]}</p>`;
                mealthumb.appendChild(img);
                mealCard.appendChild(mealthumb);
                mealCard.appendChild(mealname);
                divContainer.appendChild(mealCard);
                mealCard.addEventListener("click",function(){
                    console.log("holi");
                    console.log(mealname.innerHTML); //nodoValue
                })
            }
        } else {
            for (var i = 0; i < dataLength; i++) {//array of MealsName lower than 18
                var mealCard = document.createElement("div");
                mealCard.setAttribute("class", "mealTarget");
                var mealthumb = document.createElement("div");
                mealthumb.setAttribute("class", "MealThumb");
                var img = document.createElement("img")
                img.setAttribute("src", getThumb[i]);
                var mealname = document.createElement("div");
                mealname.setAttribute("class", "mealName");
                mealname.innerHTML = `<p>Nombre: ${getNames[i]} </p>`;
                mealthumb.appendChild(img);
                mealCard.appendChild(mealthumb);
                mealCard.appendChild(mealname);
                divContainer.appendChild(mealCard);
            }

        }
    }
    divCards.appendChild(divContainer);
    if (exitMenu.addEventListener) {
        divCards.removeChild(divCards.firstChild);
    }
}
//Search DB
const searchButton = document.querySelector('.search button');
const searchInput = document.querySelector('.search input');
searchButton.addEventListener(
    "click",
    () => {
        var getInput = searchInput.value;
        getInput = getInput.trim();
        getInput = getInput.replace(/ /g, "%20");
        const url = `${apiUrl}${_filter}${getInput}`;
        getDataMealDB(url);
        cardMenu.style.transform = `translateY(${0}%)`;
        cardMenu.style.visibility = 'visible';
        checkbox.checked = false;
    }
)

//Select _filter
const selectMealName = document.querySelector('.mealEvent');
var _filter = 'search.php?s=';
var changeField;
var checkbox = document.getElementById("menulogoConfig");
selectMealName.addEventListener(
    "click",
    () => {
        _filter = 'search.php?s=';
        changeField = document.querySelector('.searchBar');
        changeField.placeholder = "Meal Name";
        checkbox.checked = false;
    }
)
const selectPrincipalIngredient = document.querySelector('.ingredientEvent');
selectPrincipalIngredient.addEventListener(
    "click",
    () => {
        _filter = 'filter.php?i=';
        changeField = document.querySelector('.searchBar');
        changeField.placeholder = "Principal Ingredient";
        checkbox.checked = false;
    }
)

const selectCategory = document.querySelector('.categoryEvent');
selectCategory.addEventListener(
    "click",
    () => {
        _filter = 'filter.php?c=';
        changeField = document.querySelector('.searchBar');
        changeField.placeholder = "Category";
        checkbox.checked = false;
    }
)

const selectNacionality = document.querySelector('.nacionalityEvent');
selectNacionality.addEventListener(
    "click",
    () => {
        _filter = 'filter.php?a=';
        changeField = document.querySelector('.searchBar');
        changeField.placeholder = "Nacionality Area";
        checkbox.checked = false;
    }
)
//Open Cards Menu
const cardMenu = document.querySelector('.cardsMenu');
const exitMenu = document.querySelector('.exit');
exitMenu.addEventListener(
    "click",
    () => {
        cardMenu.style.transform = `translateY(${100}%)`;
        cardMenu.style.visibility = 'hidden';

    }
)


//Proof Async function
// (async() =>{
//     const datas = await searchApiMealDB(apiUrl);
//     console.log(datas);
// })();