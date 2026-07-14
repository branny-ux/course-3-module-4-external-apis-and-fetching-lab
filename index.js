// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("state-input");
  const button = document.getElementById("fetch-alerts");
  const alertsDisplay = document.getElementById("alerts-display");
  const errorMessage = document.getElementById("error-message");

  button.addEventListener("click", async () => {
    const state = input.value.trim().toUpperCase();

    // Clear input immediately
    input.value = "";

    try {
      const response = await fetch(`${weatherApi}${state}`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Clear previous alerts
      alertsDisplay.innerHTML = "";

      // Clear previous errors
      errorMessage.textContent = "";
      errorMessage.classList.add("hidden");

      // Summary
      const summary = document.createElement("p");
      summary.textContent = `${data.title}: ${data.features.length}`;
      alertsDisplay.append(summary);

      // Headlines
      const list = document.createElement("ul");

      data.features.forEach(alert => {
        const item = document.createElement("li");
        item.textContent = alert.properties.headline;
        list.append(item);
      });

      alertsDisplay.append(list);

    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.classList.remove("hidden");
    }
  });
});