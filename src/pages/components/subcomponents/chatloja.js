import React, { useState } from "react";
import "../cssComponentes/iconechat.css";

const ChatProvidencial = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    console.log("Abrindo o chat");
    setIsChatOpen(true);
  };

  const closeChat = () => {
    console.log("Fechando o chat");
    setIsChatOpen(false);
  };

  return (
    <div id="container-icone-chat">
      {/* Ícone de chat */}
      <div className="move-icon">
        <span
          className="chat"
          id="btn-chat-comercio"
          onClick={openChat}
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer" }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openChat();
          }}
        >
          <i className="bi bi-chat-dots-fill"></i>
        </span>
      </div>

      {/* Janela de chat */}
      {isChatOpen && (
        <div id="chat-box" className="chat-box">
          <div className="chat-header">
            <h4>Chat Providencial</h4>
            <button
              id="btn-close-chat"
              className="close-chat"
              onClick={closeChat}
            >
              &times;
            </button>
          </div>
          <div className="chat-content">
            <p>Olá! Como podemos ajudar você?</p>
            <a
              href="https://api.whatsapp.com/send?phone=71993998237&text=Gostaria%20de%20receber%20mais%20informações?"
              target="_blank"
              rel="noopener noreferrer"
              className="chat-link"
            >
              Clique aqui para conversar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatProvidencial;
