const API_URL = "https://icanhazdadjoke.com/";
const jokePara = document.querySelector(".joke-para") as HTMLElement;
const jokeBtn = document.querySelector(".joke-btn") as HTMLInputElement;
const jokeVoting = document.querySelector(".joke-voting") as HTMLElement;

const changeBtnText = (btn: HTMLElement, newText: string) =>
  (btn.textContent = newText);

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

    if (!jokeVoting.style.display) jokeVoting.style.display = "block";
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
