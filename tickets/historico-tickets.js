document.addEventListener("DOMContentLoaded", function() {
    const ticketList = document.getElementById("ticketList");

    
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

    if (tickets.length === 0) {
        ticketList.innerHTML = `
            <div class="no-tickets-alert">
                <p>Nenhum ticket encontrado.</p>
                <p class="text-muted">Crie um novo ticket para começar.</p>
            </div>
        `;
    } else {
        tickets.forEach(function(ticket) {
            const ticketCard = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${ticket.titulo}</h5>
                        <p class="card-text">${ticket.descricao}</p>
                        <p class="text-muted">Prioridade: ${ticket.prioridade}</p>
                        <p class="text-muted">Status: ${ticket.status}</p>
                        <p class="text-muted">Criado em: ${new Date(ticket.dataCriacao).toLocaleString()}</p>
                    </div>
                </div>
            `;
            ticketList.insertAdjacentHTML('beforeend', ticketCard);
        });
    }
});