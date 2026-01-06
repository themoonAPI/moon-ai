// moon-AI Script – Real AI Chat with Puter.js

async function send() {
    let input = document.getElementById('user-input');
    let message = input.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, 'user');
    input.value = '';

    // Show "thinking" placeholder
    addMessage('🌙 Thinking...', 'bot');

    try {
        // Call real AI via Puter.js (free, powerful models)
        const response = await puter.ai.chat(message, {
            model: "gpt-4o-mini"  // Fast & smart. Alternatives: "gpt-5-nano", "claude-3-haiku"
        });

        // Replace "thinking" with real response
        replaceLastBotMessage(response);
    } catch (error) {
        replaceLastBotMessage('⚠️ AI is taking a moon nap... Try again!');
        console.error(error);
    }
}

function addMessage(text, type) {
    let chat = document.getElementById('chat');
    let div = document.createElement('div');
    div.classList.add('message', type);
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function replaceLastBotMessage(text) {
    let chat = document.getElementById('chat');
    if (chat.lastChild && chat.lastChild.classList.contains('bot')) {
        chat.lastChild.textContent = text;
    }
}

// Welcome message when page loads
window.onload = function() {
    addMessage("Hello! I'm moon-AI 🌙\nPowered by real AI — ask me anything!", 'bot');
};
