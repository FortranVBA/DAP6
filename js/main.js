"use strict";

import { MovieCarousel } from './movie_category.js';

const api = 'http://localhost:8000/api/v1/titles/';
let url = '';

url = `${api}?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`;
let all_categories = new MovieCarousel(url, "best-rated-img-");

url = `${api}?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Mystery&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`
let category_1 = new MovieCarousel(url, "category-1-img-");

url = `${api}?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Drama&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`
let category_2 = new MovieCarousel(url, "category-2-img-");

url = `${api}?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Comedy&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`
let category_3 = new MovieCarousel(url, "category-3-img-");

window.show_top_movie = function () {
    all_categories.show_movie_details(-1);
};

window.hide_movie_details = function () {
    MovieCarousel.hide_movie_details();
};

window.show_details = function (category, movie_position) {
    let category_object = {
        "all_categories": all_categories,
        "category_1": category_1,
        "category_2": category_2,
        "category_3": category_3
    };
    category_object[category].show_movie_details(movie_position);
};

window.arrow_left = function (category) {
    let category_object = {
        "all_categories": all_categories,
        "category_1": category_1,
        "category_2": category_2,
        "category_3": category_3
    };
    category_object[category].arrow_left();
};

window.arrow_right = function (category) {
    let category_object = {
        "all_categories": all_categories,
        "category_1": category_1,
        "category_2": category_2,
        "category_3": category_3
    };
    category_object[category].arrow_right();
};
