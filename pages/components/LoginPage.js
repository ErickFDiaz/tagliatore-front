import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async (e) => {
    console.log(e.target);
    e.preventDefault();
    const login = await fetch("http://localhost:9999/api/1.0/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const resp = await login.json();

    localStorage.setItem("token", resp.data.tokenSession);
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Correo:
          <input type="text" name="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Contrasena:
          <input type="password" name="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button id="login" type="submit" onClick={handleLoginClick}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
