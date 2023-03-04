import React from "react";

export default function Modal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="body">Are you sure you want to delete the shoe?</div>
        <div className="footer">
          <button onClick={() => closeModal(false)}>Confirm</button>
          <button onClick={() => closeModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
