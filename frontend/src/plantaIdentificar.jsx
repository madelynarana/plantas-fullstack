import React, { useState } from 'react';

const PlantaIdentificar = () => {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [srcImagenSubida, setSrcImagenSubida] = useState(null);

    const API_KEY = 'zBBTijzN7tEm1ixu5DfvrQyrLAZ0GNfVfAlA7OjyKOuMDAvcrj';

    const btnSubirImagen = async (e) => {
        const imagen = e.target.files[0];
        if (!imagen) return;

        setCargando(true);
        setError(null);

        try {
            // Previsualización de la imagen
            setSrcImagenSubida(URL.createObjectURL(imagen));

            const formData = new FormData();
            formData.append("images", imagen);

            const respuesta = await fetch("https://api.plant.id/v3/identification", {
                method: "POST",
                headers: {
                    "Api-Key": API_KEY,
                },
                body: formData,
            });

            const data = await respuesta.json();
            setDatos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div id='section1' className='section scrollspy'>
            <div className='container'>
                <div className='row'>
                    <div className='col s12 m6'>
                        <h4 className='green-text text-darken-3'>Sube tu imagen para identificar</h4>
                        <div className='file-field input-field'>
                            <div className='btn green'>
                                <span>Subir</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={btnSubirImagen}
                                />
                            </div>
                            <div className='file-path-wrapper'>
                                <input
                                    className='file-path validate'
                                    type='text'
                                    placeholder='Selecciona una imagen'
                                />
                            </div>
                        </div>
                        <div className='center-align'>
                            {srcImagenSubida && (
                                <img
                                    src={srcImagenSubida}
                                    alt="imagen previa"
                                    className='responsive-img z-depth-2'
                                    style={{width: '35%'}}
                                />
                            )}
                        </div>
                        {cargando && <p style={{ marginTop: '20px' }}>Analizando la imagen imagen...</p>}
                        {error && <p style={{ marginTop: '20px', color: 'red' }}>Error en consultar el api: {error}</p>}
                    </div>

                    <div className='col s12 m6'>
                        <table className='highlight tabla-bonita centered'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Probabilidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datos?.result?.classification?.suggestions?.length > 0 ? (
                                    datos.result.classification.suggestions.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{(item.probability * 100)}%</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">Sin datos</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlantaIdentificar;
