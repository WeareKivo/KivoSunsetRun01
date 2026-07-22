const EMAILJS_PUBLIC_KEY = "BwkH35pSz7UwTpF9V";
const EMAILJS_SERVICE_ID = "service_jrva34l";
const EMAILJS_TEMPLATE_ID = "template_cfnaoe9";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const button = document.getElementById("submit-button");
  const status = document.getElementById("form-status");

  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const templateParams = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telemovel: document.getElementById("telemovel").value,
      nome_transferencia:
        document.getElementById("nome_transferencia").value,
      tshirt: document.getElementById("tshirt").value,
    };

    button.disabled = true;
    button.textContent = "A ENVIAR...";
    status.textContent = "";

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      status.textContent = "Inscrição enviada com sucesso!";
      status.className = "form-status success";
      form.reset();
    } catch (error) {
      console.error("Erro EmailJS:", error);
      status.textContent =
        "Não foi possível enviar a inscrição. Tenta novamente.";
      status.className = "form-status error";
    } finally {
      button.disabled = false;
      button.textContent = "ENVIAR INSCRIÇÃO";
    }
  });
});
