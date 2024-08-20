document.addEventListener("DOMContentLoaded", function() {
    const ticketList = document.getElementById('ticketList');

    // Função para criar o HTML de um card de ticket
    function createTicketCard(ticket) {
        return `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${ticket.titulo}</h5>
                        <p class="card-text">${ticket.descricao}</p>
                        <p class="card-text"><small class="text-muted">Prioridade: ${ticket.prioridade}</small></p>
                        <p class="card-text"><small class="text-muted">Data de Criação: ${new Date(ticket.dataCriacao).toLocaleDateString()}</small></p>
                        <span class="badge ${ticket.status === 'Pendente' ? 'badge-warning' : 'badge-secondary'}">${ticket.status}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Recupera os tickets do localStorage
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

    // Filtra apenas os tickets pendentes
    const ticketsPendentes = tickets.filter(ticket => ticket.status === 'Pendente');

    // Adiciona os tickets pendentes à lista
    if (ticketsPendentes.length > 0) {
        ticketList.innerHTML = ticketsPendentes.map(createTicketCard).join('');
    } else {
        ticketList.innerHTML = '<p class="text-center">Não há tickets pendentes no momento.</p>';
    }
});
