import React from "react";
import "../styles/form.css";

const TextField = ({ id, label, type = "text", placeholder }) => (
  <div className="field">
    <label htmlFor={id} className="label">
      {label}
    </label>
    <input id={id} className="input" type={type} placeholder={placeholder} />
  </div>
);

export default TextField;
