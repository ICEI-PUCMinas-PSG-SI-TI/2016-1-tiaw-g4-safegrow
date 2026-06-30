// cadastro.js - essa pagina serve pra duas coisas: cadastro de visitante novo
// e tambem o painel do admin (a diferença é o que ta no sessionStorage)
const api = 'http://localhost:3000/usuarios';
let fallbackUsuarios = [];
const isAdmin = sessionStorage.getItem('sg_admin_logged') === 'true';
let cadastroRealizado = false;

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  inicializarCadastro();
});

async function inicializarCadastro() {
  const form = document.getElementById('formUsuario');
  const inputPesquisa = document.getElementById('pesquisa');
  const btnLogout = document.getElementById('btnLogout');
  const tabelaCard = document.getElementById('tabelaUsuariosCard');
  
  const cadTitle = document.getElementById('cadTitle');
  const cadSubTitle = document.getElementById('cadSubTitle');
  const btnSalvar = document.getElementById('btnSalvar');

  if (isAdmin) {
    if (tabelaCard) tabelaCard.style.display = 'block';
    if (btnLogout) btnLogout.style.display = 'inline-flex';
    if (cadTitle) cadTitle.textContent = 'Painel Administrativo — Cadastro de Usuários';
    if (cadSubTitle) cadSubTitle.textContent = 'Preencha os dados abaixo para criar ou editar um usuário';
    if (btnSalvar) btnSalvar.innerHTML = 'Salvar usuário <i class="bi-check2-circle ms-1"></i>';

    if (btnLogout) {
      btnLogout.onclick = () => {
        sessionStorage.removeItem('sg_admin_logged');
        window.location.replace('index.html');
      };
    }

    if (inputPesquisa) {
      inputPesquisa.onkeyup = filtrarUsuarios;
    }

    await carregarUsuarios();
  } else {
    if (tabelaCard) tabelaCard.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'none';
    if (cadTitle) cadTitle.textContent = 'Criar Conta';
    if (cadSubTitle) cadSubTitle.textContent = 'Preencha os dados abaixo para se cadastrar no SafeGrow';
    if (btnSalvar) btnSalvar.innerHTML = 'Cadastrar-se <i class="bi-person-plus ms-1"></i>';

    // botao de voltar so aparece pra quem nao é admin
    const btnVoltar = document.getElementById('btnVoltar');
    if (btnVoltar) {
      btnVoltar.style.display = 'inline-flex';
      btnVoltar.onclick = () => {
        window.location.href = 'index.html';
      };
    }
  }

  if (form) {
    form.onsubmit = submeterFormulario;
  }
}

async function carregarUsuarios() {
  try {
    const res = await fetch(api);
    if (res.ok) {
      const usuarios = await res.json();
      renderizarTabela(usuarios);
      return;
    }
  } catch (error) {
    console.warn('json-server não encontrado. Utilizando localStorage...');
  }

  // se nao tiver json-server rodando, cai pro localStorage
  if (!localStorage.getItem('sg_usuarios')) {
    // antes de inicializar vazio, tenta puxar o db.json que ja vem com uns dados
    try {
      const resDb = await fetch('db.json');
      if (resDb.ok) {
        const db = await resDb.json();
        localStorage.setItem('sg_usuarios', JSON.stringify(db.usuarios || []));
      }
    } catch (e) {
      // nao achou nada, fica vazio mesmo
      localStorage.setItem('sg_usuarios', JSON.stringify([]));
    }
  }

  fallbackUsuarios = JSON.parse(localStorage.getItem('sg_usuarios') || '[]');
  renderizarTabela(fallbackUsuarios);
}

function renderizarTabela(usuarios) {
  const lista = document.getElementById('listaUsuarios');
  if (!lista) return;

  lista.innerHTML = usuarios.map(u => `
    <tr>
      <td>${u.id}</td>
      <td>${u.nome}</td>
      <td>${u.email}</td>
      <td>${u.telefone || '-'}</td>
      <td>${u.idade || '-'}</td>
      <td>${u.cidade || '-'}</td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn-editar" onclick="editarUsuario(${u.id}, '${u.nome}', '${u.email}', '${u.telefone || ''}', '${u.idade || ''}', '${u.cidade || ''}')">
            Editar
          </button>
          <button class="btn-excluir" onclick="removerUsuario(${u.id})">
            Excluir
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

async function submeterFormulario(e) {
  e.preventDefault();
  const idVal = document.getElementById('id').value;
  const usuario = {
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefone: document.getElementById('telefone').value.trim(),
    idade: parseInt(document.getElementById('idade').value) || '',
    cidade: document.getElementById('cidade').value.trim()
  };

  let salvoComSucesso = false;

  try {
    let res;
    if (idVal) {
      res = await fetch(`${api}/${idVal}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
    } else {
      res = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
    }

    if (res && res.ok) {
      salvoComSucesso = true;
    }
  } catch (error) {
    console.warn('Erro ao salvar via API. Tentando localmente...');
  }

  if (!salvoComSucesso) {
    let list = JSON.parse(localStorage.getItem('sg_usuarios') || '[]');
    if (idVal) {
      list = list.map(u => u.id == idVal ? { ...u, ...usuario } : u);
    } else {
      const novoId = list.reduce((max, u) => u.id > max ? u.id : max, 0) + 1;
      list.push({ id: novoId, ...usuario });
    }
    localStorage.setItem('sg_usuarios', JSON.stringify(list));
    salvoComSucesso = true;
  }

  if (salvoComSucesso) {
    document.getElementById('formUsuario').reset();
    document.getElementById('id').value = '';
    
    if (isAdmin) {
      await carregarUsuarios();
    } else {
      const sucessoMsg = document.getElementById('cadastroSucesso');
      if (sucessoMsg) {
        sucessoMsg.style.display = 'block';
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        setTimeout(() => {
          sucessoMsg.style.display = 'none';
        }, 4000);
      }
    }
  }
}

function editarUsuario(idVal, nomeVal, emailVal, telVal, idadeVal, cidadeVal) {
  document.getElementById('id').value = idVal;
  document.getElementById('nome').value = nomeVal;
  document.getElementById('email').value = emailVal;
  document.getElementById('telefone').value = telVal;
  document.getElementById('idade').value = idadeVal;
  document.getElementById('cidade').value = cidadeVal;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.editarUsuario = editarUsuario;

async function removerUsuario(idVal) {
  if (!confirm('Deseja realmente excluir este usuário?')) return;

  try {
    const res = await fetch(`${api}/${idVal}`, { method: 'DELETE' });
    if (res.ok) {
      await carregarUsuarios();
      return;
    }
  } catch (error) {
    console.warn('Erro ao deletar via API. Removendo localmente...');
  }

  // se a api falhar, remove direto do localStorage
  let list = JSON.parse(localStorage.getItem('sg_usuarios') || '[]');
  list = list.filter(u => u.id != idVal);
  localStorage.setItem('sg_usuarios', JSON.stringify(list));
  await carregarUsuarios();
}

window.removerUsuario = removerUsuario;

async function filtrarUsuarios() {
  const termo = document.getElementById('pesquisa').value.toLowerCase().trim();

  // se o json-server tiver no ar a gente busca de novo e filtra, senao usa o que ja carregou antes
  try {
    const res = await fetch(api);
    if (res.ok) {
      const usuarios = await res.json();
      const filtrados = usuarios.filter(u => u.nome.toLowerCase().includes(termo));
      renderizarTabela(filtrados);
      return;
    }
  } catch (e) {}

  const filtrados = fallbackUsuarios.filter(u => u.nome.toLowerCase().includes(termo));
  renderizarTabela(filtrados);
}
