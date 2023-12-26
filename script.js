const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const fromText = document.getElementById("from-text");
const toText = document.getElementById("to-text");
const btnTranslate = document.getElementById("btnTranslate");
const ıcon = document.getElementById("icon");
const icons = document.querySelectorAll(".icon");

for (let lang in languages) {
  console.log(lang, languages[lang]);

  let options = ` <option class="text-primary opt"  value=${lang}>${languages[lang]} </option>`;

  fromLang.insertAdjacentHTML("beforeend", options);
  toLang.insertAdjacentHTML("beforeend", options);

  fromLang.value = "tr-TR";
  toLang.value = "en-GB";
}

btnTranslate.addEventListener("click", () => {
  const text = fromText.value;
  const from = fromLang.value;
  const to = toLang.value;
  const url = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`;

  async function showTranslate() {
    try {
      const response = await fetch(url);

      const data = await response.json();
  
      toText.value = data.responseData.translatedText;
    } catch (err) {
    console.log(err);
    }
  }
  showTranslate();
});

ıcon.addEventListener("click", () => {
  const changeFromText = fromText.value;
  fromText.value = toText.value;
  toText.value = changeFromText;

  const changeFromLang = fromLang.value;
  fromLang.value = toLang.value;
  toLang.value = changeFromLang;
});

for (let ıconArea of icons) {
  ıconArea.addEventListener("click", (element) => {

    if (element.target.classList.contains("fa-copy")) {
      if (element.target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else if (element.target.classList.contains("fa-microphone")) {
      if (element.target.id == "from") {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        console.log(recognition);

        recognition.addEventListener("result", (e) => {
          const text = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");

          fromText.innerText = text;

        });

        recognition.start();
      }
    } else {
      let utterance;
      if (element.target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = fromLang.value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = toLang.value;
      }
      speechSynthesis.speak(utterance);
    }
  });
}
