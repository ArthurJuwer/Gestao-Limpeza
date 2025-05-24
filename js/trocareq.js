const equipeAtual = document.querySelector("#equipe-atual");

const borderS = document.querySelector("#border-senac");
const borderP = document.querySelector("#border-prefeitura");

let dadosUsuario = JSON.parse(localStorage.getItem('usuario'));

const menuName = document.querySelector("#menu-name");
const menuFoto = document.querySelector("#menu-foto");


  if (menuName) {
    menuName.textContent = dadosUsuario.nome;
  }

  if (menuFoto) {
    menuFoto.src = dadosUsuario.foto;
  }

borderS.addEventListener("click", () => {
    dadosUsuario.equipeatual = "Equipe Senac";
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));

    borderP.style.border = "2px solid #D9D9D9"; // desativa outra
    borderS.style.border = "2px solid #2AA093"; // ativa esta

    equipeAtual.textContent = "Você está atualmente na " + dadosUsuario.equipeatual;
});

borderP.addEventListener("click", () => {
    dadosUsuario.equipeatual = "Equipe Prefeitura";
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));

    borderS.style.border = "2px solid #D9D9D9"; // desativa outra
    borderP.style.border = "2px solid #2AA093"; // ativa esta

    equipeAtual.textContent = "Você está atualmente na " + dadosUsuario.equipeatual;
});

// define o texto e borda correta
if (equipeAtual) {
    equipeAtual.textContent = "Você está atualmente na " + dadosUsuario.equipeatual;

    if (dadosUsuario.equipeatual === "Equipe Senac") {
        borderS.style.border = "2px solid #2AA093";
        borderP.style.border = "2px solid #D9D9D9";
    } else if (dadosUsuario.equipeatual === "Equipe Prefeitura") {
        borderP.style.border = "2px solid #2AA093";
        borderS.style.border = "2px solid #D9D9D9";
    } else {
        // Nenhuma equipe
        borderS.style.border = "2px solid #D9D9D9";
        borderP.style.border = "2px solid #D9D9D9";
    }
}

if(dadosUsuario.corsistema === "escuro"){
  document.documentElement.classList.add('dark');
} 
