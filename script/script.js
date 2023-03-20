"use strict";
/* --------------------------- JOKES -------------------------- */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dadJokesApiUrl = "https://icanhazdadjoke.com/";
const chuckNorrisJokesUrl = "https://api.chucknorris.io/jokes/random";
const jokePara = document.querySelector(".joke-para");
const jokeBtn = document.querySelector(".joke-btn");
const jokeVoting = document.querySelector(".joke-voting");
const changeBtnText = (btn, newText) => (btn.textContent = newText);
const makeElementVisible = (elem) => {
    if (!elem.style.display)
        elem.style.display = "block";
};
// Without async/await
/* jokeBtn.addEventListener("click", () => {
  const randomNum = Math.floor(Math.random() * 2);

  if (randomNum === 0) {
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
      })
  } else {
    fetch(chuckNorrisJokesUrl)
      .then((response) => response.json())
      .then((json) => {
        jokePara.textContent = json.value;
        changeBtnText(jokeBtn, "Següent acudit");
        makeElementVisible(jokeVoting);
      })
  }
}); */
// With async/await (and separate functions)
const getJoke = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, {
        headers: {
            Accept: "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Couldn't fetch joke.");
    }
    return yield response.json();
});
const displayJoke = (json) => {
    // We have to check if the JSON received is from the Dad Jokes API or the Chuck Norris API.
    // The Dad Jokes JSON assigns the joke string to the property "joke", while the Chuck Norris API
    // assigns the joke string to the property "value".
    let joke;
    if ("joke" in json) {
        joke = json.joke;
    }
    else {
        joke = json.value;
    }
    jokePara.textContent = joke;
    changeBtnText(jokeBtn, "Següent acudit");
    makeElementVisible(jokeVoting);
};
jokeBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const randomNum = Math.floor(Math.random() * 2);
    try {
        if (randomNum === 0) {
            const joke = yield getJoke(dadJokesApiUrl);
            displayJoke(joke);
        }
        else {
            const joke = yield getJoke(chuckNorrisJokesUrl);
            displayJoke(joke);
        }
    }
    catch (error) {
        console.error("Something went wrong.", error);
    }
}));
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
