// Função que calcula o valor total
function calcularTotal() {
    let total = 0;

    // Seleciona todos os checkboxes dos produtos
    const produtos = document.querySelectorAll(".item-produto");

    produtos.forEach(function (checkbox) {
        if (checkbox.checked) {
            const preco = parseFloat(checkbox.value);

            // Pega a quantidade correspondente ao mesmo card
            const quantidade = parseInt(
                checkbox.closest(".card-body")
                        .querySelector(".qtd-produto").value
            );

            total += preco * quantidade;
        }
    });

    // Atualiza o valor total na tela
    document.getElementById("valor-total").textContent =
        total.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
}


// =============================
// EVENT LISTENERS (IMPORTANTE)
// =============================

// Seleciona todos os checkboxes e inputs de quantidade
const elementos = document.querySelectorAll(".item-produto, .qtd-produto");

// Adiciona o evento "change" para cada um
elementos.forEach(function (elemento) {
    elemento.addEventListener("change", calcularTotal);
});