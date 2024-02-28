document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const animalName = params.get("name");

  // קרא את הנתונים מ-LocalStorage
  const animals = JSON.parse(localStorage.getItem("animals"));
  if (!animals) {
    alert("Animals data not found in LocalStorage");
    return;
  }
  // מצא את החיה המתאימה
  const animal = animals.find(
    (animal) => animal.name.toLowerCase() === animalName.toLowerCase()
  );
  if (!animal) {
    alert("Animal not found");
    return;
  }

  // עדכן את ה-DOM עם פרטי החיה
  updateAnimalDetails(animal);
});

function updateAnimalDetails(animal) {
  const imageContainer = document.getElementById("image");
  imageContainer.style.backgroundImage = `url('${animal.name.toLowerCase()}.jpg')`;

  // עדכון הפרטים
  document.getElementById("name").textContent = `Name: ${animal.name}`;
  document.getElementById("weight").textContent = `Weight: ${animal.weight} kg`;
  document.getElementById("height").textContent = `Height: ${animal.height} cm`;
  document.getElementById("color").textContent = `Color: ${animal.color}`;
  document.getElementById("habitat").textContent = `Habitat: ${animal.habitat}`;
  document.getElementById("isPredator").textContent = `Is Predator: ${
    animal.isPredator ? "Yes" : "No"
  }`;

  // בדיקה אם הקונטיינר לפרטים כבר קיים ב-DOM
  let detailsContainer = document.getElementById("details");
  if (!detailsContainer) {
    detailsContainer = document.createElement("div");
    detailsContainer.id = "details";
    imageContainer.appendChild(detailsContainer);
  }

  // הסרת כל הפרטים הקודמים מהקונטיינר והוספת החדשים
  detailsContainer.innerHTML = ""; // ניקוי הפרטים הקודמים
  ["name", "weight", "height", "color", "habitat", "isPredator"].forEach(
    (id) => {
      detailsContainer.appendChild(document.getElementById(id));
    }
  );
}

function renderAnimal() {
  //הציגו את החיה שאליה עברתם מעמוד גן החיות ששמורה בלוקל סטורג'
  // רנדרו את פרטי החיה לתוך האלמנטים המתאימים בהתאם לשדה הספציפי
}
function renderRelatedAnimals() {
  // ממשו את הלוגיקה שמרנדרת כרטיסיות של החיות ששדה ההאביטט שלהם זהה לחיה שמוצגת
  // רנדרו אותן לתוך הדיב שמיועד להן עם האיידי related-animals
  // ממשו את אותה לוגיקה של כרטיסיית חיה כמו בכרטיסיות בעמוד zoo.html
}

function feedAnimal() {
  // ממשו את הלוגיקה של האכלת חיה
  // במידה ואין מספיק מטבעות, טפלו בהתאם להנחיות במטלה
}

function visitorGotEaten() {
  // ממשו את הלוגיקה של חיה שטורפת אורח
}

function animalEscaped() {
  //ממשו את הלוגיקה של חיה שבורחת מגן החיות
}

function feedAnimal() {
  const coinsBefore = parseInt(localStorage.getItem("coins")) || 0;
  if (coinsBefore >= 2) {
    localStorage.setItem("coins", coinsBefore - 2);
    const coinsAfter = parseInt(localStorage.getItem("coins"));
    updateCoinsInNav(coinsAfter); // עדכון של כמות המטבעות ב-NAV
    console.log("Coins before feeding:", coinsBefore);
    console.log("Coins after feeding:", coinsAfter);
    alert("Thank you for feeding me!");
  } else {
    alert("You don't have enough coins. The animal will attack you!");
    visitorGotEaten();
  }
}

function updateCoinsInNav(coins) {
  const selectedUserInfo = document.getElementById("selectedUserInfo");
  selectedUserInfo.innerHTML = `
    <span>Hello Visitor: ${localStorage.getItem("selectedVisitor")} </span>
    <span>Your coin balance:  ${coins}</span>
  `;
}

document.getElementById("feed-animal").addEventListener("click", feedAnimal);

function visitorGotEaten() {
  localStorage.removeItem("visitor");
  alert("You have been attacked by the animal!");
}

document.getElementById("feed-animal").addEventListener("click", feedAnimal);

document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("coins")) {
    localStorage.setItem("coins", 50);
  }
});
