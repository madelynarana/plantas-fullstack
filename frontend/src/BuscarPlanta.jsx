import React, { useEffect, useState } from 'react';
import { listarPlantasLocales } from '../hooks/listarPlantasLocales';

const BuscarPlanta = () => {
    const { data } = listarPlantasLocales();
  
    if (data.length ==0) return <p>Sin registros...</p>;
    return (

<div>

        {data.map((plant) => (
            plant.name
        ))}
</div>


    )
};

export default BuscarPlanta;
