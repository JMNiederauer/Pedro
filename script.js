document.addEventListener("DOMContentLoaded", () => {
  // ====== FALLBACKS: 3 avatares embutidos (mostram mesmo sem arquivos) ======
  const FALLBACKS = [
    // verde
    "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
        <rect width='100%' height='100%' fill='#0b0f11'/>
        <circle cx='40' cy='40' r='36' fill='#00ff88'/>
        <circle cx='40' cy='34' r='14' fill='#0b0f11'/>
        <rect x='22' y='48' width='36' height='14' rx='7' fill='#0b0f11'/>
      </svg>
    `),
    // azul
    "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
        <rect width='100%' height='100%' fill='#0b0f11'/>
        <circle cx='40' cy='40' r='36' fill='#39a0ff'/>
        <circle cx='40' cy='34' r='14' fill='#0b0f11'/>
        <rect x='22' y='48' width='36' height='14' rx='7' fill='#0b0f11'/>
      </svg>
    `),
    // rosa
    "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
        <rect width='100%' height='100%' fill='#0b0f11'/>
        <circle cx='40' cy='40' r='36' fill='#ff7ad9'/>
        <circle cx='40' cy='34' r='14' fill='#0b0f11'/>
        <rect x='22' y='48' width='36' height='14' rx='7' fill='#0b0f11'/>
      </svg>
    `)
  ];

  // ====== CONTEÚDO DOS NÍVEIS ======
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
      titulo: "Valores do Trabalho & Livre Iniciativa",
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

  // ====== ESTADO ======
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

  // ====== CAMINHOS DOS AVATARES (arquivos do seu repo) ======
  const avatarFiles = [
    "./assets/avatars/avatar1.png",
    "./assets/avatars/avatar2.png",
    "./assets/avatars/avatar3.png"
  ];

  // Cria um <img> por avatar, tentando carregar o arquivo;
  // se der erro (404 / caminho diferente), usa o fallback SVG.
  function initAvatarSelection() {
    avatarSel.innerHTML = "";
    avatarFiles.forEach((file, i) => {
      const img = document.createElement("img");
      img.alt = "Avatar";

      // tenta o arquivo
      img.src = file;

      // se falhar, usa o fallback correspondente
      img.addEventListener("error", () => {
        console.warn("Não encontrei:", file, "→ usando avatar de fallback.");
        img.src = FALLBACKS[i % FALLBACKS.length];
      });

      img.addEventListener("click", () => {
        document.querySelectorAll("#avatar-selection img").forEach(el => el.classList.remove("selected"));
        img.classList.add("selected");
        selectedAvatar = img.src; // funciona tanto com arquivo quanto com fallback
      });

      avatarSel.appendChild(img);
    });
  }

  // ====== TELAS ======
  btnStart.addEventListener("click", () => {
    if (!selectedAvatar) { alert("Escolha um avatar para começar!"); return; }
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

  // ====== LÓGICA ======
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
      feedbackDiv.style.color = "#00ff5e";
    } else {
      feedbackDiv.textContent = "❌ Errado! Tente a próxima.";
      feedbackDiv.style.color = "#ff3b3b";
    }

    setTimeout(() => {
      currentQuizIndex++;
      if (currentQuizIndex < lvl.quiz.length){
        renderQuestion();
      } else {
        const next = currentLevelIndex + 1;
        if (next < levels.length){
          startLevel(next);
        } else {
          showEnd();
        }
      }
    }, 1100);
  }

  // start
  initAvatarSelection();
});
