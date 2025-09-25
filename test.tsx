const getConfidenceBadgeColor = (confidence: number = 0) => {
  if (confidence > 0.8) return "green";
  if (confidence > 0.5) return "orange";
  return "red";
};

console.log(getConfidenceBadgeColor());    // "red"
console.log(getConfidenceBadgeColor(0.9)); // "green"
