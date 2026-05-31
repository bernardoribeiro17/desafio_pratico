// Reimplementação do script original como módulo inicializável

interface Produto {
  nome: string;
  preco: number;
  qtd: number;
}

let carrinho: Produto[] = JSON.parse(localStorage.getItem('carrinho') || '[]');

const salvarCarrinho = (): void => {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

const atualizarContador = (): void => {
  const contador = document.getElementById('contador-carrinho');

  if (!contador) return;

  const totalItens = carrinho.reduce((sum, item) => sum + item.qtd, 0);

  contador.textContent = totalItens.toString();
};

const atualizarCarrinho = (): void => {
  const lista = document.getElementById('lista-carrinho');
  const total = document.getElementById('total-carrinho');

  if (!lista || !total) return;

  lista.innerHTML = '';

  const soma = carrinho.reduce((acc, { preco, qtd }) => acc + preco * qtd, 0);

  carrinho.forEach(({ nome, preco, qtd }) => {
    const li = document.createElement('li');

    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const subtotal = preco * qtd;

    li.innerHTML = `
            ${nome} (x${qtd})
            <span>R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        `;

    lista.appendChild(li);
  });

  total.textContent = soma.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  atualizarContador();
};

const mostrarToast = (): void => {
  const toastElemento = document.getElementById('toastCarrinho');

  if (!toastElemento) return;

  const toast = new (window as any).bootstrap.Toast(toastElemento);

  toast.show();
};

const limparCarrinho = (): void => {
  carrinho = [];

  salvarCarrinho();

  atualizarCarrinho();
};

const finalizarCompra = (): void => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');

    return;
  }

  alert('Compra realizada com sucesso! 🛒');

  carrinho = [];

  salvarCarrinho();

  atualizarCarrinho();
};

const carregarDepoimentos = async (): Promise<void> => {
  const container = document.getElementById('lista-depoimentos');

  if (!container) return;

  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');

    const dados = await resposta.json();

    container.innerHTML = dados
      .map(
        (depoimento: any) =>
          `<div class="col-md-4"><div class="card shadow-sm h-100"><div class="card-body"><h6 class="card-title">${depoimento.name}</h6><p class="card-text">${depoimento.body}</p></div></div></div>`
      )
      .join('');
  } catch (_erro) {
    container.innerHTML = 'Erro ao carregar depoimentos.';
  }
};

const attachBuyButtons = (): void => {
  document.querySelectorAll('.btn-comprar').forEach((botao) => {
    // Remove handlers to avoid duplication
    (botao as HTMLElement).replaceWith((botao as HTMLElement).cloneNode(true));
  });

  document.querySelectorAll('.btn-comprar').forEach((botao) => {
    botao.addEventListener('click', function () {
      const nome = (this as HTMLElement).dataset.nome || '';
      const preco = parseFloat((this as HTMLElement).dataset.preco || '0');

      const qtdInput = (this as HTMLElement).parentElement?.querySelector('.qtd-produto') as HTMLInputElement;
      const qtd = parseInt(qtdInput?.value || '1');

      const produtoExistente = carrinho.find((item) => item.nome === nome);

      if (produtoExistente) {
        produtoExistente.qtd += qtd;
      } else {
        carrinho.push({ nome, preco, qtd });
      }

      salvarCarrinho();
      atualizarCarrinho();

      mostrarToast();
    });
  });
};

const initShop = async (): Promise<void> => {
  await carregarDepoimentos();

  atualizarCarrinho();
  atualizarContador();

  // Attach buy buttons after DOM is ready
  attachBuyButtons();

  // Attach finalizar / limpar buttons if present
  const btnFinalizar = document.getElementById('btn-finalizar');
  const btnLimpar = document.getElementById('btn-limpar');

  if (btnFinalizar) btnFinalizar.addEventListener('click', finalizarCompra);
  if (btnLimpar) btnLimpar.addEventListener('click', limparCarrinho);

  // Expor funções no window para compatibilidade com atributos inline (se houver)
  (window as any).limparCarrinho = limparCarrinho;
  (window as any).finalizarCompra = finalizarCompra;
};

export { initShop, atualizarCarrinho, atualizarContador, mostrarToast };
