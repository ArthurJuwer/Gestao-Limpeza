document.addEventListener("DOMContentLoaded", function () {
    const dadosUsuario = JSON.parse(localStorage.getItem('usuario'));

    if (dadosUsuario.corsistema === "escuro") {
        document.documentElement.classList.add('dark');
    }

    const menuName = document.querySelector("#menu-name");
    const menuFoto = document.querySelector("#menu-foto");

    if (menuName) menuName.textContent = dadosUsuario.nome;
    if (menuFoto) menuFoto.src = dadosUsuario.foto;

    function contarTotalTarefas(equipe) {
        if (!Array.isArray(equipe.numprojetos)) return 0;

        return equipe.numprojetos.reduce((total, projeto) => total + (projeto.tarefas?.length || 0), 0);
    }

    dadosUsuario.equipes.forEach((equipe, index) => {
        const numEquipe = index + 1;

        const totalProjetosEl = document.querySelector(`#total-projetos-0${numEquipe}`);
        if (totalProjetosEl) {
            totalProjetosEl.textContent = equipe.numprojetos.length; // <-- aqui: length do array
        }

        const totalTarefasEl = document.querySelector(`#total-tarefas-0${numEquipe}`);
        if (totalTarefasEl) {
            const totalTarefas = contarTotalTarefas(equipe);
            totalTarefasEl.textContent = totalTarefas;
        }

        const totalCargoEl = document.querySelector(`#total-cargo-0${numEquipe}`);
        if (totalCargoEl) {
            const cargoSimplificado = equipe.cargo.split(' ')[0]; // Pega só a primeira palavra
            totalCargoEl.textContent = cargoSimplificado;
        }
    });
});
