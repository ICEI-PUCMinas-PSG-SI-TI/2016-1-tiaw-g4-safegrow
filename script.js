const api = "http://localhost:3000/usuarios";

const lista = document.getElementById("listaUsuarios");

mostrar();

formUsuario.onsubmit = async (e) => {

    e.preventDefault();

    const idUser = id.value;

    const usuario = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        idade: idade.value,
        cidade: cidade.value
    };

    if(idUser){

        await fetch(api + "/" + idUser, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

    }else{

        await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
    }

    formUsuario.reset();
    mostrar();
};

async function mostrar(){

    const req = await fetch(api);
    const usuarios = await req.json();

    lista.innerHTML = "";

    usuarios.forEach(u => {

        lista.innerHTML += `
        <tr>
            <td>${u.id}</td>
            <td>${u.nome}</td>
            <td>${u.email}</td>
            <td>${u.telefone}</td>
            <td>${u.idade}</td>
            <td>${u.cidade}</td>

            <td>
                <button class="editar"
                onclick="editar(${u.id},'${u.nome}','${u.email}','${u.telefone}','${u.idade}','${u.cidade}')">
                Editar
                </button>

                <button class="excluir"
                onclick="excluir(${u.id})">
                Excluir
                </button>
            </td>
        </tr>
        `;
    });
}

function editar(a,b,c,d,e,f){

    id.value = a;
    nome.value = b;
    email.value = c;
    telefone.value = d;
    idade.value = e;
    cidade.value = f;
}

async function excluir(idUser){

    await fetch(api + "/" + idUser, {
        method: "DELETE"
    });

    mostrar();
}

pesquisa.onkeyup = async () => {

    const texto = pesquisa.value.toLowerCase();

    const req = await fetch(api);
    const usuarios = await req.json();

    lista.innerHTML = "";

    usuarios
    .filter(u => u.nome.toLowerCase().includes(texto))
    .forEach(u => {

        lista.innerHTML += `
        <tr>
            <td>${u.id}</td>
            <td>${u.nome}</td>
            <td>${u.email}</td>
            <td>${u.telefone}</td>
            <td>${u.idade}</td>
            <td>${u.cidade}</td>

            <td>
                <button class="editar"
                onclick="editar(${u.id},'${u.nome}','${u.email}','${u.telefone}','${u.idade}','${u.cidade}')">
                Editar
                </button>

                <button class="excluir"
                onclick="excluir(${u.id})">
                Excluir
                </button>
            </td>
        </tr>
        `;
    });
};
