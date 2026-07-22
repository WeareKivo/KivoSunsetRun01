(function () {
  "use strict";

  const SERVICE_ID = "service_jrva34l";
  const TEMPLATE_ID = "template_cfnaoe9";
  const PUBLIC_KEY = "BwkH35pSz7UwTpF9V";

  const form = document.getElementById("registration-form");
  const submitButton = document.getElementById("submit-button");
  const statusMessage = document.getElementById("form-status");

  if (!form || !submitButton || !statusMessage) return;

  if (typeof emailjs === "undefined") {
    statusMessage.textContent = "Não foi possível carregar o formulário. Atualiza a página e tenta novamente.";
    statusMessage.className = "form-status error";
    submitButton.disabled = true;
    return;
  }

  emailjs.init({ publicKey: PUBLIC_KEY });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "A ENVIAR...";
    statusMessage.textContent = "";
    statusMessage.className = "form-status";

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
      form.reset();
      statusMessage.textContent = "Inscrição enviada com sucesso! A tua vaga será confirmada após validação do pagamento.";
      statusMessage.className = "form-status success";
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
      statusMessage.textContent = "Não foi possível enviar a inscrição. Tenta novamente dentro de alguns instantes.";
      statusMessage.className = "form-status error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "ENVIAR INSCRIÇÃO";
    }
  });
})();
