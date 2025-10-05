document.addEventListener("DOMContentLoaded", () => {
  // ====== CONTEÚDO DOS NÍVEIS (baseado nos princípios que você enviou) ======
  const levels = [
    {
      nivel: 1,
      titulo: "Soberania & Cidadania",
      quiz: [
        {
          pergunta: "O que é soberania?",
          respostas: [
            "Controle de outros países sobre o Brasil",
            "Liberdade do Brasil para tomar decisões próprias",
            "Obrigação de seguir ordens da ONU",
            "Poder de escolher governantes estrangeiros"
          ],
          correta: 1
        },
        {
          pergunta: "Um exemplo prático de cidadania é:",
          respostas: [
            "Ignorar as leis",
            "Votar e participar das decisões do país",
            "Criar leis sozinho",
            "Restringir ideias diferentes"
          ],
          correta: 1
        },
        {
          pergunta: "Cidadania envolve:",
          respostas: [
            "Somente direitos",
            "Somente deveres",
            "Direitos e deveres",
            "Apenas votar quando quiser"
          ],
          correta: 2
        }
      ]
    },
    {
      nivel: 2,
      titulo: "Dignidade da Pessoa Humana",
      quiz: [
        {
          pergunta: "Dignidade da pessoa humana significa que:",
          respostas: [
            "Só adultos merecem respeito",
            "Cada pessoa tem valor e merece respeito",
            "Bullying é permitido",
            "Direitos dependem do salário"
          ],
          correta: 1
        },
        {
          pergunta: "Um exemplo do dia a dia que respeita a dignidade é:",
          respostas: [
            "Fazer bullying com colegas",
            "Impedir acesso à educação",
            "Defender que ninguém seja humilhado",
            "Desrespeitar quem pensa diferente"
          ],
          correta: 2
        }
      ]
    },
    {
      nivel: 3,
      titulo: "Pluralismo Político",
      quiz: [
        {
          pergunta: "Pluralismo político garante:",
          respostas: [
            "A existência de várias ideias e partidos",
            "Apenas um partido no país",
            "Proibição de opiniões divergentes",
            "Censura obrigatória"
          ],
          correta: 0
        },
        {
          pergunta: "Exemplo de pluralismo em ação:",
          respostas: [
            "Eleição com um único candidato",
            "Vários partidos apresentando propostas diferentes",
            "Proibir debates",
            "Impor uma ideia única"
          ],
          correta: 1
        }
      ]
    },
    {
      nivel: 4,
      titulo: "Valores Sociais do Trabalho e Livre Iniciativa",
      quiz: [
        {
          pergunta: "Valores sociais do trabalho significam:",
          respostas: [
            "Direitos do trabalhador não importam",
            "Trabalho é importante e direitos devem ser respeitados",
            "Só quem é chefe tem direitos",
            "Trabalhar sem regras é melhor"
          ],
          correta: 1
        },
        {
          pergunta: "Livre iniciativa quer dizer:",
          respostas: [
            "Só o governo abre empresas",
            "Qualquer pessoa pode abrir um negócio respeitando as leis",
            "Empresas podem ignorar direitos",
            "Trabalho não tem valor social"
          ],
          correta: 1
        }
      ]
    }
  ];

  // ====== ESTADO DO JOGO ======
  let currentLevelIndex = 0;
  let currentQuizIndex = 0;
  let selectedAvatar = null;

  // ====== ELEMENTOS ======
  const startScreen   = document.getElementById("start-screen");
  const gameScreen    = document.getElementById("game-screen");
  const endScreen     = document.getElementById("end-screen");
  const avatarSel     = document.getElementById("avatar-selection");
  const btnStart      = document.getElementById("btn-start");
  const btnRestart    = document.getElementById("btn-restart");
  const playerAvatar  = document.getElementById("player-avatar");
  const levelLabel    = document.getElementById("level-label");
  const questionDiv   = document.getElementById("question");
  const answersDiv    = document.getElementById("answers");
  const feedbackDiv   = document.getElementById("feedback");

  // ====== AVATARES DISPONÍVEIS ======
  const avatarFiles = [
    "assets/avatars/avatar1.png",
    "assets/avatars/avatar2.png",
    "assets/avatars/avatar3.png"
  ];

  function initAvatarSelection() {
    avatarSel.innerHTML = "";
    avatarFiles.forEach(file => {
      const img = document.createElement("img");
      img.src = file;
      img.alt = "Avatar";
      img.addEventListener("click", () => {
        document.querySelectorAll("#avatar-selection img").forEach(i => i.classList.remove("selected"));
        img.classList.add("selected");
        selectedAvatar = file;
      });
      avatarSel.appendChild(img);
    });
  }

  // ====== CONTROLE DE TELAS ======
  btnStart.addEventListener("click", () => {
    if (!selectedAvatar) {
      alert("Escolha um avatar para começar!");
      return;
    }
    showGame();
    playerAvatar.src = selectedAvatar;
    startLevel(0);
  });

  btnRestart?.addEventListener("click", () => {
    endScreen.classList.remove("active");
    endScreen.classList.add("hidden");
    showStart();
  });

  function showStart(){
    currentLevelIndex = 0;
    currentQuizIndex = 0;
    selectedAvatar = null;
    initAvatarSelection();

    startScreen.classList.add("active");
    startScreen.classList.remove("hidden");

    gameScreen.classList.add("hidden");
    gameScreen.classList.remove("active");

    endScreen.classList.add("hidden");
    endScreen.classList.remove("active");
  }

  function showGame(){
    startScreen.classList.remove("active");
    startScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");
    gameScreen.classList.add("active");
  }

  function showEnd(){
    gameScreen.classList.remove("active");
    gameScreen.classList.add("hidden");

    endScreen.classList.remove("hidden");
    endScreen.classList.add("active");
  }

  // ====== LÓGICA DO JOGO ======
  function startLevel(levelIndex){
    currentLevelIndex = levelIndex;
    currentQuizIndex = 0;
    levelLabel.textContent = `Nível ${levels[levelIndex].nivel}`;
    feedbackDiv.textContent = "";
    renderQuestion();
  }

  function renderQuestion(){
    const lvl = levels[currentLevelIndex];
    const q   = lvl.quiz[currentQuizIndex];

    questionDiv.textContent = `⚡ ${q.pergunta}`;
    answersDiv.innerHTML = "";
    feedbackDiv.textContent = "";

    q.respostas.forEach((texto, idx) => {
      const btn = document.createElement("button");
      btn.textContent = texto;
      btn.addEventListener("click", () => handleAnswer(idx));
      answersDiv.appendChild(btn);
    });
  }

  function handleAnswer(idx){
    const lvl = levels[currentLevelIndex];
    const q   = lvl.quiz[currentQuizIndex];

    if (idx === q.correta){
      feedbackDiv.textContent = "✔️ Correto! Avançando…";
      feedbackDiv.style.color = "var(--ok)";
    } else {
      feedbackDiv.textContent = "❌ Errado! Tente a próxima.";
      feedbackDiv.style.color = "var(--err)";
    }

    setTimeout(() => {
      currentQuizIndex++;
      if (currentQuizIndex < lvl.quiz.length){
        renderQuestion();
      } else {
        // terminou o nível
        const next = currentLevelIndex + 1;
        if (next < levels.length){
          startLevel(next);
        } else {
          // terminou tudo
          showEnd();
        }
      }
    }, 1200);
  }

  // Inicializa tela inicial
  initAvatarSelection();
});
