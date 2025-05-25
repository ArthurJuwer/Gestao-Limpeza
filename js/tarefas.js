// Puxar query da URL
const urlParams = new URLSearchParams(window.location.search);
const nomeProjeto = urlParams.get('projeto');

// Puxar usuário do localStorage
let dadosUsuario = JSON.parse(localStorage.getItem('usuario'));

if (!dadosUsuario) {
    console.error("Usuário não encontrado no localStorage");
}
if (dadosUsuario.corsistema === "escuro") {
    document.documentElement.classList.add('dark');
}

// Encontrar equipe atual
let equipeAtual = dadosUsuario.equipes.find(eq => eq.nome === dadosUsuario.equipeatual);

if (!equipeAtual) {
    console.error("Equipe atual não encontrada");
}

// Encontrar projeto pelo nome na URL
let projeto = equipeAtual.numprojetos.find(p => p.nome === nomeProjeto);

function formatarDataDM(dataIso) {
    if (!dataIso) return 'N/A';
    const [ano, mes, dia] = dataIso.split('-');
    return `${dia}/${mes}`;
}

const projetoName = document.querySelector("#projeto-name");
const projetoVoltar = document.querySelector("#projeto-voltar");
const projetoDate = document.querySelector("#projeto-date");

projetoVoltar.addEventListener('click', () => { history.go(-1) });

if (!projeto) {
    console.error("Projeto não encontrado");
} else {
    projetoName.textContent = projeto.nome;
    projetoDate.textContent = formatarDataDM(projeto.dataFinal);
}

// Função para criar card de tarefa com botão editar e excluir
function criarTarefa(tarefa) {
    const card = document.createElement('div');
    card.classList.add('bg-[#70BDB6]', 'text-white', 'p-2', 'rounded', 'm-2', 'cursor-move', 'tarefa-card');
    card.dataset.id = tarefa.id;
    card.dataset.step = tarefa.step; 
    card.setAttribute('draggable', true);
    card.style.position = 'relative'; // para posicionar o botão excluir absolute

    card.innerHTML = `
        <span class="block mb-2 pr-10 pb-5">${tarefa.texto}</span> 
        <img class="size-5 absolute z-50 right-2 top-2 cursor-pointer" src="/public/imagens/icons-white/edit.png" alt="Editar tarefa" />
        <img src="/public/imagens/icons-white/trash.png" alt="Remover tarefa" class="btn-excluir absolute size-5 z-50 right-2 top-9 cursor-pointer" />
    `;

    // Selecionar botões (imagens)
    const btnEditarImg = card.querySelector('img[alt="Editar tarefa"]');
    const btnExcluirImg = card.querySelector('.btn-excluir');

    btnEditarImg.addEventListener('click', (e) => {
        e.stopPropagation();
        tarefaEmEdicao = tarefa;
        inputEditarTexto.value = tarefa.texto;
        inputEditarStep.value = tarefa.step;
        modalEditar.classList.remove('hidden');
        modalEditar.classList.add('flex');
    });

    btnExcluirImg.addEventListener('click', (e) => {
        e.stopPropagation();
        const confirmacao = confirm("Tem certeza que deseja excluir esta tarefa?");
        if (confirmacao) {
            projeto.tarefas = projeto.tarefas.filter(t => t.id !== tarefa.id);
            localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
            renderizarTarefas();
        }
    });
    

    // Drag events
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);

    // Ao clicar no card (fora dos botões), abre modal editar
    card.addEventListener('click', () => {
        tarefaEmEdicao = tarefa;
        inputEditarTexto.value = tarefa.texto;
        inputEditarStep.value = tarefa.step;
        modalEditar.classList.remove('hidden');
        modalEditar.classList.add('flex');
    });

    return card;
}


// Renderizar tarefas nos steps
function renderizarTarefas() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`step-${i}`).innerHTML = '';
    }
    projeto.tarefas.forEach(tarefa => {
        const step = document.getElementById(`step-${tarefa.step}`);
        if (step) {
            const card = criarTarefa(tarefa);
            step.appendChild(card);
        }
    });
    removerDestaques(); // limpa qualquer filtro ao renderizar
}

function removerDestaques() {
    document.querySelectorAll('.tarefa-card').forEach(card => {
        card.classList.remove('destaque-filtrar');
    });
}

renderizarTarefas();

// Drag and Drop Handlers
let draggedItem = null;

function dragStart(e) {
    draggedItem = this;
    setTimeout(() => this.classList.add('hidden'), 0);
}

function dragEnd(e) {
    this.classList.remove('hidden');
    draggedItem = null;
}

for (let i = 1; i <= 5; i++) {
    const step = document.getElementById(`step-${i}`);
    step.addEventListener('dragover', function (e) {
        e.preventDefault();
    });
    step.addEventListener('drop', function (e) {
        e.preventDefault();
        if (draggedItem) {
            this.appendChild(draggedItem);
            let tarefaId = parseInt(draggedItem.dataset.id);
            let tarefa = projeto.tarefas.find(t => t.id === tarefaId);
            if (tarefa) {
                tarefa.step = i;
                draggedItem.dataset.step = i; 
                localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
            }
        }
    });
}

// Preenche menu lateral com nome e foto
document.getElementById('menu-foto').src = dadosUsuario.foto;
document.getElementById('menu-name').textContent = dadosUsuario.nome;

// Modais
const modalAdicionar = document.getElementById('modal-adicionar');
const modalEditar = document.getElementById('modal-editar');

// Botões
const btnAdicionar = document.getElementById('btn-adicionar');
const btnEditar = document.getElementById('btn-editar');

const btnAdicionarConfirmar = document.getElementById('btn-adicionar-confirmar');
const btnEditarConfirmar = document.getElementById('btn-editar-confirmar');

// Fechar modais
const closeAdicionar = document.getElementById('close-adicionar');
const closeEditar = document.getElementById('close-editar');

// Inputs
const inputAdicionarTexto = document.getElementById('input-adicionar-texto');
const inputAdicionarStep = document.getElementById('input-adicionar-step');

const inputEditarTexto = document.getElementById('input-editar-texto');
const inputEditarStep = document.getElementById('input-editar-step');

let tarefaEmEdicao = null;

// Abrir modal Adicionar
btnAdicionar.addEventListener('click', () => {
    inputAdicionarTexto.value = '';
    inputAdicionarStep.value = '1';
    modalAdicionar.classList.remove('hidden');
    modalAdicionar.classList.add('flex');
});

// Confirmar Adicionar
btnAdicionarConfirmar.addEventListener('click', () => {
    const novaTarefa = {
        id: Date.now(),
        texto: inputAdicionarTexto.value,
        step: parseInt(inputAdicionarStep.value)
    };
    projeto.tarefas.push(novaTarefa);
    renderizarTarefas();
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    modalAdicionar.classList.add('hidden');
    modalAdicionar.classList.remove('flex');
});

// Confirmar Editar
btnEditarConfirmar.addEventListener('click', () => {
    if (tarefaEmEdicao) {
        tarefaEmEdicao.texto = inputEditarTexto.value;
        tarefaEmEdicao.step = parseInt(inputEditarStep.value);
        renderizarTarefas();
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
        modalEditar.classList.add('hidden');
        modalEditar.classList.remove('flex');
        tarefaEmEdicao = null;
    }
});

// Fechar modais
closeAdicionar.addEventListener('click', () => {
    modalAdicionar.classList.add('hidden');
    modalAdicionar.classList.remove('flex');
});

closeEditar.addEventListener('click', () => {
    modalEditar.classList.add('hidden');
    modalEditar.classList.remove('flex');
    tarefaEmEdicao = null;
});


