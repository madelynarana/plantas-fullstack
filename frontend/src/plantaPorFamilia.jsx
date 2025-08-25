import { plantaObtenerFamilia } from "../hooks/plantasObtenerPorFamilia";

const PlantasPorFamilia = () => {
    const { datosBD } = plantaObtenerFamilia();

    return (
        <div>
            <h1> Familia de Plantas </h1>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                {datosBD.map(({ family }) => (
                    <div
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
    )
}

export default PlantasPorFamilia;