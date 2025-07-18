"use client";
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputComponents = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="mb-3">
            <div className="mb-3">
                <label htmlFor="movimientoSelect" className="form-label fw-bold">Movimiento</label>
                <select className="form-select" id="movimientoSelect" aria-label="Seleccionar movimiento">
                    <option value="">Seleccionar movimiento</option>
                    <option value="ingreso">Ingresos</option>
                    <option value="egreso">Gastos</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="tipoSelect" className="form-label fw-bold">Categoria</label>
                <select className="form-select" id="tipoSelect" aria-label="Seleccionar tipo">
                    <option value="">Seleccionar tipo</option>
                    <option value="categoria 1">Categoria 1</option>
                    <option value="categoria 2">Categoria 2</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="montoInput" className="form-label fw-bold">Monto</label>
                <input type="number" className="form-control" id="montoInput" placeholder="$0.00" />
            </div>

            <div className="mb-3">
                <label htmlFor="fechaInput" className="form-label fw-bold">Fecha </label>
                <br />
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Seleccionar fecha"
                    id="fechaInput"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="descripcionInput" className="form-label fw-bold">Descripción</label>
                <textarea className="form-control" id="descripcionInput" placeholder="Descripción" rows="4"></textarea>
            </div>

            <button className="btn btn-primary mt-3" type="submit">Ingresar</button>
        </div>
    )
}

export default InputComponents;