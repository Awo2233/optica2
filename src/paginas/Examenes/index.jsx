import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Examenes = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  // Datos de ejemplo (luego se conectan con base de datos)
  const examenes = [
    {
      id: 1,
      paciente: "Ana María González",
      fecha: "2025-10-16",
      archivos: ["Informe.pdf", "OjoIzq.jpg", "OjoDer.jpg"],
      notas: "Revisión anual. Progresión miopía leve.",
    },
    {
      id: 2,
      paciente: "Carlos Rodríguez",
      fecha: "2025-10-15",
      archivos: ["ExamenCompleto.pdf", "Retina.jpg"],
      notas: "Control de presión intraocular.",
    }
  ];

  return (
    <main className="examenes">
      {/* Encabezado */}
      <header className="header">
        <h2>Gestión de Exámenes</h2>
        <p className="descripcion">
          Aquí podrás registrar, consultar y administrar los exámenes clínicos realizados.
        </p>
      </header>

      {/* Barra de búsqueda y acción */}
      <div className="acciones-examenes">
        <input
          type="text"
          placeholder="Buscar examen..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
        <button
          className="boton-nuevo"
          onClick={() => navigate('/nuevo-examen')}
        >
          + Nuevo Examen
        </button>
      </div>

      {/* Contenedor principal */}
      {examenes.length === 0 ? (
        <div className="sin-datos-card">
          <p>🧾 No hay exámenes registrados</p>
        </div>
      ) : (
        <div className="grid-examenes">
          {examenes.map((examen) => (
            <div key={examen.id} className="card-examen">
              <div className="card-header">
                <h3>{examen.paciente}</h3>
                <p className="fecha">
                  {new Date(examen.fecha).toLocaleDateString()}
                </p>
              </div>

              <div className="card-body">
                <p><strong>Notas:</strong> {examen.notas}</p>
                <p><strong>Archivos:</strong> {examen.archivos.join(', ')}</p>
              </div>

              <div className="acciones-card">
                <button
                  onClick={() => navigate(`/examen/${examen.id}`)}
                  className="btn-ver"
                >
                  Ver
                </button>
                <button className="btn-editar">Editar</button>
                <button className="btn-eliminar">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="paginacion">
        <button>Anterior</button>
        <span>1</span>
        <button>Siguiente</button>
      </div>
    </main>
  );
};

export default Examenes;
