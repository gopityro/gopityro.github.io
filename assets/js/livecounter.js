// livecounter.js
const namespace = "portfolio-gopitro";
const counter = "naga-gopi-mallolu";
const cacheKey = `counterapi_${namespace}_${counter}`;
const cacheExpiry = 3600 * 1000;

async function updateVisitorStats() {
  const viewsEl = document.getElementById("pageViews");
  const cachedData = JSON.parse(localStorage.getItem(cacheKey) || "{}");
  const now = Date.now();

  if (cachedData.count) {
    viewsEl.textContent = parseInt(cachedData.count).toLocaleString();
  }

  if (cachedData.timestamp && now - cachedData.timestamp < cacheExpiry) {
    return;
  }

  try {
    const viewRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${counter}/up`);
    const viewData = await viewRes.json();

    if (viewData.count) {
      viewsEl.textContent = viewData.count.toLocaleString();

      localStorage.setItem(cacheKey, JSON.stringify({
        count: viewData.count,
        timestamp: now
      }));
    }
  } catch (err) {
    console.error("Failed to fetch visitor stats:", err);
  }
}

document.addEventListener("DOMContentLoaded", updateVisitorStats);