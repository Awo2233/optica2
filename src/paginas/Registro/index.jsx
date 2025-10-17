import React, { useState } from "react";
import "../Login/style.css";
import supabase from '../../lib/supabaseClient';

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);

  const validarEmail = (e) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(e).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // Validaciones
    if (!nombre || !email || !telefono || !password) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }
    if (!validarEmail(email)) {
      setError('Formato de correo inválido.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      if (supabase) {
        // Intentar crear usuario (auth) y/o guardar en tabla usuarios
        const { data, error: supError } = await supabase.auth.signUp({ email, password });
        if (supError) {
          console.error('Supabase signup error', supError);
          setError('Error al registrar: ' + supError.message);
          return;
        }
        // Opcional: guardar perfil en tabla "usuarios"
        await supabase.from('usuarios').insert([{ nombre, email, telefono }]);
        // Redirigir a login (o al panel) — por ahora console
        console.log('Usuario registrado:', data);
        window.location.href = '/login';
      } else {
        console.warn('Supabase no configurado. Simulando registro.');
        window.location.href = '/login';
      }
    } catch (err) {
      console.error(err);
      setError('Error al registrar.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-avatar" aria-hidden>👤</div>
        <h2>Crear cuenta</h2>
        <p>Regístrate para acceder al panel clínico</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          <input className="form-input" type="text" placeholder="Nombre completo" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
          <input className="form-input" type="email" placeholder="Correo electrónico" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input className="form-input" type="text" placeholder="Número de teléfono" value={telefono} onChange={(e)=>setTelefono(e.target.value)} />
          <input className="form-input" type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <input className="form-input" type="password" placeholder="Confirmar contraseña" value={confirm} onChange={(e)=>setConfirm(e.target.value)} />

          <button type="submit">Registrarse</button>
        </form>

        <div className="links">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></div>
      </div>
    </div>
  );
}

export default Registro;
