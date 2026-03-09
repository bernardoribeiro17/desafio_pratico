let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho(){
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarCarrinho(nome, preco, quantidade){

    const produtoExistente = carrinho.find(produto => produto.nome === nome);

    if(produtoExistente){
        produtoExistente.quantidade += quantidade;
    }else{
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: quantidade
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
    mostrarMensagem();
}

function alterarQuantidade(index, valor){

    carrinho[index].quantidade += valor;

    if(carrinho[index].quantidade <= 0){
        carrinho.splice(index,1);
    }

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
    const contador = document.getElementById("contador-carrinho");

    if(!lista || !totalSpan) return;

    lista.innerHTML = "";

    let total = 0;
    let totalItens = 0;

    carrinho.forEach((produto,index)=>{

        const subtotal = produto.preco * produto.quantidade;

        total += subtotal;
        totalItens += produto.quantidade;

        const li = document.createElement("li");

        li.className="list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
        <div>
            <strong>${produto.nome}</strong><br>

            <button class="btn btn-sm btn-secondary"
            onclick="alterarQuantidade(${index},-1)">-</button>

            ${produto.quantidade}

            <button class="btn btn-sm btn-secondary"
            onclick="alterarQuantidade(${index},1)">+</button>

            <span class="ms-3">
            R$ ${subtotal.toLocaleString("pt-BR",{
                minimumFractionDigits:2,
                maximumFractionDigits:2
            })}
            </span>
        </div>

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

    if(contador){
        contador.textContent = totalItens;
    }

}

function mostrarMensagem(){

    const alerta = document.createElement("div");

    alerta.className = "alert alert-success position-fixed top-0 end-0 m-3";

    alerta.innerText = "Produto adicionado ao carrinho!";

    document.body.appendChild(alerta);

    setTimeout(()=>{
        alerta.remove();
    },2000);

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
// DEPOIMENTOS DA API
// ===============================

async function carregarDepoimentos(){

    const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

    const dados = await resposta.json();

    const lista = document.getElementById("lista-depoimentos");

    if(!lista) return;

    lista.innerHTML="";

    dados.forEach(depoimento=>{

        lista.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5>${depoimento.name}</h5>
                    <h6 class="text-muted">${depoimento.email}</h6>
                    <p>${depoimento.body}</p>
                </div>
            </div>
        </div>
        `;
    });

}

carregarDepoimentos();