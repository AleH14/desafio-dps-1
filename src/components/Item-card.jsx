"use client";
import { useMovimientos } from '../context/UserContext';

const ItemCard = ({ movimiento }) => {
    const { eliminarMovimiento } = useMovimientos();

   
    if (!movimiento || !movimiento.monto || !movimiento.movimiento) {
        console.error('ItemCard: movimiento no válido:', movimiento);
        return null; 
    }

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatearMonto = (monto, tipo) => {
        const signo = tipo === 'egreso' ? '-' : '+';
        const colorClass = tipo === 'egreso' ? 'text-danger' : 'text-success';
        return { texto: `${signo}$${monto.toFixed(2)}`, clase: colorClass };
    };

    const handleEliminar = () => {
        if (confirm('¿Estás seguro de eliminar este movimiento?')) {
            eliminarMovimiento(movimiento.id);
        }
    };

    const montoFormateado = formatearMonto(movimiento.monto, movimiento.movimiento);

    return (
        <div className="text-left d-flex align-items-center justify-content-between p-3 border-bottom">
            <div className="d-flex align-items-center">
                <img 
                    src={movimiento.categoriaIcon || "/personalizado.jpg"} 
                    className="rounded-circle me-2" 
                    alt="Ícono de categoría" 
                    style={{width: '50px', height: '50px', objectFit: 'cover'}} 
                    onError={(e) => {
                        e.target.src = "/personalizado.jpg"; // Fallback si el ícono no carga
                    }}
                />
                <div className="d-flex flex-column">
                    <span className="fw-bold">
                        {movimiento.descripcion || 'Sin descripción'}
                    </span>
                    <small className="text-muted">{movimiento.categoria || 'Sin categoría'}</small>
                </div>
            </div>
            
            <div className="d-flex align-items-center">
                <div className="d-flex flex-column me-3 text-end">
                    <span className={`fw-bold ${montoFormateado.clase}`}>
                        {montoFormateado.texto}
                    </span>
                    <small className="text-muted">{formatearFecha(movimiento.fecha)}</small>
                </div>
                <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleEliminar}
                >
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    )
}

export default ItemCard;