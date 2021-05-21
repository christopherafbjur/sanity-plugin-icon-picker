//From this cheat sheet https://pictogrammers.github.io/@mdi/font/5.4.55/
import mdi from "./mdi";

const missing = ["mdi-blank"];

const filtered = [...mdi].filter(function (e) {
  return this.indexOf(e) < 0;
}, missing);
export default filtered;
