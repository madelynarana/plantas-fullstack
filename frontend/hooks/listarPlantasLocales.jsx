import { useEffect, useState } from 'react'

export const listarPlantasLocales = () => {

    const [data, setData] = useState([]);

    
    useEffect(() => {
        const listarPlantas = async () => {
            const getData = await fetch('http://localhost:3000/plantas');
            const response = await getData.json();
            setData(response);
        }
        listarPlantas();

    }, [])


    return {
        data
    }
}
