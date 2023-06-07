// import { createPage } from "./fn.js";

// createPage(container);

//=============

//* questa dovrebbe andare nella pagina nuova
export const createPage = (plh) => {
  const parentEl = qS(".main__bottom");

  const leftEl = createEl("div", "", { name: "class", value: "left" });
  const rightEl = createEl("div", "", { name: "class", value: "right" });

  const posterEl = createEl(
    "img",
    "",
    {
      name: "src",
      value: "https://image.tmdb.org/t/p/original/" + plh.poster_path,
    },
    { name: "class", value: "poster__img" }
  );

  const leftTopEl = createEl("div", "", { name: "class", value: "left__top" });
  const ratStatEl = createEl("div", "", { name: "class", value: "lt__info" });
  const yeaGenEl = createEl("div", "", { name: "class", value: "lt__info" });
  const titleEl = createEl("h2", plh.original_name, {
    name: "class",
    value: "details__title",
  });
  const overviewEl = createEl("p", plh.overview, {
    name: "class",
    value: "details__overview",
  });
  const buttonEl = createEl("button", "guarda ora", {
    name: "class",
    value: "details__button",
  });

  const ratingEl = createEl("p", plh.vote_average, {
    name: "class",
    value: "details__rating",
  });
  const statusEl = createEl("p", plh.status, {
    name: "class",
    value: "details__status",
  });
  const yearEl = createEl("p", plh.first_air_date, {
    name: "class",
    value: "details__year",
  });

  //todo fix
  const genresEl = createEl("p", plh.genres, {
    name: "class",
    value: "details__genres",
  });

  const taglineEl = createEl("p", plh.tagline, {
    name: "class",
    value: "details__tagline",
  });

  ratStatEl.append(ratingEl, statusEl);
  yeaGenEl.append(yearEl, genresEl);
  leftTopEl.append(ratStatEl, yeaGenEl, titleEl, overviewEl, buttonEl);
  leftEl.append(leftTopEl);
  rightEl.append(posterEl, taglineEl);
  parentEl.append(leftEl, rightEl);

  buttonEl.addEventListener("click", () => {
    window.open(plh.homepage, "_blank");
  });

  return parentEl;
};

//=============

console.log("new page");
alert("almost there");
