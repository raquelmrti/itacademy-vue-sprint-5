"use strict";
const API_URL = "https://icanhazdadjoke.com/";
const jokePara = document.querySelector(".joke-para");
const jokeBtn = document.querySelector(".joke-btn");
const jokeVoting = document.querySelector(".joke-voting");
const changeBtnText = (btn, newText) => (btn.textContent = newText);
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
    if (!jokeVoting.style.display)
        jokeVoting.style.display = "block";
});
const reportJokes = [];
const voteJoke = (score) => {
    const report = {
        joke: jokePara.textContent,
        score: score,
        date: new Date().toISOString(),
    };
    // update the joke report if the user rates the same joke again
    // before getting a new one
    if (reportJokes.length) {
        if (jokePara.textContent === reportJokes[reportJokes.length - 1].joke) {
            reportJokes.splice(reportJokes.length - 1, 1);
        }
    }
    reportJokes.push(report);
    console.log(reportJokes);
};
jokeVoting.addEventListener("click", (e) => {
    if (!e.target)
        return;
    const btn = e.target;
    if (btn.classList.contains("joke-voting-btn")) {
        const score = Number(btn.getAttribute("data-score"));
        voteJoke(score);
    }
});
