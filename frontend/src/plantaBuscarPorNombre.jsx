import { useState } from "react";
import { listarPlantasLocales } from '../hooks/listarPlantasLocales';
import { Link } from "react-router-dom";
import { datosApi } from './datos'



const  BuscarPlantas = () =>{
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const { data } = listarPlantasLocales();

  const btnBuscar = () => {
    const textoBuscado = busqueda.toLowerCase().trim();

    const filtrados = data.filter(( {name, taxonomy} ) => {
      const nombre = name?.toLowerCase() || '';
      const taxonimiaAtributos = Object.values(taxonomy || {})
        .join(' ')
        .toLowerCase();

      return nombre.includes(textoBuscado) || taxonimiaAtributos.includes(textoBuscado);
    });

    setResultados(filtrados);
  };



  const inputTxtBuscar = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <div>
      <h2>Buscar plantas</h2>
      <input
        type="text"
        placeholder="Escribe el nombre"
        value={busqueda}
        onChange={inputTxtBuscar}
        onKeyDown={(e) => e.key === 'Enter' && btnBuscar()}
      />
      <button onClick={btnBuscar}>Buscar</button>

      {resultados.length > 0 ? (
        <table border="1" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nombre</th>
              <th>Nombre</th>
              <th>Nombre</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map(({entity_id, name, taxonomy}) => (
              <tr key={entity_id}>
                <td>{name}</td>
                <b>Clase: </b> {taxonomy.class}
                <b> Género: </b>{taxonomy.genus}
                <b> Familia: </b> {taxonomy.family}
                <b> Orden: </b> {taxonomy.order}
                <b> Filo: </b> {taxonomy.phylum}
                <b> Reino: </b> {taxonomy.kingdom}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </div>
  );
}

export default BuscarPlantas;
