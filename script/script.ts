const API_URL = "https://icanhazdadjoke.com/";
const jokePara = document.querySelector(".joke-para") as HTMLElement;
const jokeBtn = document.querySelector(".joke-btn") as HTMLInputElement;

jokeBtn.addEventListener("click", () => {
  fetch(API_URL, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      jokePara.textContent = json.joke;
      changeBtnText(jokeBtn, "Següent acudit")
    });
});

function changeBtnText(btn: HTMLInputElement, newText: string) {
  btn.value = newText;
}