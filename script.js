// moon-AI Script – Reliable, No Connection Lost

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
        // Owner check
        if (message.toLowerCase().includes('owner code: ' + SECRET_CODE)) {
            isOwner = true;
            localStorage.setItem('isOwner', 'true');
            updateStatus();
            replaceMessage(placeholder, 'Owner mode unlocked! 😎');
            return;
        }

        // Add to full history (automatic memory)
        history.push({ role: "user", content: message });
        if (history.length > 20) history = history.slice(-20);
        localStorage.setItem('chatHistory', JSON.stringify(history));

        // Send only last 6 exchanges to AI (prevents timeout)
        let context = history.slice(-6);

        const response = await puter.ai.chat(context, { model: "gpt-4o-mini" });

        // Save response
        history.push({ role: "assistant", content: response });
        localStorage.setItem('chatHistory', JSON.stringify(history));

        let reply = response;
        if (isOwner) reply += " — Boss mode active.";
        else if (Math.random() > 0.5) reply += " — Moon•API powered. 🌙";

        replaceMessage(placeholder, reply);
    } catch (error) {
        replaceMessage(placeholder, 'Moon Ai is taking a moon nap... Try again in a moment! 🌙');
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

// Load history on start
history.forEach(msg => addMessage(msg.content, msg.role === 'user' ? 'user' : 'bot'));

if (history.length === 0) {
    addMessage("Hey! I'm moon-AI 🌙 Real AI that remembers everything. Owner mode ready. What's up?", 'bot');
}

updateStatus();
