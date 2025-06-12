function analyzeSentiment() {
  const input = document.getElementById("blogInput").value.trim();
  if (!input) {
    alert("Please enter some blog content.");
    return;
  }

  const positiveWords = ["love", "great", "happy", "awesome", "good", "wonderful", "fantastic", "excellent", "beautiful"];
  const negativeWords = ["bad", "sad", "terrible", "horrible", "hate", "worst", "poor", "angry", "ugly"];

  let score = 0;
  const words = input.toLowerCase().split(/\W+/);

  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });

  let sentiment = "Neutral";
  let emoji = "😐";

  if (score > 0) {
    sentiment = "Positive";
    emoji = "😊";
  } else if (score < 0) {
    sentiment = "Negative";
    emoji = "😞";
  }

  const resultBox = document.getElementById("resultBox");

  const newResult = document.createElement("div");
  newResult.classList.add("result-item");
  newResult.innerHTML = `
    <p><strong>📝 Input:</strong> ${input}</p>
    <p><strong>📊 Sentiment:</strong> ${sentiment} ${emoji}</p>
    <p><strong>🔢 Polarity Score:</strong> ${score}</p>
    <hr/>
  `;

  resultBox.classList.remove("hidden");
  resultBox.prepend(newResult); // Show newest result on top
}
