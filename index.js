const API_KEY = '9ea272095209994b097aa3f7a02d7d0c';
const baseURL = 'https://api.themoviedb.org/3/'
const imageURL = 'https://image.tmdb.org/t/p/w300/'
const genresURL = `${baseURL}genre/movie/list?api_key=${API_KEY}&language=en-US`

const searchBar = document.querySelector('form');
const moviesDiv = document.querySelector('#movies');

searchBar.addEventListener('submit', async (e) => {
    // Get form data
    const formData = new FormData(searchBar);
    const movie = formData.get('movie');

    // Search for movie
    try {
        const response = await fetch(`${baseURL}search/movie?api_key=${API_KEY}&query=${movie}`)
        const movies = await response.json();

        displayMovies(movies);
    } catch (error) {
        console.error(`Movie not found: ${error}`)
    }
    e.preventDefault();
});