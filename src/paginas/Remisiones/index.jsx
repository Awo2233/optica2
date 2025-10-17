import React from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabaseClient';
import './style.css';

const Remisiones = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = React.useState('');
  const [remisiones, setRemisiones] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Datos de ejemplo (fallback)
  const ejemplo = [
    { id: 1, nombre: 'Ana María González', fecha: '2025-10-15', especialidad: 'Retina', motivo: 'Control OCT' },
    { id: 2, nombre: 'Luis Pérez', fecha: '2025-09-30', especialidad: 'Glaucoma', motivo: 'Evaluación presión' },
    { id: 3, nombre: 'Carla Ruiz', fecha: '2025-08-21', especialidad: 'Córnea', motivo: 'Consulta córnea' },
  ];

  React.useEffect(() => {
    let mounted = true;

    const fetchRemisiones = async () => {
      if (!supabase) {
        // Si no hay cliente (dev sin .env), usamos datos de ejemplo
        if (mounted) {
          setRemisiones(ejemplo);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase.from('remisiones').select('*').order('fecha', { ascending: false });
        if (error) {
          console.error('Error cargando remisiones:', error);
          if (mounted) setRemisiones(ejemplo);
        } else {
          if (mounted) setRemisiones(data || ejemplo);
        }
      } catch (err) {
        console.error('Excepción al cargar remisiones:', err);
        if (mounted) setRemisiones(ejemplo);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRemisiones();

    return () => {
      mounted = false;
    };
  }, []);

  const filtradas = remisiones.filter((r) => {
    if (!busqueda) return true;
    const b = busqueda.toLowerCase();
    return (
      (r.nombre && r.nombre.toLowerCase().includes(b)) ||
      (r.especialidad && r.especialidad.toLowerCase().includes(b)) ||
      (r.motivo && r.motivo.toLowerCase().includes(b))
    );
  });

  return (
    <main className="pacientes">
      <header className="header">
        <h2>Gestión de Remisiones</h2>
        <p className="descripcion">Registra y consulta las remisiones enviadas a especialistas.</p>
      </header>

      <div className="acciones-pacientes">
        <input
          type="text"
          placeholder="Buscar por nombre, especialidad o motivo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />

        <div className="botones-filtro">
          <button className={`boton-filtro ${'todos' === 'todos' ? 'activo' : ''}`}>Todos</button>
          <button className="boton-filtro">Pendientes</button>
          <button className="boton-filtro">Enviadas</button>
        </div>

  <button className="boton-nuevo" onClick={() => navigate('/nuevo-remision')}>+ Nueva Remisión</button>
      </div>

      {filtradas.length === 0 ? (
        <div className="sin-datos-card">
          <p>🧾 No hay remisiones registradas</p>
        </div>
      ) : (
        <div className="grid-pacientes">
          {filtradas.map((r, index) => (
            <div key={r.id ?? index} className="card-paciente">
              <h3>{r.nombre}</h3>
              <p><strong>Fecha:</strong> {r.fecha}</p>
              <p><strong>Especialidad:</strong> {r.especialidad}</p>
              <p><strong>Motivo:</strong> {r.motivo}</p>

              <div className="acciones-card">
                <button className="btn-ver" onClick={() => navigate(`/remision/${r.id ?? ''}`)}>Ver</button>
                <button className="btn-editar" onClick={() => navigate(`/remision/${r.id ?? ''}`)}>Editar</button>
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

export default Remisiones;
