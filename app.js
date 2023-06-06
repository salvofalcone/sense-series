// ! API KEYS: 442ddf5ea1e360b32a7f5a8941b4a405
// TODO aggiungere selezione lingua
// TODO style input ricerca

import {
  qS,
  qSA,
  createEl,
  GET,
  createCard,
  removeAllChildNodes,
} from "./utils/fn.js";

//==========================================================================

let apiData = [];
let localData = [];
let genres = [];
let language = "en-US"; //TODO scelta della lingua

const BASE_URL = "https://api.themoviedb.org/3";
const TYPE = "/trending";
const container = qS(".cards__container");
const titleEl = qS(".section__title");
const topRatedEl = qS("#topRated");
const newestEl = qS("#newest");
/* const todayEl = qS("#today"); */
const searchEl = qS("#search");

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

const getGenres = () => {
  const genresEl = qS(".main__genres");
  genres.forEach((option) => {
    const optionEl = createEl("li", option.name, {
      name: "value",
      value: option.id,
    });

    genresEl.append(optionEl);
  });

  genres.forEach((el)=>{
    console.log(genres);
  })

  genresEl.addEventListener("click", (e) => {
    let endpoint = e.target.value;
    homeByGenre(endpoint);
  });
};

const startApp = () => {
  //fetch generi
  fetch(`${BASE_URL}/genre/tv/list?language=${language}`, GET)
    .then((response) => response.json())
    .then((response) => {
      response.genres.forEach((gen) => {
        genres.push({
          id: gen.id,
          name: gen.name,
        });
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
      titleEl.textContent = "Trending";
      // console.log(localData)
      localData.forEach((element) => {
        createCard(element);
      });
    })
    .catch((err) => console.error(err));
};

// * cambio contenuto
const updateData = () => {
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

const homeByGenre = (endpoint) => {
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

const homeByTopRated = () => {
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

const homeByNewest = () => {
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

const homeBySearch = (searchInput) => {
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

// export const createPage = (e) => {
//   console.log(e.target);

// };

//TODO implementare funzionalità
/* 
const homeByToday = () => {
  fetch(
    `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1`,
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
}; */

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

/* 
  todayEl.addEventListener("click", () => {
  titleEl.textContent="On air today"
  homeByToday();
  });
*/

searchEl.addEventListener("input", (e) => {
  if (e.target.value.length >= 4) {
    homeBySearch(e.target.value);
  }
});

//==========================================================================
