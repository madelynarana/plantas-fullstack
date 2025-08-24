
import { Link, useNavigate, useParams } from 'react-router-dom';
import { plantaBuscarPorId } from '../hooks/plantaBuscarPorId';
import { listarPlantasLocales } from '../hooks/listarPlantasLocales';



const EditarPlanta = () => {

  const { idPlant } = useParams();
  const navigate = useNavigate();
  const { name, setName, imageUrl, setImageUrl, taxonomy, setTaxonomy, actualizarPlantaPorId } = plantaBuscarPorId(idPlant);

  const btnActualizarPlanta = async (e) => {

    e.preventDefault();

    const data = await actualizarPlantaPorId();
      
    setTimeout(() => { 
          navigate('/plantaBuscarPorNombre');
          listarPlantasLocales();
      }, 2000);
};

  return (
    <div>
      <h2>Editar Planta</h2>
    <form onSubmit={btnActualizarPlanta}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div>
          <label>Clase:</label>
          <input 
            type="text" 
            value={taxonomy.class} 
            onChange={(e) => setTaxonomy({ ...taxonomy, class: e.target.value })} 
          />
        </div>

        <div>
          <label>Género:</label>
          <input 
            type="text" 
            value={taxonomy.genus} 
            onChange={(e) => setTaxonomy({ ...taxonomy, genus: e.target.value })} 
          />
        </div>

        <div>
          <label>Orden:</label>
          <input 
            type="text" 
            value={taxonomy.order} 
            onChange={(e) => setTaxonomy({ ...taxonomy, order: e.target.value })} 
          />
        </div>

        <div>
          <label>Familia:</label>
          <input 
            type="text" 
            value={taxonomy.family} 
            onChange={(e) => setTaxonomy({ ...taxonomy, family: e.target.value })} 
          />
        </div>

        <div>
          <label>Filo:</label>
          <input 
            type="text" 
            value={taxonomy.phylum} 
            onChange={(e) => setTaxonomy({ ...taxonomy, phylum: e.target.value })} 
          />
        </div>

        <div>
          <label>Reino:</label>
          <input 
            type="text" 
            value={taxonomy.kingdom} 
            onChange={(e) => setTaxonomy({ ...taxonomy, kingdom: e.target.value })} 
          />
        </div>

        <div>
          <label>Imagen URL:</label>
          <input 
            type="text" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
          />
        </div>
        <div>
          <button type="submit">Actualizar</button>
        </div>
        <div>
          <Link to={'/plantaBuscarPorNombre/'}>Regresar</Link>
        </div>
    </form>
    </div>
  );
};


export default EditarPlanta;
