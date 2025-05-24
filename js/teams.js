document.addEventListener("DOMContentLoaded", function () {
    // Verifica se já existe um dado no LocalStorage
    if (!localStorage.getItem('usuario')) {
      
      // Estrutura JSON conforme especificado
      const usuario = {
        foto: "/public/imagens/ArthurJuwer.png",
        user: "arthurjuwer@gmail.com",
        nome: "Arthur Juwer",
        senha: "102030",
        corsistema: "claro",
        equipeatual: "",
        equipes: [
          {
            nome: "Equipe Senac",
            foto: "https://example.com/equipe_alpha.jpg",
            numprojetos: {
              num: 3,
              funcionarios: 10,
              dataFinal: "2025-12-31",
              dificuldade: "Alta"
            },
            tarefas: [
              {
                nome: "Projeto Site",
                dataFinal: "2025-06-30",
                tarefas: [
                  { id: 1, texto: "Criar layout" },
                  { id: 2, texto: "Programar backend" },
                  { id: 3, texto: "Testar funcionalidades" }
                ]
              },
              {
                nome: "Aplicativo Mobile",
                dataFinal: "2025-08-15",
                tarefas: [
                  { id: 1, texto: "Desenhar interface" },
                  { id: 2, texto: "Integrar API" }
                ]
              }
            ],
            cargo: "Gerente de Limpeza"
          },
          {
            nome: "Equipe Prefeitura",
            foto: "https://example.com/equipe_beta.jpg",
            numprojetos: {
              num: 1,
              funcionarios: 5,
              dataFinal: "2025-09-10",
              dificuldade: "Média"
            },
            tarefas: [
              {
                nome: "Manutenção Servidor",
                dataFinal: "2025-07-20",
                tarefas: [
                  { id: 1, texto: "Atualizar sistema" },
                  { id: 2, texto: "Revisar segurança" }
                ]
              }
            ],
            cargo: "Faxineiro"
          }
        ]
      };

      // Salvando no LocalStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
      console.log("Usuário salvo no LocalStorage.");
    } else {
      console.log("Usuário já existe no LocalStorage.");
    }

    const dadosUsuario = JSON.parse(localStorage.getItem('usuario'));
    console.log("Dados do usuário:", dadosUsuario);

    const userName = document.querySelector("#user-name");
    const userFoto = document.querySelector("#user-foto");

    const selectSenac = document.querySelector("#senac");
    const selectPrefeitura = document.querySelector("#prefeitura");

    selectSenac.addEventListener("click", () => {
        dadosUsuario.equipeatual = "Equipe Senac";
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
        window.location.href = "/src/sistema/avisos.html";
    });
    
    selectPrefeitura.addEventListener("click", () => {
        dadosUsuario.equipeatual = "Equipe Prefeitura";
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
        window.location.href = "/src/sistema/avisos.html";
    });
    

   

    if (userName) {
      userName.textContent = dadosUsuario.nome;
    }

    if (userFoto) {
      userFoto.src = dadosUsuario.foto;
    }

  });