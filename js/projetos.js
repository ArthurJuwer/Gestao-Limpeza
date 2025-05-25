document.addEventListener("DOMContentLoaded", function () {
    const dadosUsuario = JSON.parse(localStorage.getItem('usuario')) || {};

    if (dadosUsuario.corsistema === "escuro") {
        document.documentElement.classList.add('dark');
    }

    const btnLogout = document.querySelector("#btn-logout")

    btnLogout.addEventListener("click", ()=>{
        window.location.href = "/src/login.html";
    })


    document.getElementById('menu-name').textContent = dadosUsuario.nome || 'Usuário';
    document.getElementById('menu-foto').src = dadosUsuario.foto || '/public/imagens/default-foto.png';

    const projetosContainer = document.querySelector('.projetos-container');

    function corAleatoria() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    function garantirCores(projetos) {
        let alterado = false;
        projetos.forEach(p => {
            if (!p.cor) {
                p.cor = corAleatoria();
                alterado = true;
            }
        });
        if (alterado) {
            salvarProjetos(projetos);
        }
    }

    function renderizarProjetos(projetos) {
        projetosContainer.innerHTML = '';

        if (!projetos || projetos.length === 0) {
            projetosContainer.innerHTML = '<p class="text-red-500">Nenhum projeto encontrado.</p>';
            atualizarContador(0);
            return;
        }

        projetos.forEach(projeto => {
            const cor = projeto.cor || '#2AA093';

            const projetoCard = document.createElement('div');
            projetoCard.className = "flex flex-col gap-4 border-2 border-[#D9D9D9] rounded-lg p-4";

            projetoCard.innerHTML = `
                <div class="flex items-center gap-4 relative">
                    <img class="absolute z-50 -right-2 size-6 cursor-pointer" src="/public/imagens/icons/trash.png" alt="Remover projeto" data-id="${projeto.id || projeto.nome}">
                    <a href="tarefas.html?projeto=${encodeURIComponent(projeto.nome)}">
                        <div class="flex items-center gap-4">
                            <span class="size-2 block rounded-full" style="background-color: ${cor}"></span>
                            <h2 class="font-medium text-lg">${projeto.nome}</h2>
                        </div>
                    </a>
                </div>
                <div class="flex flex-col gap-y-2">
                    <div class="flex justify-between">
                        <p class="text-sm">Tarefas: </p>
                        <p class="text-sm font-semibold">${projeto.tarefas ? projeto.tarefas.length : 0}</p>
                    </div>
                    <div class="flex justify-between">
                        <p class="text-sm">Funcionários: </p>
                        <p class="text-sm font-semibold">${projeto.funcionarios || 0}</p>
                    </div>
                    <div class="flex justify-between">
                        <p class="text-sm">Data final: </p>
                        <p class="text-sm font-semibold">${formatarDataDM(projeto.dataFinal)}</p>
                    </div>
                    <div class="flex justify-between">
                        <p class="text-sm">Dificuldade: </p>
                        <p class="text-sm font-semibold">${projeto.dificuldade || 'N/A'}</p>
                    </div>
                </div>
            `;

            projetosContainer.appendChild(projetoCard);
        });

        atualizarContador(projetos.length);
    }

    function atualizarContador(count) {
        const h2s = document.querySelectorAll('h2');
        h2s.forEach(h2 => {
            if (h2.textContent.includes('Em andamento:')) {
                const span = h2.nextElementSibling;
                if (span && span.tagName.toLowerCase() === 'span') {
                    span.textContent = count;
                }
            }
        });
    }

    const equipeAtual = dadosUsuario.equipes ? dadosUsuario.equipes.find(e => e.nome === dadosUsuario.equipeatual) : null;
    const projetos = equipeAtual ? (equipeAtual.numprojetos || []) : [];

    garantirCores(projetos);
    renderizarProjetos(projetos);

    const btnAdicionar = document.getElementById('btn-adicionar');
    const btnEditar = document.getElementById('btn-editar');
    const btnFiltrar = document.getElementById('btn-filtrar');

    const modalAdicionar = document.getElementById('modal-adicionar');
    const modalEditar = document.getElementById('modal-editar');
    const modalFiltrar = document.getElementById('modal-filtrar');

    const closeAdicionar = document.getElementById('close-adicionar');
    const closeEditar = document.getElementById('close-editar');
    const closeFiltrar = document.getElementById('close-filtrar');

    function abrirModal(modal) {
        modal.classList.remove('hidden');
    }

    function fecharModal(modal) {
        modal.classList.add('hidden');
    }

    btnAdicionar.addEventListener('click', () => abrirModal(modalAdicionar));
    btnEditar.addEventListener('click', () => {
        popularSelectEditar();
        abrirModal(modalEditar);
    });
    btnFiltrar.addEventListener('click', () => abrirModal(modalFiltrar));

    closeAdicionar.addEventListener('click', () => fecharModal(modalAdicionar));
    closeEditar.addEventListener('click', () => fecharModal(modalEditar));
    closeFiltrar.addEventListener('click', () => fecharModal(modalFiltrar));

    [modalAdicionar, modalEditar, modalFiltrar].forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) fecharModal(modal);
        });
    });

    function salvarProjetos(projetos) {
        if (!dadosUsuario.equipes) return;
        const equipeIndex = dadosUsuario.equipes.findIndex(e => e.nome === dadosUsuario.equipeatual);
        if (equipeIndex === -1) return;
        dadosUsuario.equipes[equipeIndex].numprojetos = projetos;
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    }

    const formAdicionar = document.getElementById('form-adicionar');
    formAdicionar.addEventListener('submit', e => {
        e.preventDefault();

        const nome = document.getElementById('input-nome').value.trim();
        const funcionarios = Number(document.getElementById('input-funcionarios').value);
        const dataFinal = document.getElementById('input-datafinal').value;
        const dificuldade = document.getElementById('select-dificuldade').value;

        if (!nome) {
            alert('Por favor, preencha o nome do projeto.');
            return;
        }
        if (isNaN(funcionarios) || funcionarios < 1) {
            alert('Funcionários deve ser um número positivo maior que zero.');
            return;
        }
        if (!dataFinal) {
            alert('Por favor, selecione uma data final.');
            return;
        }
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const dataSelecionada = new Date(dataFinal);
        if (dataSelecionada <= hoje) {
            alert('A data final deve ser maior que hoje.');
            return;
        }
        if (!dificuldade) {
            alert('Por favor, selecione a dificuldade.');
            return;
        }

        const novoProjeto = {
            id: Date.now().toString(),
            nome,
            funcionarios,
            dataFinal,
            dificuldade,
            tarefas: [],
            cor: corAleatoria()
        };

        projetos.push(novoProjeto);
        salvarProjetos(projetos);
        renderizarProjetos(projetos);

        formAdicionar.reset();
        fecharModal(modalAdicionar);
    });

    function formatarDataDM(dataIso) {
        if (!dataIso) return 'N/A';
        const [ano, mes, dia] = dataIso.split('-');
        return `${dia}/${mes}`;
    }

    const formFiltrar = document.getElementById('form-filtrar');
    formFiltrar.addEventListener('submit', e => {
        e.preventDefault();
        const filtro = formFiltrar.querySelector('select').value;

        const filtrados = projetos.filter(p => filtro === 'todos' || p.dificuldade === filtro);
        renderizarProjetos(filtrados);

        fecharModal(modalFiltrar);
    });

    const formEditar = document.getElementById('form-editar');
    const selectEditar = formEditar.querySelector('select');
    const inputEditarNome = document.getElementById('editar-nome');
    const inputEditarFuncionarios = document.getElementById('editar-funcionarios');
    const inputEditarDataFinal = document.getElementById('editar-datafinal');
    const selectEditarDificuldade = document.getElementById('editar-dificuldade');

    function popularSelectEditar() {
        selectEditar.innerHTML = '';
        if (projetos.length === 0) {
            selectEditar.innerHTML = '<option disabled>Nenhum projeto disponível</option>';
            limparCamposEditar();
            return;
        }
        const opcaoVazia = document.createElement('option');
        opcaoVazia.value = '';
        opcaoVazia.textContent = 'Selecione um projeto';
        opcaoVazia.disabled = true;
        opcaoVazia.selected = true;
        selectEditar.appendChild(opcaoVazia);

        projetos.forEach(proj => {
            const opt = document.createElement('option');
            opt.value = proj.id;
            opt.textContent = proj.nome;
            selectEditar.appendChild(opt);
        });
        limparCamposEditar();
    }

    function limparCamposEditar() {
        inputEditarNome.value = '';
        inputEditarFuncionarios.value = '';
        inputEditarDataFinal.value = '';
        selectEditarDificuldade.value = '';
    }

    selectEditar.addEventListener('change', () => {
        const projetoId = selectEditar.value;
        const projeto = projetos.find(p => p.id === projetoId);
        if (!projeto) {
            limparCamposEditar();
            return;
        }
        inputEditarNome.value = projeto.nome || '';
        inputEditarFuncionarios.value = projeto.funcionarios || '';
        inputEditarDataFinal.value = projeto.dataFinal || '';
        selectEditarDificuldade.value = projeto.dificuldade || '';
    });

    formEditar.addEventListener('submit', e => {
        e.preventDefault();

        const projetoId = selectEditar.value;
        if (!projetoId) {
            alert('Selecione um projeto para editar.');
            return;
        }

        const novoNome = inputEditarNome.value.trim();
        const funcionarios = Number(inputEditarFuncionarios.value);
        const dataFinal = inputEditarDataFinal.value;
        const dificuldade = selectEditarDificuldade.value;

        if (!novoNome) {
            alert('Por favor, preencha o nome do projeto.');
            return;
        }
        if (isNaN(funcionarios) || funcionarios < 1) {
            alert('Funcionários deve ser um número positivo maior que zero.');
            return;
        }
        if (!dataFinal) {
            alert('Por favor, selecione uma data final.');
            return;
        }
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const dataSelecionada = new Date(dataFinal);
        if (dataSelecionada <= hoje) {
            alert('A data final deve ser maior que hoje.');
            return;
        }
        if (!dificuldade) {
            alert('Por favor, selecione a dificuldade.');
            return;
        }

        const projetoIndex = projetos.findIndex(p => p.id === projetoId);
        if (projetoIndex === -1) {
            alert('Projeto não encontrado.');
            return;
        }

        projetos[projetoIndex].nome = novoNome;
        projetos[projetoIndex].funcionarios = funcionarios;
        projetos[projetoIndex].dataFinal = dataFinal;
        projetos[projetoIndex].dificuldade = dificuldade;

        salvarProjetos(projetos);
        renderizarProjetos(projetos);

        formEditar.reset();
        fecharModal(modalEditar);
    });

    projetosContainer.addEventListener('click', e => {
        if (e.target.alt === 'Remover projeto') {
            const id = e.target.dataset.id;
            const confirmDelete = confirm('Tem certeza que deseja remover este projeto?');
            if (confirmDelete) {
                const index = projetos.findIndex(p => p.id === id);
                if (index > -1) {
                    projetos.splice(index, 1);
                    salvarProjetos(projetos);
                    renderizarProjetos(projetos);
                }
            }
        }
    });

    function garantirIds(projetos) {
        projetos.forEach(p => {
            if (!p.id) {
                p.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            }
        });
    }
    garantirIds(projetos);
});
