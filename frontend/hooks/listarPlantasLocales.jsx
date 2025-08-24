import { useEffect, useState } from 'react'

export const listarPlantasLocales = () => {

    const [data, setData] = useState([]);

    
    useEffect(() => {
        const listarPlantas = async () => {
            const getDatos = await fetch('http://localhost:3000/plantas');
            const respuesta = await getDatos.json();
            setData(respuesta);
        }
        listarPlantas();

    }, [])


    return {
        data,
    }
}
