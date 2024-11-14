import React from 'react';
import {Routes, Route,} from 'react-router-dom';

import Page from './Components/UI/Page';
import CrearPoliza from "./Components/Polizas/crearPoliza"
import TablaPolizas from './/Components/Polizas/tablaPolizas';
import Login from './Components/Login';
import Home from './Components/Home';
import EditarPoliza from './Components/Polizas/editarPoliza';
import VerPoliza from './Components/Polizas/verPoliza';
import TablaSeguros from './Components/Seguros/tablaSeguros';
import HomeSeguros from './Components/Seguros/homeSeguros';


function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/polizas" element={<TablaPolizas />} />
        <Route path="/polizas/crear" element={<CrearPoliza />} />
        <Route path="/seguros" element={<HomeSeguros/>} />
        <Route path="/polizas/:id" element={<VerPoliza />} />
        <Route path="/polizas/:id/edit" element={<EditarPoliza/>}/>
      </Routes>
    </Page>
  );
}

export default App;
