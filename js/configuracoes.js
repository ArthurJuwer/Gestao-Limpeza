const dadosUsuario = JSON.parse(localStorage.getItem('usuario')) || {};

const userName = document.querySelector("#user-name");
const userFoto = document.querySelector("#user-foto");
const alterarFoto = document.querySelector("#alterar-foto");

const inputNome = document.querySelector("#input-nome");
const inputSenha = document.querySelector("#input-senha");

const buttonNome = document.querySelector("#button-nome");
const buttonSenha = document.querySelector("#button-senha");

const menuName = document.querySelector("#menu-name");
const menuFoto = document.querySelector("#menu-foto");

if (menuName) menuName.textContent = dadosUsuario.nome || '';
if (menuFoto) menuFoto.src = dadosUsuario.foto || '';

if (userName) {
    userName.textContent = dadosUsuario.nome || '';
    inputNome.value = dadosUsuario.nome || '';
}

if (userFoto) {
    userFoto.src = dadosUsuario.foto || '';
    inputSenha.value = dadosUsuario.senha || '';
}

alterarFoto.addEventListener("click", () => {
    const createDiv = document.querySelector("#modal");

    createDiv.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-80 relative">
          <button id="close-modal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
          <h2 class="text-xl font-semibold mb-4 dark:text-white">Alterar Foto</h2>
          <input type="text" id="fotoInput" placeholder="Coloque o URL da imagem" class="mb-4 block w-full text-sm text-gray-700 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#2AA093]">
          <button id="enviarFoto" class="w-full bg-[#2AA093] text-white py-2 rounded hover:bg-blue-600">Enviar</button>
        </div>
      </div>
    `;

    const closeModal = createDiv.querySelector("#close-modal");
    closeModal.addEventListener("click", () => createDiv.innerHTML = "");

    const enviarFoto = createDiv.querySelector("#enviarFoto");
    enviarFoto.addEventListener("click", () => {
        const fotoInput = createDiv.querySelector("#fotoInput").value;
        if (fotoInput.trim() !== "") {
            dadosUsuario.foto = fotoInput;
            localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
            userFoto.src = fotoInput;
            menuFoto.src = fotoInput;
            createDiv.innerHTML = "";
        }
    });
});

buttonNome.addEventListener("click", () => {
    const novoNome = inputNome.value.trim();
    if (novoNome) {
        userName.textContent = novoNome;
        menuName.textContent = novoNome;
        dadosUsuario.nome = novoNome;
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    }
});

buttonSenha.addEventListener("click", () => {
    const novaSenha = inputSenha.value.trim();
    if (novaSenha) {
        dadosUsuario.senha = novaSenha;
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
        inputSenha.value = "";
        alert("Senha atualizada com sucesso!");
    }
});

const btnClaro = document.querySelector("#btn-claro");
const btnEscuro = document.querySelector("#btn-escuro");

if (dadosUsuario.corsistema === 'escuro') {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

btnClaro.addEventListener("click", () => {
    dadosUsuario.corsistema = 'claro';
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    document.documentElement.classList.remove('dark');
});

btnEscuro.addEventListener("click", () => {
    dadosUsuario.corsistema = 'escuro';
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    document.documentElement.classList.add('dark');
});
