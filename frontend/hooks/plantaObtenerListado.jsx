import { useEffect, useState } from 'react'

export const plantaObtenerListado = () => {

    const [datosBD, setDatosBD] = useState([]);

    useEffect(() => {
        const getListarPlantas = async () => {
            const getDatos = await fetch('http://localhost:3000/plantas');
            const respuesta = await getDatos.json();
            setDatosBD(respuesta);
        }
        getListarPlantas();

    }, [])


    return {
        datosBD
    }
}
