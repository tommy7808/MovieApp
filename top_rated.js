const topRatedURL = `movie/top_rated?api_key=${API_KEY}`;

async function displayTopRatedMovies() {
    try {
        const response = await fetch(`${baseURL}${topRatedURL}`);
        const topRatedMovies = await response.json();
        topRatedMovies.results.forEach(movie => {
            createMovie(movie.poster_path, movie.original_title, movie.genre_ids);
        });
    } catch (error) {
        console.log(`Failed to fetch top rated movies: ${error}`);
    }
}

displayTopRatedMovies();