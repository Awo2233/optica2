import React, { useState } from "react";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", email, password);
    // Aquí después conectamos con Supabase
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-avatar" aria-hidden="true">👤</div>
        <h2>Bienvenido de nuevo</h2>
        <p>Inicia sesión en tu cuenta para acceder al panel clínico.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Ingresar</button>
        </form>

        <div className="links">
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
