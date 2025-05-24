const inputUser = document.querySelector("#user");
const inputSenha = document.querySelector("#senha");
const btnEntrar = document.querySelector("#btn-entrar");

const passUser = "Arthur Juwer";
const passSenha = "102030";

if(localStorage.getItem('usuario')){
    localStorage.removeItem('usuario');
}

btnEntrar.addEventListener('click', () => {
    const userValue = inputUser.value;
    const senhaValue = inputSenha.value;

    if (userValue && senhaValue) {
        if ((userValue == passUser) && (senhaValue == passSenha)) {
            window.location.href = "/src/teams.html";
        } else {
            alert("Campos inválidos!");
        }
    } else {
        alert("Preencha os campos!");
    }
});
