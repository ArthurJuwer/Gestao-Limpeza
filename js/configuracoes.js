// Já temos os elementos selecionados
const dadosUsuario = JSON.parse(localStorage.getItem('usuario'));


const userName = document.querySelector("#user-name");
const userFoto = document.querySelector("#user-foto");

const inputNome = document.querySelector("#input-nome");
const inputSenha = document.querySelector("#input-senha");

const buttonNome = document.querySelector("#button-nome");
const buttonSenha = document.querySelector("#button-senha");

// Exibe o nome e a foto atuais

const menuName = document.querySelector("#menu-name");
const menuFoto = document.querySelector("#menu-foto");

if (menuName) {
    menuName.textContent = dadosUsuario.nome;
  }

  if (menuFoto) {
    menuFoto.src = dadosUsuario.foto;
  }

if (userName) {
    userName.textContent = dadosUsuario.nome;
    inputNome.value = dadosUsuario.nome
}

if (userFoto) {
    userFoto.src = dadosUsuario.foto;
    inputSenha.value = dadosUsuario.senha
}

// Ao clicar no botãoNome, atualiza o nome
buttonNome.addEventListener("click", () => {
    const novoNome = inputNome.value;

    if (novoNome.trim() !== "") {
        // Atualiza o elemento na tela
        userName.textContent = novoNome;
        
        menuName.textContent = novoNome;
          

        // Atualiza o objeto no localStorage
        dadosUsuario.nome = novoNome;
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    }
});

// Aqui você pode fazer o mesmo para a senha, se quiser
buttonSenha.addEventListener("click", () => {
    const novaSenha = inputSenha.value;

    if (novaSenha.trim() !== "") {
        // Atualiza no objeto e localStorage (não recomendado guardar senha assim!)
        dadosUsuario.senha = novaSenha;
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario));

        inputSenha.value = "";
        alert("Senha atualizada com sucesso!");
    }
});
