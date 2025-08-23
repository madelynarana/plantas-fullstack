import React, { useEffect, useState } from 'react';

const IdentificarPlanta = () => {
    const [data, setData] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [srcImagenSubida, setSrcImagenSubida] = useState(null);


    const btnSubirImagen = ( e ) => {
        const file = e.target.files[0];
        if ( file ) {
            const reader = new FileReader();

            reader.onload = () => {
                setSrcImagenSubida( reader.result );
            };

            reader.readAsDataURL( file );
        }
    }


    useEffect(() => {
        fetch('http://localhost:8080/data.php')
            .then(( response ) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                return response.json();
            })
            .then(( data ) => {
                setData( data );
                setCargando( false );
            })
            .catch(( error ) => {
                setError( error.message );
                setCargando( false );
            });
    }, []);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>

            <input type="file" accept="image/*" onChange={btnSubirImagen} />
            {srcImagenSubida &&
                (
                    <div>
                        <img
                            src={srcImagenSubida}
                            alt="imagen previa"
                        />
                    </div>
                )}

            <h3>Identificación:</h3>
            <ul>
                {data.result.classification.suggestions.map(
                    ({ name, probability, similar_images }, index) => (
                        <li key={index}>
                            <bold>{name}</bold> ({(probability * 100).toFixed(2)}%)
                            <img 
                                src={similar_images[0].url_small} 
                                alt={name} 
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default IdentificarPlanta;
