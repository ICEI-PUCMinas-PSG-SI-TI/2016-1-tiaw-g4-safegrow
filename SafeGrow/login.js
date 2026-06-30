// login.js - cuida do formulario de login (tanto admin quanto usuario comum)

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  inicializarFormularioLogin();
});

function inicializarFormularioLogin() {
  const form = document.getElementById('formLogin');
  const erroMsg = document.getElementById('loginErro');

  if (!form) return;

  form.onsubmit = async function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const senha = document.getElementById('loginSenha').value;

    // login fixo do admin (professor pediu pra deixar assim, sem senha "de verdade" mesmo)
    if (email === 'admin@safegrow.org' && senha === 'admin') {
      sessionStorage.setItem('sg_admin_logged', 'true');
      if (erroMsg) erroMsg.textContent = '';
      window.location.href = 'cadastro.html';
      return;
    }

    // se nao for o admin, ve se o email ja ta cadastrado
    let usuarios = [];
    try {
      const res = await fetch('http://localhost:3000/usuarios');
      if (res.ok) {
        usuarios = await res.json();
      }
    } catch (err) {
      console.warn('Erro ao conectar na API para login, buscando no localStorage...');
    }

    // se a api nao respondeu, tenta no localStorage mesmo
    if (!usuarios.length) {
      usuarios = JSON.parse(localStorage.getItem('sg_usuarios') || '[]');
    }

    const usuarioExiste = usuarios.some(u => u.email.toLowerCase() === email);

    if (usuarioExiste) {
      sessionStorage.removeItem('sg_admin_logged'); // garante que nao ficou logado como admin de antes
      alert('Login realizado com sucesso! Bem-vindo de volta.');
      window.location.href = 'index.html';
    } else {
      if (erroMsg) {
        erroMsg.textContent = 'E-mail não encontrado. Caso não tenha conta, por favor, clique em Cadastre-se.';
      }
    }
  };
}
