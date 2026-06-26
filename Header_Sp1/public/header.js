window.onload = function () {

  fetch('http://localhost:3000/menu')
    .then(respostas => respostas.json())
    .then(menu => {
      for (let i = 0; i < menu.length; i++) {
        let item = menu[i];

        console.log(item);
        console.log(item.nome);
        console.log(item.link);

        const caixaMenu = document.getElementById('menu-dinamico');
        caixaMenu.innerHTML += `<li><a class="dropdown-item" href="${item.link}">${item.nome}</a></li>`;
      }
    });

  const inputBusca = document.getElementById('input-busca');
  const busca = document.getElementById('resultados-busca');

  inputBusca.addEventListener('input', (evento) => {
    const termo = evento.target.value.toLowerCase();
    console.log(evento.target.value);

    fetch('http://localhost:3000/pesquisas')
      .then(respostas => respostas.json())
      .then(pesquisas => {
        busca.innerHTML = "";

        for (let i = 0; i < pesquisas.length; i++) {
          let itemDaBusca = pesquisas[i];

          if (
            (
              itemDaBusca.termo.toLowerCase().includes(termo) ||
              itemDaBusca.categoria.toLowerCase().includes(termo)
            )
            && termo !== ""
          ) {
            busca.innerHTML += `<li><a class="dropdown-item" href="${itemDaBusca.link}">${itemDaBusca.termo} / ${itemDaBusca.categoria}</a></li>`;
            console.log(itemDaBusca);
          }
        }
      });
  });

  const formularioBusca = document.getElementById('form-busca');

  formularioBusca.addEventListener('submit', function (evento) {
    evento.preventDefault();
    console.log("Busca enviada com sucesso!");
  });

}