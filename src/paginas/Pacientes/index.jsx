import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Pacientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]); // Aquí luego conectas con la base de datos
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos');

  const handleBuscar = (e) => setBusqueda(e.target.value);
  const handleFiltro = (nuevo) => setFiltro(nuevo);

  const pacientesFiltrados = pacientes.filter((p) => {
    if (filtro === 'todos') return true;
    if (filtro === 'recientes') return true; // luego defines lógica real
    if (filtro === 'pendientes') return true;
    return true;
  });

  return (
    <main className="pacientes">
      <header className="header">
        <h2>Gestión de Pacientes</h2>
        <p className="descripcion">
          Aquí podrás registrar, consultar y administrar tus pacientes.
        </p>
      </header>

      <div className="acciones-pacientes">
        <input
          type="text"
          placeholder="Buscar paciente..."
          value={busqueda}
          onChange={handleBuscar}
          className="input-busqueda"
        />

        <div className="botones-filtro">
          <button
            className={`boton-filtro ${filtro === 'todos' ? 'activo' : ''}`}
            onClick={() => handleFiltro('todos')}
          >
            Todos
          </button>
          <button
            className={`boton-filtro ${filtro === 'recientes' ? 'activo' : ''}`}
            onClick={() => handleFiltro('recientes')}
          >
            Recientes
          </button>
          <button
            className={`boton-filtro ${filtro === 'pendientes' ? 'activo' : ''}`}
            onClick={() => handleFiltro('pendientes')}
          >
            Pendientes
          </button>
        </div>

        <button
          className="boton-nuevo"
          onClick={() => navigate('/nuevo-paciente')}
        >
          + Nuevo Paciente
        </button>
      </div>

      {pacientesFiltrados.length === 0 ? (
        <div className="sin-datos-card">
          <p>🧑‍⚕️ No hay pacientes registrados</p>
        </div>
      ) : (
        <div className="grid-pacientes">
          {pacientesFiltrados.map((paciente, index) => (
            <div key={index} className="card-paciente">
              <h3>{paciente.nombre}</h3>
              <p><strong>Documento:</strong> {paciente.documento}</p>
              <p><strong>Teléfono:</strong> {paciente.telefono}</p>
              <p><strong>Fecha de nacimiento:</strong> {paciente.fechaNacimiento}</p>
              <p><strong>Dirección:</strong> {paciente.direccion}</p>

              <div className="acciones-card">
                <button className="btn-ver">Ver</button>
                <button className="btn-editar">Editar</button>
                <button className="btn-eliminar">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="paginacion">
        <button>Anterior</button>
        <span>1</span>
        <button>Siguiente</button>
      </div>
    </main>
  );
};

export default Pacientes;
