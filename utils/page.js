const createEl = (type, content, ...attrs) => {
  const element = document.createElement(type);

  element.textContent = content;
  attrs.forEach((attr) => element.setAttribute(attr?.name, attr?.value));
  return element;
};

const genToString = (id) => allGenres[id] || "Not found";

const allGenres = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};

//================================

// 1. prendo i dati dal local storage e li salvo
const archiveData = localStorage.getItem("archive_data");

// 2. li ritrasformo in oggetto
const newData = JSON.parse(archiveData);

//================================

const createPage = (plh) => {
  const parentEl = document.querySelector(".page__container");
  const leftEl = createEl("div", "", { name: "class", value: "left" });
  const rightEl = createEl("div", "", { name: "class", value: "right" });
  const closingEl = createEl("button", "x", {
    name: "class",
    value: "closing__el",
  });
  const backgroundEl = createEl(
    "img",
    "",
    {
      name: "src",
      value: "https://image.tmdb.org/t/p/original/" + plh.backdrop_path,
    },
    { name: "class", value: "background__img" }
  );

  const posterElShadow = createEl(
    "img",
    "",
    {
      name: "src",
      value: "https://image.tmdb.org/t/p/original/" + plh.poster_path,
    },
    { name: "class", value: "poster__img__shadow" }
  );
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
  const buttonEl = createEl("button", "Guarda ora", {
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
  const yearEl = createEl("p", plh.first_air_datep, {
    name: "class",
    value: "details__year",
  });

  let pippo = plh.genres;
  pippo.forEach((genre) => {
    const genresEl = createEl("p", genToString(genre), {
      name: "class",
      value: "details__genres",
    });

    yeaGenEl.append(genresEl);
  });

  const taglineEl = createEl("p", plh.taglinep, {
    name: "class",
    value: "details__tagline",
  });

  document.body.append(backgroundEl);

  ratStatEl.append(ratingEl, statusEl);
  yeaGenEl.append(yearEl);
  leftTopEl.append(ratStatEl, yeaGenEl, titleEl, overviewEl, buttonEl);
  leftEl.append(leftTopEl);
  rightEl.append(posterElShadow, posterEl, taglineEl, closingEl);
  parentEl.append(leftEl, rightEl);

  buttonEl.addEventListener("click", () => {
    window.open(plh.homepage, "_blank");
  });

  closingEl.addEventListener("click", () => {
    history.back();
    console.log("ciao");
  });
  return parentEl;
};

createPage(newData);
