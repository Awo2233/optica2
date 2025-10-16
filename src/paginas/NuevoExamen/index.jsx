import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function NuevoExamen() {
  const [formData, setFormData] = useState({
    pdfFile: null,
    images: [],
    pacienteName: "",
    fechaNacimiento: "",
    notas: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({
        ...formData,
        images: Array.from(files),
      });
    } else if (name === "pdfFile") {
      setFormData({
        ...formData,
        pdfFile: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del examen:", formData);
  };

  const navigate = useNavigate();

  return (
    <main className="nuevo-examen-container">
      {/* Botón en la esquina superior derecha */}
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/examenes")}
      >
        ←
      </button>

      {/* Encabezado */}
      <div className="header-container">
        <h2>Nuevo Examen</h2>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="examen-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pacienteName">Nombre del Paciente</label>
            <input
              type="text"
              id="pacienteName"
              name="pacienteName"
              value={formData.pacienteName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha del Examen</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pdfFile">Subir PDF</label>
            <input
              type="file"
              id="pdfFile"
              name="pdfFile"
              accept=".pdf"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Subir Imágenes</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notas">Notas</label>
          <textarea
            id="notas"
            name="notas"
            value={formData.notas}
            onChange={handleInputChange}
            rows="4"
            placeholder="Agrega observaciones relevantes del examen"
          />
        </div>

        <button type="submit" className="submit-button">
          Guardar Examen
        </button>
      </form>
    </main>
  );
}

export default NuevoExamen;
