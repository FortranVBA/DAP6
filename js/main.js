"use strict";

import { MovieCarousel } from './movie_category.js';

const api = 'http://localhost:8000/api/v1/titles/';
let url = '';

url = `${api}?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`;
let all_categories = new MovieCarousel(url, "best_rated_img_");

url = `${api}?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Mystery&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`
let category_1 = new MovieCarousel(url, "category_1_img_");

url = `${api}?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Drama&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`
let category_2 = new MovieCarousel(url, "category_2_img_");

url = `${api}?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Comedy&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`
let category_3 = new MovieCarousel(url, "category_3_img_");

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