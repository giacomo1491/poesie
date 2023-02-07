import React, { useState } from "react";
import { ImEyeBlocked, ImEye } from "react-icons/im";

// https://react-icons.github.io/react-icons
// npm install react-icons --save

function Passowrd() {
  const [passwordsInputType, setPasswordsInputType] = useState("password");
  const [password, setPassword] = useState("");

  const handleShowPasswordButton = () => {
    setPasswordsInputType(
      passwordsInputType === "password" ? "text" : "password"
    );
  };

  return (
    <div>
      <input
        //disable copy and paste
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onCopy={(e) => {
          e.preventDefault();
          return false;
        }}

        placeholder="password"
        type={passwordsInputType}
        id="pas1"
        value={password}
        autoComplete="new-password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <span className="eyes-icon" onClick={handleShowPasswordButton}>
        {passwordsInputType === "password" ? <ImEye /> : <ImEyeBlocked />}
      </span>
    </div>
  );
}

export default Passowrd;




