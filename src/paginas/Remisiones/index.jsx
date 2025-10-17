import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Remisiones = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = React.useState('');

  // Datos de ejemplo
  const [remisiones] = React.useState([
    { nombre: 'Ana María González', fecha: '2025-10-15', especialidad: 'Retina', motivo: 'Control OCT' },
    { nombre: 'Luis Pérez', fecha: '2025-09-30', especialidad: 'Glaucoma', motivo: 'Evaluación presión' },
    { nombre: 'Carla Ruiz', fecha: '2025-08-21', especialidad: 'Córnea', motivo: 'Consulta córnea' },
  ]);

  const filtradas = remisiones.filter(r =>
    r.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.especialidad.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.motivo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="remisiones">
      <header className="header">
        <h2>Gestión de Remisiones</h2>
        <p className="descripcion">Registra y consulta las remisiones enviadas a especialistas.</p>
      </header>

      <div className="remisiones-actions">
        <div className="search-row">
          <input
            type="text"
            placeholder="Buscar por nombre, especialidad o motivo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-busqueda"
          />
        </div>

        <div className="controls-row">
          <div className="botones-filtro">
            <button className="boton-filtro activo">Todos</button>
            <button className="boton-filtro">Pendientes</button>
            <button className="boton-filtro">Enviadas</button>
          </div>

          <button className="boton-nuevo" onClick={() => navigate('/nuevo-examen')}>+ Nueva Remisión</button>
        </div>
      </div>

      <div className="tabla-remisiones">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Especialidad</th>
              <th>Motivo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((r, i) => (
              <tr key={i}>
                <td>{r.nombre}</td>
                <td>{r.fecha}</td>
                <td>{r.especialidad}</td>
                <td>{r.motivo}</td>
                <td>
                  <div className="acciones-fila">
                    <button className="btn-ver" onClick={() => navigate('/examen/1')}>Ver</button>
                    <button className="btn-editar" onClick={() => navigate('/examen/1')}>Editar</button>
                    <button className="btn-eliminar">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="paginacion">
        <button>Anterior</button>
        <span>1</span>
        <button>Siguiente</button>
      </div>
    </main>
  );
};

export default Remisiones;
