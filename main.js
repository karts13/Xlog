const fields = ["leetcode", "typing", "chess", "walk", "proj", "extras"];
const preview = document.getElementById("preview");
const counter = document.getElementById("charCount");

const startDate = new Date("2025-08-04");
const today = new Date();
const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
const logNumber = String(diffDays + 1).padStart(3, "0");

function getTweetText() {
  let lines = [];

  fields.forEach((id) => {
    const value = document.getElementById(id).value.trim();
    if (value) {
      switch (id) {
        case "leetcode":
          lines.push(`🧠 ${value}`);
          break;
        case "typing":
          lines.push(`⌨️ ${value}`);
          break;
        case "chess":
          lines.push(`♟️ ${value}`);
          break;
        case "walk":
          lines.push(`🚶 ${value}`);
          break;
        case "proj":
          lines.push(`🦾 ${value}`);
          break;
        case "extras":
          lines.push(`${value}`);
          break;
      }
    }
  });

  let base = `log #${logNumber}\n\n`;
  let footer = `\n\ntemplated from karts13.github.io/Xlog/`;
  return `${base}${lines.join("\n")}${footer}`;
}

function generateTweet() {
  const text = getTweetText();
  preview.textContent = text || "Fill in something to generate a log...";
  counter.textContent = `${280 - text.length} chars left`;
}

fields.forEach((id) => {
  const inputEl = document.getElementById(id);

  inputEl.addEventListener("input", (e) => {
    const currentText = getTweetText();
    if (currentText.length > 280) {
      e.target.value = e.target.value.slice(0, -1);
      alert("You’ve reached the 280 character limit!");
    }
    generateTweet();
  });
});

document.getElementById("tweetBtn").addEventListener("click", () => {
  const tweet = preview.textContent;
  const encoded = encodeURIComponent(tweet);
  const twitterUrl = `https://x.com/intent/tweet?text=${encoded}`;
  window.open(twitterUrl, "_blank");
});

generateTweet();