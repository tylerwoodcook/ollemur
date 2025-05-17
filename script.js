import { marked } from "marked";

const chatLog = document.getElementById("chat-log");
const promptInput = document.getElementById("prompt-input");
const sendButton = document.getElementById("send-button");
const currentModel = "llama3.2:latest";


// If don't messages exist, show "no messages" label
const chatLogMessages = document.getElementById('chat-log');

if (!document.querySelector('.user-message')) {
    chatLogMessages.innerHTML = '<div class="no-messages"><span style="display: block; font-size: 32px; margin-bottom: 16px;">🤖</span>Hello, what\'s on your mind?</div>';
}

let controller = null; // global or in component state


// Function to fetch data from the Ollama API
async function getResponse() {
    controller = new AbortController();

    const rawPrompt = promptInput.value.trim();
    if (!rawPrompt) return;

    promptInput.value = ""; // clear the input
    const prompt = marked.parse(rawPrompt);


    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: currentModel,
            prompt: prompt,
            stream: true,
        }),
        signal: controller.signal
    });

    if (!response.ok || !response.body) {
        console.error(
            "Error fetching response:",
            response.status,
            response.statusText,
        );
        chatLog.innerHTML += `<p>Error: Could not get response.</p>`;
        return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullReply = "";

    const userMsg = document.createElement("div");
    userMsg.innerHTML = `<div class="user-message"><div class="user-icon">🙂</div><div class="user-prompt">${prompt}</div></div>`;
    chatLog.appendChild(userMsg);

    const botMsg = document.createElement("div");
    botMsg.innerHTML = `<strong>🤖</strong> `;
    chatLog.appendChild(botMsg);

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
            try {
                const data = JSON.parse(line);
                if (data.response) {
                    fullReply += data.response;
                    botMsg.innerHTML = `<div class="bot-message"><div class="bot-icon">🤖</div><div class="bot-prompt">${marked.parse(fullReply)}</div></div>`;
                }
            } catch (err) {
                console.error("Error parsing JSON chunk:", err, line);
            }
        }
    }
}

// Function to stop response output
function stopResponse() {
  if (controller) {
    controller.abort();
    controller = null;
  }
}
const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", stopResponse);



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

// Function to display current model name
function displayCurrentModel() {
    const modelContainer = document.getElementById("model-name");
    modelContainer.innerText = currentModel;
}
displayCurrentModel();
