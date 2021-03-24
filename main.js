"use strict";

let best_movies_all_categories = [];
let score = '10';
let first_page = true;
let index_best_rated_movie = 0;

function arrow_left_best_movies() {
    index_best_rated_movie = index_best_rated_movie - 1;
    if (index_best_rated_movie < 0) { index_best_rated_movie = 6; }
    document.getElementById("best-rated-img-1").src = best_movies_all_categories[(index_best_rated_movie) % 7].image_url;
    document.getElementById("best-rated-img-2").src = best_movies_all_categories[(index_best_rated_movie + 1) % 7].image_url;
    document.getElementById("best-rated-img-3").src = best_movies_all_categories[(index_best_rated_movie + 2) % 7].image_url;
    document.getElementById("best-rated-img-4").src = best_movies_all_categories[(index_best_rated_movie + 3) % 7].image_url;
}

function arrow_right_best_movies() {
    index_best_rated_movie = index_best_rated_movie + 1;
    if (index_best_rated_movie > 7) { index_best_rated_movie = 0; }
    document.getElementById("best-rated-img-1").src = best_movies_all_categories[(index_best_rated_movie) % 7].image_url;
    document.getElementById("best-rated-img-2").src = best_movies_all_categories[(index_best_rated_movie + 1) % 7].image_url;
    document.getElementById("best-rated-img-3").src = best_movies_all_categories[(index_best_rated_movie + 2) % 7].image_url;
    document.getElementById("best-rated-img-4").src = best_movies_all_categories[(index_best_rated_movie + 3) % 7].image_url;
}

function show_movie_details() {
    let modal_bg = document.querySelector(".modal-bg");

    modal_bg.classList.add("visible-modal-bg");
}

function hide_movie_details() {
    let modal_bg = document.querySelector(".modal-bg");

    modal_bg.classList.remove("visible-modal-bg");
}

function get_movies(url_API) {

    // 1. Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', url_API);
    xhr.responseType = 'json';

    // 3. Send the request over the network
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function () {
        if (xhr.status != 200) { // analyze HTTP status of the response
            alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            let all_movies;
            // Get film with max rating value
            let max_imdb;
            let best_movie;

            all_movies = xhr.response.results;

            //best_movies_all_categories.push.apply(all_movies);
            for (let i = 0; i < Object.keys(all_movies).length; i++) {
                best_movies_all_categories.push(all_movies[i]);
            }

            // Si next page, la charger
            if (xhr.response.next != null && first_page) {
                alert(`Next page`); // number of movies in page from API
                let page_2 = '&page=2';
                first_page = false;
                get_movies(`http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=${score}&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=${page_2}&rating=&rating_contains=`);
            }

            let movies_count = Object.keys(best_movies_all_categories).length;

            if (movies_count < 7) {
                score = score - 0.1;
                score = Math.round(score * 10) / 10;
                first_page = true;
                get_movies(`http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=${score}&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`);
            }
            else {
                alert(`Message is ${movies_count} / Score is ${score}`); // number of movies in page from API
                alert(best_movies_all_categories); // number of movies in page from API    
                document.getElementById("best-movie-img").src = best_movies_all_categories[0].image_url;
                document.getElementById("best-movie-title").innerHTML = best_movies_all_categories[0].title;
                document.getElementById("best-rated-img-1").src = best_movies_all_categories[(index_best_rated_movie) % 7].image_url;
                document.getElementById("best-rated-img-2").src = best_movies_all_categories[(index_best_rated_movie + 1) % 7].image_url;
                document.getElementById("best-rated-img-3").src = best_movies_all_categories[(index_best_rated_movie + 2) % 7].image_url;
                document.getElementById("best-rated-img-4").src = best_movies_all_categories[(index_best_rated_movie + 3) % 7].image_url;
            }
        }
    };

    xhr.onerror = function () {
        alert("Request failed");
    };

}

first_page = true;
get_movies(`http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=${score}&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`);



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
