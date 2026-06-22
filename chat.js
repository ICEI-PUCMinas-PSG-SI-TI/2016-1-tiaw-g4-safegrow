let isProcessing = false;

const chatArea = document.getElementById('chatArea');
const messagesContainer = document.getElementById('messagesContainer');
const welcomeMessage = document.getElementById('welcomeMessage');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const clearChatBtn = document.getElementById('clearChatBtn');
const voltarBtn = document.getElementById('voltarBtn');

const formatarTexto = (texto) => {
    const safeText = texto.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return safeText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
};

const renderizarMensagem = (texto, remetente) => {
    const isUser = remetente === 'usuario';
    const cssClass = isUser ? 'user' : 'ia';
    const icon = isUser ? '<i class="bi bi-person"></i>' : '<i class="bi bi-robot"></i>';
    const textoFmt = formatarTexto(texto);

    const div = document.createElement('div');
    div.className = `message-row ${cssClass}`;
    
    const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    div.innerHTML = `
        <div class="message-avatar">${icon}</div>
        <div>
          <div class="message-bubble">${textoFmt}</div>
          <div class="message-time">${timeStr}</div>
        </div>
    `;

    messagesContainer.appendChild(div);
};

const consultarIA = async (pergunta) => {
    if (!GEMINI_API_KEY) {
        typingIndicator.classList.add('d-none');
        renderizarMensagem("ERRO: Chave da API inválida.", "ia");
        isProcessing = false;
        atualizarBotao();
        scrollParaBaixo();
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    
    const promptCompleto = `Você é uma IA de um site acadêmico focado em combater a adultização infantil no Brasil. Responda a seguinte pergunta do usuário de forma clara, amigável e resumida (máximo de 2 a 3 parágrafos). Pergunta do usuário: ${pergunta}`;

    const dados = {
        contents: [{
            parts: [{ text: promptCompleto }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        
        const resultado = await response.json();
        
        typingIndicator.classList.add('d-none');
        
        if (resultado.error) {
            renderizarMensagem(`Desculpe, ocorreu um erro na API: ${resultado.error.message}`, "ia");
        } else {
            const respostaIA = resultado.candidates[0].content.parts[0].text;
            renderizarMensagem(respostaIA, "ia");
        }
    } catch (erro) {
        typingIndicator.classList.add('d-none');
        renderizarMensagem("Erro ao conectar com a API da IA. Verifique sua internet.", "ia");
        console.error(erro);
    } finally {
        isProcessing = false;
        atualizarBotao();
        scrollParaBaixo();
    }
};

const enviarMensagem = () => {
    const texto = messageInput.value.trim();
    if (texto === "" || isProcessing) return;

    isProcessing = true;
    messageInput.value = '';
    sendBtn.disabled = true;
    welcomeMessage.classList.add('d-none');

    renderizarMensagem(texto, 'usuario');
    scrollParaBaixo();

    typingIndicator.classList.remove('d-none');
    scrollParaBaixo();

    consultarIA(texto);
};

const limparChat = () => {
    messagesContainer.innerHTML = '';
    welcomeMessage.classList.remove('d-none');
};

const scrollParaBaixo = () => {
    setTimeout(() => {
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 50);
};

const atualizarBotao = () => {
    sendBtn.disabled = (messageInput.value.trim() === '' || isProcessing);
};

const configurarEventos = () => {
    sendBtn.addEventListener('click', enviarMensagem);

    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarMensagem();
        }
    });

    messageInput.addEventListener('input', atualizarBotao);
    
    if (clearChatBtn) clearChatBtn.addEventListener('click', limparChat);

    const botoes = document.querySelectorAll('.suggestion-btn');
    botoes.forEach(botao => {
        botao.addEventListener('click', (e) => {
            messageInput.value = e.target.getAttribute('data-suggestion');
            atualizarBotao();
            enviarMensagem();
        });
    });

    if (voltarBtn) {
        voltarBtn.addEventListener('click', () => {
            alert('Botão "Voltar" pressionado!');
        });
    }
};

document.addEventListener('DOMContentLoaded', configurarEventos);