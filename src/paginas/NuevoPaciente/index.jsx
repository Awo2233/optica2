import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const NuevoPaciente = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: '',
    observaciones: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del paciente:', formData);
    navigate('/pacientes');
  };

  return (
    <main className="nuevo-paciente-container">
      {/* Cabecera con botón volver */}
      <div className="header-container">
        <h2>Nuevo Paciente</h2>
        <button 
          type="button" 
          className="back-button"
          onClick={() => navigate('/pacientes')}
        >
          ←
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="paciente-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
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
            <label htmlFor="documento">Documento / ID</label>
            <input
              type="text"
              id="documento"
              name="documento"
              value={formData.documento}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="observaciones">Observaciones</label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleInputChange}
              rows="4"
              placeholder="Agrega cualquier nota relevante sobre el paciente"
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Guardar Paciente
        </button>
      </form>
    </main>
  );
};

export default NuevoPaciente;
