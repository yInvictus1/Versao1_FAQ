const chatButton = document.getElementById("chatButton");
  const chatWindow = document.getElementById("chatWindow");
  const chatMessages = document.getElementById("chatMessages");

  // Abre/fecha chat
  chatButton.addEventListener("click", () => {
    chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
    chatWindow.style.flexDirection = "column";
  });

  // Função para responder baseado na opção escolhida
  function responder(opcao) {
    let userText = "";
    let botText = "";

    if (opcao === "horario") {
      userText = "Horário";
      botText = "Nosso horário de funcionamento é de segunda a sexta, das 08h às 18h.";
    } else if (opcao === "local") {
      userText = "Local";
      botText = "Estamos localizados na Rua Exemplo, nº 123, Bairro Centro, Cidade/UF.";
    } else if (opcao === "pedagogico") {
      userText = "Pedagógico";
      botText = "Você selecionou a área pedagógica. Em breve adicionaremos perguntas frequentes aqui!";
    }

    // Adiciona a mensagem do usuário
    adicionarMensagem(userText, "user-msg");

    // Resposta do bot com pequeno atraso
    setTimeout(() => {
      adicionarMensagem(botText, "bot-msg");
    }, 500);

    // Salvar "log" no console (futuramente pode ser salvo em backend)
    console.log("Usuário perguntou:", userText);
    console.log("Resposta do bot:", botText);
  }

  // Função para adicionar mensagens ao chat
  function adicionarMensagem(texto, classe) {
    const msg = document.createElement("p");
    msg.className = classe;
    msg.innerText = texto;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll para baixo
  }
  document.getElementById("sendBtn").addEventListener("click", enviarPergunta);
document.getElementById("chatInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") enviarPergunta();
});

function enviarPergunta() {
  const input = document.getElementById("chatInput");
  const pergunta = input.value.trim();
  if (pergunta === "") return;

  adicionarMensagem(pergunta, "user-msg");
  input.value = "";

  const resposta = gerarResposta(pergunta);
  setTimeout(() => adicionarMensagem(resposta, "bot-msg"), 500);

  setTimeout(() => {
  adicionarMensagem(resposta, "bot-msg");
  salvarConversa(pergunta, resposta);
}, 500)
}

function gerarResposta(pergunta) {
  const p = pergunta.toLowerCase();

  if (p.includes("horário") || p.includes("hora")) {
    return "Nosso horário de funcionamento é de segunda a sexta, das 08h às 18h.";
  }
  if (p.includes("endereço") || p.includes("local") || p.includes("onde fica")) {
    return "Estamos localizados na Rua Exemplo, nº 123, Bairro Centro, Cidade/UF.";
  }
  if (p.includes("pedagógico") || p.includes("aula") || p.includes("curso")) {
    return "Sobre assuntos pedagógicos, em breve vamos adicionar mais informações!";
  }

  return "Desculpe, não entendi sua pergunta. Por favor, reformule ou escolha uma das opções acima.";
}