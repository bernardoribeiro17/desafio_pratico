// =============================
// ATUALIZAR CONTADOR
// =============================

export function atualizarContador(carrinho){

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

export function atualizarCarrinho(carrinho){

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

}


// =============================
// TOAST
// =============================

export function mostrarToast(){

    const toastElemento = document.getElementById("toastCarrinho");

    if(!toastElemento) return;

    const toast = new bootstrap.Toast(toastElemento);

    toast.show();

}


// =============================
// ALERTA FORMULÁRIO
// =============================

export function mostrarAlerta(tipo,mensagem){

    const alerta = document.getElementById("alerta-form");

    if(!alerta) return;

    alerta.innerHTML=`
    <div class="alert alert-${tipo} mt-3">
    ${mensagem}
    </div>
    `;

}


// =============================
// RENDERIZAR DEPOIMENTOS
// =============================

export function renderizarDepoimentos(listaDepoimentos){

    const container = document.getElementById("lista-depoimentos");

    if(!container) return;

    container.innerHTML="";

    listaDepoimentos.forEach(depoimento=>{

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

}