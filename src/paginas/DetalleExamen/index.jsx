import React from "react";
import "./style.css";

const DetalleExamen = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fbff] relative">
      {/* Sidebar */}
      <aside className="w-64 bg-[#e9f0ff] p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-3">
              OP
            </div>
            <div>
              <h2 className="font-semibold text-blue-900 text-sm">Optometrista</h2>
              <p className="text-xs text-blue-700">usuario@optica.com</p>
            </div>
          </div>

          <nav className="space-y-6">
            <a href="#" className="flex items-center gap-3 text-blue-900 hover:text-blue-600">🏠 Inicio</a>
            <a href="#" className="flex items-center gap-3 text-blue-900 hover:text-blue-600">👥 Pacientes</a>
            <a href="#" className="flex items-center gap-3 text-blue-900 hover:text-blue-600">📋 Exámenes</a>
            <a href="#" className="flex items-center gap-3 text-blue-900 hover:text-blue-600">🔁 Remisiones</a>
            <a href="#" className="flex items-center gap-3 text-blue-900 hover:text-blue-600">📅 Citas</a>
          </nav>
        </div>

        <div className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-blue-900 hover:text-blue-600">⚙️ Ajustes</a>
          <a href="#" className="flex items-center gap-3 text-blue-900 hover:text-blue-600">🚪 Salir</a>
        </div>
      </aside>

      {/* Contenedor principal */}
      <main className="detalle-examen-container flex-1 relative">
        {/* Botón Volver */}
        <button className="volver-btn absolute top-5 right-8">
          ← Volver
        </button>

        <h1 className="titulo text-center">Detalle del Examen</h1>

        <div className="detalle-grid">
          {/* Tarjeta 1: Información del Paciente */}
          <div className="card">
            <h2>Información del Paciente</h2>
            <p><strong>Nombre:</strong> Ana María González</p>
            <p><strong>Fecha:</strong> 15/10/2025</p>

            <div className="archivos-card">
              <h3 className="text-blue-700 font-semibold mb-2 text-sm">Archivos:</h3>
              <div className="archivos-grid">
                <div className="archivo-item">
                  <button className="download-btn">↓</button>
                  <div className="archivo-preview flex items-center justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="PDF" className="w-10 h-10" />
                  </div>
                  <span>Informe.pdf</span>
                </div>
                <div className="archivo-item">
                  <button className="download-btn">↓</button>
                  <div className="archivo-preview flex items-center justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/629/629690.png" alt="Imagen" className="w-10 h-10" />
                  </div>
                  <span>Foto Retina.jpg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Diagnóstico */}
          <div className="card">
            <h2>Diagnóstico</h2>
            <div className="diagnostico-grid">
              <div className="diagnostico-item">
                <h3>Ojo Izquierdo</h3>
                <p>Esfera: -2.25</p>
                <p>Cilindro: -0.75</p>
                <p>Eje: 180</p>
                <p>Agudeza Visual: 20/25</p>
              </div>
              <div className="diagnostico-item">
                <h3>Ojo Derecho</h3>
                <p>Esfera: -2.00</p>
                <p>Cilindro: -0.50</p>
                <p>Eje: 175</p>
                <p>Agudeza Visual: 20/20</p>
              </div>
            </div>

            <div className="archivos-card">
              <h3 className="text-blue-700 font-semibold mb-2 text-sm">Archivos:</h3>
              <div className="archivos-grid">
                <div className="archivo-item">
                  <button className="download-btn">↓</button>
                  <div className="archivo-preview flex items-center justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="PDF" className="w-10 h-10" />
                  </div>
                  <span>Informe.pdf</span>
                </div>
                <div className="archivo-item">
                  <button className="download-btn">↓</button>
                  <div className="archivo-preview flex items-center justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/629/629690.png" alt="Imagen" className="w-10 h-10" />
                  </div>
                  <span>Imagen OCT.jpg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Notas */}
          <div className="card">
            <h2>Notas del Examen</h2>
            <p className="nota-texto">
              Revisión anual. Progresión miopía leve.
            </p>

            <div className="archivos-card">
              <h3 className="text-blue-700 font-semibold mb-2 text-sm">Archivos:</h3>
              <div className="archivos-grid">
                <div className="archivo-item">
                  <button className="download-btn">↓</button>
                  <div className="archivo-preview flex items-center justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="PDF" className="w-10 h-10" />
                  </div>
                  <span>Nota.pdf</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetalleExamen;
