// import { appendPage } from "./page.js";

export const qS = (element) => document.querySelector(element);
export const qSA = (elements) => document.querySelectorAll(elements);

export const createEl = (type, content, ...attrs) => {
  const element = document.createElement(type);

  element.textContent = content;
  attrs.forEach((attr) => element.setAttribute(attr?.name, attr?.value));
  return element;
};

import { genres } from "../app.js";

/* 
export const GET = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer 442ddf5ea1e360b32a7f5a8941b4a405",
  },
};
*/

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
  const cardGenres = createEl("p", plh.genres, {
    name: "class",
    value: "card__genres",
  });

  const cardRating = createEl("p", plh.rating, {
    name: "class",
    value: "card__rating",
  });

  cardInfoDetails.append(cardGenres, cardRating);
  cardInfo.append(cardTitle, cardInfoDetails);
  cardBanner.append(cardBannerImg);
  card.append(cardBanner, cardInfo);
  parent.append(card);

  //! SIAMO QUI
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

//!da sistemare
export const genToString = (plh) => {
  const allGens = [
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  allGens.forEach((el) => {
    if (plh === el.id) {
      return el.name;
    }
  });
};

//!questo è da inserire come stampa della stringa genere
// genToString(16);

export const getDetails = (plh) => {
  fetch(
    `https://api.themoviedb.org/3/tv/${plh}?api_key=442ddf5ea1e360b32a7f5a8941b4a405`
  )
    .then((response) => response.json())
    .then((data) => {
      //* archivio i dati che mi servono
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

      createPage(container);
      // window.open("./page.html", "_blank");
    })
    .catch((error) => console.log(error));
};

// const parentEl = document.querySelector(".tvDetails");

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
  const genresEl = createEl("p", plh.genres, {
    name: "class",
    value: "details__genres",
  });

  ratStatEl.append(ratingEl, statusEl);
  yeaGenEl.append(yearEl, genresEl);
  leftTopEl.append(ratStatEl, yeaGenEl, titleEl, overviewEl, buttonEl);
  leftEl.append(leftTopEl);
  rightEl.append(posterEl);
  parentEl.append(leftEl, rightEl);

  return parentEl;
};
