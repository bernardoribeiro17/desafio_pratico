let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarCarrinho(nome, preco, quantidade){

    const produto = {
        nome: nome,
        preco: preco,
        quantidade: quantidade
    };

    carrinho.push(produto);

    salvarCarrinho();
    atualizarCarrinho();
}

function removerProduto(index){

    carrinho.splice(index,1);

    salvarCarrinho();
    atualizarCarrinho();
}

function limparCarrinho(){

    carrinho = [];

    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarCarrinho(){

    const lista = document.getElementById("lista-carrinho");
    const totalSpan = document.getElementById("total-carrinho");

    if(!lista || !totalSpan) return;

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto,index)=>{

        const li = document.createElement("li");

        li.className="list-group-item d-flex justify-content-between align-items-center";

        const subtotal = produto.preco * produto.quantidade;

        total += subtotal;

        li.innerHTML = `
        <span>
        ${produto.nome} (x${produto.quantidade}) -
        <strong>R$ ${subtotal.toLocaleString("pt-BR",{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        })}</strong>
        </span>

        <button class="btn btn-sm btn-danger"
        onclick="removerProduto(${index})">
        Remover
        </button>
        `;

        lista.appendChild(li);

    });

    totalSpan.textContent = total.toLocaleString("pt-BR",{
        minimumFractionDigits:2,
        maximumFractionDigits:2
    });

}

document.querySelectorAll(".btn-comprar").forEach(botao=>{

    botao.addEventListener("click",function(){

        const nome = this.dataset.nome;
        const preco = parseFloat(this.dataset.preco);

        const quantidade = parseInt(
            this.closest(".card-body")
            .querySelector(".qtd-produto").value
        );

        adicionarCarrinho(nome,preco,quantidade);

    });

});

atualizarCarrinho();


// ===============================
// CARREGAR DEPOIMENTOS DA API
// ===============================

async function carregarDepoimentos(){

    const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

    const dados = await resposta.json();

    const lista = document.getElementById("lista-depoimentos");

    if(!lista) return;

    lista.innerHTML = "";

    dados.forEach(depoimento => {

        lista.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">${depoimento.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${depoimento.email}</h6>
                    <p class="card-text">${depoimento.body}</p>
                </div>
            </div>
        </div>
        `;
    });

}

// chama a função quando a página carregar
carregarDepoimentos();