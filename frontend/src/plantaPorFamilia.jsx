import { plantaObtenerFamilia } from '../hooks/plantasObtenerPorFamilia';

const PlantasPorFamilia = () => {
    const { datosBD } = plantaObtenerFamilia();

    return (
        <div id='section3' className='section  lighten-4 scrollspy'>
            <div className='container'>
                <h4 className='center green-text text-darken-3'>Familia de Plantas</h4>
                <div className='row'>
                    <div className='col s12'>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {datosBD.map(({ family }) => (
                                <div key={family}
                                    style={{
                                        padding: '10px',
                                        backgroundColor: '#4caf50',
                                        color: 'white',
                                        textAlign: 'center',
                                        borderRadius: '5px',
                                        width: '160px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {family}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlantasPorFamilia;