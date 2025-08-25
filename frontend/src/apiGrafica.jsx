import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const ApiGrafica = () => {
    const [datosApi, setDatosApi] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_KEY = 'zBBTijzN7tEm1ixu5DfvrQyrLAZ0GNfVfAlA7OjyKOuMDAvcrj';

    useEffect(() => {
        const estadistica = async () => {
            try {
                const response = await fetch('https://plant.id/api/v3/usage_info', {
                    headers: { 'Api-Key': API_KEY },
                });
                const data = await response.json();
                setDatosApi(data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            } finally {
                setLoading(false);
            }
        };

        estadistica();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total de registros por estado',
            },
        },
    };

    if (loading) return <p>Cargando datos de la API...</p>;
    if (!datosApi) return <p>Error al cargar los datos de la API.</p>;

    const datosGraficas = {
        labels: ['Límite de Créditos', 'Usados', 'Restantes'],
        datasets: [
            {
                label: 'Créditos API',
                data: [
                    datosApi.credit_limits?.total || 0,
                    datosApi.used?.total || 0,
                    datosApi.remaining?.total || 0,
                ],
                backgroundColor: ['#b5963fff', '#3ba2c2ff', '#4caf50'],
            },
        ],
    };

    return (
        <div id='section6' className='section green lighten-4 scrollspy'>
            <div className='container'>
                <h4 className='center green-text text-darken-3'>Visualiza tus estadísticas</h4>
                <div className='row'>
                    <div className='col s12 m6'>
                        <p>
                            <b>Estatus de API:</b> {datosApi.active ? 'Activo' : 'Inactivo'} <br />
                        </p>

                        <div style={{ width: '100%' }}>
                            <Bar data={datosGraficas} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiGrafica;
