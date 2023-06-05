/* API KEYS 442ddf5ea1e360b32a7f5a8941b4a405 */

//get method from api's documentations
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDJkZGY1ZWExZTM2MGIzMmE3ZjVhODk0MWI0YTQwNSIsInN1YiI6IjY0N2Q4Y2ZkY2FlZjJkMDBkZjg5ODc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mI0q_8Jcx9K8qcRJC_iXb87TBXiB1XC39maaxTGyvr8",
  },
};

// fetch(
//   "https://api.themoviedb.org/3/account/19849046/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//rated tv episodes

/* SERIE TV */
// fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options)
// .then(response => response.json())
// .then(response => console.log(response))
// .catch(err => console.error(err));

/* MOVIES */
// fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// /* TV LIST - genres*/
// fetch("https://api.themoviedb.org/3/genre/tv/list?language=en", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// /* MOVIES - genres*/
// fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));


/* trending tv */
fetch("https://api.themoviedb.org/3/trending/tv/day?language=en-US", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
