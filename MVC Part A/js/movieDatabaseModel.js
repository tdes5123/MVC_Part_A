var movieList = [
    {
        id: 1,
        title: 'Free Guy',
        rating: 'PG-13',
        year_produced: 2021,
        personal_rating: 5,
        genre: 'Action/Adventure',
        is_blueRay: true
    },
    {
        id: 2,
        title: 'Interstellar',
        rating: 'PG-13',
        year_produced: 2014,
        personal_rating: 4,
        genre: 'Sci-fi/Fantasy',
        is_blueRay: false
    },
    {
        id: 3,
        title: 'The Greatest Showman',
        rating: 'PG',
        year_produced: 2017,
        personal_rating: 5,
        genre: 'Drama',
        is_blueRay: true
    },
    {
        id: 4,
        title: 'The Matrix',
        rating: 'R',
        year_produced: 1999,
        personal_rating: 3,
        genre: 'Sci-fi/Fantasy',
        is_blueRay: false
    }
],
    ratings = ['R', 'PG-13', 'PG', 'G'],
    personalRatings = [0, 1, 2, 3, 4, 5];

function createItem(movieTitle, movieRating, yearProduced, personalRating, movieGenre, isBlueRay) {
    var newItem = {
        id: movieList.length,
        title: movieTitle,
        rating: movieRating,
        year_produced: yearProduced,
        personal_rating: personalRating,
        genre: movieGenre,
        is_blue_ray: isBlueRay
    }

    movieList.push(newItem);
}

function getAllItems() {
    return movieList;
}

function getItemById(id) {
    movieList.forEach(function(movie) {
        if (movie.id === id)
            return movie;
    });
}