const popularURL = `movie/popular?api_key=${API_KEY}`;

async function displayPopularMovies() {
    try {
        const response = await fetch(`${baseURL}${popularURL}`);
        const popularMovies = await response.json();
        popularMovies.results.forEach(movie => {
            createMovie(movie.poster_path, movie.original_title, movie.genre_ids);
        });
    } catch (error) {
        console.log(`Failed to fetch popular movies: ${error}`);
    }
}

displayPopularMovies();