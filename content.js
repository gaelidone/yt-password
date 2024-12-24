const texts = [
  "You must be studying instead of procrastinating",
  "Don't wait! Do something when you are young, when you have nothing to lose",
  "I want to be successful, so I'm going to study more"
];

let state = false;

const createModal = (text, onClose) => {
  // Prevent duplicates
  if (document.getElementById("study-modal")) return;

  if(state === true) return;

  state = true

  const modal = document.createElement("div");
  modal.id = "study-modal";
  Object.assign(modal.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "10000"
  });

  const message = document.createElement("p");
  message.textContent = text;
  Object.assign(message.style, {
    color: "#fff",
    fontSize: "2.5rem",
    marginBottom: "20px",
    textAlign: "center",
    userSelect: "none" // Disable text selection
  });

  const input = document.createElement("input");
  Object.assign(input, {
    type: "text",
    placeholder: "Type the text above..."
  });
  Object.assign(input.style, {
    padding: "10px",
    fontSize: "1.75rem",
    border: "1px solid #fff",
    color: "#fff",
    backgroundColor: "#333",
    borderRadius: "5px",
    marginBottom: "20px",
    width: "80%",
    maxWidth: "400px"
  });

  const button = document.createElement("button");
  button.textContent = "Submit";
  Object.assign(button.style, {
    padding: "10px 20px",
    fontSize: "2rem",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  });

  button.addEventListener("click", () => {
    if (input.value === text) {
      modal.remove();
      onClose(); // Notify that the modal has been closed
      state = false
    } else {
      alert("Incorrect text. Please type it exactly as shown.");
    }
  });

  modal.appendChild(message);
  modal.appendChild(input);
  modal.appendChild(button);

  document.body.appendChild(modal);
};

const observeYouTubeNavigation = () => {
  let modalActive = false;

  const targetNode = document.body;
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver(() => {
    const url = window.location.href;
    if (url.includes("youtube.com/watch?v=") && !modalActive) {
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      modalActive = true; // Prevent multiple modals
      createModal(randomText, () => {
        modalActive = false; // Reset when the modal is closed
      });
    }
  });

  observer.observe(targetNode, config);
};

// Initialize the modal functionality
observeYouTubeNavigation();

