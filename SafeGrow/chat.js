// chat.js - tela de chat com a IA (gemini). Se nao tiver a api key configurada
// ele cai num modo "burro" que so responde com umas respostas prontas la embaixo
let isProcessing = false;

document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    configurarEventos();
});

const formatarTexto = (texto) => {
    const safeText = texto.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return safeText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
};

const renderizarMensagem = (texto, remetente) => {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;

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

// respostas prontas pra quando nao da pra chamar a api de verdade (sem chave configurada)
const obterRespostaLocal = (pergunta) => {
    const p = pergunta.toLowerCase();
    if (p.includes('adultiz') || p.includes('o que é')) {
        return 'A adultização infantil ocorre quando a infância de uma criança é encurtada pela exposição a comportamentos, vestimentas, linguagens ou responsabilidades precoces do mundo adulto. Isso pode prejudicar seu desenvolvimento socioemocional.';
    }
    if (p.includes('identifica') || p.includes('sinal') || p.includes('sintoma')) {
        return 'Sinais comuns de adultização incluem a perda de interesse por brincadeiras infantis, o uso de vocabulário ou temas inadequados para a idade, e a obsessão pela aparência com base em padrões puramente adultos.';
    }
    if (p.includes('rede') || p.includes('social') || p.includes('internet') || p.includes('segurança')) {
        return 'No ambiente online, monitore as interações da criança, use filtros de controle parental e, o mais importante, converse de forma franca sobre os riscos das redes sociais.';
    }
    if (p.includes('ajuda') || p.includes('denuncia') || p.includes('disque 100')) {
        return 'Para denúncias de abuso ou exposição indevida, utilize o Disque 100 (gratuito e sigiloso). Outros recursos podem ser encontrados na aba "Recursos".';
    }
    return 'Sou o assistente de proteção da SafeGrow. Posso tirar dúvidas sobre adultização infantil, segurança na internet e canais de denúncia. Pergunte-me sobre "o que é adultização" ou "como identificar".';
};

const consultarIA = async (pergunta) => {
    const typingIndicator = document.getElementById('typingIndicator');
    
    // checa se a chave do gemini foi configurada (ta no config.js, que nao sobe pro git)
    const apiKey = typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : '';

    if (!apiKey) {
        // sem chave -> usa a resposta local mesmo, com um delayzinho pra parecer que ta "pensando"
        setTimeout(() => {
            if (typingIndicator) typingIndicator.classList.add('d-none');
            const respostaLocal = obterRespostaLocal(pergunta);
            renderizarMensagem(respostaLocal, "ia");
            isProcessing = false;
            atualizarBotao();
            scrollParaBaixo();
        }, 1000);
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
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
        if (typingIndicator) typingIndicator.classList.add('d-none');
        
        if (resultado.error) {
            renderizarMensagem(`Desculpe, ocorreu um erro na API: ${resultado.error.message}`, "ia");
        } else if (resultado.candidates && resultado.candidates[0].content.parts[0].text) {
            const respostaIA = resultado.candidates[0].content.parts[0].text;
            renderizarMensagem(respostaIA, "ia");
        } else {
            renderizarMensagem("Não consegui gerar uma resposta válida.", "ia");
        }
    } catch (erro) {
        if (typingIndicator) typingIndicator.classList.add('d-none');
        renderizarMensagem("Erro ao conectar com a API da IA. Verifique sua internet.", "ia");
        console.error(erro);
    } finally {
        isProcessing = false;
        atualizarBotao();
        scrollParaBaixo();
    }
};

const enviarMensagem = () => {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const typingIndicator = document.getElementById('typingIndicator');

    if (!messageInput) return;
    const texto = messageInput.value.trim();
    if (texto === "" || isProcessing) return;

    isProcessing = true;
    messageInput.value = '';
    if (sendBtn) sendBtn.disabled = true;
    if (welcomeMessage) welcomeMessage.classList.add('d-none');

    renderizarMensagem(texto, 'usuario');
    scrollParaBaixo();

    if (typingIndicator) typingIndicator.classList.remove('d-none');
    scrollParaBaixo();

    consultarIA(texto);
};

const limparChat = () => {
    const messagesContainer = document.getElementById('messagesContainer');
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (messagesContainer) messagesContainer.innerHTML = '';
    if (welcomeMessage) welcomeMessage.classList.remove('d-none');
};

const scrollParaBaixo = () => {
    const chatArea = document.getElementById('chatArea');
    if (!chatArea) return;
    setTimeout(() => {
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 50);
};

const atualizarBotao = () => {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    if (!messageInput || !sendBtn) return;
    sendBtn.disabled = (messageInput.value.trim() === '' || isProcessing);
};

const configurarEventos = () => {
    const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('messageInput');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const voltarBtn = document.getElementById('voltarBtn');

    if (sendBtn) sendBtn.addEventListener('click', enviarMensagem);

    if (messageInput) {
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                enviarMensagem();
            }
        });
        messageInput.addEventListener('input', atualizarBotao);
    }
    
    if (clearChatBtn) clearChatBtn.addEventListener('click', limparChat);

    if (voltarBtn) {
        voltarBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
};
