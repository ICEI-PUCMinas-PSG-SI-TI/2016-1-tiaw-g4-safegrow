fetch("data/solucoes.json")
  .then(response => response.json())
  .then(data => {
    
    const container = document.querySelector(".cards");

    data.forEach(item => {

      container.innerHTML += `
        <div class="card">
            <div class="icone">
                <i class="fa-solid ${item.icone}"></i>
            </div>

            <h3>${item.titulo}</h3>

            <p>${item.texto}</p>

            <a href="${item.pagina}" class="btn">
                ${item.botao}
            </a>
        </div>
      `;

    });

  });