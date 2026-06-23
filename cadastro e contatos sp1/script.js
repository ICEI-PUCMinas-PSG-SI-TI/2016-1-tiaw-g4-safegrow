const formulario = document.getElementById('formContato');

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    console.log(nome);
    console.log(email);
    console.log(assunto);
    console.log(telefone);
    console.log(mensagem);

// validação do campo de nome
    if(nome.length < 3){

    document.getElementById("mensagemErro")
    .innerText = "Nome inválido";

    return;
}
// validação do campo de email
if(!email.includes("@")){

    document.getElementById("mensagemErro")
    .innerText = "E-mail ou senha inválidos";

    return;
}
// validação do campo de telefone
if(telefone.length < 8){

    document.getElementById("mensagemErro")
    .innerText = "Telefone inválido";

    return;
}

     fetch("http://localhost:3002/contatos", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        nome: nome,
        email: email,
        assunto: assunto,
        telefone: telefone,
        mensagem: mensagem

         })

 })
    .then(response => response.json())

    .then(data => {
        console.log("Sucesso:", data);

        sessionStorage.setItem("contatoEnviado", "true");
    })

    .catch(error => {
        console.log("Erro:", error);
    });

    window.addEventListener("load", function(){

    let contatoEnviado = sessionStorage.getItem("contatoEnviado");

    if(contatoEnviado === "true"){
        alert("Você já enviou uma mensagem nesta sessão.");
    }

});

});

