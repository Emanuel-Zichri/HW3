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

function feedAnimal() {
  const coins = parseInt(localStorage.getItem("coins")) || 0;
  // בדיקה האם יש מספיק מטבעות להאכיל את החיה
  if (coins < 2) {
    // אם אין מספיק מטבעות, הוסף הודעת אזהרה
    alert(
      "Not enough coins to feed the animal! You've been eaten by the predator."
    );
    // מחיקת המבקר מהלוקל סטורג' והצגת הודעה
    localStorage.removeItem("visitor");
    return;
  }

  // אם יש מספיק מטבעות, עדכן את מספר המטבעות ועדכן את הלוקל סטורג'
  localStorage.setItem("coins", coins - 2);
  // הצגת הודעת תודה
  alert("Thank you for feeding me!");
}

const selectedVisitor = localStorage.getItem("selectedVisitor");
const visitorsData = JSON.parse(localStorage.getItem("visitors"));
const selectedUserInfo = document.getElementById("selectedUserInfo");

if (selectedVisitor) {
  const selectedUser = visitorsData.find(
    (visitor) => visitor.name === selectedVisitor
  );
  if (selectedUser) {
    const navHTML = `
      <span>Hello Visitor: ${selectedUser.name} </span>
      <span>Your coin balance:  ${selectedUser.coins}</span>
    `;
    selectedUserInfo.innerHTML = navHTML;
  }
}

// כפתור ניקוי - מתבצעת פעולת ניקוי הלוקל סטורג'
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload(); // טעינה מחדש של העמוד לרענון המידע
});

// יצירת הרשימת נפתחת של המבקרים האפשריים
const visitorDropdown = document.getElementById("visitorDropdown");
if (visitorsData) {
  visitorsData.forEach((visitor) => {
    const option = document.createElement("option");
    option.textContent = visitor.name;
    visitorDropdown.appendChild(option);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const userNav = document.getElementById("selectedUserInfo");
  const visitorsData = JSON.parse(localStorage.getItem("visitors"));

  // בדיקה אם יש מבקר מחובר
  const selectedVisitor = localStorage.getItem("selectedVisitor");
  if (!selectedVisitor) {
    const loginNav = document.createElement("span");
    loginNav.innerHTML = `
          <span>No visitor is logged in.&nbsp; </span>
          <a href="login.html">Click here to log in</a>
      `;
    selectedUserInfo.appendChild(loginNav);
  } else {
    // יצירת ניווט עבור המבקר המחובר
    const selectedUser = visitorsData.find(
      (visitor) => visitor.name === selectedVisitor
    );
    if (selectedUser) {
      const navHTML = `
              <span>Hello Visitor: ${selectedUser.name}</span>
              <br>
              <span>Your coin balance:  ${selectedUser.coins}</span>
          `;
      selectedUserInfo.innerHTML = navHTML;
    }
  }
});

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
