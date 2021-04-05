"use strict";

import { getUrl } from './url_getter.js';

function setMovieCategory(response, kwargs) {
    let movie_category = kwargs.movie_category;

    if (response.status != 200) { // analyze HTTP status of the response
        alert(`Error ${response.status}: ${response.statusText}`); // e.g. 404: Not Found
    } else { // show the result
        let all_movies;

        let request = JSON.parse(response.request.response);

        all_movies = request.results;

        //best_movies_all_categories.push.apply(all_movies);
        for (let i = 0; i < Object.keys(all_movies).length; i++) {
            movie_category.best_movies.push(all_movies[i]);
        }

        // Si next page, la charger
        let movies_count = Object.keys(movie_category.best_movies).length;
        if (request.next != null && movies_count < 7) {

            let kwargs = {
                movie_category: movie_category
            };
            getUrl(request.next, setMovieCategory, kwargs);

        }
        else {
            movie_category.refresh_images();
        }
    }
}

function setMovieDetails(response, kwargs) {
    let movie = kwargs.movie;
    let movie_category = kwargs.movie_category;

    if (response.status != 200) { // analyze HTTP status of the response
        alert(`Error ${response.status}: ${response.statusText}`); // e.g. 404: Not Found
    } else { // show the result
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

function setMovieSummary(response, kwargs) {
    let top_movie = kwargs.top_movie;

    if (response.status != 200) { // analyze HTTP status of the response
        alert(`Error ${response.status}: ${response.statusText}`); // e.g. 404: Not Found
    } else { // show the result
        let movie_details = JSON.parse(response.request.response);

        top_movie.update_summary(movie_details?.long_description);
    }
}

class TopMovie {
    constructor() {
        this.movie = null;
    }

    update(movie) {
        this.movie = movie;
        let kwargs = {
            top_movie: this
        };
        getUrl(this.movie.url, setMovieSummary, kwargs);
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

export class MovieCarousel {
    constructor(url, id_html) {
        this.best_movies = [];
        this.index = 0;
        this.id_html = id_html;
        this.url = url;

        let kwargs = {
            movie_category: this
        };
        getUrl(this.url, setMovieCategory, kwargs);


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
        getUrl(movie.url, setMovieDetails, kwargs);
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
