"use strict";


function set_movie_category(xhr, args) {
    let movie_category = args.movie_category;

    if (xhr.status != 200) { // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
        let all_movies;

        all_movies = xhr.response.results;

        //best_movies_all_categories.push.apply(all_movies);
        for (let i = 0; i < Object.keys(all_movies).length; i++) {
            movie_category.best_movies.push(all_movies[i]);
        }

        // Si next page, la charger
        let movies_count = Object.keys(movie_category.best_movies).length;
        if (xhr.response.next != null && movies_count < 7) {
            //get_movies(xhr.response.next, movie_category);

            let args = {
                movie_category: movie_category
            };
            get_url(xhr.response.next, set_movie_category, args);

        }
        else {
            movie_category.refresh_images();
        }
    }
}

function set_movie_details(xhr, args) {
    let movie = args.movie;
    let movie_category = args.movie_category;

    if (xhr.status != 200) { // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
        let movie_details;

        movie_details = xhr.response;

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

function set_movie_summary(xhr, args) {
    let top_movie = args.top_movie;

    if (xhr.status != 200) { // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
        let movie_details;

        movie_details = xhr.response;
        top_movie.update_summary(movie_details?.long_description);
    }
}

function get_url(url, function_onload, args) {
    // 1. Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', url);
    xhr.responseType = 'json';

    // 3. Send the request over the network
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function () {
        function_onload(xhr, args);
    };

    xhr.onerror = function () {
        alert("Request failed");
    };
}

function hide_movie_details() {
    let modal_bg = document.querySelector(".modal-bg");
    modal_bg.classList.remove("visible-modal-bg");
};

function TopMovie() {
    this.movie = null;

    this.update = function (movie) {
        this.movie = movie;
        let args = {
            top_movie: this
        };
        get_url(this.movie.url, set_movie_summary, args);
    };

    this.update_summary = function (sumup) {
        this.movie.sumup = sumup
        this.refresh_html();
    };

    this.refresh_html = function () {
        document.getElementById("best-movie-img").src = this.movie.image_url;
        document.getElementById("best-movie-title").innerHTML = this.movie.title;
        document.getElementById("best-movie-sumup").innerHTML = this.movie.sumup;
    };
}

function MovieCategory(url, id_html) {

    this.best_movies = [];
    this.index = 0;
    this.id_html = id_html;
    this.url = url;

    let args = {
        movie_category: this
    };
    get_url(this.url, set_movie_category, args);


    if (this.id_html == "best-rated-img-") {
        this.top_movie = new TopMovie();
    };

    this.refresh_images = function () {
        if (this.id_html == "best-rated-img-") {
            this.top_movie.update(this.best_movies[0]);
        };
        document.getElementById(this.id_html + "1").src = this.best_movies[(this.index) % 7].image_url;
        document.getElementById(this.id_html + "2").src = this.best_movies[(this.index + 1) % 7].image_url;
        document.getElementById(this.id_html + "3").src = this.best_movies[(this.index + 2) % 7].image_url;
        document.getElementById(this.id_html + "4").src = this.best_movies[(this.index + 3) % 7].image_url;
    };

    this.arrow_left = function () {
        this.index = this.index - 1;
        if (this.index < 0) { this.index = 6; }
        this.refresh_images();
    };

    this.arrow_right = function () {
        this.index = this.index + 1;
        if (this.index > 7) { this.index = 0; }
        this.refresh_images();
    };

    this.show_movie_details = function (call_index) {
        let modal_bg = document.querySelector(".modal-bg");
        let movie;
        modal_bg.classList.add("visible-modal-bg");
        if (call_index == -1) {
            movie = this.best_movies[0];
        } else {
            movie = this.best_movies[(this.index + call_index) % 7];
        };

        let args = {
            movie: movie,
            movie_category: this
        };
        get_url(movie.url, set_movie_details, args);
    };

    this.refresh_details = function (movie) {
        document.getElementById("details_picture").src = movie?.image_url;
        document.getElementById("details_title").innerHTML = movie?.title;
        document.getElementById("details_genre").innerHTML = "Genre : " + movie?.genres;
        document.getElementById("details_date").innerHTML = "Date de sortie : " + movie?.date;
        document.getElementById("details_rated").innerHTML = "Rated : " + movie?.rated;
        document.getElementById("details_imdb").innerHTML = "Score Imdb : " + movie?.imdb_score;
        document.getElementById("details_directors").innerHTML = "Réalisateur : " + movie?.directors;
        document.getElementById("details_actors").innerHTML = "Liste des acteurs : " + movie?.actors;
        document.getElementById("details_duration").innerHTML = "Durée : " + movie?.duration;
        document.getElementById("details_country").innerHTML = "Pays d’origine : " + movie?.country;
        document.getElementById("details_results").innerHTML = "Résultat au Box Office : " + movie?.results;
        document.getElementById("details_sumup").innerHTML = "Résumé du film : " + movie?.sumup;
    }

}

let url = '';

url = 'http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=';
let all_categories = new MovieCategory(url, "best-rated-img-");

url = 'http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Mystery&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains='
let categories_1 = new MovieCategory(url, "category-1-img-");

url = 'http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Drama&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains='
let categories_2 = new MovieCategory(url, "category-2-img-");

url = 'http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Comedy&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains='
let categories_3 = new MovieCategory(url, "category-3-img-");


