function analyzeSentiment() {
  const input = document.getElementById("blogInput").value.trim();
  if (!input) {
    alert("Please enter some blog content.");
    return;
  }

  // Basic JS sentiment words dictionary (simple version)
  const positiveWords = ["love", "great", "happy", "awesome", "good", "wonderful", "fantastic", "excellent"];
  const negativeWords = ["bad", "sad", "terrible", "horrible", "hate", "worst", "poor", "angry"];

  let score = 0;
  const words = input.toLowerCase().split(/\W+/);

  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });

  let sentiment = "Neutral";
  if (score > 0) sentiment = "Positive";
  else if (score < 0) sentiment = "Negative";

  document.getElementById("sentiment").innerText = sentiment;
  document.getElementById("score").innerText = score;
  document.getElementById("resultBox").classList.remove("hidden");
}
