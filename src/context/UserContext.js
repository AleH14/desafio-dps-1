"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const MovimientosContext = createContext();

export const useMovimientos = () => {
    const context = useContext(MovimientosContext);
    if (!context) {
        throw new Error('useMovimientos debe ser usado dentro de MovimientosProvider');
    }
    return context;
};

export const MovimientosProvider = ({ children }) => {
    const [movimientos, setMovimientos] = useState([]);

    // Cargar movimientos del localStorage al inicializar
    useEffect(() => {
        const movimientosGuardados = localStorage.getItem('movimientos');
        if (movimientosGuardados) {
            setMovimientos(JSON.parse(movimientosGuardados));
        }
    }, []);

    // Guardar en localStorage cada vez que cambien los movimientos
    useEffect(() => {
        localStorage.setItem('movimientos', JSON.stringify(movimientos));
    }, [movimientos]);

    const agregarMovimiento = (nuevoMovimiento) => {
        const movimientoConId = {
            ...nuevoMovimiento,
            id: Date.now().toString(),
            fechaCreacion: new Date().toISOString()
        };
        
        console.log('Agregando movimiento:', movimientoConId);
        setMovimientos(prev => [...prev, movimientoConId]);
    };

    const eliminarMovimiento = (id) => {
        setMovimientos(prev => prev.filter(mov => mov.id !== id));
    };

    const editarMovimiento = (id, movimientoEditado) => {
        setMovimientos(prev => 
            prev.map(mov => 
                mov.id === id ? { ...mov, ...movimientoEditado } : mov
            )
        );
    };

    const value = {
        movimientos,
        agregarMovimiento,
        eliminarMovimiento,
        editarMovimiento
    };

    return (
        <MovimientosContext.Provider value={value}>
            {children}
        </MovimientosContext.Provider>
    );
};