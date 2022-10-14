const tmdbKey = 'fe87087619cc6e07e5f61bdc392efe70';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  let genreRequestEndpoint='/genre/movie/list';
  let requestParams=`?api_key=${tmdbKey}`;
  let urlToFetch=`${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    let response = await fetch(urlToFetch);
    if (response.ok){
      let jsonResponse = await response.json();
      // console.log(jsonResponse)
      let genres=jsonResponse.genres;
      console.log(genres)
      return genres
    }
  }catch(e){console.log(e)}
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint='/discover/movie';
  const requestParams=`?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch=`${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try{
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse= await response.json();
      const movies=jsonResponse.results;
      // console.log(movies);
      return movies
    }
  }catch(e){
    console.log(e)
  }
};
// getMovies()
const getMovieInfo = async (movie) => {
  const movieId=movie.id;
  const movieEndpoint=`/movie/${movieId}`;
  const requestParams=`?api_key=${tmdbKey}`
  const urlToFetch=`${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try{
    const response = await fetch(urlToFetch);
    if (response.ok){
      const responseJson=await response.json();
      const movieInfo = responseJson;
      return movieInfo;
    }
  }catch(e){
    console.log(e)
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info)

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;