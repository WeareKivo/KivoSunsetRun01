
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const SERVICE_ID = "service_jrva34l";
  const TEMPLATE_ID = "template_cfnaoe9";
  const PUBLIC_KEY = "BwkH35pSz7UwTpF9V";

  const form = document.getElementById("registration-form");
  const submitButton = document.getElementById("submit-button");
  const statusMessage = document.getElementById("form-status");

  if (!form || !submitButton || !statusMessage) {
    console.error("Elementos do formulário não encontrados.");
    return;
  }

  if (typeof window.emailjs === "undefined") {
    statusMessage.textContent =
      "Não foi possível carregar o sistema de envio. Atualiza a página e tenta novamente.";
    statusMessage.className = "form-status error";
    return;
  }

  window.emailjs.init({
    publicKey: PUBLIC_KEY
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const templateParams = {
      event_name: "KIVO Sunset Run #01",
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      telemovel: document.getElementById("telemovel").value.trim(),
      nome_transferencia: document
        .getElementById("nome_transferencia")
        .value.trim(),
      tamanho_tshirt: document.getElementById("tamanho_tshirt").value,
      aceito: form.elements["aceito"].checked ? "Sim" : "Não"
    };

    submitButton.disabled = true;
    submitButton.textContent = "A ENVIAR...";
    statusMessage.textContent = "";
    statusMessage.className = "form-status";

    try {
      await window.emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

      form.reset();
      statusMessage.textContent =
        "Inscrição enviada com sucesso! A tua vaga será confirmada após validação do pagamento.";
      statusMessage.className = "form-status success";
    } catch (error) {
      console.error("Erro EmailJS:", error);
      statusMessage.textContent =
        "Não foi possível enviar a inscrição. Atualiza a página e tenta novamente.";
      statusMessage.className = "form-status error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "ENVIAR INSCRIÇÃO";
    }
  });
});
