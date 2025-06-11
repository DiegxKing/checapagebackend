(() => {
    if (document.getElementById("phishing-warning-overlay")) return;
  
    const overlay = document.createElement("div");
    overlay.id = "phishing-warning-overlay";
    overlay.style = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.9); color: white;
      font-size: 20px; z-index: 999999;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center; padding: 30px;
    `;
  
    overlay.innerHTML = `
      <div style="margin-bottom: 20px;"><strong>¡ADVERTENCIA DE SEGURIDAD!</strong></div>
      <div style="margin-bottom: 20px;">Esta página fue detectada como <strong>maliciosa</strong>. ¿Deseas continuar?</div>
      <div>
        <button id="phish-btn-exit" style="margin: 5px; padding: 10px 20px; font-size: 16px;">Salir</button>
        <button id="phish-btn-continue" style="margin: 5px; padding: 10px 20px; font-size: 16px;">Aceptar y continuar</button>
      </div>
    `;
  
    document.body.appendChild(overlay);
  
    // 🚪 Botón "Salir"
    document.getElementById("phish-btn-exit").addEventListener("click", () => {
      window.close(); // intenta cerrar pestaña
      window.location.href = "https://www.google.com/"; // fallback si no cierra
    });
  
    // ✅ Botón "Aceptar y continuar"
    document.getElementById("phish-btn-continue").addEventListener("click", () => {
      overlay.remove();
      // Puedes almacenar algo en localStorage si quieres ignorar futuros bloqueos para este dominio
    });
  })();
  