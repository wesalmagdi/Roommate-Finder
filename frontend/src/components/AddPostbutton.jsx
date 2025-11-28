
import React from "react";
import "./AddPostButton.css";

export default function AddPostButton({ onOpen }) {
  return (
    <button className="add-post-btn" onClick={onOpen}>
      +
    </button>
  );
}
