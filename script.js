const sentimentCounts = {
  Positive: 0,
  Negative: 0,
  Neutral: 0,
  Mixed: 0
};

const ctx = document.getElementById('sentimentChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Positive', 'Negative', 'Neutral', 'Mixed'],
    datasets: [{
      label: 'Sentiment Count',
      data: [0, 0, 0, 0],
      backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#17a2b8']
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function updateChart() {
  chart.data.datasets[0].data = [
    sentimentCounts.Positive,
    sentimentCounts.Negative,
    sentimentCounts.Neutral,
    sentimentCounts.Mixed
  ];
  chart.update();
}

function analyzeSentiment() {
  const input = document.getElementById("blogInput").value.trim();
  if (!input) {
    alert("Please enter some blog content.");
    return;
  }

  const positiveWords = [
    "love", "loved", "great", "happy", "awesome", "good", "wonderful",
    "fantastic", "excellent", "beautiful", "heartwarming", "inspiring", "brilliant", "amazing", "enjoyed"
  ];

  const negativeWords = [
    "bad", "sad", "terrible", "horrible", "hate", "worst", "poor",
    "angry", "ugly", "weak", "boring", "confusing", "disappointing"
  ];

  let score = 0;
  const words = input.toLowerCase().split(/\W+/);
  let foundPositive = false;
  let foundNegative = false;

  words.forEach(word => {
    if (positiveWords.includes(word)) {
      score += 1;
      foundPositive = true;
    }
    if (negativeWords.includes(word)) {
      score -= 1;
      foundNegative = true;
    }
  });

  let sentiment = "Neutral";
  let emoji = "😐";

  if (score > 0 && !foundNegative) {
    sentiment = "Positive";
    emoji = "😊";
  } else if (score < 0 && !foundPositive) {
    sentiment = "Negative";
    emoji = "😞";
  } else if (score === 0 && foundPositive && foundNegative) {
    sentiment = "Mixed";
    emoji = "🤔";
  }

  sentimentCounts[sentiment]++;
  updateChart();

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
  resultBox.prepend(newResult);
}
