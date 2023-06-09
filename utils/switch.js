//? reciclo questo per le categorie?

import { qSA } from "./fn.js";

//* switch classe navbar
let navSection = qSA(".nav__list__item");

navSection.forEach((section) => {
  section.addEventListener("click", (e) => {
    navSection.forEach((section) => section.classList.remove("active"));
    section.classList.add("active");
  });
});

