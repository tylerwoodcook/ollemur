import { marked } from 'marked';

const chatLog = document.getElementById("chat-log");
const promptInput = document.getElementById("prompt-input");
const sendButton = document.getElementById("send-button");

// Function to fetch data from the Ollama API
async function getResponse() {
  const prompt = promptInput.value;
  if (!prompt) return;

  const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          model: 'gemma3:4b',
          prompt: prompt,
          stream: true
      })
  });

  if (!response.ok || !response.body) {
      console.error('Error fetching response:', response.status, response.statusText);
      chatLog.innerHTML += `<p>Error: Could not get response.</p>`;
      return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullReply = '';

  const userMsg = document.createElement('div');
  userMsg.innerHTML = `<strong>User:</strong> ${prompt}`;
  chatLog.appendChild(userMsg);

  const botMsg = document.createElement('div');
  botMsg.innerHTML = `<strong>Bot:</strong> `;
  chatLog.appendChild(botMsg);

  while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
          try {
              const data = JSON.parse(line);
              if (data.response) {
                  fullReply += data.response;
                  botMsg.innerHTML = `<strong>Bot:</strong><br>${marked.parse(fullReply)}`;
                }
          } catch (err) {
              console.error('Error parsing JSON chunk:', err, line);
          }
      }
  }
}


// Function to display messages in the chat log
function displayMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `${sender}: ${message}`;
    chatLog.appendChild(messageElement);
}

// Event listener for the Send button
sendButton.addEventListener("click", getResponse);

// Event listener for Enter key in the prompt input
promptInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        getResponse();
    }
});
