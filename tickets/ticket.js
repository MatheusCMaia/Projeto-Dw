document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        
        const titulo = document.getElementById("tituloTicket").value;
        const descricao = document.getElementById("descricaoTicket").value;

        
        const ticketData = {
            titulo: titulo,
            descricao: descricao,
            prioridade: "Não Definida",
            status: "Pendente", 
            dataCriacao: new Date().toISOString() 
        };

        
        let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        tickets.push(ticketData);
        
       
        localStorage.setItem('tickets', JSON.stringify(tickets));

        
        alert("Ticket criado com sucesso!");
        form.reset(); 
    });
});
