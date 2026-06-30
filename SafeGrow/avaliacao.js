// avaliacao.js - estrelinhas de avaliacao do site, salva tudo no localStorage mesmo
let notaSelecionada = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
});

function selecionarNota(n) {
  notaSelecionada = n;
  const estrelas = document.querySelectorAll(".sg-star");
  const labels = ["", "Muito ruim", "Ruim", "Regular", "Bom", "Excelente"];
  estrelas.forEach((el, i) => {
    el.classList.toggle("ativa", i < n);
    el.className = "sg-star " + (i < n ? "bi-star-fill ativa" : "bi-star");
    el.setAttribute("onclick", `selecionarNota(${i + 1})`);
  });
  const texto = document.getElementById("nota-texto");
  if (texto) texto.textContent = labels[n] || "";
}

function enviarAvaliacao() {
  if (notaSelecionada === 0) {
    alert("Selecione uma nota antes de enviar.");
    return;
  }

  const avaliacao = {
    nota: notaSelecionada,
    comentario: document.getElementById("comentario").value,
    data: new Date().toLocaleDateString("pt-BR")
  };

  const avaliacoes = JSON.parse(localStorage.getItem("sg_avaliacoes") || "[]");
  avaliacoes.push(avaliacao);
  localStorage.setItem("sg_avaliacoes", JSON.stringify(avaliacoes));

  const msg = document.getElementById("mensagem");
  if (msg) msg.style.display = "block";
  
  const comentario = document.getElementById("comentario");
  if (comentario) comentario.value = "";
  
  selecionarNota(0);
  notaSelecionada = 0;
}
