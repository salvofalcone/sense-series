// ! API KEYS: 442ddf5ea1e360b32a7f5a8941b4a405
// TODO aggiungere selezione lingua

import {
  qS,
  qSA,
  createEl,
  GET,
  createCard,
  removeAllChildNodes,
  genToString,
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
export const titleEl = qS(".section__title");
export const topRatedEl = qS("#topRated");
export const newestEl = qS("#newest");
export const searchEl = qS("#search");

//==========================================================================

// ? decidere se avere i generi nella sidebar o nella navbar
/* const getGenres = () => {
  const genresEl = qS(".genres__main");

  genres.forEach((option) => {
    const optionEl = createEl("option", option.name, {
      name: "value",
      value: option.id,
    });

    genresEl.append(optionEl);
  });

  genresEl.addEventListener("change", (e) => {
    let endpoint = e.target.value;
    homeByGenre(endpoint);
  });
}; */

export const getGenres = () => {
  const genresEl = qS(".main__genres");

  //* fatto con Stefano
  Object.entries(genres).forEach(([key, value]) => {
    const optionEl = createEl("li", value, {
      name: "value",
      value: key,
    });
    genresEl.append(optionEl);
  });

  genresEl.addEventListener("click", (e) => {
    let endpoint = e.target.value;
    //! sistemare questo
    homeByGenre(endpoint);
  });
};

export const startApp = () => {
  fetch(`${BASE_URL}/genre/tv/list?language=${language}`, GET)
    .then((response) => response.json())
    .then((response) => {
      //* per inserire i generi nella sidebar
      response.genres.forEach((gen) => {
        //! fatto con Stefano
        genres = { ...genres, [gen.id]: gen.name };
      });
    })
    .then(() => {
      getGenres();
    })
    .catch((err) => console.error(err));

  //fetch per la home come pagina iniziale
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
          genres: element.genre_ids, //!
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
      titleEl.textContent = "Trending";
      localData.forEach((element) => {
        createCard(element);
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
      removeAllChildNodes(container);
      localData.forEach((element) => {
        createCard(element);
      });
    });
};

export const homeByTopRated = () => {
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
      removeAllChildNodes(container);
      localData.forEach((element) => {
        createCard(element);
      });
    })
    .catch((err) => console.error(err));
};

export const homeByNewest = () => {
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
      removeAllChildNodes(container);
      localData.forEach((element) => {
        createCard(element);
      });
    })
    .catch((err) => console.error(err));
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
      removeAllChildNodes(container);
      localData.forEach((element) => {
        createCard(element);
      });
    })
    .catch((err) => console.error(err));
};

//==========================================================================

startApp();

//==========================================================================

topRatedEl.addEventListener("click", () => {
  titleEl.textContent = "Top Rated";
  homeByTopRated();
});

newestEl.addEventListener("click", () => {
  titleEl.textContent = "Newest";
  homeByNewest();
});

searchEl.addEventListener("input", (e) => {
  if (e.target.value.length >= 4) {
    homeBySearch(e.target.value);
  }
});
