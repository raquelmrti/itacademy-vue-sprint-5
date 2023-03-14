"use strict";
const API_URL = "https://icanhazdadjoke.com/";
const jokeBtn = document.querySelector("#joke-btn");
jokeBtn === null || jokeBtn === void 0 ? void 0 : jokeBtn.addEventListener("click", () => {
    fetch(API_URL, {
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json.joke));
});
