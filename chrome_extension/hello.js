document.addEventListener('DOMContentLoaded', () => {
  // Restaurar estado del plugin
  chrome.storage.local.get(['pluginEnabled'], function (result) {
    const isEnabled = result.pluginEnabled !== false;
    pluginToggle.checked = isEnabled;
    overlay.classList.toggle('hidden', isEnabled);
  });

  // Restaurar último resultado
  chrome.storage.local.get("ultimoResultado", (res) => {
    if (res.ultimoResultado) {
      actualizarUI(res.ultimoResultado);
    }
  });

  // Recibir nuevos análisis desde background
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.tipo === "resultado") {
      chrome.storage.local.set({ "ultimoResultado": message.resultado });
      actualizarUI(message.resultado);
    }
  });
});

function actualizarUI(data) {
  if (data.result === "phishing") {
    showRedScreen(data.probabilidad);
  } else {
    showGreenScreen(data.probabilidad);
  }
}

function showGreenScreen(prob) {
  document.getElementById('greenScreen').style.display = 'block';
  document.getElementById('redScreen').style.display = 'none';
  document.getElementById('proba_ph').textContent = "Probabilidad: " + prob + "%";
}

function showRedScreen(prob) {
  document.getElementById('redScreen').style.display = 'block';
  document.getElementById('greenScreen').style.display = 'none';
  document.getElementById('proba_ph_roja').textContent = "Probabilidad: " + prob + "%";
}

// Interruptor ON/OFF
const pluginToggle = document.getElementById('pluginToggle');
const overlay = document.getElementById('disabledOverlay');

pluginToggle.addEventListener('change', function () {
  const isEnabled = this.checked;
  chrome.storage.local.set({ pluginEnabled: isEnabled }, function () {
    overlay.classList.toggle('hidden', isEnabled);
  });
});
