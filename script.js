// =============================
// CARRINHO COM LOCAL STORAGE
// =============================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


// =============================
// CONTADOR DO CARRINHO
// =============================

function atualizarContador(){

    const contador = document.getElementById("contador-carrinho");

    if(!contador) return;

    let total = 0;

    carrinho.forEach(item=>{
        total += item.qtd;
    });

    contador.textContent = total;

}


// =============================
// ATUALIZAR CARRINHO
// =============================

function atualizarCarrinho(){

    const lista = document.getElementById("lista-carrinho");
    const total = document.getElementById("total-carrinho");

    if(!lista || !total) return;

    lista.innerHTML="";

    let soma = 0;

    carrinho.forEach(item=>{

        const li = document.createElement("li");

        li.className="list-group-item d-flex justify-content-between align-items-center";

        const subtotal = item.preco * item.qtd;

        soma += subtotal;

        li.innerHTML=`
        ${item.nome} (x${item.qtd})
        <span>R$ ${subtotal.toLocaleString("pt-BR",{minimumFractionDigits:2})}</span>
        `;

        lista.appendChild(li);

    });

    total.textContent = soma.toLocaleString("pt-BR",{minimumFractionDigits:2});

    atualizarContador();

}


// =============================
// ADICIONAR PRODUTO
// =============================

document.querySelectorAll(".btn-comprar").forEach(botao=>{

    botao.addEventListener("click",function(){

        const nome = this.dataset.nome;
        const preco = parseFloat(this.dataset.preco);

        const qtdInput = this.parentElement.querySelector(".qtd-produto");
        const qtd = parseInt(qtdInput.value);

        const produtoExistente = carrinho.find(item=>item.nome === nome);

        if(produtoExistente){

            produtoExistente.qtd += qtd;

        }else{

            carrinho.push({
                nome:nome,
                preco:preco,
                qtd:qtd
            });

        }

        salvarCarrinho();
        atualizarCarrinho();

        mostrarToast();

    });

});


// =============================
// TOAST BOOTSTRAP
// =============================

function mostrarToast(){

    const toastElemento = document.getElementById("toastCarrinho");

    if(!toastElemento) return;

    const toast = new bootstrap.Toast(toastElemento);

    toast.show();

}


// =============================
// FINALIZAR COMPRA
// =============================

function finalizarCompra(){

    if(carrinho.length === 0){

        alert("Seu carrinho está vazio!");

        return;

    }

    alert("Compra realizada com sucesso!");

    carrinho=[];

    salvarCarrinho();

    atualizarCarrinho();

}


// =============================
// LIMPAR CARRINHO
// =============================

function limparCarrinho(){

    carrinho=[];

    salvarCarrinho();

    atualizarCarrinho();

}


// =============================
// DEPOIMENTOS API
// =============================

async function carregarDepoimentos(){

    const container = document.getElementById("lista-depoimentos");

    if(!container) return;

    try{

        const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

        const dados = await resposta.json();

        dados.forEach(depoimento=>{

            const div=document.createElement("div");

            div.className="col-md-4";

            div.innerHTML=`

            <div class="card shadow-sm">

            <div class="card-body">

            <h6>${depoimento.name}</h6>

            <p>${depoimento.body}</p>

            </div>

            </div>

            `;

            container.appendChild(div);

        });

    }catch(erro){

        container.innerHTML="Erro ao carregar depoimentos.";

    }

}


// =============================
// FORMULÁRIO DE CONTATO
// =============================

const formulario = document.getElementById("form-contato");

if(formulario){

    formulario.addEventListener("submit", async function(event){

        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const mensagem = document.getElementById("mensagem").value;

        const dados = {

            nome:nome,
            email:email,
            mensagem:mensagem

        };

        try{

            const resposta = await fetch("https://jsonplaceholder.typicode.com/posts",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(dados)

            });

            const alerta = document.getElementById("alerta-form");

            if(resposta.status === 201){

                alerta.innerHTML=`

                <div class="alert alert-success mt-3">

                Mensagem enviada com sucesso! ✅

                </div>

                `;

                formulario.reset();

            }else{

                alerta.innerHTML=`

                <div class="alert alert-danger mt-3">

                Erro ao enviar mensagem.

                </div>

                `;

            }

        }catch(erro){

            const alerta = document.getElementById("alerta-form");

            alerta.innerHTML=`

            <div class="alert alert-danger mt-3">

            Falha na conexão com o servidor.

            </div>

            `;

        }

    });

}


// =============================
// INICIALIZAÇÃO
// =============================

atualizarCarrinho();
atualizarContador();
carregarDepoimentos();