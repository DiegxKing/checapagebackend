console.log("⚙️ Service worker iniciado correctamente");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith("http")) {
    console.log("🌐 URL detectada:", tab.url);

    fetch("http://127.0.0.1:5000/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: tab.url })
    })
      .then(response => response.json())
      .then(data => {
        console.log("📊 Resultado del análisis:", data);

        const badge = data.result === "phishing" ? "⚠️" : "✔";
        const color = data.result === "phishing" ? "red" : "green";
        chrome.action.setBadgeText({ text: badge, tabId });
        chrome.action.setBadgeBackgroundColor({ color, tabId });

        chrome.storage.local.set({ ultimoResultado: data });
        chrome.runtime.sendMessage({ tipo: "resultado", resultado: data });

        // 🔴 Inyectar advertencia si es phishing
        if (data.result === "phishing") {
          chrome.scripting.executeScript({
            target: { tabId },
            files: ["overlay.js"]
          });
        }
      })
      .catch(err => {
        console.error("❌ Error al conectar con Flask:", err);
      });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Extensión instalada o recargada");
});
