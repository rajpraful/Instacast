import React from "react";
import "./styles.css";
function Button({ text, onClick, disabled, width, className }) {
  return (
    <div
      onClick={onClick}
      className={className ?? "custom-btn"}
      disabled={disabled}
      style={{ width: width }}
    >
      {text}
    </div>
  );
}

export default Button;
