// Display today's date
const todayDateElement = document.getElementById("today-date");
const today = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };
todayDateElement.textContent = today.toLocaleDateString("en-US", options);

// Load anniversaries from JSON file
fetch("data/anniversaries.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("anniversaries-container");

    if (data.length === 0) {
      container.innerHTML = "<p>No album anniversaries found for today.</p>";
      return;
    }

    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("anniversary-item");

      div.innerHTML = `
        <p><strong>${item.band}</strong> – "${item.album}"</p>
        <p>Release Date: ${item.release_date}</p>
        <p><em>#TodayInMetal #${item.band.replace(/\s+/g, '')} #${item.album.replace(/\s+/g, '').replace(/\./g, '')}</em></p>
      `;

      container.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });
