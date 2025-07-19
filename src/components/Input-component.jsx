"use client";
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMovimientos } from '../context/UserContext';

const InputComponents = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMovimiento, setSelectedMovimiento] = useState('');
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [monto, setMonto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categorias, setCategorias] = useState({});
    const [errores, setErrores] = useState({});

    const { agregarMovimiento } = useMovimientos();


    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const response = await fetch('/data/categorias.json');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            }
        };

        cargarCategorias();
    }, []);

    const handleMovimientoChange = (e) => {
        setSelectedMovimiento(e.target.value);
        setSelectedCategoria(''); 
    
        if (errores.movimiento) {
            setErrores(prev => ({ ...prev, movimiento: '' }));
        }
    };

    const handleCategoriaChange = (e) => {
        setSelectedCategoria(e.target.value);

        if (errores.categoria) {
            setErrores(prev => ({ ...prev, categoria: '' }));
        }
    };

    const handleMontoChange = (e) => {
        setMonto(e.target.value);

        if (errores.monto) {
            setErrores(prev => ({ ...prev, monto: '' }));
        }
    };

    const handleDescripcionChange = (e) => {
        setDescripcion(e.target.value);

        if (errores.descripcion) {
            setErrores(prev => ({ ...prev, descripcion: '' }));
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);

        if (errores.fecha) {
            setErrores(prev => ({ ...prev, fecha: '' }));
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};


        if (!selectedMovimiento) {
            nuevosErrores.movimiento = 'Debe seleccionar un tipo de movimiento';
        }


        if (!selectedCategoria) {
            nuevosErrores.categoria = 'Debe seleccionar una categoría';
        }


        if (!monto || monto.trim() === '') {
            nuevosErrores.monto = 'El monto es obligatorio';
        } else if (parseFloat(monto) <= 0) {
            nuevosErrores.monto = 'El monto debe ser mayor a 0';
        } else if (isNaN(parseFloat(monto))) {
            nuevosErrores.monto = 'El monto debe ser un número válido';
        }

        if (!selectedDate) {
            nuevosErrores.fecha = 'Debe seleccionar una fecha';
        }

        if (!descripcion || descripcion.trim() === '') {
            nuevosErrores.descripcion = 'La descripción es obligatoria';
        }

        return nuevosErrores;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const erroresValidacion = validarFormulario();
        
        if (Object.keys(erroresValidacion).length > 0) {
            setErrores(erroresValidacion);
            return;
        }

        const categoriasDisponibles = selectedMovimiento ? categorias[selectedMovimiento] || [] : [];
        const categoriaSeleccionada = categoriasDisponibles.find(cat => cat.value === selectedCategoria);
        const categoriaLabel = categoriaSeleccionada ? categoriaSeleccionada.label : selectedCategoria;
        const categoriaIcon = categoriaSeleccionada ? categoriaSeleccionada.icon : null;


        const nuevoMovimiento = {
            movimiento: selectedMovimiento,
            categoria: categoriaLabel,
            categoriaValue: selectedCategoria,
            categoriaIcon: categoriaIcon, // Nuevo campo para el ícono
            monto: parseFloat(monto),
            fecha: selectedDate,
            descripcion: descripcion.trim()
        };

        console.log('=== NUEVO MOVIMIENTO ===');
        console.log('Datos:', nuevoMovimiento);
        console.log('=======================');

        agregarMovimiento(nuevoMovimiento);
        setErrores({});
        

        setSelectedMovimiento('');
        setSelectedCategoria('');
        setMonto('');
        setDescripcion('');
        setSelectedDate(new Date());
        
        alert('¡Movimiento guardado correctamente!');
    };


    const categoriasDisponibles = selectedMovimiento ? categorias[selectedMovimiento] || [] : [];

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-3">
                <label htmlFor="movimientoSelect" className="form-label fw-bold">Movimiento</label>
                <select
                    className={`form-select ${errores.movimiento ? 'is-invalid' : ''}`}
                    id="movimientoSelect"
                    aria-label="Seleccionar movimiento"
                    value={selectedMovimiento}
                    onChange={handleMovimientoChange}
                >
                    <option value="">Seleccionar movimiento</option>
                    <option value="ingreso">Ingresos</option>
                    <option value="egreso">Gastos</option>
                </select>
                {errores.movimiento && <div className="invalid-feedback">{errores.movimiento}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="tipoSelect" className="form-label fw-bold">Categoria</label>
                <select 
                    className={`form-select ${errores.categoria ? 'is-invalid' : ''}`}
                    id="tipoSelect" 
                    aria-label="Seleccionar tipo"
                    value={selectedCategoria}
                    onChange={handleCategoriaChange}
                    disabled={!selectedMovimiento}
                >
                    <option value="">
                        {selectedMovimiento ? 'Seleccionar categoría' : 'Primero selecciona un movimiento'}
                    </option>
                    {categoriasDisponibles.map((categoria) => (
                        <option key={categoria.value} value={categoria.value}>
                            {categoria.label}
                        </option>
                    ))}
                </select>
                {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="montoInput" className="form-label fw-bold">Monto</label>
                <input 
                    type="number" 
                    className={`form-control ${errores.monto ? 'is-invalid' : ''}`}
                    id="montoInput" 
                    placeholder="$0.00" 
                    min="0.01" 
                    step="0.01"
                    value={monto}
                    onChange={handleMontoChange}
                />
                {errores.monto && <div className="invalid-feedback">{errores.monto}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="fechaInput" className="form-label fw-bold">Fecha</label>
                <br />
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className={`form-control ${errores.fecha ? 'is-invalid' : ''}`}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Seleccionar fecha"
                    id="fechaInput"
                />
                {errores.fecha && <div className="invalid-feedback d-block">{errores.fecha}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="descripcionInput" className="form-label fw-bold">Descripción</label>
                <textarea 
                    className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                    id="descripcionInput" 
                    placeholder="Descripción" 
                    rows="4"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                ></textarea>
                {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
            </div>

            <button className="btn btn-primary mt-3" type="submit">Ingresar</button>
        </form>
    )
}

export default InputComponents;