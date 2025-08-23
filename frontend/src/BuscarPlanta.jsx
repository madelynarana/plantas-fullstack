import React, { useEffect, useState } from 'react';

const BuscarPlanta = () => {
    const [data, setData] =  useState([]);
    const [error, setError]=useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/plantas")
            .then(( response ) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                return response.json();
            })
            .then(( data ) => {
                console.log(data)
                setData( data );
            })
            .catch(( error ) => {
                setError( error.message );
            });
    }, []);

    

    return (

<div>

        {data.map((plant) => (
            plant.name
        ))}
</div>


    )
};

export default BuscarPlanta;
