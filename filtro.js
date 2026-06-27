let noticiasDaApi = [];
let todasNoticias = [];
let filtroCategoriaAtivo = "Todas";
let termoBusca = "";
let ordenacaoAtual = "recentes";

const API_URL = "http://localhost:3000/noticias";

let noticiasAdicionadas = JSON.parse(localStorage.getItem('noticiasAdicionadas')) || [];
let noticiasEditadas = JSON.parse(localStorage.getItem('noticiasEditadas')) || [];
let noticiasExcluidas = JSON.parse(localStorage.getItem('noticiasExcluidas')) || [];

const cabecalho = document.getElementById("cabecalho");
const btnAcessar = document.getElementById("btn-acessar");
const telaInicial = document.getElementById("tela-inicial");
const secaoNoticias = document.getElementById("secao-noticias");
const newsGrid = document.getElementById("news-grid");
const inputBusca = document.getElementById("input-busca");
const btnFiltros = document.querySelectorAll(".btn-filter");
const selectOrdem = document.getElementById("select-ordem");
const msgErro = document.getElementById("mensagem-erro");
const msgVazio = document.getElementById("mensagem-vazio");

let modalNoticiaInstancia;
let modalFormInstancia;
document.addEventListener("DOMContentLoaded", () => {
  modalNoticiaInstancia = new bootstrap.Modal(document.getElementById('modalNoticia'));
  modalFormInstancia = new bootstrap.Modal(document.getElementById('modalFormNoticia'));
});
const modalCategoria = document.getElementById("modal-categoria");
const modalTitulo = document.getElementById("modal-titulo");
const modalAutor = document.getElementById("modal-autor");
const modalData = document.getElementById("modal-data");
const modalConteudo = document.getElementById("modal-conteudo");

btnAcessar.addEventListener("click", () => {
  telaInicial.classList.add("d-none");
  cabecalho.classList.remove("d-none");
  secaoNoticias.classList.remove("d-none");
  carregarNoticias();
});

inputBusca.addEventListener("input", (e) => {
  termoBusca = e.target.value.toLowerCase();
  renderizarNoticias();
});

selectOrdem.addEventListener("change", (e) => {
  ordenacaoAtual = e.target.value;
  renderizarNoticias();
});

btnFiltros.forEach(btn => {
  btn.addEventListener("click", (e) => {
    btnFiltros.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    
    filtroCategoriaAtivo = e.target.getAttribute("data-categoria");
    renderizarNoticias();
  });
});

function aplicarMergeLocal() {
  let base = [...noticiasDaApi];
  base = base.filter(n => !noticiasExcluidas.includes(String(n.id)));
  base = base.map(n => {
    const edicao = noticiasEditadas.find(e => String(e.id) === String(n.id));
    if (edicao) return { ...edicao, _isLocalEdited: true };
    return n;
  });
  const novasFormatadas = noticiasAdicionadas.map(n => ({ ...n, _isLocalNew: true }));
  todasNoticias = [...base, ...novasFormatadas];
}

async function carregarNoticias() {
  try {
    msgErro.classList.add("d-none");
    newsGrid.innerHTML = '<div class="col-12 text-center text-muted py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">Carregando notícias...</p></div>';
    
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }
    
    noticiasDaApi = await response.json();
    aplicarMergeLocal();
    renderizarNoticias();
  } catch (error) {
    console.error("Falha ao buscar notícias:", error);
    msgErro.textContent = "Erro ao carregar notícias. Verifique se o JSON Server está rodando em http://localhost:3000/noticias.";
    msgErro.classList.remove("d-none");
    newsGrid.innerHTML = "";
  }
}

function renderizarNoticias() {
  let noticiasFiltradas = todasNoticias.filter(noticia => {
    const matchCategoria = filtroCategoriaAtivo === "Todas" || noticia.categoria === filtroCategoriaAtivo;
    
    const textoBusca = termoBusca.trim();
    const titulo = (noticia.titulo || "").toLowerCase();
    const resumo = (noticia.resumo || "").toLowerCase();
    const categoria = (noticia.categoria || "").toLowerCase();
    
    const matchBusca = textoBusca === "" || 
                       titulo.includes(textoBusca) || 
                       resumo.includes(textoBusca) || 
                       categoria.includes(textoBusca);
                       
    return matchCategoria && matchBusca;
  });

  noticiasFiltradas.sort((a, b) => {
    const dateA = new Date(a.data).getTime() || 0;
    const dateB = new Date(b.data).getTime() || 0;
    
    if (ordenacaoAtual === "recentes") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  if (noticiasFiltradas.length === 0) {
    newsGrid.innerHTML = "";
    msgVazio.classList.remove("d-none");
  } else {
    msgVazio.classList.add("d-none");
    
    newsGrid.innerHTML = noticiasFiltradas.map(noticia => {
      const badgeCor = getBadgeColor(noticia.categoria);
      const dataFormatada = formatarData(noticia.data);
      
      let botaoHtml = "";
      if (noticia.url && noticia.url.trim() !== "") {
        botaoHtml = `<a href="${noticia.url}" target="_blank" class="btn btn-custom btn-sm w-100 mb-2">Ler notícia completa 🔗</a>`;
      } else {
        botaoHtml = `<button onclick="abrirModal('${noticia.id}')" class="btn btn-custom btn-sm w-100 mb-2">Ler notícia completa 🔗</button>`;
      }

      let badgeLocal = "";
      if (noticia._isLocalNew) badgeLocal = `<span class="badge bg-success ms-2">🆕 criado por você</span>`;
      else if (noticia._isLocalEdited) badgeLocal = `<span class="badge bg-warning text-dark ms-2">✏️ editado por você</span>`;

      return `
        <div class="card-noticia p-3 d-flex flex-column shadow-sm">
          <div class="mb-2 d-flex align-items-center flex-wrap gap-1">
            <span class="badge ${badgeCor}">${noticia.categoria}</span>
            ${badgeLocal}
            <div class="ms-auto dropdown">
              <button class="btn btn-sm btn-light text-muted border-0 p-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                <li><a class="dropdown-item" href="#" onclick="abrirModalFormulario('${noticia.id}'); return false;"><i class="bi bi-pencil me-2"></i> Editar</a></li>
                <li><a class="dropdown-item text-danger" href="#" onclick="excluirNoticia('${noticia.id}'); return false;"><i class="bi bi-trash me-2"></i> Excluir</a></li>
              </ul>
            </div>
          </div>
          <h3 class="card-title h5 mt-1">${noticia.titulo}</h3>
          <p class="card-text flex-grow-1 mb-3">${noticia.resumo}</p>
          
          <div class="card-footer-custom text-muted d-flex justify-content-between mb-3">
            <small><i class="bi bi-person"></i> ${noticia.autor}</small>
            <small><i class="bi bi-calendar3"></i> ${dataFormatada}</small>
          </div>
          
          <div>
            ${botaoHtml}
          </div>
        </div>
      `;
    }).join("");
  }
}

window.abrirModal = function(id) {
  const noticia = todasNoticias.find(n => String(n.id) === String(id));
  if (!noticia) return;

  modalCategoria.className = `badge rounded-pill mb-2 px-3 py-2 ${getBadgeColor(noticia.categoria)}`;
  modalCategoria.textContent = noticia.categoria;
  
  modalTitulo.textContent = noticia.titulo;
  modalAutor.textContent = noticia.autor;
  modalData.textContent = formatarData(noticia.data);
  
  if (noticia.conteudo) {
    const paragrafos = noticia.conteudo.split('\\n').map(p => {
      if(p.trim() !== "") return `<p>${p}</p>`;
      return "";
    }).join('');
    modalConteudo.innerHTML = paragrafos;
  } else {
    modalConteudo.innerHTML = '<p>Conteúdo completo não disponível.</p>';
  }

  modalNoticiaInstancia.show();
};

function getBadgeColor(categoria) {
  switch (categoria) {
    case 'Segurança': return 'text-bg-danger';
    case 'Sociedade': return 'text-bg-warning';
    case 'Direitos Humanos': return 'text-bg-success';
    case 'Política': return 'text-bg-info';
    default: return 'text-bg-secondary';
  }
}

function formatarData(dataStr) {
  if (!dataStr) return "";
  const partes = dataStr.substring(0, 10).split("-");
  if (partes.length === 3) {
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
  return dataStr;
}

window.abrirModalFormulario = function(id = null) {
  document.getElementById('form-noticia').reset();
  
  if (id && id !== 'undefined' && id !== 'null') {
    const noticia = todasNoticias.find(n => String(n.id) === String(id));
    if (noticia) {
      document.getElementById('form-id').value = noticia.id;
      document.getElementById('form-titulo').value = noticia.titulo || "";
      document.getElementById('form-resumo').value = noticia.resumo || "";
      document.getElementById('form-categoria').value = noticia.categoria || "Segurança";
      document.getElementById('form-autor').value = noticia.autor || "";
      document.getElementById('form-data').value = noticia.data || "";
      document.getElementById('form-conteudo').value = noticia.conteudo || "";
      document.getElementById('form-url').value = noticia.url || "";
      document.getElementById('modalFormNoticiaLabel').textContent = "Editar Notícia";
    }
  } else {
    document.getElementById('form-id').value = "";
    document.getElementById('form-data').value = new Date().toISOString().split('T')[0];
    document.getElementById('modalFormNoticiaLabel').textContent = "Nova Notícia";
  }
  modalFormInstancia.show();
};

window.salvarNoticia = function() {
  const id = document.getElementById('form-id').value;
  const titulo = document.getElementById('form-titulo').value;
  const resumo = document.getElementById('form-resumo').value;
  const categoria = document.getElementById('form-categoria').value;
  const autor = document.getElementById('form-autor').value;
  const data = document.getElementById('form-data').value;
  const conteudo = document.getElementById('form-conteudo').value;
  const url = document.getElementById('form-url').value;

  if(!titulo || !resumo || !categoria || !autor || !data) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  const novaNoticia = {
    titulo, resumo, categoria, autor, data, conteudo, url
  };

  if (id) {
    novaNoticia.id = id.startsWith('local_') ? id : (isNaN(Number(id)) ? id : Number(id));
    
    if (String(id).startsWith('local_')) {
      const index = noticiasAdicionadas.findIndex(n => String(n.id) === String(id));
      if (index !== -1) noticiasAdicionadas[index] = novaNoticia;
    } else {
      const index = noticiasEditadas.findIndex(n => String(n.id) === String(id));
      if (index !== -1) {
        noticiasEditadas[index] = novaNoticia;
      } else {
        noticiasEditadas.push(novaNoticia);
      }
    }
  } else {
    novaNoticia.id = "local_" + Date.now();
    noticiasAdicionadas.push(novaNoticia);
  }

  atualizarLocalStorage();
  aplicarMergeLocal();
  renderizarNoticias();
  modalFormInstancia.hide();
};

window.excluirNoticia = function(id) {
  if(confirm("Tem certeza que deseja excluir esta notícia (apenas para você)?")) {
    if (String(id).startsWith('local_')) {
      noticiasAdicionadas = noticiasAdicionadas.filter(n => String(n.id) !== String(id));
    } else {
      noticiasEditadas = noticiasEditadas.filter(n => String(n.id) !== String(id));
      if(!noticiasExcluidas.includes(String(id))) {
        noticiasExcluidas.push(String(id));
      }
    }
    atualizarLocalStorage();
    aplicarMergeLocal();
    renderizarNoticias();
  }
};

window.resetarAlteracoes = function() {
  if(confirm("Deseja apagar todas as suas edições e criações locais?")) {
    noticiasAdicionadas = [];
    noticiasEditadas = [];
    noticiasExcluidas = [];
    atualizarLocalStorage();
    aplicarMergeLocal();
    renderizarNoticias();
  }
};

function atualizarLocalStorage() {
  localStorage.setItem('noticiasAdicionadas', JSON.stringify(noticiasAdicionadas));
  localStorage.setItem('noticiasEditadas', JSON.stringify(noticiasEditadas));
  localStorage.setItem('noticiasExcluidas', JSON.stringify(noticiasExcluidas));
}