import storage from '../js/services/storage.js';  // Importa o storage.js


document.addEventListener("DOMContentLoaded", async function () {
  const ticketList = document.getElementById("ticketList");
  const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage

  try {
    // Chama a API para obter os tickets do usuário
    const response = await storage.read(`user/tickets/`); // Atualiza a chamada para a rota da API

    if (!response || response.length === 0) {
      ticketList.innerHTML = '<p class="text-muted">Nenhum ticket encontrado para este usuário.</p>';
      return;
    }

    ticketList.innerHTML = ''; // Limpa qualquer conteúdo existente

    response.forEach(ticket => {
      const ticketCard = document.createElement("div");
      ticketCard.classList.add("card", "mb-3");
      ticketCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${ticket.titulo}</h5>
          <p class="card-text">${ticket.descricao}</p>
          <p class="card-text"><strong>Status:</strong> ${ticket.status}</p>
          <p class="card-text"><strong>Prioridade:</strong> ${ticket.prioridade}</p>
          <p class="card-text"><small class="text-muted">Criado em: ${new Date(ticket.dataCriacao).toLocaleDateString()}</small></p>
        </div>
      `;
      ticketList.appendChild(ticketCard);
    });
  } catch (error) {
    console.error("Erro ao carregar os tickets:", error);
    ticketList.innerHTML = '<p class="text-danger">Erro ao carregar os tickets.</p>';
  }
});
