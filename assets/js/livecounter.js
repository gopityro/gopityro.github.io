// livecounter.js

const namespace = "portfolio-gopitro";
const counter = "naga-gopi-mallolu";

async function updateVisitorStats() {
  try {
    // Get total views (and increment)
    const viewRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${counter}/up`);
    const viewData = await viewRes.json();

    const viewsEl = document.getElementById("pageViews");
    if (viewsEl) viewsEl.textContent = viewData.count.toLocaleString();

  } catch (err) {
    console.error("Failed to fetch visitor stats:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateVisitorStats();
});