
import { useParams } from 'react-router-dom';
import { plantaBuscarPorId } from '../hooks/plantaBuscarPorId';



const EditarPlanta = () => {

  const { idPlant } = useParams();
  
  const { name, imageUrl, taxonomy } = plantaBuscarPorId(idPlant)
  const { class: className, genus, order, family, phylum, kingdom } = taxonomy || {};

  return (
    <div>
      <h2>Actualizar Planta</h2>
      <form>
        <div>
          <label>Nombre:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Clase:</label>
          <input
            type='text'
            value={className}
            onChange={(e) => setClassName(e.target.value )}
          />
        </div>

        <div>
          <label>Género:</label>
          <input
            type='text'
            value={genus}
            onChange={(e) => setTaxonomy(e.target.value )}
          />
        </div>

        <div>
          <label>Orden:</label>
          <input
            type='text'
            value={order}
            onChange={(e) => setTaxonomy(e.target.value)}
          />
        </div>

        <div>
          <label>Familia:</label>
          <input
            type='text'
            value={family}
            onChange={(e) => setTaxonomy(e.target.value)}
          />
        </div>

        <div>
          <label>Filo:</label>
          <input
            type='text'
            value={phylum}
            onChange={(e) => setTaxonomy(e.target.value)}
          />
        </div>

        <div>
          <label>Reino:</label>
          <input
            type='text'
            value={kingdom}
            onChange={(e) => setTaxonomy(e.target.value)}
          />
        </div>

        <div>
          <label>Imagen URL:</label>
          <input
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(target.value)}
          />
        </div>
        <div>
          <button name='submit'>Actualizar</button>
        </div>
        <div>
        </div>
      </form>
    </div>
  );
};

export default EditarPlanta;
