import { useState } from 'react';
import { plantaObtenerListado } from '../hooks/plantaObtenerListado';
import { Link } from 'react-router-dom';

const BuscarPlanta = () => {
  const [parametro, setParametro] = useState('');
  const [datosPlantaFiltradosApi, setDatosPlantaFiltradosApi] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const { datosBD } = plantaObtenerListado();
  const API_KEY = 'zBBTijzN7tEm1ixu5DfvrQyrLAZ0GNfVfAlA7OjyKOuMDAvcrj';


  const btnBuscarPlantaApi = async () => {
    try {
      const getRespuesta = await fetch(
        `https://plant.id/api/v3/kb/plants/name_search?q=${encodeURIComponent(parametro)}`,
        {
          headers: { 'Api-Key': API_KEY, 'Content-Type': 'application/json' },
        }
      );
      const datosPlanta = await getRespuesta.json();

      if (!datosPlanta.entities) return;

      // Recorre los access_token y traer detalles de la planta
      const detallesPlanta = await Promise.all(
        datosPlanta.entities.map(async (entity) => {
          const detallesPlantaRespuesta = await fetch(
            `https://plant.id/api/v3/kb/plants/${entity.access_token}?details=common_names,description,taxonomy,image`,
            {
              headers: {
                'Api-Key': API_KEY,
                'Content-Type': 'application/json',
              },
            }
          );
          const detalles = await detallesPlantaRespuesta.json();

          // console.log('datos filtrados', detalles)
          return detalles;
        })
      );

      setDatosPlantaFiltradosApi(detallesPlanta);

    } catch (err) {
      console.error(err);
    }
  };



  // Boton para registrar las plantas consultadas en el api
  const btnRegistrarPlantas = async () => {
    if (datosPlantaFiltradosApi.length === 0) {
      setMensaje('');
      return;
    }

    try {
      const postDatos = await fetch('http://localhost:3000/planta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosPlantaFiltradosApi),
      });

      if (!postDatos.ok) {
        throw new Error('Error al registrar las plantas');
      }

      const resultado = await postDatos.json();
      setMensaje(`Se registraron ${resultado.length} plantas correctamente`);

    } catch (err) {
      setMensaje('Error al registrar plantas: ' + err.message);
    }
  };



  // Filtrado por nombre o taxonomía de la base de datos local
  const getPlantasFiltradasEnBd = datosBD.filter(({ name, taxonomy }) => {
    const inputTxtBusqueda = parametro.toLowerCase();
    const nombreCoincide = name?.toLowerCase().includes(inputTxtBusqueda);
    const taxonomiaCoincide = Object.values(taxonomy || {})
      .join(' ')
      .toLowerCase()
      .includes(inputTxtBusqueda);
    return nombreCoincide || taxonomiaCoincide;
  });


  return (
    <div>
      <div id='section2' className='section green lighten-4 scrollspy'>
        <div className='container'>
          <h4 className='center green-text text-darken-3'>Detalle de Plantas</h4>
          <div className='row'>
            <div className='col s12 m6'>
              <input
                value={parametro}
                onChange={(e) => setParametro(e.target.value)}
                type='text'
                className='validate'
              />
              <label for='last_name'>Escribir Nombre o Taxonomía</label>
            </div>
            <div className='col s12 m6 center'>

              <div className='container'>

                <div className='row'>
                  <div className='col s12'>
                    <button
                      onClick={btnBuscarPlantaApi}
                      className='btn green s12'
                    >
                      Buscar en api
                    </button>
                  </div>

                  <div className='col s12'>
                    <button
                      onClick={btnRegistrarPlantas}
                      style={{ marginRight: '20px', marginTop: '20px', marginBottom: '20px' }}
                      className='btn green s6'
                    >
                      Registrar Plantas de api en BD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>

            {mensaje && <p>{mensaje}</p>}
          </div>

          <table border="1" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Taxonomía</th>
                <th>Imagen</th>
                <th>Estatus</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {
                getPlantasFiltradasEnBd.length === 0
                  ? 'Sin registros'
                  : getPlantasFiltradasEnBd.map(({ entity_id: id, name, image_url, taxonomy, status }) => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>
                        <b>Clase: </b> {taxonomy.class}
                        <b> Género: </b>{taxonomy.genus}
                        <b> Familia: </b> {taxonomy.family}
                        <b> Orden: </b> {taxonomy.order}
                        <b> Filo: </b> {taxonomy.phylum}
                        <b> Reino: </b> {taxonomy.kingdom}
                      </td>
                      <td>
                        <img src={image_url} style={{ width: '100px' }} />
                      </td>
                      <td>
                        {status === 'C' ? 'Creado' : 'Actualizado'}
                      </td>
                      <td>
                        <Link to={`/plantaEditarPorId/${id}`}>Editar</Link>
                      </td>
                    </tr>
                  ))}

              {
                datosPlantaFiltradosApi.length === 0
                  ? 'Sin registros'
                  :
                  datosPlantaFiltradosApi.map(({ entity_id: id, name, image, taxonomy }) => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>
                        <b>Clase: </b> {taxonomy.class}
                        <b> Género: </b>{taxonomy.genus}
                        <b> Familia: </b> {taxonomy.family}
                        <b> Orden: </b> {taxonomy.order}
                        <b> Filo: </b> {taxonomy.phylum}
                        <b> Reino: </b> {taxonomy.kingdom}
                      </td>
                      <td>
                        <img src={image.value} style={{ width: '100px' }} />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default BuscarPlanta;