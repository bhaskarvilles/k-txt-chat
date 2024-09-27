// Select the messages container
const messagesContainer = document.querySelector('.messages-content');

// Function to create a new message element
function addMessage(content, isPersonal) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isPersonal ? 'message-personal' : 'message-received');
    messageElement.innerText = content;

    // Add classes for proper alignment
    if (isPersonal) {
        messageElement.style.alignSelf = 'flex-end'; // Align sent messages to the right
        messageElement.style.background = 'linear-gradient(120deg, #248A52, #257287)';
    } else {
        messageElement.style.alignSelf = 'flex-start'; // Align received messages to the left
        messageElement.style.background = 'rgba(0, 0, 0, 0.3)';
    }

    // Add fade-in effect
    messageElement.style.opacity = 0;
    messageElement.style.transform = 'translateY(10px)'; // Start position
    messagesContainer.appendChild(messageElement);

    // Animate the fade-in effect using JavaScript
    setTimeout(() => {
        messageElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        messageElement.style.opacity = 1;
        messageElement.style.transform = 'translateY(0)'; // End position
    }, 50);

    scrollToBottom();
}

// Function to handle the typing indicator
function showTypingIndicator() {
    // Check if typing indicator already exists to avoid duplication
    if (document.querySelector('.typing-indicator')) return;

    // Create typing indicator element
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');

    // Add three dots to the typing indicator
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.margin = '0 2px';
        dot.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        dot.style.borderRadius = '50%';
        typingIndicator.appendChild(dot);

        // Adding animation for typing dots using JavaScript
        let animateDot = (delay) => {
            setTimeout(() => {
                dot.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                dot.style.transform = 'translateY(-3px)';
                dot.style.opacity = 0.2;
            }, delay);

            setTimeout(() => {
                dot.style.transform = 'translateY(3px)';
                dot.style.opacity = 1;
            }, delay + 300);
        };

        // Repeat the animation
        setInterval(() => {
            animateDot(i * 200);
        }, 600);
    }

    typingIndicator.style.alignSelf = 'flex-start'; // Align typing indicator to the left side
    messagesContainer.appendChild(typingIndicator);
    scrollToBottom();
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Utility function to keep the latest messages visible
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Example usage: Adding a personal message
document.querySelector('.message-submit').addEventListener('click', () => {
    const messageInput = document.querySelector('.message-input');
    const messageText = messageInput.value.trim();

    if (messageText) {
        addMessage(messageText, true); // Adding as personal (sent) message
        messageInput.value = '';

        // Show typing indicator when a message is sent
        showTypingIndicator();

        // Remove the typing indicator after a delay (or when AI response is received)
        setTimeout(() => {
            removeTypingIndicator();
        }, 2000); // Adjust the timing based on your AI's response time
    }
});
