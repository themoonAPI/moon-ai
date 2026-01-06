// moon-AI Script – Fixed Connection Issues

let history = JSON.parse(localStorage.getItem('chatHistory')) || [];
let isOwner = localStorage.getItem('isOwner') === 'true';
const SECRET_CODE = "xai-moon-2026";

async function send() {
    let input = document.getElementById('user-input');
    let message = input.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    input.value = '';

    let placeholder = addMessage('🌙 Thinking...', 'bot');

    try {
        // Owner code
        if (message.toLowerCase().includes('owner code: ' + SECRET_CODE)) {
            isOwner = true;
            localStorage.setItem('isOwner', 'true');
            updateStatus();
            replaceMessage(placeholder, 'Owner mode activated! 😎');
            return;
        }

        // Keep history short to avoid timeout
        let shortHistory = history.slice(-6); // Only last 6 exchanges
        shortHistory.push({ role: "user", content: message });

        // Use fastest model
        const response = await puter.ai.chat(shortHistory, { 
            model: "gpt-4o-mini"  // Fastest & most reliable
        });

        // Save to full history
        history.push({ role: "user", content: message });
        history.push({ role: "assistant", content: response });
        if (history.length > 20) history = history.slice(-20);
        localStorage.setItem('chatHistory', JSON.stringify(history));

        let reply = response;
        if (isOwner) reply += " — Boss mode active.";
        else if (Math.random() > 0.6) reply += " — Moon•API vibes. 🌙";

        replaceMessage(placeholder, reply);
    } catch (error) {
        // Better fallback
        replaceMessage(placeholder, 'Moon signal weak... Try again in a sec! 🌙');
        console.log("AI error:", error);
    }
}

function addMessage(text, type) {
    let chat = document.getElementById('chat');
    let div = document.createElement('div');
    div.classList.add('message', type);
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    return div;
}

function replaceMessage(element, text) {
    if (element) element.textContent = text;
}

function updateStatus() {
    let status = document.getElementById('status');
    status.textContent = isOwner ? 'Owner Mode Active 🌙' : '';
}

// Load chat
history.forEach(msg => addMessage(msg.content, msg.role === 'user' ? 'user' : 'bot'));

if (history.length === 0) {
    addMessage("Hey! I'm moon-AI 🌙\nReal AI, remembers everything, owner mode available.\nLet's chat!", 'bot');
}

updateStatus();
