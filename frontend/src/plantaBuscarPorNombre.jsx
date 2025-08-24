import { useState } from "react";
import { listarPlantasLocales } from '../hooks/listarPlantasLocales';
import { Link } from "react-router-dom";

const BuscarPlanta = () => {

  const [busqueda, setBusqueda] = useState("");
  const { data } = listarPlantasLocales();

  const getPlantasFiltradas =
    data.filter(
      (atributosPlantas) => {
        const inputNombreTaxonomia = busqueda.toLowerCase();

        const nombreCoincide =
          atributosPlantas.name?.toLowerCase()
            .includes(inputNombreTaxonomia);

        const taxonomiaCoincide =
          Object.values(atributosPlantas.taxonomy || {})
            .join(" ")
            .toLowerCase()
            .includes(inputNombreTaxonomia);
        return nombreCoincide || taxonomiaCoincide;
      });

  return (
    <div>
      <h2>Listado de Plantas</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar por nombre o taxonomía"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <button 
        type="submit" 
        disabled={getPlantasFiltradas.length !== 0}
      >
        Consultar Api
      </button>

      <button
        type="submit"
        disabled={getPlantasFiltradas.length !==0}
      >
      Guardar Plantas en bd local
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Taxonomia</th>
            <th>Imagen</th>
            <th>Estatus</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {
            getPlantasFiltradas.map(({ entity_id, name, taxonomy: { genus, order, family, phylum, kingdom }, image_url, status }, index) => (
              <tr key={entity_id}>
                <td>
                  {name}
                </td>
                <td>
                  <b>Familia:</b>{family}<br /><b>Genero:</b>{genus}<br /><b>Reino:</b>{kingdom}<br /><b>Orden:</b>{order}<br /><b>Filo:</b>{phylum}</td>
                <td>
                  <img
                    src={image_url}
                    style={{ width: '20px' }}
                  />
                </td>
                <td>{
                  status === 'C' ? 'Creado' : 'actualizado'
                }
                </td>
                <td>
                  <Link to={'/editarPlantaPorId/' + entity_id}>Editar</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuscarPlanta;
