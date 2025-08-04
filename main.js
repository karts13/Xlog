const fields = ["leetcode", "typing", "chess", "walk", "proj", "extras"];
const preview = document.getElementById("preview");
const counter = document.getElementById("charCount");

const startDate = new Date("2025-08-04");
const today = new Date();
const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
const logNumber = String(diffDays + 1).padStart(3, "0");

function generateTweet() {
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

    if (lines.length === 0) {
        preview.textContent = "Fill in something to generate a log...";
        counter.textContent = "";
        return;
    }

    let base = `log #${logNumber}\n`;
    let footer = `\ntemplated from karts13.github.io/xlog`;
    let fullText = `${base}${lines.join("\n")}${footer}`;

    //280 max
    while (fullText.length > 280 && lines.length > 0) {
        const lastLine = lines[lines.length - 1];
        if (lastLine.startsWith("🍿")) {
            lines[lines.length - 1] = "🍿 ...";
        } else {
            lines.pop();
        }
        fullText = `${base}${lines.join("\n")}${footer}`;
    }

    preview.textContent = fullText;
    counter.textContent = `${280 - fullText.length} chars left`;
}

fields.forEach((id) => {
    document.getElementById(id).addEventListener("input", generateTweet);
});

document.getElementById("tweetBtn").addEventListener("click", () => {
    const tweet = preview.textContent;
    const encoded = encodeURIComponent(tweet);
    const twitterUrl = `https://x.com/intent/tweet?text=${encoded}`;
    window.open(twitterUrl, "_blank");
});