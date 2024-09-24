document.addEventListener("DOMContentLoaded", async function () {
    const ticketList = document.getElementById("ticketList");
  
    try {
      const response = await fetch('http://localhost:3000/tickets?status=Pendente');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar tickets pendentes');
      }
  
      const tickets = await response.json();
  
      ticketList.innerHTML = ''; // Limpa qualquer conteúdo existente
  
      if (tickets.length === 0) {
        ticketList.innerHTML = '<p class="text-muted">Nenhum ticket pendente.</p>';
      }
  
      tickets.forEach(ticket => {
        const ticketCard = document.createElement("div");
        ticketCard.classList.add("card", "mb-3");
        ticketCard.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${ticket.titulo}</h5>
            <p class="card-text">${ticket.descricao}</p>
            <p class="card-text"><strong>Status:</strong> ${ticket.status}</p>
            <p class="card-text"><small class="text-muted">Criado em: ${new Date(ticket.dataCriacao).toLocaleDateString()}</small></p>
          </div>
        `;
        ticketList.appendChild(ticketCard);
      });
    } catch (error) {
      console.error("Erro ao carregar os tickets pendentes:", error);
      ticketList.innerHTML = '<p class="text-danger">Erro ao carregar os tickets pendentes.</p>';
    }
  });
  