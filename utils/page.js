const createEl = (type, content, ...attrs) => {
  const element = document.createElement(type);

  element.textContent = content;
  attrs.forEach((attr) => element.setAttribute(attr?.name, attr?.value));
  return element;
};

//================================

// 1. prendo i dati dal local storage e li salvo
const archiveData = localStorage.getItem("archive_data");

// 2. li ritrasformo in oggetto
const newData = JSON.parse(archiveData);

//================================

const createPage = (plh) => {
  const GET = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDJkZGY1ZWExZTM2MGIzMmE3ZjVhODk0MWI0YTQwNSIsInN1YiI6IjY0N2Q4Y2ZkY2FlZjJkMDBkZjg5ODc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mI0q_8Jcx9K8qcRJC_iXb87TBXiB1XC39maaxTGyvr8",
    },
  };

  fetch(`https://api.themoviedb.org/3/tv/${plh.id}/videos?language=en-US`, GET)
    .then((response) => response.json())
    .then((response) => {
      let trailerDetails = [];
      trailerDetails = Object.entries(response);

      let trailerDetailsRESULTS = trailerDetails[1][1];

      trailerDetailsRESULTS.forEach((el) => {
        //TODO fare check della presenza del video altrimenti metto albano che urla
        let key = el.key;

        const trailerEl = createEl(
          "iframe",
          "",
          {
            name: "class",
            value: "lb__trailer",
          },
          {
            name: "src",
            value: `https://www.youtube.com/embed/${key}`,
          }
        );

        leftBottomEl.append(trailerEl);
      });
    })
    .catch((err) => console.error(err));

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
  const leftBottomEl = createEl("div", "", {
    name: "class",
    value: "left__bottom",
  });

  const ratStatEl = createEl("div", "", {
    name: "class",
    value: "lt__info__rs",
  });
  const yeaGenEl = createEl("div", "", {
    name: "class",
    value: "lt__info__yg",
  });
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

  const ratingEl = createEl("p", `Rating: ${plh.vote_average}`, {
    name: "class",
    value: "details__rating",
  });
  const statusEl = createEl("p", `Status: ${plh.status}`, {
    name: "class",
    value: "details__status",
  });

  let firstYear = plh.first_air_date.split("-");
  const yearEl = createEl("p", firstYear[0], {
    name: "class",
    value: "details__year",
  });

  let genresArr = Object.entries(plh.genres);
  genresArr.forEach((genre) => {
    const genresEl = createEl("span", genre[1].name, {
      name: "class",
      value: "details__genres",
    });

    yeaGenEl.append(genresEl);
  });

  const taglineEl = createEl("p", plh.tagline, {
    name: "class",
    value: "details__tagline",
  });

  document.body.append(backgroundEl);

  ratStatEl.append(ratingEl, statusEl);
  yeaGenEl.append(yearEl);
  leftTopEl.append(ratStatEl, yeaGenEl, titleEl, overviewEl, buttonEl);
  leftEl.append(leftTopEl, leftBottomEl);
  rightEl.append(posterElShadow, posterEl, taglineEl, closingEl);
  parentEl.append(leftEl, rightEl);

  buttonEl.addEventListener("click", () => {
    window.open(plh.homepage, "_blank");
  });

  closingEl.addEventListener("click", () => {
    history.back();
  });
  return parentEl;
};

createPage(newData);
