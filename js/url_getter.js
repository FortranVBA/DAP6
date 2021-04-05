"use strict";

export function getUrl(url, function_onload, kwargs) {

    axios.get(url).then(function (response) {
        function_onload(response, kwargs);
    }, function () {
        alert("Request failed");
    });

}


