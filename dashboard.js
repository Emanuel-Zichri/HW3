document.addEventListener("DOMContentLoaded", function () {
  function loadDataFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  function displayVisitedAnimals() {
    const visitedAnimals = loadDataFromLocalStorage("visited-animals");
    const visitedAnimalsElement = document.getElementById("visited-animals");
    visitedAnimalsElement.innerHTML = "<h2>Visited Animals</h2>";
    visitedAnimals.forEach((animal) => {
      visitedAnimalsElement.innerHTML += `<p>${animal}</p>`;
    });
  }

  function displayFeededAnimals() {
    const feededAnimals = loadDataFromLocalStorage("feeded-animals");
    const feededAnimalsElement = document.getElementById("feeded-animals");
    feededAnimalsElement.innerHTML = "<h2>Feeded Animals</h2>";
    feededAnimals.forEach((animal) => {
      feededAnimalsElement.innerHTML += `<p>${animal}</p>`;
    });
  }

  function findFavoriteAnimal() {
    const visitedAnimals = loadDataFromLocalStorage("visited-animals");
    let animalCount = {};
    visitedAnimals.forEach((animal) => {
      animalCount[animal] = (animalCount[animal] || 0) + 1;
    });
    let maxVisits = 0;
    let favoriteAnimal = null;
    for (const animal in animalCount) {
      if (animalCount[animal] > maxVisits) {
        maxVisits = animalCount[animal];
        favoriteAnimal = animal;
      }
    }
    return favoriteAnimal;
  }

  function displayFavoriteAnimal() {
    const favoriteAnimal = findFavoriteAnimal();
    const favoriteAnimalElement = document.getElementById("favorite-animal");
    favoriteAnimalElement.innerHTML = `<h2>Favorite Animal</h2><p>${favoriteAnimal}</p>`;
  }

  displayVisitedAnimals();
  displayFeededAnimals();
  displayFavoriteAnimal();
});
