// componentes.js -> esse arquivo monta o header e o footer que ficam repetidos em toda pagina
// (fiz assim pra nao ter q copiar o mesmo html em todo arquivo .html, dá pra reaproveitar)

const DEFAULT_MENU = [
  { nome: "Contatos", link: "contatos.html" },
  { nome: "Recursos", link: "recursos.html" },
  { nome: "Soluções", link: "solucoes.html" }
];

const DEFAULT_PESQUISAS = [
  { termo: "O que é adultização?",       categoria: "Conceito",   link: "chat.html",     tags: "definição conceito criança infantil" },
  { termo: "Riscos das redes sociais",   categoria: "Prevenção",  link: "chat.html",     tags: "internet digital celular exposição" },
  { termo: "Como identificar sinais",    categoria: "Sintomas",   link: "chat.html",     tags: "sintomas alertas comportamento" },
  { termo: "Onde buscar ajuda",          categoria: "Recursos",   link: "recursos.html", tags: "apoio suporte ajuda" },
  { termo: "Contato e denúncia",         categoria: "Denúncia",   link: "contatos.html", tags: "denunciar reportar disque 100" },
  { termo: "Materiais para educadores",  categoria: "Educação",   link: "recursos.html", tags: "escola professor didático" },
  { termo: "Dicas para famílias",        categoria: "Família",    link: "recursos.html", tags: "pais filhos família limites" },
  { termo: "Chat com IA",                categoria: "Assistente", link: "chat.html",     tags: "ia chat conversar perguntas" }
];

async function renderHeader(paginaAtiva = "") {
  const header = document.getElementById("sg-header");
  if (!header) return;

  let menu = DEFAULT_MENU;

  try {
    const res = await fetch("http://localhost:3000/menu");
    if (res.ok) {
      menu = await res.json();
    }
  } catch (error) {
    console.warn("json-server offline, usando menu padrão.");
  }

  const links = menu.map(item =>
    `<li class="nav-item">
       <a class="nav-link${item.nome === paginaAtiva ? ' fw-bold' : ''}"
          href="${item.link}">${item.nome}</a>
     </li>`
  ).join("");

  header.innerHTML = `
    <nav class="navbar navbar-expand-lg sg-header">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html">SafeGrow</a>
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navMain"
                aria-label="Menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">${links}</ul>
          <div class="d-flex gap-2 align-items-center">
            <div class="position-relative">
              <input class="form-control form-control-sm" id="sg-busca"
                     placeholder="Buscar…" style="width:200px;
                     background:#f5f0e8; border-color:#c5b89a;">
              <ul id="sg-resultados" class="list-unstyled position-absolute bg-white shadow rounded p-0 mt-1"
                  style="z-index:999; width:240px; display:none;"></ul>
            </div>
            ${sessionStorage.getItem('sg_admin_logged') === 'true' 
              ? `<a href="cadastro.html" class="btn btn-primary btn-sm">Painel Admin</a>`
              : `<a href="login.html" class="btn btn-outline-primary btn-sm">Entrar</a>`}
          </div>
        </div>
      </div>
    </nav>`;

  // a busca do header, fica filtrando enquanto a pessoa digita
  const input = document.getElementById("sg-busca");
  const lista  = document.getElementById("sg-resultados");
  if (!input || !lista) return;

  let pesquisasCache = null;

  async function obterPesquisas() {
    if (pesquisasCache) return pesquisasCache;
    try {
      const res = await fetch("http://localhost:3000/pesquisas");
      if (res.ok) { pesquisasCache = await res.json(); return pesquisasCache; }
    } catch (e) {}
    pesquisasCache = DEFAULT_PESQUISAS;
    return pesquisasCache;
  }

  function highlight(texto, termo) {
    if (!termo) return texto;
    const re = new RegExp(`(${termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return texto.replace(re, '<mark style="background:#d6e4ff;padding:0 2px;border-radius:3px;">$1</mark>');
  }

  function fecharLista() { lista.style.display = "none"; }

  input.addEventListener("input", async () => {
    const termo = input.value.trim();
    if (!termo) { fecharLista(); return; }

    const pesquisas = await obterPesquisas();
    const termoLower = termo.toLowerCase();

    const filtrados = pesquisas.filter(p =>
      p.termo.toLowerCase().includes(termoLower) ||
      p.categoria.toLowerCase().includes(termoLower) ||
      (p.tags && p.tags.toLowerCase().includes(termoLower))
    );

    if (!filtrados.length) {
      lista.innerHTML = `<li class="px-3 py-2" style="font-size:.85rem;color:#999;">Nenhum resultado para "<strong>${termo}</strong>"</li>`;
      lista.style.display = "block";
      return;
    }

    lista.innerHTML = filtrados.map(p =>
      `<li style="border-bottom:1px solid #eee;">
         <a href="${p.link}" class="d-flex justify-content-between align-items-center px-3 py-2 text-decoration-none text-dark"
            style="font-size:.85rem; gap:8px;">
           <span>${highlight(p.termo, termo)}</span>
           <span class="badge" style="background:#eef2fd;color:#5b7fe0;font-size:.72rem;padding:2px 7px;border-radius:20px;white-space:nowrap;">${p.categoria}</span>
         </a>
       </li>`
    ).join("");
    lista.style.display = "block";
  });

  // Fecha ao clicar fora ou pressionar ESC
  document.addEventListener("click", e => { if (!header.contains(e.target)) fecharLista(); });
  input.addEventListener("keydown", e => { if (e.key === "Escape") { fecharLista(); input.blur(); } });

  // Abre a lista ao focar se já tiver texto
  input.addEventListener("focus", () => { if (input.value.trim()) input.dispatchEvent(new Event("input")); });
}

// monta o rodape (fica igual em todas as paginas tbm)
function renderFooter() {
  const footer = document.getElementById("sg-footer");
  if (!footer) return;

  footer.innerHTML = `
    <footer class="sg-footer">
      <div class="sg-footer-icons">
        <a href="#" aria-label="X/Twitter" class="btn btn-outline-primary d-flex align-items-center justify-content-center p-0" style="width:36px;height:36px;font-size:16px;"><i class="bi-twitter-x"></i></a>
        <a href="#" aria-label="Instagram"  class="btn btn-outline-primary d-flex align-items-center justify-content-center p-0" style="width:36px;height:36px;font-size:16px;"><i class="bi-instagram"></i></a>
        <a href="#" aria-label="YouTube"    class="btn btn-outline-primary d-flex align-items-center justify-content-center p-0" style="width:36px;height:36px;font-size:16px;"><i class="bi-youtube"></i></a>
        <a href="#" aria-label="LinkedIn"   class="btn btn-outline-primary d-flex align-items-center justify-content-center p-0" style="width:36px;height:36px;font-size:16px;"><i class="bi-linkedin"></i></a>
      </div>
      <div class="sg-footer-divider"></div>
      <nav class="sg-footer-links">
        <div><a href="contatos.html">Contatos</a><span>Fale conosco</span></div>
        <div><a href="recursos.html">Recursos</a><span>Apoio e orientação</span></div>
        <div><a href="solucoes.html">Sobre</a><span>Nossa missão</span></div>
      </nav>
      <div class="sg-footer-divider"></div>
      <a href="avaliacao.html" class="sg-btn-outline" style="font-size:13px;">
        Avaliar site <i class="bi-star ms-1"></i>
      </a>
    </footer>`;
}
