document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Captura os dados do formulário
        const titulo = document.getElementById("tituloTicket").value;
        const descricao = document.getElementById("descricaoTicket").value;

        // Cria um objeto com os dados capturados
        const ticketData = {
            titulo: titulo,
            descricao: descricao,
            prioridade: "Não Definida", // Define a prioridade como "Não Definida"
            status: "Pendente", // Status inicial padrão
            dataCriacao: new Date().toISOString() // Adiciona a data de criação
        };

        // Recupera os tickets existentes do localStorage
        let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        tickets.push(ticketData);
        
        // Salva os tickets atualizados no localStorage
        localStorage.setItem('tickets', JSON.stringify(tickets));

        // Exibir uma mensagem de confirmação ou redirecionar para outra página
        alert("Ticket criado com sucesso!");
        form.reset(); // Reseta o formulário após a submissão
    });
});
