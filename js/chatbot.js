const API_KEY = "AIzaSyBNNpUX1AAtoLmxphZSh6cxMRbB-zaRA7s";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

async function sendMessage() {
  const userMsg = userInput.value.trim();
  if (userMsg === "") {
    return;
  }

  appendMessage("user", userMsg);
  userInput.value = "";

  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: userMsg,
            },
          ],
        },
      ],
    }),
  };

  try {
    const response = await fetch(API_URL, reqOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    const botReply = data.candidates[0].content.parts[0].text.trim();
    setTimeout(() => {
      appendMessage("bot", botReply);
    }, 500);
  } catch (error) {
    console.log(error);
    appendMessage("bot", "Sorry, I couldn't process your request.");
  }
}

function appendMessage(sender, text) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  chatbox.appendChild(bubble);
  chatbox.scrollTop = chatbox.scrollHeight;
}

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
sendBtn.addEventListener("click", sendMessage);
