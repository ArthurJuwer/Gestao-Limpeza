const inputUser = document.querySelector("#user");
const inputSenha = document.querySelector("#senha");
const btnEntrar = document.querySelector("#btn-entrar");

const passUser = "Arthur Juwer";
const passSenha = "102030";

if (localStorage.getItem('usuario')) {
    localStorage.removeItem('usuario');
}

btnEntrar.addEventListener('click', () => {
    const userValue = inputUser.value;
    const senhaValue = inputSenha.value;

    let status;

    if (!userValue || !senhaValue) {
        status = "empty";
    } else if (userValue === passUser && senhaValue === passSenha) {
        status = "valid";
    } else {
        status = "invalid";
    }

    switch (status) {
        case "empty":
            alert("Preencha os campos!");
            break;
        case "valid":
            window.location.href = "/src/teams.html";
            break;
        case "invalid":
            alert("Campos inválidos!");
            break;
        default:
            alert("Erro inesperado!");
    }
});
