import React, { useState } from "react";
import "./AddPostbutton.css";

export default function AddPostButton({ onOpen }) {
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    if (!user) {
      setMessage("You must be logged in to add a post!");
      setTimeout(() => setMessage(""), 3000); 
      return;
    }
    onOpen(); 
  };

  return (
    <>
      <button
        className="add-post-btn"
        onClick={handleClick}
      >
        +
      </button>

      {message && (
        <div className="login-message">
          {message}
        </div>
      )}
    </>
  );
}
