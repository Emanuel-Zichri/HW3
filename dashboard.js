function showVisitedAnimals() {
  //ממשו את הלוגיקה שמציגה את החיות שהאורח הנוכחי ביקר בהן
}
function showFeededAnimals() {
  //ממשו את הלוגיקה שמציגה את החיות שהאורח הנוכחי האכיל אותן
}
function showFavoriteAnimal() {
  //ממשו את הלוגיקה שמציגה את החיה שהאורח ביקר הכי הרבה פעמים אצלה
}
// קבלת המבקר הנבחר מה Local Storage
const selectedVisitor = localStorage.getItem("selectedVisitor");
const visitorsData = JSON.parse(localStorage.getItem("visitors"));

// איתחול הניווט עם שם המבקר הנבחר וכמות המטבעות שלו
const userNav = document.getElementById("userNav");
if (selectedVisitor) {
  const selectedUser = visitorsData.find(
    (visitor) => visitor.name === selectedVisitor
  );
  if (selectedUser) {
    const navHTML = `
      <span>Hello Visitor: ${selectedUser.name}</span>
      <span>Coins: ${selectedUser.coins}</span>
    `;
    userNav.innerHTML = navHTML;
  }
}

// כפתור ניקוי - מתבצעת פעולת ניקוי ה-Local Storage
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
  const userNav = document.getElementById("userNav");
  const visitorsData = JSON.parse(localStorage.getItem("visitors"));

  // בדיקה אם יש מבקר מחובר
  const selectedVisitor = localStorage.getItem("selectedVisitor");
  if (!selectedVisitor) {
    const loginNav = document.createElement("span");
    loginNav.innerHTML = `
          <span>No visitor is logged in.&nbsp; </span>
          <a href="login.html">Click here to log in</a>
      `;
    userNav.appendChild(loginNav);
  } else {
    // יצירת ניווט עבור המבקר המחובר
    const selectedUser = visitorsData.find(
      (visitor) => visitor.name === selectedVisitor
    );
    if (selectedUser) {
      const navHTML = `
              <span>Hello Visitor:  ${selectedUser.name}</span>
              <span>Coins: ${selectedUser.coins}</span>
          `;
      userNav.innerHTML = navHTML;
    }
  }
});
