"use client";
import { useMovimientos } from '../context/UserContext';
import ItemCard from "./Item-card";

const Cards = ({ title, tipo }) => {
  const { movimientos } = useMovimientos();

  // Filtrar movimientos según el tipo (ingreso o egreso)
  const movimientosFiltrados = movimientos.filter(mov => mov.movimiento === tipo);
  
  // Calcular el total de los movimientos filtrados
  const calcularTotal = () => {
    return movimientosFiltrados.reduce((total, movimiento) => {
      return total + movimiento.monto;
    }, 0);
  };

  const total = calcularTotal();

  // Formatear el total con color según el tipo
  const formatearTotal = (total, tipo) => {
    const colorClass = tipo === 'egreso' ? 'text-danger' : 'text-success';
    const signo = tipo === 'egreso' ? '-' : '+';
    return { texto: `${signo}$${total.toFixed(2)}`, clase: colorClass };
  };

  const totalFormateado = formatearTotal(total, tipo);

  return (
    <div className="card shadow-lg border border-secondary mb-4" style={{ minHeight: '250px' }}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h4 className="mb-0">{title}</h4>
          <small className="text-muted">
            {movimientosFiltrados.length} {movimientosFiltrados.length === 1 ? 'movimiento' : 'movimientos'}
          </small>
        </div>
        <div className="text-end">
          <h5 className={`mb-0 fw-bold ${totalFormateado.clase}`}>
            {totalFormateado.texto}
          </h5>
          <small className="text-muted">Total</small>
        </div>
      </div>
      <div className="card-body p-0">
        {movimientosFiltrados.length === 0 ? (
          <div className="p-3 text-center text-muted">
            <i className="bi bi-inbox" style={{fontSize: '2rem'}}></i>
            <p className="mt-2 mb-0">No hay {tipo === 'ingreso' ? 'ingresos' : 'gastos'} registrados</p>
          </div>
        ) : (
          <div>
            {movimientosFiltrados.map(movimiento => (
              <ItemCard key={movimiento.id} movimiento={movimiento} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;