"use strict";
/* --------------------------- DAD JOKES -------------------------- */
const dadJokesApiUrl = "https://icanhazdadjoke.com/";
const jokePara = document.querySelector(".joke-para");
const jokeBtn = document.querySelector(".joke-btn");
const jokeVoting = document.querySelector(".joke-voting");
const changeBtnText = (btn, newText) => (btn.textContent = newText);
const makeElementVisible = (elem) => {
    if (!elem.style.display)
        elem.style.display = "block";
};
jokeBtn.addEventListener("click", () => {
    fetch(dadJokesApiUrl, {
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((json) => {
        jokePara.textContent = json.joke;
        changeBtnText(jokeBtn, "Següent acudit");
        makeElementVisible(jokeVoting);
    });
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
/* ---------------------------- WEATHER --------------------------- */
const weatherApi = {
    url: "http://api.openweathermap.org/data/2.5/weather",
    city: "barcelona",
    lang: "ca",
    units: "metric",
    appid: "cb3f4d75936f8a5b15dd34bd2b306614"
};
fetch(`${weatherApi.url}?q=${weatherApi.city}&lang=${weatherApi.lang}&units=${weatherApi.units}&appid=${weatherApi.appid}`)
    .then((response) => response.json())
    .then((json) => {
    const weatherTempDiv = document.querySelector(".weather-temp");
    const weatherIconImg = document.querySelector(".weather-icon-img");
    weatherIconImg.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;
    weatherTempDiv.textContent = `${parseInt(json.main.temp)} ºC`;
});
