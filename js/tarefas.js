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

projetoVoltar.addEventListener('click', ()=> {history.go(-1)})
projetoName.textContent = projeto.nome;
projetoDate.textContent = formatarDataDM(projeto.dataFinal);




if (!projeto) {
    console.error("Projeto não encontrado");
}

// Função para criar card de tarefa
function criarTarefa(tarefa) {
    const card = document.createElement('div');
    card.classList.add('bg-[#70BDB6]', 'text-white', 'p-2', 'rounded', 'm-2', 'cursor-move');
    card.textContent = tarefa.texto;

    // Configuração Drag and Drop
    card.setAttribute('draggable', true);
    card.dataset.id = tarefa.id;

    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);

    return card;
}

// Renderizar tarefas nos steps
projeto.tarefas.forEach(tarefa => {
    const step = document.getElementById(`step-${tarefa.step}`);
    if (step) {
        const card = criarTarefa(tarefa);
        step.appendChild(card);
    }
});

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

// Tornar steps droppable
for (let i = 1; i <= 5; i++) {
    const step = document.getElementById(`step-${i}`);
    step.addEventListener('dragover', function (e) {
        e.preventDefault();
    });
    step.addEventListener('drop', function (e) {
        e.preventDefault();
        if (draggedItem) {
            this.appendChild(draggedItem);

            // Atualiza step no projeto (opcional)
            let tarefaId = parseInt(draggedItem.dataset.id);
            let tarefa = projeto.tarefas.find(t => t.id === tarefaId);
            if (tarefa) {
                tarefa.step = i;

                // Atualizar localStorage
                localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
            }
        }
    });
}

// Preenche menu lateral com nome e foto
document.getElementById('menu-foto').src = dadosUsuario.foto;
document.getElementById('menu-name').textContent = dadosUsuario.nome;
