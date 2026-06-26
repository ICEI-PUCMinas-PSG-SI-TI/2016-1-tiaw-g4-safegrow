window.onload = function () {

    fetch('/recursos')
        .then(resposta => resposta.json())
        .then(recursos => {
            carregarTopo(recursos);
        });

    fetch('/cards')
        .then(resposta => resposta.json())
        .then(cards => {
            carregarCards(cards);
        });

}

function carregarTopo(recursos) {

    const empresaDetails = document.getElementById("empresa-detalhes");

    if (empresaDetails) {
        empresaDetails.innerHTML = "";

        for (let i = 0; i < recursos.length; i++) {
            let objeto = recursos[i];

            const caixa_detalhes = document.createElement('div');
            caixa_detalhes.id = "caixa";

            const imagem = document.createElement('img');
            imagem.src = objeto.imagem;
            imagem.classList.add("imgE");
            caixa_detalhes.appendChild(imagem);

            const empresas_texto = document.createElement('div');

            const title = document.createElement('h1');
            title.textContent = objeto.titulo;
            title.classList.add("titulo");
            empresas_texto.appendChild(title);

            const descricao = document.createElement('p');
            descricao.textContent = objeto.descricao;
            descricao.classList.add("descricaoE");
            empresas_texto.appendChild(descricao);

            const objetivo = document.createElement('p');
            objetivo.textContent = objeto.objetivo;
            objetivo.classList.add("descricaoE");
            empresas_texto.appendChild(objetivo);

            caixa_detalhes.appendChild(empresas_texto);
            empresaDetails.appendChild(caixa_detalhes);
        }
    }
}


function carregarCards(cards) {

    const carde = document.getElementById("cards-container");

    if (carde) {
        carde.innerHTML = "";

        for (let i = 0; i < cards.length; i++) {
            let item = cards[i];

            const coluna = document.createElement('div');
            coluna.classList.add("col");

            const card = document.createElement('div');
            card.classList.add("card");

            const imgCard = document.createElement("img");
            imgCard.src = item.imagem;
            card.appendChild(imgCard);

            const nomeCard = document.createElement('h1');
            nomeCard.classList.add("titulo");
            nomeCard.textContent = item.titulo;
            card.appendChild(nomeCard);

            const categoria = document.createElement('p');
            categoria.textContent = item.categoria;
            categoria.classList.add("categoria");
            card.appendChild(categoria);

            const desc = document.createElement('p');
            desc.textContent = item.descricao;
            desc.classList.add("descricao");
            card.appendChild(desc);

            const botao = document.createElement('button');
            botao.textContent = "Saiba mais";

            botao.addEventListener("click", () => {
                window.open(item.link, "_blank");
            });

            card.appendChild(botao);

            coluna.appendChild(card);
            carde.appendChild(coluna);
        }
    }
}