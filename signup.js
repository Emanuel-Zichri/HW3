function clearForm() {
  document.getElementById("create-visitor-form").reset();
}
function createNewVisitor(event) {
  // ביטול התנהגות דיפולטיבית של שליחת טופס
  // קראו עוד כאן: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  event.preventDefault();
  const firstName = document.getElementById(firstName).value;
  const lastName = document.getElementById(lastName).value;
  const ID = document.getElementById(ID).value;

  const newVisitor = {
    firstName: firstName,
    lastName: lastName,
    ID: ID,
  };

  // local storage:
  let visitors = JSON.parse(localStorage.getItem(visitors));

  //העברה לעמוד התחברות
  window.location.href = "/login.html";

  /**
  צרו אורח חדש כאן 👇
  ניתן לפצל את הלוגיקה למספר בלתי מוגבל של פונקציות.
  כמו שיותר מפוצל וטהור - פונקציות עם מטרה יחידה ושם משמעותי שמסביר מה הפונקציה עושה ומחזירה
  דוגמא:

  const validateFormInputs = () => {
    בודק האם האינפוטים קיימים ויש בהם ערך
    מחזיר האם תקין או לא (בוליאני)
  }

  const visitorExists = (name) => {
    מקבל שם ומחזיר תשובה האם השם האורח קיים
  }

  const makeVisitor = (name) => {
    מקבל שם, בודק שאין אותו כבר במערך האורחים ומחזיר אובייקט אורח
  }
  **/
}

/**************************************
  מימשתי עבורכם את ההאזנה לאירוע שליחת טופס
  שימו לב כי האיידי של createForm
  זהה לאיידי של הטופס בעמוד signup.html
  אין לשנות אותו */
const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
