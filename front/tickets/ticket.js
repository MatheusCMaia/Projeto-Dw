document.addEventListener("DOMContentLoaded", function () {
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
  
      // Enviar os dados para o back-end
      try {
        const response = await fetch('http://localhost:3000/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titulo,
            descricao,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Erro ao criar ticket');
        }
  
        alert("Ticket criado com sucesso!");
        form.reset(); // Limpa o formulário após a submissão
      } catch (error) {
        console.error("Erro ao criar ticket:", error);
        alert("Erro ao criar o ticket.");
      }
    });
  });
  