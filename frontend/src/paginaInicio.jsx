import React from 'react'
import PlantasPorFamilia from './plantaPorFamilia'
import BuscarPlanta from './plantaBuscar';
import ApiGrafica from './apiGrafica';
import ApiChatBoot from './apiChatboot';
import PlantaIdentificar from './plantaIdentificar';

const PaginaInicio = () => {
  return (
    <div>
      <PlantaIdentificar />
      <BuscarPlanta />
      <PlantasPorFamilia />
      <ApiChatBoot />
      <ApiGrafica />
    </div>
  );
}

export default PaginaInicio;