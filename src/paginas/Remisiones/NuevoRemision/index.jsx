import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../lib/supabaseClient';
import '../../NuevoPaciente/style.css';

const NuevoRemision = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    correo: '',
    telefono: '',
    especialista: '',
    motivo: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.nombre || !formData.especialista || !formData.motivo) {
      setError('Por favor completa los campos requeridos (nombre, especialista y motivo).');
      return;
    }

    setLoading(true);
    try {
      if (supabase) {
        const { error: supError } = await supabase.from('remisiones').insert([
          {
            nombre: formData.nombre,
            fecha_nacimiento: formData.fechaNacimiento || null,
            correo: formData.correo || null,
            telefono: formData.telefono || null,
            especialista: formData.especialista,
            motivo: formData.motivo,
            fecha: new Date().toISOString().slice(0, 10),
            estado: 'pendiente',
          },
        ]);
        if (supError) {
          console.error('Supabase insert error', supError);
          setError('Error al guardar en la base de datos.');
        } else {
          navigate('/remisiones');
        }
      } else {
        console.warn('Supabase no configurado. Simulando guardado.');
        navigate('/remisiones');
      }
    } catch (err) {
      console.error(err);
      setError('Error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="nuevo-paciente-container">
      <div className="header-container">
        <h2>Nueva Remisión</h2>
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/remisiones')}
        >
          ←
        </button>
      </div>

      <form onSubmit={handleSubmit} className="paciente-form">
        {error && <div className="form-error">{error}</div>}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre del paciente</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Número de teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="especialista">Especialista</label>
            <input
              type="text"
              id="especialista"
              name="especialista"
              value={formData.especialista}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="motivo">Motivo de la remisión</label>
            <textarea
              id="motivo"
              name="motivo"
              value={formData.motivo}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Remisión'}
        </button>
      </form>
    </main>
  );
};

export default NuevoRemision;
