import Modal from "react-modal";

// Set up Modal for tests
// This creates a virtual element for Modal to use
const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "root");
document.body.appendChild(modalRoot);

// Configure Modal for tests
Modal.setAppElement(modalRoot);
