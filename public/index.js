
      const API = "http://localhost:5000";
      let urlHistory = JSON.parse(localStorage.getItem("urlHistory") || "[]");
      let currentShortUrl = "";
      let currentShortCode = "";
      let refreshInterval = null;

      renderHistory();
      if (urlHistory.length > 0) refreshHistoryClicks();

      async function shortenUrl() {
        const input = document.getElementById("urlInput");
        const url = input.value.trim();
        if (!url) return showError("Please enter a URL");

        const btn = document.getElementById("shortenBtn");
        btn.disabled = true;
        btn.textContent = "Shortening...";
        hideError();

        try {
          const res = await fetch(`${API}/api/shorten`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ originalUrl: url }),
          });

          const data = await res.json();
          if (!res.ok) return showError(data.error);

          currentShortUrl = data.shortUrl;
          currentShortCode = data.shortCode;

          document.getElementById("originalUrl").textContent = data.originalUrl;
          document.getElementById("shortUrlLink").textContent = data.shortUrl;
          document.getElementById("shortUrlLink").href = data.shortUrl;
          document.getElementById("clickCount").textContent = data.clicks;

          const daysLeft = Math.ceil((new Date(data.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
          document.getElementById("expiresIn").textContent = daysLeft;
          document.getElementById("result").style.display = "block";

          urlHistory.unshift({ originalUrl: data.originalUrl, shortUrl: data.shortUrl, shortCode: data.shortCode, clicks: data.clicks });
          if (urlHistory.length > 10) urlHistory.pop();
          localStorage.setItem("urlHistory", JSON.stringify(urlHistory));
          renderHistory();
          input.value = "";

          if (refreshInterval) clearInterval(refreshInterval);
          refreshInterval = setInterval(() => refreshClicks(currentShortCode), 5000);

        } catch (err) {
          showError("Something went wrong. Make sure the server is running.");
        } finally {
          btn.disabled = false;
          btn.textContent = "Shorten";
        }
      }

      async function refreshClicks(shortCode) {
        try {
          const res = await fetch(`${API}/api/stats/${shortCode}`);
          const data = await res.json();
          if (!res.ok) return;
          document.getElementById("clickCount").textContent = data.clicks;
          const index = urlHistory.findIndex((h) => h.shortCode === shortCode);
          if (index !== -1) {
            urlHistory[index].clicks = data.clicks;
            localStorage.setItem("urlHistory", JSON.stringify(urlHistory));
            renderHistory();
          }
        } catch (err) { console.log(err); }
      }

      async function refreshHistoryClicks() {
        for (const item of urlHistory) {
          try {
            const res = await fetch(`${API}/api/stats/${item.shortCode}`);
            const data = await res.json();
            if (res.ok) item.clicks = data.clicks;
          } catch (err) { console.log(err); }
        }
        localStorage.setItem("urlHistory", JSON.stringify(urlHistory));
        renderHistory();
      }

      async function deleteUrl(shortCode) {
        try {
          await fetch(`${API}/api/${shortCode}`, { method: "DELETE" });
          urlHistory = urlHistory.filter((h) => h.shortCode !== shortCode);
          localStorage.setItem("urlHistory", JSON.stringify(urlHistory));
          renderHistory();
        } catch (err) { console.log(err); }
      }

      function copyUrl() {
        navigator.clipboard.writeText(currentShortUrl);
        const btn = document.getElementById("copyBtn");
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 2000);
      }

      function renderHistory() {
        const section = document.getElementById("historySection");
        const list = document.getElementById("historyList");
        if (urlHistory.length === 0) { section.style.display = "none"; return; }
        section.style.display = "block";
        list.innerHTML = urlHistory.map((item) => `
          <div class="history-item">
            <div class="history-item-left">
              <div class="history-original">${item.originalUrl}</div>
              <div class="history-short">${item.shortUrl}</div>
            </div>
            <div class="history-clicks">${item.clicks} clicks</div>
            <button class="delete-btn" onclick="deleteUrl('${item.shortCode}')">🗑</button>
          </div>`).join("");
      }

      function showError(msg) { const el = document.getElementById("error"); el.textContent = msg; el.style.display = "block"; }
      function hideError() { document.getElementById("error").style.display = "none"; }

      document.getElementById("urlInput").addEventListener("keydown", (e) => { if (e.key === "Enter") shortenUrl(); });
   