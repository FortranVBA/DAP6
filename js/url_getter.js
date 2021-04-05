"use strict";

export function get_url(url, function_onload, kwargs) {

    axios.get(url).then(function (response) {
        function_onload(response, kwargs);
    }, function () {
        alert("Request failed");
    });

}


