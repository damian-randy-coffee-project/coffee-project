"use strict"

function renderCoffee(coffee) {
    let html = `<div class="coffee-data">
<h1 class="dynamicHmtl">${coffee.name}</h1>
<p class="dynamicHmtl">${coffee.roast}</p>
</div>`

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    coffees = coffees.sort((a,b) =>
        a.id - b.id)
    for(let i=0; i< coffees.length; i++){
        html += renderCoffee(coffees[i])
    }

    return html;
}



function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    localStorageArr.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}
function searchUpdateCoffee(e) {
    const searchTerm = searchBar.value;
    const filteredNames = coffees.filter(coffee =>{
        return coffee.name.toLowerCase().includes(searchTerm.toLowerCase());
    })

    tbody.innerHTML = renderCoffees(filteredNames);
}
function newCoffee(e){
    e.preventDefault()
    let roastValue= newRoastSelection.value
    let coffeeName= newCoffeeSearch.value

    let coffee = {id: 0, name:coffeeName, roast: roastValue}
    coffees.unshift(coffee)
    coffees.forEach(coffee => {
        coffee.id+=1
    })
    localStorage.setItem('coffeesArr', JSON.stringify(coffees));
    tbody.innerHTML = renderCoffees(coffees);
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide

let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

let localStorageArr = window.localStorage.setItem('coffeesArr', JSON.stringify(coffees));
let existing = window.localStorage.getItem('coffeesArr');

if(existing){
    coffees = JSON.parse(existing)
}else{
    coffees = coffees
}

let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let newCoffeeSubmit = document.querySelector('#newCoffeeSubmit')
let roastSelection = document.querySelector('#roast-selection');
let newRoastSelection = document.querySelector('#new-roast-selection');
let newCoffeeSearch = document.querySelector('#newCoffeeNameSearch')
let searchBar = document.querySelector('#coffeeNameSearch')
tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
searchBar.addEventListener("input", searchUpdateCoffee);
newCoffeeSubmit.addEventListener('click', newCoffee)

