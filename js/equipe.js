let dadosUsuario = JSON.parse(localStorage.getItem('usuario'));

const btnLogout = document.querySelector("#btn-logout")

btnLogout.addEventListener("click", ()=>{
    window.location.href = "/src/login.html";
})

if (dadosUsuario.equipeatual) {
    const equipeAtual = dadosUsuario.equipes.find(equipe => equipe.nome === dadosUsuario.equipeatual);

    if (equipeAtual) {
        console.log("Cargo na equipe atual:", equipeAtual.cargo);

        // Exemplo: Atualizar algum elemento da página com o cargo
        const cargoElemento = document.querySelector("#cargo");
        if (cargoElemento) {
            cargoElemento.textContent = `${equipeAtual.cargo}`;
        }
    } else {
        console.log("Equipe atual não encontrada.");
    }
} else {
    console.log("Nenhuma equipe atual selecionada.");
}
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