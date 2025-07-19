"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from '@/components/cards';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import InputComponents from '@/components/Input-component';
import { useMovimientos } from '../context/UserContext';

export default function Home() {
  const { movimientos } = useMovimientos();


  const calcularBalance = () => {
    return movimientos.reduce((total, movimiento) => {
      if (movimiento.movimiento === 'ingreso') {
        return total + movimiento.monto;
      } else {
        return total - movimiento.monto;
      }
    }, 0);
  };

  const balance = calcularBalance();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center flex-grow-1">PresupuestoApp</h1>
        <h2 className={`text-end me-3 ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
          ${balance.toFixed(2)}
        </h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12 offset-lg-1 offset-md-1">
            <Cards title={'Gastos'} tipo={'egreso'} />
            <Cards title={'Ingresos'} tipo={'ingreso'} />
          </div>
          <div className="col-lg-4 col-md-5 col-sm-12 text-start offset-lg-1 offset-md-1">
            <InputComponents />
          </div>
        </div>
      </div>
    </div>
  );
}