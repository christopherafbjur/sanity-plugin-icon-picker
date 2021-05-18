import solid from "./solid";

//Following icons are missing from react icons lib based of latest FA cheat-sheet
const missing = [
  "hand-sparkles",
  "hands-wash",
  "handshake-alt-slash",
  "handshake-slash",
  "head-side-cough",
  "head-side-cough-slash",
  "head-side-mask",
  "head-side-virus",
  "hospital-user",
  "house-user",
  "laptop-house",
  "lungs",
  "lungs-virus",
  "people-arrows",
  "plane-slash",
  "pump-medical",
  "pump-soap",
  "shield-virus",
  "sink",
  "soap",
  "stopwatch-20",
  "store-alt-slash",
  "store-slash",
  "toilet-paper-slash",
  "users-slash",
  "vest",
  "vest-patches",
  "virus",
  "virus-slash",
  "viruses",
];

const filtered = [...solid].filter(function (e) {
  return this.indexOf(e) < 0;
}, missing);

export default filtered;
