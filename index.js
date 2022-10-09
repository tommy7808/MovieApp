const API_KEY = '9ea272095209994b097aa3f7a02d7d0c';
const baseURL = 'https://api.themoviedb.org/3/';
const imageURL = 'https://image.tmdb.org/t/p/w300/';
const genresURL = `${baseURL}genre/movie/list?api_key=${API_KEY}&language=en-US`;

const searchBar = document.querySelector('form');
const moviesDiv = document.querySelector('#movies');

const fetchMovieGenres = async () => {
    try {
        const response = await fetch(genresURL);
        const data = await response.json();
        return data
    } catch (error) {
        console.err(error);
    }
}

async function createMovie(image_path, movieTitle, movieGenreIDs) {
    // Create elements and assign attributes
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    const img = document.createElement('img');
    // The image is not owned by me it belongs to it's respective owners https://www.themoviedb.org
    img.src = image_path ? `${imageURL}${image_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

    const title = document.createElement('p');
    title.innerText = movieTitle;

    const genres = document.createElement('p');

    try {
        const movieGenresList = await fetchMovieGenres();
        movieGenresList.genres.forEach((genre) => {
            // Add movie genres to p element
            if (movieGenreIDs.includes(genre.id)) {
                genres.innerText += `${genre.name},`;
            }
        });

        // Remove the comma at the end of string
        genres.innerText = genres.innerText.slice(0, -1);
    } catch (error) {
        console.log(`Failed to fetch genres: ${error}`);
    }

    contentDiv.appendChild(title);
    contentDiv.appendChild(genres);

    movieDiv.appendChild(img);
    movieDiv.appendChild(contentDiv);

    moviesDiv.appendChild(movieDiv);
}

function displayMovies(movies) {
    movies.results.forEach(movie => {
        createMovie(movie.poster_path, movie.original_title, movie.genre_ids);
    });
}

searchBar.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(searchBar);
    const movie = formData.get('movie');

    // Search for movie
    try {
        const response = await fetch(`${baseURL}search/movie?api_key=${API_KEY}&query=${movie}`)
        const movies = await response.json();

        moviesDiv.firstChild ? !(moviesDiv.innerHTML = '') & displayMovies(movies) : displayMovies(movies);
    } catch (error) {
        console.error(`Movie not found: ${error}`);
    }
});