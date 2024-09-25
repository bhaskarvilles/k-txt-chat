async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
  
    if (!userInput) {
      alert('Please enter a message.');
      return;
    }
  
    // Display user's message in the chatbox
    displayMessage(userInput, 'user');
  
    // Send the message to the Worker
    const response = await fetch('https://kerdos.pro', {
      method: 'POST',
      body: JSON.stringify({ message: userInput }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await response.json();
  
    // Display AI's response in the chatbox
    const aiResponse = data[0].response.result; // Assuming the AI response is stored in this field
    displayMessage(aiResponse, 'bot');
  
    // Clear the input field after sending the message
    document.getElementById('userInput').value = '';
  }
  
  function displayMessage(message, sender) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('p');
    messageElement.className = 'message ' + sender;
    messageElement.textContent = sender === 'user' ? `You: ${message}` : `Bot: ${message}`;
    chatbox.appendChild(messageElement);
  }
  