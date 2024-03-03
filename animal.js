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
  imageContainer.style.backgroundImage = `url('./${animal.name.toLowerCase()}.jpg')`;

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
              <span>Your coin balance: 🪙 ${selectedUser.coins}</span>
          `;
      selectedUserInfo.innerHTML = navHTML;
    }
  }
});

document.getElementById("feed-animal").addEventListener("click", feedAnimal);

function visitorGotEaten() {
  localStorage.removeItem("visitor");

  const insufficientCoinsModal = document.getElementById(
    "insufficientCoinsModal"
  );

  // הגדר את סגנון התצוגה שלו ל-"block" כדי להציג אותו
  insufficientCoinsModal.style.display = "block";

  // window.location.href = "signup.html";
  // location.reload();
}

document.getElementById("feed-animal").addEventListener("click", feedAnimal);

document.addEventListener("click", function () {
  if (!localStorage.getItem("coins")) {
    localStorage.setItem("coins", 50);
  }
});

function feedAnimal() {
  const selectedVisitor = localStorage.getItem("selectedVisitor");
  const visitorsData = JSON.parse(localStorage.getItem("visitors"));
  const coinsBefore = JSON.parse(localStorage.getItem("coins")) || 0;

  const selectedUser = visitorsData.find(
    (visitor) => visitor.name === selectedVisitor
  );

  const animalName = new URLSearchParams(window.location.search).get("name");
  const animals = JSON.parse(localStorage.getItem("animals"));

  const animal = animals.find(
    (animal) => animal.name.toLowerCase() === animalName.toLowerCase()
  );

  if (coinsBefore >= 2) {
    // עדכון מספר המטבעות שנותר למשתמש המחובר
    const updatedUser = { ...selectedUser, coins: selectedUser.coins - 2 };
    const updatedVisitorsData = visitorsData.map((visitor) =>
      visitor.name === selectedVisitor ? updatedUser : visitor
    );
    localStorage.setItem("visitors", JSON.stringify(updatedVisitorsData));

    // עדכון מספר המטבעות ב-LocalStorage
    localStorage.setItem("coins", coinsBefore - 2);

    const coinsAfter = coinsBefore - 2;
    console.log("Coins before feeding:", coinsBefore);
    console.log("Coins after feeding:", coinsAfter);

    // הצגת המודל "תודה" לאחר האכלה
    const thankYouModal = document.getElementById("thankYouModal");
    thankYouModal.style.display = "block";

    updateCoinsInNav(coinsAfter); // עדכון של כמות המטבעות ב-NAV
  } else {
    // בדיקה האם החיה היא חיה טורפת או לא
    if (animal.isPredator) {
      // אם החיה היא חיה טורפת ואין מספיק מטבעות, נמחק את המשתמש מהלוקל סטורג'
      removeUserFromLocalStorage();
      visitorGotEaten();
    } else {
      // אם החיה אינה חיה טורפת ואין מספיק מטבעות, נמחק את החיה עצמה מהלוקל סטורג' ונציג מודל המודיע למשתמש על בריחת החיה
      const animalIndex = animals.findIndex(
        (animal) => animal.name.toLowerCase() === animalName.toLowerCase()
      );
      animals.splice(animalIndex, 1);
      localStorage.setItem("animals", JSON.stringify(animals));

      const animalEscapeModal = document.getElementById("animalEscapeModal");
      animalEscapeModal.style.display = "block";
    }
  }
}

// סגירת המודל כאשר לוחצים על כפתור הסגירה (X)
const closeModalButton = document.getElementById("closeModalButton");
closeModalButton.addEventListener("click", function () {
  const thankYouModal = document.getElementById("thankYouModal");
  thankYouModal.style.display = "none";
});

// סגירת המודל כאשר לוחצים מחוץ לאזור המודל
window.addEventListener("click", function (event) {
  const thankYouModal = document.getElementById("thankYouModal");
  if (event.target === thankYouModal) {
    thankYouModal.style.display = "none";
  }
});
// סגירת המודל "מטבעות לא מספיקים" כאשר לוחצים על כפתור הסגירה (X)
const closeInsufficientCoinsModalButton = document.getElementById(
  "closeInsufficientCoinsModalButton"
);
closeInsufficientCoinsModalButton.addEventListener("click", function () {
  const insufficientCoinsModal = document.getElementById(
    "insufficientCoinsModal"
  );
  insufficientCoinsModal.style.display = "none";
});

// סגירת המודל "מטבעות לא מספיקים" כאשר לוחצים מחוץ לאזור המודל
window.addEventListener("click", function (event) {
  const insufficientCoinsModal = document.getElementById(
    "insufficientCoinsModal"
  );
  if (event.target === insufficientCoinsModal) {
    insufficientCoinsModal.style.display = "none";
  }
});

function updateCoinsInNav(coins) {
  const selectedUserInfo = document.getElementById("selectedUserInfo");
  selectedUserInfo.innerHTML = `
      <span>Hello Visitor: ${localStorage.getItem("selectedVisitor")} </span>
      <span>Your coin balance: 🪙 ${coins}</span>
  `;
}
function removeUserFromLocalStorage() {
  const selectedVisitor = localStorage.getItem("selectedVisitor");
  const visitorsData = JSON.parse(localStorage.getItem("visitors"));

  // מחיקת המשתמש מרשימת המבקרים ב Local Storage
  const updatedVisitorsData = visitorsData.filter(
    (visitor) => visitor.name !== selectedVisitor
  );
  localStorage.setItem("visitors", JSON.stringify(updatedVisitorsData));

  // מחיקת פרטי המשתמש הנוכחי מה Local Storage
  localStorage.removeItem("selectedVisitor");
}
const closeEscapeModalButton = document.getElementById(
  "closeEscapeModalButton"
);
closeEscapeModalButton.addEventListener("click", function () {
  window.location.href = "zoo.html"; // מעבר לעמוד "zoo"
});
updateCoinsInNav(coinsAfter);
// ברגע שהעמוד נטען, נבצע רענון פעם אחת
window.onload = function () {
  if (!sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", "true");
    location.reload(true);
  } else {
    sessionStorage.removeItem("reloaded");
  }
};
