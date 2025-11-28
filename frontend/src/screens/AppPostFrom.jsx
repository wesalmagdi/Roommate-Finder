// screens/AddPostForm.jsx
import React, { useState } from "react";
import "./AppPostForm.css";

export default function AddPostForm({ onClose }) {
  const [type, setType] = useState("room");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      type,
      name,
      capacity,
    };

    console.log("New Post:", data);

    onClose();   // close after submit
  };

  return (
    <div className="addpost-overlay">
      <div className="addpost-container">
        <h2>Add Post</h2>

        <form onSubmit={handleSubmit}>
          {/* Dropdown list */}
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="room">Room</option>
            <option value="department">Department</option>
          </select>

          {/* Normal input */}
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Only visible if type is room */}
          {type === "room" && (
            <>
              <label>Capacity</label>
              <input
                type="number"
                placeholder="Capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </>
          )}

          <div className="buttons">
            <button type="submit" className="confirm-btn">Add</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
