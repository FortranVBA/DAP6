"use strict";

function get_movies(url, movie_category) {
    // 1. Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', url);
    xhr.responseType = 'json';

    // 3. Send the request over the network
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function () {

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
                get_movies(xhr.response.next, movie_category);
            }
            else {
                alert(`Message is ${movies_count}`); // number of movies in page from API
                alert(movie_category.best_movies); // number of movies in page from API  
                movie_category.refresh_images();
            }
        }
    }

    xhr.onerror = function () {
        alert("Request failed");
    };
}

function MovieCategory(url, id_html) {

    this.best_movies = [];
    this.index = 0;
    this.id_html = id_html;
    this.url = url;
    get_movies(this.url, this);

    this.refresh_images = function () {
        document.getElementById("best-movie-img").src = this.best_movies[0].image_url;
        document.getElementById("best-movie-title").innerHTML = this.best_movies[0].title;
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
}

let url = 'http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=';
let all_categories = new MovieCategory(url, "best-rated-img-");

function show_movie_details() {
    let modal_bg = document.querySelector(".modal-bg");

    modal_bg.classList.add("visible-modal-bg");
}

function hide_movie_details() {
    let modal_bg = document.querySelector(".modal-bg");

    modal_bg.classList.remove("visible-modal-bg");
}


// max_imdb = Math.max.apply(Math, all_movies.map(function (o) { return parseFloat(o.imdb_score); }));
// best_movie = all_movies.find(function (o) { return parseFloat(o.imdb_score) == max_imdb; });



document.getElementById("category-1-img-1").src = "img/sample.jpg";
document.getElementById("category-1-img-2").src = "img/sample.jpg";
document.getElementById("category-1-img-3").src = "img/sample.jpg";
document.getElementById("category-1-img-4").src = "img/sample.jpg";
document.getElementById("category-2-img-1").src = "img/sample.jpg";
document.getElementById("category-2-img-2").src = "img/sample.jpg";
document.getElementById("category-2-img-3").src = "img/sample.jpg";
document.getElementById("category-2-img-4").src = "img/sample.jpg";
document.getElementById("category-3-img-1").src = "img/sample.jpg";
document.getElementById("category-3-img-2").src = "img/sample.jpg";
document.getElementById("category-3-img-3").src = "img/sample.jpg";
document.getElementById("category-3-img-4").src = "img/sample.jpg";
