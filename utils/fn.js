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

  //questo sotto è un id
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

      const archiveData = JSON.stringify(data);
      localStorage.setItem("archive_data", archiveData);
    })
    .then(() => {
      window.open(`./tv-series.html?=${plh}`, "_self");
    })
    .catch((error) => console.log(error));
};
