import { useEffect, useState } from 'react'

export const plantaObtenerFamilia = () => {

    const [datosBD, setDatosBD] = useState([]);

    useEffect(() => {
        const getListarFamilia = async () => {
            const getDatos = await fetch('http://localhost:3000/familia');
            const respuesta = await getDatos.json();
            setDatosBD(respuesta);
        }
        getListarFamilia();

    }, [])


    return {
        datosBD
    }
}