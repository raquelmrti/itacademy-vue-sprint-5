"use strict";
const API_URL = "https://icanhazdadjoke.com/";
const jokePara = document.querySelector(".joke-para");
const jokeBtn = document.querySelector(".joke-btn");
jokeBtn.addEventListener("click", () => {
    fetch(API_URL, {
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((json) => {
        jokePara.textContent = json.joke;
        changeBtnText(jokeBtn, "Següent acudit");
    });
});
function changeBtnText(btn, newText) {
    btn.value = newText;
}
