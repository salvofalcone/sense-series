import { genres } from "../app.js";

//==========================================================================

export const qS = (element) => document.querySelector(element);
export const qSA = (elements) => document.querySelectorAll(elements);

export const createEl = (type, content, ...attrs) => {
  const element = document.createElement(type);

  element.textContent = content;
  attrs.forEach((attr) => element.setAttribute(attr?.name, attr?.value));
  return element;
};

//==========================================================================

export const GET = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDJkZGY1ZWExZTM2MGIzMmE3ZjVhODk0MWI0YTQwNSIsInN1YiI6IjY0N2Q4Y2ZkY2FlZjJkMDBkZjg5ODc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mI0q_8Jcx9K8qcRJC_iXb87TBXiB1XC39maaxTGyvr8",
  },
};

export function createCard(plh) {
  const parent = qS(".cards__container");

  const card = createEl("div", "", { name: "class", value: "card" }); //* main single card

  const cardBanner = createEl("div", "", {
    name: "class",
    value: "card__banner",
  });
  const cardBannerImg = createEl("img", "", {
    name: "class",
    value: "card__banner__img",
  });

  //? corretto
  if (window.screen.width >= 768) {
    cardBannerImg.src = `https://image.tmdb.org/t/p/original/${plh.backdrop}`;
  } else {
    cardBannerImg.src = `https://image.tmdb.org/t/p/original/${plh.poster}`;
  }

  const cardInfo = createEl("div", "", { name: "class", value: "card__info" });
  const cardTitle = createEl("h4", plh.title, {
    name: "class",
    value: "card__title",
  });
  const cardInfoDetails = createEl("div", "", {
    name: "class",
    value: "card__info__details",
  });

  //! prendere genere da id
  // const cardGenres = createEl("p", genres[plh.genres], {
  //   name: "class",
  //   value: "card__genres",
  // });

  // console.log(genToString(plh.genres));

  plh.genres.forEach((genre) => {
    const cardGenres = createEl("p", genToString(genre), {
      name: "class",
      value: "card__genres",
    });

    cardInfoDetails.append(cardGenres);
  });

  const cardRating = createEl("p", plh.rating, {
    name: "class",
    value: "card__rating",
  });

  cardInfoDetails.append(cardRating);
  cardInfo.append(cardTitle, cardInfoDetails);
  cardBanner.append(cardBannerImg);
  card.append(cardBanner, cardInfo);
  parent.append(card);

  card.addEventListener("click", () => {
    let tvId = plh.id;
    getDetails(tvId);
  });

  return parent; // ? corretto?
}

export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export const genToString = (id) => genres[id] || "Not found";

export const getDetails = (plh) => {
  fetch(
    `https://api.themoviedb.org/3/tv/${plh}?api_key=442ddf5ea1e360b32a7f5a8941b4a405`
  )
    .then((response) => response.json())
    .then((data) => {
      /*
      * archivio i dati che mi servono

      TODO posso rimuovere questo container e usare direttamente "data" da passare e salvare nel local storage => invoco la funzione nella nuova pagina e prendo i dati da local storage per stampare dettagli serie tv
      
      TODO al click per chiudere la finestra e tornare alla home devo svuotare il local storage - oppure svuoto subito dopo aver appeso? (forse scomodo se faccio refresh perché perdo tutto)
      */

      let container = {
        id: data.id,
        homepage: data.homepage,
        backdrop_path: data.backdrop_path,
        poster_path: data.poster_path,
        first_air_date: data.first_air_date,
        genres: data.genres,
        created_by: data.created_by,
        in_production: data.in_production,
        languages: data.languages,
        last_air_date: data.last_air_date,
        networks: data.networks,
        number_of_seasons: data.number_of_seasons,
        number_of_episodes: data.number_of_episodes,
        original_language: data.original_language,
        original_name: data.original_name,
        overview: data.overview,
        production_companies: data.production_companies,
        seasons: data.seasons,
        spoken_languages: data.spoken_languages,
        status: data.status,
        tagline: data.tagline,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
      };

      //! devo salvare questo
      createPage(data);
      // window.open("./page.html", "_blank");
    })
    .catch((error) => console.log(error));
};

// //* questa dovrebbe andare nella pagina nuova
// export const createPage = (plh) => {
//   const parentEl = qS(".main__bottom");

//   const leftEl = createEl("div", "", { name: "class", value: "left" });
//   const rightEl = createEl("div", "", { name: "class", value: "right" });

//   const posterEl = createEl(
//     "img",
//     "",
//     {
//       name: "src",
//       value: "https://image.tmdb.org/t/p/original/" + plh.poster_path,
//     },
//     { name: "class", value: "poster__img" }
//   );

//   const leftTopEl = createEl("div", "", { name: "class", value: "left__top" });
//   const ratStatEl = createEl("div", "", { name: "class", value: "lt__info" });
//   const yeaGenEl = createEl("div", "", { name: "class", value: "lt__info" });
//   const titleEl = createEl("h2", plh.original_name, {
//     name: "class",
//     value: "details__title",
//   });
//   const overviewEl = createEl("p", plh.overview, {
//     name: "class",
//     value: "details__overview",
//   });
//   const buttonEl = createEl("button", "guarda ora", {
//     name: "class",
//     value: "details__button",
//   });

//   const ratingEl = createEl("p", plh.vote_average, {
//     name: "class",
//     value: "details__rating",
//   });
//   const statusEl = createEl("p", plh.status, {
//     name: "class",
//     value: "details__status",
//   });
//   const yearEl = createEl("p", plh.first_air_date, {
//     name: "class",
//     value: "details__year",
//   });

//   //! fix
//   const genresEl = createEl("p", plh.genres, {
//     name: "class",
//     value: "details__genres",
//   });

//   const taglineEl = createEl("p", plh.tagline, {
//     name: "class",
//     value: "details__tagline",
//   });

//   ratStatEl.append(ratingEl, statusEl);
//   yeaGenEl.append(yearEl, genresEl);
//   leftTopEl.append(ratStatEl, yeaGenEl, titleEl, overviewEl, buttonEl);
//   leftEl.append(leftTopEl);
//   rightEl.append(posterEl, taglineEl);
//   parentEl.append(leftEl, rightEl);

//   buttonEl.addEventListener("click", () => {
//     window.open(plh.homepage, "_blank");
//   });

//   return parentEl;
// };
