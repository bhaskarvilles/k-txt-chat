// Elements
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Event listener for the send button
sendButton.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user-message');
        userInput.value = '';
        await fetchBotResponse(message);
    }
});

// Send message on Enter key press
userInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendButton.click();
    }
});

// Function to add message to chatbox
function addMessage(content, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = content;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

// Function to fetch response from Cloudflare Worker
async function fetchBotResponse(userMessage) {
    // Disable the send button while waiting for the response
    sendButton.disabled = true;

    try {
        const response = await fetch(`https://chat.bhaskarvilles.workers.dev/?message=${encodeURIComponent(userMessage)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            const botResponse = data[0]?.response?.response || "Sorry, I couldn't process that.";
            addMessage(botResponse, 'bot-message');
        } else {
            addMessage("Error: Unable to communicate with the chatbot.", 'bot-message');
        }
    } catch (error) {
        console.error(error);
        addMessage("Error: Something went wrong. Please try again later.", 'bot-message');
    }

    // Re-enable the send button
    sendButton.disabled = false;
}
