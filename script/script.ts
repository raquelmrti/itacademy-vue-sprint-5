/* --------------------------- JOKES -------------------------- */

const dadJokesApiUrl = "https://icanhazdadjoke.com/";
const chuckNorrisJokesUrl = "https://api.chucknorris.io/jokes/random";

const jokePara = document.querySelector(".joke-para") as HTMLElement;
const jokeBtn = document.querySelector(".joke-btn") as HTMLInputElement;
const jokeVoting = document.querySelector(".joke-voting") as HTMLElement;

const changeBtnText = (btn: HTMLElement, newText: string) =>
  (btn.textContent = newText);

const makeElementVisible = (elem: HTMLElement) => {
  if (!elem.style.display) elem.style.display = "block";
}

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
const getJoke = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Couldn't fetch joke.");
  }

  return await response.json();
}

interface DadJoke {
  id: string;
  joke: string;
  status: number;
}

interface ChuckNorrisJoke {
  categories: [];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

type Joke = DadJoke | ChuckNorrisJoke;

const displayJoke = (json: Joke) => {
  // We have to check if the JSON received is from the Dad Jokes API or the Chuck Norris API.
  // The Dad Jokes JSON assigns the joke string to the property "joke", while the Chuck Norris API
  // assigns the joke string to the property "value".
  let joke;
  if ("joke" in json) {
    joke = json.joke;
  } else {
    joke = json.value;
  }

  jokePara.textContent = joke;
  changeBtnText(jokeBtn, "Següent acudit");
  makeElementVisible(jokeVoting);
};

jokeBtn.addEventListener("click", async () => {
  const randomNum = Math.floor(Math.random() * 2);

  try {
    if (randomNum === 0) {
      const joke = await getJoke(dadJokesApiUrl);
      displayJoke(joke);
    } else {
      const joke = await getJoke(chuckNorrisJokesUrl);
      displayJoke(joke);
    }
  } catch (error) {
    console.error("Something went wrong.", error);
  }
});

interface Report {
  joke: string;
  score: number;
  date: string;
}

const reportJokes: Report[] = [];

const voteJoke = (score: number) => {
  const report: Report = {
    joke: jokePara.textContent as string,
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
  if (!e.target) return;

  const btn = e.target as Element;

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
}

fetch(`${weatherApi.url}?q=${weatherApi.city}&lang=${weatherApi.lang}&units=${weatherApi.units}&appid=${weatherApi.appid}`)
  .then((response) => response.json())
  .then((json) => {
    const weatherTempDiv = document.querySelector(".weather-temp") as HTMLElement;
    const weatherIconImg = document.querySelector(".weather-icon-img") as HTMLImageElement;

    weatherIconImg.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;
    weatherTempDiv.textContent = `${parseInt(json.main.temp)} ºC`;
  })
