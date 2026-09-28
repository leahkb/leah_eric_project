import { useState } from "react";

export default function TextChange() {
  const [inputText, setInputText] = useState("");
  const [text, setText] = useState("Hi Lovey!");

  const handleChangeText = () => {
    setText(inputText);
  };

  return (
    <div>
      <p
        style={{
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          textAlign: "center",
          letterSpacing: "2px",
          padding: "15px",
          fontSize: "25px",
          color: "#000",
        }}
      >
        {text}
      </p>

      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter new text"
        style={{
          padding: "5px",
          fontSize: "12px",
          marginRight: "10px",
        }}
      />

      <button
        onClick={handleChangeText}
        style={{
          padding: "5px 10px",
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
        Change Text
      </button>
    </div>
  );
}
