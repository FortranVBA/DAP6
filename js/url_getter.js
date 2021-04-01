"use strict";

export function get_url(url, function_onload, kwargs) {
    // 1. Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', url);
    xhr.responseType = 'json';

    // 3. Send the request over the network
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function () {
        function_onload(xhr, kwargs);
    };

    xhr.onerror = function () {
        alert("Request failed");
    };
}
