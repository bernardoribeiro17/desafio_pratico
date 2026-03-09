import { buscarDepoimentos, enviarFormulario } from "./api.js";
import {
    atualizarCarrinho,
    atualizarContador,
    mostrarToast,
    mostrarAlerta,
    renderizarDepoimentos
} from "./ui.js";

// =============================
// CARRINHO LOCAL STORAGE
// =============================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// =============================
// ADICIONAR PRODUTO
// =============================

document.querySelectorAll(".btn-comprar").forEach(botao => {

    botao.addEventListener("click", function() {

        const nome = this.dataset.nome;
        const preco = parseFloat(this.dataset.preco);

        const qtdInput = this.parentElement.querySelector(".qtd-produto");
        const qtd = parseInt(qtdInput.value);

        const produtoExistente = carrinho.find(item => item.nome === nome);

        if (produtoExistente) {
            produtoExistente.qtd += qtd;
        } else {
            carrinho.push({
                nome: nome,
                preco: preco,
                qtd: qtd
            });
        }

        salvarCarrinho();

        atualizarCarrinho(carrinho);
        atualizarContador(carrinho);

        mostrarToast();

    });

});

// =============================
// FINALIZAR COMPRA
// =============================

window.finalizarCompra = function() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra realizada com sucesso!");

    carrinho = [];

    salvarCarrinho();

    atualizarCarrinho(carrinho);
    atualizarContador(carrinho);

}

// =============================
// LIMPAR CARRINHO
// =============================

window.limparCarrinho = function() {

    carrinho = [];

    salvarCarrinho();

    atualizarCarrinho(carrinho);
    atualizarContador(carrinho);

}

// =============================
// MODAL DE COMPRA (ABRIR AUTOMATICAMENTE)
// =============================

const modalCompra = new bootstrap.Modal(document.getElementById("modalCompra"));
modalCompra.show(); // abre o modal de compra automaticamente

// =============================
// MODAL DE PRODUTO (DETALHES)
// =============================

const modalProduto = document.getElementById("modalProduto");

if (modalProduto) {

    modalProduto.addEventListener("show.bs.modal", function(event) {

        const botao = event.relatedTarget;

        const nome = botao.getAttribute("data-nome");
        const descricao = botao.getAttribute("data-descricao");
        const preco = botao.getAttribute("data-preco");

        document.getElementById("modalTitulo").textContent = nome;

        document.getElementById("modalDescricao").textContent = descricao;

        document.getElementById("modalPreco").textContent =
            "R$ " + parseFloat(preco).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
            });

    });

}

// =============================
// CARREGAR DEPOIMENTOS
// =============================

async function carregarDepoimentos() {

    try {

        const dados = await buscarDepoimentos();

        renderizarDepoimentos(dados);

    } catch {

        console.log("Erro ao carregar depoimentos");

    }

}

// =============================
// FORMULÁRIO
// =============================

const formulario = document.getElementById("form-contato");

if (formulario) {

    formulario.addEventListener("submit", async function(event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const mensagem = document.getElementById("mensagem").value;

        const dados = {
            nome: nome,
            email: email,
            mensagem: mensagem
        };

        try {

            const resposta = await enviarFormulario(dados);

            if (resposta.status === 201) {

                mostrarAlerta("success", "Mensagem enviada com sucesso! ✅");

                formulario.reset();

            } else {

                mostrarAlerta("danger", "Erro ao enviar mensagem.");

            }

        } catch {

            mostrarAlerta("danger", "Falha na conexão com o servidor.");

        }

    });

}

// =============================
// INICIALIZAÇÃO
// =============================

atualizarCarrinho(carrinho);
atualizarContador(carrinho);

carregarDepoimentos();