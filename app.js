// ! API KEYS: 442ddf5ea1e360b32a7f5a8941b4a405
// TODO aggiungere selezione lingua

import {
  GET,
  qS,
  qSA,
  createEl,
  createCard,
  removeAllChildNodes,
  // genToString,
} from "./utils/fn.js";

//==========================================================================

export let apiData = [];
export let localData = [];
export let genres = [];
export let language = "en-US"; //TODO scelta della lingua
export const BASE_URL = "https://api.themoviedb.org/3";
export const TYPE = "/trending";
export const home = qS(".main__title");
export const container = qS(".cards__container");
export const mainSection = qS(".main__section");
export const tempRoot = qS(".temp__root");
export const searchEl = qS("#search");

const attribution = qS(".header__attribution");
const logoEl = qS(".main__title");
const edgeLogo = qS(".edge__logo");

//==========================================================================

export const getGenres = () => {
  const genresEl = qS(".main__genres");
  Object.entries(genres).forEach(([key, value]) => {
    const optionEl = createEl("li", value, {
      name: "value",
      value: key,
    });
    genresEl.append(optionEl);
  });

  genresEl.addEventListener("click", (e) => {
    let endpoint = e.target.value;

    const liElements = document.querySelectorAll(".main__genres li");
    liElements.forEach((li) => {
      li.addEventListener("click", () => {
        liElements.forEach((el) => el.classList.remove("genActive"));
        li.classList.add("genActive");
      });
    });

    homeByGenre(endpoint);
  });
};

export const startApp = () => {
  fetch(`${BASE_URL}/genre/tv/list?language=${language}`, GET)
    .then((response) => response.json())
    .then((response) => {
      response.genres.forEach((gen) => {
        genres = { ...genres, [gen.id]: gen.name };
      });
    })
    .then(() => {
      getGenres();
    })
    .catch((err) => console.error(err));

  fetch(`${BASE_URL}${TYPE}/tv/day?language=${language}`, GET)
    .then((response) => response.json())
    .then((response) => {
      apiData = response.results;
      apiData.forEach((element) => {
        localData.push({
          id: element.id,
          title: element.name,
          original_title: element.original_name,
          year: element.first_air_date,
          genres: element.genre_ids,
          language: element.original_language,
          country: element.origin_country,
          overview: element.overview,
          popularity: element.popularity,
          poster: element.poster_path,
          backdrop: element.backdrop_path,
          rating: element.vote_average,
          rating_count: element.vote_count,
        });
      });
    })
    .then(() => {
      localData.forEach((element) => {
        const trendingRoot = qS(".cards__container");
        createCard(element, trendingRoot);
      });
    })
    .catch((err) => console.error(err));

  //TOP RATED
  fetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=${language}&page=1`,
    GET
  )
    .then((response) => response.json())
    .then((response) => {
      localData = [];
      apiData = response.results;
      updateData();
    })
    .then(() => {
      // removeAllChildNodes(container);
      const topRatedRoot = qS(".main__top__container");
      localData.forEach((element) => {
        createCard(element, topRatedRoot);
      });
    })
    .catch((err) => console.error(err));

  //NEWEST
  fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?language=${language}&page=1`,
    GET
  )
    .then((response) => response.json())
    .then((response) => {
      localData = [];
      apiData = response.results;
      updateData();
    })
    .then(() => {
      // removeAllChildNodes(container);
      const newestRoot = qS(".main__bottom__container");
      localData.forEach((element) => {
        createCard(element, newestRoot);
      });
    })
    .catch((err) => console.error(err));
};

export const updateData = () => {
  apiData.forEach((element) => {
    localData.push({
      id: element.id,
      title: element.name,
      original_title: element.original_name,
      year: element.first_air_date,
      genres: element.genre_ids,
      language: element.original_language,
      country: element.origin_country,
      overview: element.overview,
      popularity: element.popularity,
      poster: element.poster_path,
      backdrop: element.backdrop_path,
      rating: element.vote_average,
      rating_count: element.vote_count,
    });
  });
};

export const homeByGenre = (endpoint) => {
  fetch(
    `https://api.themoviedb.org/3/tv/top_rated/?api_key=442ddf5ea1e360b32a7f5a8941b4a405&with_genres=${endpoint}`
  )
    .then((response) => response.json())
    .then((response) => {
      localData = [];
      apiData = response.results;
      updateData();
    })
    .then(() => {
      removeAllChildNodes(tempRoot);
      localData.forEach((element) => {
        createCard(element, tempRoot);
      });
    });
};

export const homeBySearch = (searchInput) => {
  fetch(
    `https://api.themoviedb.org/3/search/tv?query=${searchInput}&language=${language}&page=1
    `,
    GET
  )
    .then((response) => response.json())
    .then((response) => {
      localData = [];
      apiData = response.results;
      updateData();
    })
    .then(() => {
      removeAllChildNodes(tempRoot);
      localData.forEach((element) => {
        createCard(element, tempRoot);
      });
    })
    .catch((err) => console.error(err));
};

//==========================================================================

startApp();
getGenres();

//==========================================================================

searchEl.addEventListener("input", (e) => {
  if (e.target.value.length >= 3) {
    homeBySearch(e.target.value);
  }
});

logoEl.addEventListener("click", () => {
  location.reload();
});

attribution.addEventListener("click", () => {
  window.open("https://www.themoviedb.org/", "_blank");
});

edgeLogo.addEventListener("click", () => {
  window.open("https://edgemony.com/", "_blank");
});
