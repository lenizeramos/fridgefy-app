import "./AgentChat.scss";
import { useState } from "react";
import { useAgentContext } from "../../../context/AgentContext";

function AgentChat() {

  const { state, sendMessage } = useAgentContext();
  const [message, setMessage] = useState("");
  
  const handleSend = (message: string) => {
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }
  };  

  return (
    <div className="agent-chat-container">
      <div className="agent-chat-header">Agent Chat</div>
      <hr className="agent-chat-divider"/>
      
      <div className="messages-container">
        {state.messages.map((message, index) => (
          message.role === "agent" ? (
          <div key={index} className="message-container-agent">
            <div className="message-header">
              <div className="message-sender">Agent</div>
            </div>
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ) : (
          <div key={index} className="message-container-user">
            <div className="message-header">
            <div className="message-sender">User</div>
          </div>
          <div className="message-content">
            {message.content}
            </div>
          </div>
        )
      ))}
      </div>
      
      <div className="agent-chat-input">
        <input 
          placeholder="Add 3 apples to my shopping list"
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend(message);
            }
          }}
        />
        <button className="send-button" onClick={() => handleSend(message)}>Send</button>
      </div>
    </div>
  );
}

export default AgentChat;
