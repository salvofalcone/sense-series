import { qS, createEl } from "./utils/fn.js";

/************************************ API KEYS 442ddf5ea1e360b32a7f5a8941b4a405 ************************************/

/************************************ GET method from api's documentations ************************************/
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDJkZGY1ZWExZTM2MGIzMmE3ZjVhODk0MWI0YTQwNSIsInN1YiI6IjY0N2Q4Y2ZkY2FlZjJkMDBkZjg5ODc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mI0q_8Jcx9K8qcRJC_iXb87TBXiB1XC39maaxTGyvr8",
  },
};

/************************************ SERIE TV ************************************/
// fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options)
// .then(response => response.json())
// .then(response => console.log(response))
// .catch(err => console.error(err));

// /************************************ TV LIST - genres************************************/
// fetch("https://api.themoviedb.org/3/genre/tv/list?language=en", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//====================================

/* SERIE TV (trending) */

// * contenitore per gli elementi della home
let apiData = []; //! qui ho tutti tutti i dati così posso usarlo anche dopo
let localData = [];

// TODO spostare tutte le funzioni in un file dedicato

// ! questa funzione dovrà essere invocata dentro un forEach per generare tutte le carte
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
  cardBannerImg.src = `https://api.themoviedb.org/3/tv/${plh.id}${plh.backdrop}`;

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
  const cardGenres = createEl("p",plh.genres, { 
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

  return parent; // ? corretto?
}

fetch("https://api.themoviedb.org/3/trending/tv/day?language=en-US", options)
  .then((response) => response.json())
  .then((response) => {
    apiData = response.results;
    apiData.forEach((element) => {
      localData.push({
        id: element.id,
        title: element.name,
        original_title: element.original_name,
        year: element.first_air_date,
        genres:element.genre_ids,
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
      createCard(element);
    });
  })
  .catch((err) => console.error(err));
