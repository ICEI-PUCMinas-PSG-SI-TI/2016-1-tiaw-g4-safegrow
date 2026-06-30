// contatos.js - so valida o formulario de contato (nao manda pra lugar nenhum de verdade,
// é só front mesmo, fake de envio)
document.addEventListener('DOMContentLoaded', () => {
  renderHeader('Contatos');
  renderFooter();
  inicializarFormularioContato();
});

function inicializarFormularioContato() {
  const form = document.getElementById('formContato');
  if (!form) return;

  form.onsubmit = function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    const erro = document.getElementById('mensagemErro');
    const sucesso = document.getElementById('mensagemSucesso');

    if (!nome || !email || !mensagem) {
      erro.textContent = 'Preencha nome, e-mail e mensagem antes de enviar.';
      if (sucesso) sucesso.style.display = 'none';
      return;
    }

    erro.textContent = '';
    if (sucesso) {
      sucesso.style.display = 'block';
    }
    this.reset();
  };
}
