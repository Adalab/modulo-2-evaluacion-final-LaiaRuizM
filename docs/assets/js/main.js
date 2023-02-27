"use strict";const inputElement=document.querySelector(".js-input"),searchBtn=document.querySelector(".js-searchBtn"),resetBtn=document.querySelector(".js-resetBtn"),cocktailsList=document.querySelector(".js-cocktailsUl"),favoritesList=document.querySelector(".js-favoritesUl"),deleteBtn=document.querySelector(".js-delete"),url="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";let cocktailsListData=[],favoritesListArray=[];function mapArray(t){cocktailsListData=t.drinks.map(t=>({name:t.strDrink,photo:t.strDrinkThumb,id:t.idDrink}))}function getFav(){const t=JSON.parse(localStorage.getItem("favCocktailsElements"));t&&(favoritesListArray=t,renderFavoritesList(favoritesListArray))}function handleClickSearch(t){t.preventDefault();const e=inputElement.value.toLowerCase();fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+e).then(t=>t.json()).then(t=>{null===t.drinks?cocktailsList.innerHTML="Oh, vaya, parece que todavía no tenemos este cóctel. ¡Vamos a tenerlo en cuenta para ampliar nuestra variedad!":(mapArray(t),cocktailsList.innerHTML="",renderCocktails(cocktailsListData))})}function renderCocktails(t){cocktailsList.innerHTML="";for(const e of t){const t=favoritesListArray.findIndex(t=>e.id===t.id);let i="",a=e.photo;-1!==t&&(i="selected"),a||(a="https://www.drinksco.es/blog/assets/uploads/sites/2/2020/05/cocktail-3327242_1920-1170x780.jpg");const s=`<li class="js-liDrink ${i}" id="${e.id}"><h3 class="cocktailName1">${e.name}</h3><img src="${a}" title="${e.name}" alt="${e.name}" class="cocktailImg"/></li>`;cocktailsList.innerHTML+=s}addEventToLis()}function handleClickList(t){t.currentTarget.classList.toggle("selected");const e=t.currentTarget.id,i=cocktailsListData.find(t=>t.id===e),a=favoritesListArray.findIndex(t=>t.id===e);-1===a?favoritesListArray.push(i):favoritesListArray.splice(a,1),renderFavoritesList(favoritesListArray),localStorage.setItem("favCocktailsElements",JSON.stringify(favoritesListArray))}function renderFavoritesList(t){favoritesList.innerHTML="";for(const e of t)favoritesList.innerHTML+=`<li><h3 class="cocktailName2">${e.name} <i class="trash fa-regular fa-trash-can js-iconX" id="${e.id}"></i></h3><img src="${e.photo}" title="${e.name}" alt="${e.name}" class="cocktailImg2"/></li>`;addEventToX()}function handleClickIcon(t){t.preventDefault();const e=t.currentTarget.id,i=favoritesListArray.findIndex(t=>t.id===e);-1!==i&&favoritesListArray.splice(i,1),renderFavoritesList(favoritesListArray),renderCocktails(cocktailsListData),localStorage.setItem("favCocktailsElements",JSON.stringify(favoritesListArray))}function handleClickReset(){favoritesList.innerHTML="",localStorage.removeItem("favCocktailsElements"),location.reload()}function handleClickDelete(){favoritesList.innerHTML="",localStorage.removeItem("favCocktailsElements"),location.reload()}function addEventToLis(){const t=document.querySelectorAll(".js-liDrink");for(const e of t)e.addEventListener("click",handleClickList)}function addEventToX(){const t=document.querySelectorAll(".js-iconX");for(const e of t)e.addEventListener("click",handleClickIcon)}fetch(url).then(t=>t.json()).then(t=>{mapArray(t),renderCocktails(cocktailsListData)}),getFav(),searchBtn.addEventListener("click",handleClickSearch),resetBtn.addEventListener("click",handleClickReset),deleteBtn.addEventListener("click",handleClickDelete);