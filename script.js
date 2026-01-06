// moon-AI Script – With New Chat Feature

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
        if (message.toLowerCase().includes('owner code: ' + SECRET_CODE)) {
            isOwner = true;
            localStorage.setItem('isOwner', 'true');
            updateStatus();
            replaceMessage(placeholder, 'Owner verified! Moon mode unlocked. 😎');
            return;
        }

        if (message.toLowerCase().includes('check link') || message.toLowerCase().includes('is this safe')) {
            const link = message.match(/https?:\/\/[^\s]+/g);
            if (link) {
                const analysis = await puter.ai.chat(`Moon's take on this link: ${link[0]}. Virus? Scam? Safe? Be witty.`, { model: "gpt-4o-mini" });
                replaceMessage(placeholder, analysis);
                return;
            }
        }

        history.push({ role: "user", content: message });
        if (history.length > 20) history = history.slice(-20);

        const response = await puter.ai.chat(history, { model: "gpt-4o-mini" });

        history.push({ role: "assistant", content: response });
        localStorage.setItem('chatHistory', JSON.stringify(history));

        let reply = response;
        if (isOwner) reply = "[Boss Mode] " + reply + " – At your service. 🚀";
        else if (Math.random() > 0.5) reply += " – Moon•API powered. 🌙";

        replaceMessage(placeholder, reply);
    } catch (error) {
        replaceMessage(placeholder, '⚠️ Connection lost... Try again!');
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

// New Chat Feature – Clears history, keeps owner mode
function newChat() {
    if (confirm('Start a new chat? (Clears memory)')) {
        history = [];
        localStorage.removeItem('chatHistory');
        document.getElementById('chat').innerHTML = '';
        addMessage("New chat started! I'm moon-AI 🌙 What's up?", 'bot');
    }
}

// Load history
history.forEach(msg => addMessage(msg.content, msg.role === 'user' ? 'user' : 'bot'));

// Welcome if empty
if (history.length === 0) {
    addMessage("Hey! I'm moon-AI 🌙 Real AI with memory. 'New Chat' button for fresh start. Ask anything!", 'bot');
}

updateStatus();
