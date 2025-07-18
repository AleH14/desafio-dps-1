import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from '@/components/cards';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import InputComponents from '@/components/Input-componets';

export default function Home() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-center flex-grow-1">PresupuestoApp</h1>
        <h2 className="text-end me-3">$0.00</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12 offset-lg-1 offset-md-1">
            <Cards title={'Gastos'} />
            <Cards title={'Ingresos'} />
          </div>
          <div className="col-lg-4 col-md-5 col-sm-12 text-start offset-lg-1 offset-md-1">
            <InputComponents />
          </div>
        </div>
      </div>
    </div>
  );
}