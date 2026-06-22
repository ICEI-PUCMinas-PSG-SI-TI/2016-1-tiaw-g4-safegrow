var notaSelecionada = 0;

function pintarEstrelas(nota) {
    var estrelas = document.getElementById("estrelas").children;
    for (var i = 0; i < estrelas.length; i++) {
        if (i < nota) {
            estrelas[i].className = "bi-star-fill estrela ativa";
        } else {
            estrelas[i].className = "bi-star estrela";
        }
    }
}

function selecionarNota(nota) {
    notaSelecionada = nota;
    pintarEstrelas(nota);
}

function enviarAvaliacao() {
    var comentario = document.getElementById("comentario").value;

    if (notaSelecionada === 0) {
        alert("Selecione uma nota antes de enviar!");
        return;
    }

    var dados = {
        nota: notaSelecionada,
        comentario: comentario,
        data: new Date().toLocaleDateString("pt-BR")
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/avaliacoes");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        var mensagem = document.getElementById("mensagem");
        mensagem.style.display = "block";
        notaSelecionada = 0;
        document.getElementById("comentario").value = "";
        pintarEstrelas(0);
        
         setTimeout(function () {
        mensagem.style.display = "none";
    }, 30000); 

    };
    

    xhr.onerror = function () {
        alert("Erro ao enviar. Verifique se o JSON Server está rodando!");
    };

    xhr.send(JSON.stringify(dados));
}