import { createTicketCard, verificarTamanho } from "./tickets/ticket-card-vtamanho.js";

document.addEventListener("DOMContentLoaded", function() {
    const ticketList = document.getElementById('ticketList');

    // createTicketCard(ticket)

    //function createTicketCard(ticket) {
        //return `
            //<div class="col-md-4">
                //<div class="card">
                    //<div class="card-body">
                        //<h5 class="card-title">${ticket.titulo}</h5>
                        //<p class="card-text">${ticket.descricao}</p>
                        //<p class="card-text"><small class="text-muted">Prioridade: ${ticket.prioridade}</small></p>
                        //<p class="card-text"><small class="text-muted">Data de Criação: ${new Date(ticket.dataCriacao).toLocaleDateString()}</small></p>
                       // <span class="badge ${ticket.status === 'Pendente' ? 'badge-warning' : 'badge-secondary'}">${ticket.status}</span>
                   // </div>
                //</div>
            //</div>
        //`;
    //}
    
    
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

    
    const ticketsPendentes = tickets.filter(ticket => ticket.status === 'Pendente');

    verificarTamanho(ticketsPendentes, ticketList)

});
