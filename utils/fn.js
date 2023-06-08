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

export function createCard(plh, root) {
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
  const cardGenresMain = createEl("div", "", { name: "class", value: "card__genres__main" });
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
    cardGenresMain.append(cardGenres);
  });

  const cardRating = createEl("p", `☆ ${plh.rating}`, {
    name: "class",
    value: "card__rating",
  });

  cardInfoDetails.append(cardGenresMain, cardRating);
  cardInfo.append(cardTitle, cardInfoDetails);
  cardBanner.append(cardBannerImg);
  card.append(cardBanner, cardInfo);
  root.append(card);

  card.addEventListener("click", () => {
    let tvId = plh.id;
    getDetails(tvId);
  });

  return root;
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
      const archiveData = JSON.stringify(data);
      localStorage.setItem("archive_data", archiveData);
    })
    .then(() => {
      window.open(`./tv-series.html?=${plh}`, "_self");
    })
    .catch((error) => console.log(error));
};
