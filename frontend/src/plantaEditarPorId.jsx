
import { Link, useNavigate, useParams } from 'react-router-dom';
import { plantaBuscarPorId } from '../hooks/plantaBuscarPorId';
import { plantaObtenerListado } from '../hooks/plantaObtenerListado';


const EditarPlanta = () => {

  const { idPlant } = useParams();
  const navigate = useNavigate();
  const { name, setName, imageUrl, setImageUrl, taxonomy, setTaxonomy, actualizarPlantaPorId } = plantaBuscarPorId(idPlant);

  const btnActualizarPlanta = async (e) => {

    e.preventDefault();
    actualizarPlantaPorId();

    setTimeout(() => {
      navigate('/paginaInicio');
      plantaObtenerListado();
    }, 2000);
  };

  return (

    <div id='section5' className='section scrollspy margin-top'>
      <div className='container'>
        <h4 className='center green-text text-darken-3'>Actualizar Planta</h4>
        <div className='row'>
          <form className='col s12' onSubmit={btnActualizarPlanta}>
            <div class="row">
              <label>Nombre:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div class="col s12 m6">
              <label>Clase:</label>
              <input
                type="text"
                value={taxonomy.class}
                onChange={(e) => setTaxonomy({ ...taxonomy, class: e.target.value })}
              />
            </div>

            <div class="col s12 m6">
              <label>Género:</label>
              <input
                type="text"
                value={taxonomy.genus}
                onChange={(e) => setTaxonomy({ ...taxonomy, genus: e.target.value })}
              />
            </div>

            <div class="col s12 m6">
              <label>Orden:</label>
              <input
                type="text"
                value={taxonomy.order}
                onChange={(e) => setTaxonomy({ ...taxonomy, order: e.target.value })}
              />
            </div>

            <div class="col s12 m6">
              <label>Familia:</label>
              <input
                type="text"
                value={taxonomy.family}
                onChange={(e) => setTaxonomy({ ...taxonomy, family: e.target.value })}
              />
            </div>

            <div class="col s12 m6">
              <label>Filo:</label>
              <input
                type="text"
                value={taxonomy.phylum}
                onChange={(e) => setTaxonomy({ ...taxonomy, phylum: e.target.value })}
              />
            </div>

            <div class="col s12 m6">
              <label>Reino:</label>
              <input
                type="text"
                value={taxonomy.kingdom}
                onChange={(e) => setTaxonomy({ ...taxonomy, kingdom: e.target.value })}
              />
            </div>

            <div class="col s12 m6">
              <label>Imagen URL:</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className='col s6'>
              <div class="col s6 m6">
                <button type="submit" class="btn green">Actualizar</button>
              </div>
              <div class="col s6 m6">
                <Link to={'/plantaBuscar/'} class="btn green">Regresar</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default EditarPlanta;
