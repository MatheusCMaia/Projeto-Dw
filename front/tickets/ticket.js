import storage from '../js/services/storage.js';  // Importa o storage.js
import Auth from '/front/js/services/auth.js';

document.addEventListener("DOMContentLoaded", function () {
  if (Auth.isAuthenticated()) {
    
  }
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os dados do formulário
    const titulo = document.getElementById("tituloTicket").value;
    const descricao = document.getElementById("descricaoTicket").value;

    if (!titulo || !descricao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Enviar os dados usando storage.js
    try {
      const ticketCriado = await storage.create('tickets', { titulo, descricao });  // Usando o storage para criar o ticket
      alert("Ticket criado com sucesso!");
      form.reset(); // Limpa o formulário após a submissão
      console.log("Ticket criado:", ticketCriado);  // Opcional, para depuração
    } catch (error) {
      console.error("Erro ao criar ticket:", error);
      alert("Erro ao criar o ticket.");
    }
  });
});
  