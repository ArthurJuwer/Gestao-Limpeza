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
            numprojetos: [
              {
                id: 0,
                nome: "Estacionamento",
                tarefas: [
                  { id: 1, texto: "Atualizar sistema" },
                  { id: 2, texto: "Revisar segurança" }
                ],
                funcionarios: 5,
                dataFinal: "2025-05-29",
                dificuldade: "Média"
              },
          ],
            cargo: "Gerente de Limpeza"
          },
          {
            nome: "Equipe Prefeitura",
            foto: "https://example.com/equipe_beta.jpg",
            numprojetos: [
              {
                id: 0,
                nome: "Salas de Aula",
                tarefas: [
                  { id: 1, texto: "Atualizar sistema" },
                  { id: 2, texto: "Revisar segurança" }
                ],
                funcionarios: 5,
                dataFinal: "29/05",
                dificuldade: "Média"
              },
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