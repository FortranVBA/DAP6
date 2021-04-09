"use strict";

// URL getter function
function getUrl(url, function_onload, kwargs) {

    if (url.length == 1) {
        axios.get(url).then(function (response) {
            function_onload(response, kwargs);
        }, function () {
            alert("Request failed");
        });
    }
    else {
        axios.get(url[0], { params: url[1] }).then(function (response) {
            function_onload(response, kwargs);
        }, function () {
            alert("Request failed");
        });
    }

}

// Callback function to be called after getting the url response, for getting the 7 top movies
function setMovieCategory(response, kwargs) {
    let movie_carousel = kwargs.movie_carousel;

    if (response.status != 200) {
        alert(`Error ${response.status}: ${response.statusText}`);
    } else {
        let all_movies;

        let request = JSON.parse(response.request.response);

        all_movies = request.results;

        for (let i = 0; i < Object.keys(all_movies).length; i++) {
            movie_carousel.best_movies.push(all_movies[i]);
        }

        // If there is a next page and if less than 7 movies, load it
        let movies_count = Object.keys(movie_carousel.best_movies).length;
        if (request.next != null && movies_count < 7) {

            let kwargs = {
                movie_carousel: movie_carousel
            };
            getUrl([request.next], setMovieCategory, kwargs);

        }
        else {
            movie_carousel.refresh_images();
        }
    }
}

// Callback function to be called after getting the url response, for filling movie details inside modal
function setMovieDetails(response, kwargs) {
    let movie = kwargs.movie;
    let movie_category = kwargs.movie_category;

    if (response.status != 200) {
        alert(`Error ${response.status}: ${response.statusText}`);
    } else {
        let movie_details = JSON.parse(response.request.response);

        movie.rated = movie_details?.rated;
        movie.date = movie_details?.date_published;
        movie.duration = movie_details?.duration + " min";
        movie.country = movie_details?.countries;
        if (movie_details.worldwide_gross_income && movie_details.budget_currency) {
            movie.results = movie_details.worldwide_gross_income + " " + movie_details.budget_currency;
        } else {
            movie.results = "unknown";
        };
        movie.sumup = movie_details?.long_description;

        movie_category.refresh_details(movie);
    }
}

// Callback function to be called after getting the url response, for filling the top movie sumup
function setMovieSummary(response, kwargs) {
    let top_movie = kwargs.top_movie;

    if (response.status != 200) {
        alert(`Error ${response.status}: ${response.statusText}`);
    } else {
        let movie_details = JSON.parse(response.request.response);

        top_movie.update_summary(movie_details?.long_description);
    }
}

// Top movie class
class TopMovie {
    constructor() {
        this.movie = null;
    }

    update(movie) {
        this.movie = movie;
        let kwargs = {
            top_movie: this
        };
        getUrl([this.movie.url], setMovieSummary, kwargs);
    }

    update_summary(sumup) {
        this.movie.sumup = sumup
        this.refresh_html();
    }

    refresh_html() {
        document.getElementById("best_movie_img").src = this.movie.image_url;
        document.getElementById("best-movie-title").innerHTML = this.movie.title;
        document.getElementById("best-movie-sumup").innerHTML = this.movie.sumup;
    }
}

// Movie Carousel class
class MovieCarousel {
    constructor(url, id_html) {
        this.best_movies = [];
        this.index = 0;
        this.id_html = id_html;

        let kwargs = {
            movie_carousel: this
        };
        getUrl(url, setMovieCategory, kwargs);


        if (this.id_html == "best_rated_img_") {
            this.top_movie = new TopMovie();
        };
    }

    refresh_images() {
        if (this.id_html == "best_rated_img_") {
            this.top_movie.update(this.best_movies[0]);
        };
        document.getElementById(this.id_html + "1").src = this.best_movies[(this.index) % 7].image_url;
        document.getElementById(this.id_html + "2").src = this.best_movies[(this.index + 1) % 7].image_url;
        document.getElementById(this.id_html + "3").src = this.best_movies[(this.index + 2) % 7].image_url;
        document.getElementById(this.id_html + "4").src = this.best_movies[(this.index + 3) % 7].image_url;
    }

    arrow_left() {
        this.index = this.index - 1;
        if (this.index < 0) { this.index = 6; }
        this.refresh_images();
    }

    arrow_right() {
        this.index = this.index + 1;
        if (this.index > 7) { this.index = 0; }
        this.refresh_images();
    }

    show_movie_details(call_index) {
        let modal_bg = document.querySelector(".modal-bg");
        let movie;
        modal_bg.classList.add("visible-modal-bg");
        if (call_index == -1) {
            movie = this.best_movies[0];
        } else {
            movie = this.best_movies[(this.index + call_index) % 7];
        };

        let kwargs = {
            movie: movie,
            movie_category: this
        };
        getUrl([movie.url], setMovieDetails, kwargs);
    }

    refresh_details(movie) {
        document.getElementById("details_picture").src = movie?.image_url;
        document.getElementById("details_title").innerHTML = movie?.title;
        document.getElementById("details_genre").innerHTML = "Genre : " + movie?.genres;
        document.getElementById("details_date").innerHTML = "Date de sortie : " + movie?.date;
        document.getElementById("details_rated").innerHTML = "Rated : " + movie?.rated;
        document.getElementById("details_imdb").innerHTML = "Score Imdb : " + movie?.imdb_score;
        document.getElementById("details_directors").innerHTML = "Réalisateur : " + movie?.directors.join(', ');
        document.getElementById("details_actors").innerHTML = "Liste des acteurs : " + movie?.actors.join(', ');
        document.getElementById("details_duration").innerHTML = "Durée : " + movie?.duration;
        document.getElementById("details_country").innerHTML = "Pays d’origine : " + movie?.country.join(', ');
        document.getElementById("details_results").innerHTML = "Résultat au Box Office : " + movie?.results;
        document.getElementById("details_sumup").innerHTML = "Résumé du film : " + movie?.sumup;
    }

    static hide_movie_details() {
        let modal_bg = document.querySelector(".modal-bg");
        modal_bg.classList.remove("visible-modal-bg");
    }

}

// Main objects
const api = 'http://localhost:8000/api/v1/titles/';
let params;
let url_params;

params = {
    sort_by: '-imdb_score'
};
url_params = [api, params];
let all_categories = new MovieCarousel(url_params, "best_rated_img_");

params = {
    sort_by: '-imdb_score',
    genre: 'Mystery'
};
url_params = [api, params];
let category_1 = new MovieCarousel(url_params, "category_1_img_");

params = {
    sort_by: '-imdb_score',
    genre: 'Drama'
};
url_params = [api, params];
let category_2 = new MovieCarousel(url_params, "category_2_img_");

url_params = [api, params = {
    sort_by: '-imdb_score',
    genre: 'Comedy'
}]
let category_3 = new MovieCarousel(url_params, "category_3_img_");

// On click functions
best_movie_img.onclick = function () {
    all_categories.show_movie_details(-1);
};

hide_movie_details.onclick = function () {
    MovieCarousel.hide_movie_details();
};

best_rated_left.onclick = function () {
    all_categories.arrow_left();
    return false;
}

best_rated_right.onclick = function () {
    all_categories.arrow_right();
    return false;
}

best_rated_img_1.onclick = function () {
    all_categories.show_movie_details(0);
    return false;
}

best_rated_img_2.onclick = function () {
    all_categories.show_movie_details(1);
    return false;
}

best_rated_img_3.onclick = function () {
    all_categories.show_movie_details(2);
    return false;
}

best_rated_img_4.onclick = function () {
    all_categories.show_movie_details(3);
    return false;
}


category_1_left.onclick = function () {
    category_1.arrow_left();
    return false;
}

category_1_right.onclick = function () {
    category_1.arrow_right();
    return false;
}

category_1_img_1.onclick = function () {
    category_1.show_movie_details(0);
    return false;
}

category_1_img_2.onclick = function () {
    category_1.show_movie_details(1);
    return false;
}

category_1_img_3.onclick = function () {
    category_1.show_movie_details(2);
    return false;
}

category_1_img_4.onclick = function () {
    category_1.show_movie_details(3);
    return false;
}


category_2_left.onclick = function () {
    category_2.arrow_left();
    return false;
}

category_2_right.onclick = function () {
    category_2.arrow_right();
    return false;
}

category_2_img_1.onclick = function () {
    category_2.show_movie_details(0);
    return false;
}

category_2_img_2.onclick = function () {
    category_2.show_movie_details(1);
    return false;
}

category_2_img_3.onclick = function () {
    category_2.show_movie_details(2);
    return false;
}

category_2_img_4.onclick = function () {
    category_2.show_movie_details(3);
    return false;
}


category_3_left.onclick = function () {
    category_3.arrow_left();
    return false;
}

category_3_right.onclick = function () {
    category_3.arrow_right();
    return false;
}

category_3_img_1.onclick = function () {
    category_3.show_movie_details(0);
    return false;
}

category_3_img_2.onclick = function () {
    category_3.show_movie_details(1);
    return false;
}

category_3_img_3.onclick = function () {
    category_3.show_movie_details(2);
    return false;
}

category_3_img_4.onclick = function () {
    category_3.show_movie_details(3);
    return false;
}