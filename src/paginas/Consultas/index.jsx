import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../../lib/supabaseClient';
import './style.css';

const Consultas = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = React.useState('');
  const [consultas, setConsultas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Datos de ejemplo (fallback)
  const ejemplo = [
    { id: 1, nombre: 'Ana Mar\u00eda Gonz\u00e1lez', fecha: '2025-10-15', diagnostico: 'Conjuntivitis', especialista: 'Dr. Ruiz' },
    { id: 2, nombre: 'Luis P\u00e9rez', fecha: '2025-09-30', diagnostico: 'Glaucoma leve', especialista: 'Dra. Morales' },
    { id: 3, nombre: 'Carla Ruiz', fecha: '2025-08-21', diagnostico: 'Queratocono', especialista: 'Dr. Torres' },
  ];

  React.useEffect(() => {
    let mounted = true;

    const fetchConsultas = async () => {
      if (!supabase) {
        if (mounted) {
          setConsultas(ejemplo);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase.from('consultas').select('*').order('fecha', { ascending: false });
        if (error) {
          console.error('Error cargando consultas:', error);
          if (mounted) setConsultas(ejemplo);
        } else {
          if (mounted) setConsultas(data || ejemplo);
        }
      } catch (err) {
        console.error('Excepcion al cargar consultas:', err);
        if (mounted) setConsultas(ejemplo);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchConsultas();

    return () => { mounted = false; };
  }, []);

  const filtradas = consultas.filter((c) => {
    if (!busqueda) return true;
    const b = busqueda.toLowerCase();
    return (
      (c.nombre && c.nombre.toLowerCase().includes(b)) ||
      (c.diagnostico && c.diagnostico.toLowerCase().includes(b)) ||
      (c.especialista && c.especialista.toLowerCase().includes(b))
    );
  });

  return (
    <main className="pacientes">
      <header className="header">
        <h2>Gesti\u00f3n de Consultas</h2>
        <p className="descripcion">Consulta los registros de consultas realizadas.</p>
      </header>

      <div className="acciones-pacientes">
        <input
          type="text"
          placeholder="Buscar por nombre, diagnóstico o especialista..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />

        <div className="botones-filtro">
          <button className={`boton-filtro ${'todos' === 'todos' ? 'activo' : ''}`}>Todos</button>
          <button className="boton-filtro">Recientes</button>
        </div>

  <Link className="boton-nuevo" to="/nueva-consulta">+ Nueva Consulta</Link>
      </div>

      {filtradas.length === 0 ? (
        <div className="sin-datos-card">
          <p>\ud83e\uddfe No hay consultas registradas</p>
        </div>
      ) : (
        <div className="grid-pacientes">
          {filtradas.map((c, index) => (
            <div key={c.id ?? index} className="card-paciente">
              <h3>{c.nombre}</h3>
              <p><strong>Fecha:</strong> {c.fecha}</p>
              <p><strong>Diagnóstico:</strong> {c.diagnostico}</p>
              <p><strong>Especialista:</strong> {c.especialista}</p>

              <div className="acciones-card">
                <button className="btn-ver" onClick={() => navigate(`/consulta/${c.id ?? ''}`)}>Ver</button>
                <button className="btn-editar" onClick={() => navigate(`/consulta/${c.id ?? ''}`)}>Editar</button>
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

export default Consultas;
