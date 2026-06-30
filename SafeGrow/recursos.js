// recursos.js - carrega o card principal e os cards menores da pagina de recursos
document.addEventListener('DOMContentLoaded', () => {
  renderHeader('Recursos');
  renderFooter();
  carregarDadosRecursos();
});

async function carregarDadosRecursos() {
  try {
    // primeiro tenta no json-server
    const resPrincipal = await fetch('http://localhost:3000/cardprincipal');
    const resCards = await fetch('http://localhost:3000/cards');
    
    if (resPrincipal.ok && resCards.ok) {
      const principal = await resPrincipal.json();
      const cards = await resCards.json();
      carregarTopo(principal);
      carregarCards(cards);
      return;
    }
  } catch (error) {
    console.warn('Não foi possível conectar ao json-server. Usando dados locais do db.json...');
  }

  // se nao conseguiu, le o db.json direto (sem precisar do servidor rodando)
  try {
    const resDb = await fetch('db.json');
    if (resDb.ok) {
      const db = await resDb.json();
      carregarTopo(db.cardprincipal);
      carregarCards(db.cards);
    }
  } catch (error) {
    console.error('Erro ao carregar dados locais:', error);
  }
}

function carregarTopo(recursos) {
  const container = document.getElementById('empresa-detalhes');
  if (!container) return;
  container.innerHTML = recursos.map(obj => `
    <div class="card-principal">
      <img src="${obj.imagem}" alt="${obj.titulo}">
      <div>
        <h2>${obj.titulo}</h2>
        <p>${obj.descricao}</p>
        <p>${obj.objetivo}</p>
      </div>
    </div>
  `).join('');
}

function carregarCards(cards) {
  const container = document.getElementById('cards-container');
  if (!container) return;
  container.innerHTML = cards.map(item => `
    <div class="rec-card">
      <img src="${item.imagem}" alt="${item.titulo}">
      <div class="rec-card-body">
        <p class="rec-card-cat">${item.categoria}</p>
        <h3 class="rec-card-title">${item.titulo}</h3>
        <p class="rec-card-desc">${item.descricao}</p>
        <a href="${item.link}" target="_blank" rel="noopener" class="sg-btn-outline"
           style="font-size:.85rem; padding:8px 18px; text-align:center; text-decoration:none; display:block;">
          Saiba mais <i class="bi-box-arrow-up-right ms-1"></i>
        </a>
      </div>
    </div>
  `).join('');
}
