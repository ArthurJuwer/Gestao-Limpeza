

let dadosUsuario = JSON.parse(localStorage.getItem('usuario'));

const menuName = document.querySelector("#menu-name");
const menuFoto = document.querySelector("#menu-foto");


  if (menuName) {
    menuName.textContent = dadosUsuario.nome;
  }

  if (menuFoto) {
    menuFoto.src = dadosUsuario.foto;
  }

  if(dadosUsuario.corsistema === "escuro"){
    document.documentElement.classList.add('dark');
} 