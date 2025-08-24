import { useState } from "react";

const BuscarPlanta = () => {
  const [parametro, setParametro] = useState("");
  const [datosPlantaFiltrados, setDatosPlantaFiltrados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const API_KEY = "AX5wcwJGnbvQj4laSqA3aPpf7HopDVgz2N72keKApdbXHPw8Nd";


  const btnBuscarPlantaApi = async () => {
    try {
      const getRespuesta = await fetch(
        `https://plant.id/api/v3/kb/plants/name_search?q=${encodeURIComponent(parametro)}`,
        {
          headers: { "Api-Key": API_KEY, "Content-Type": "application/json" },
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
                "Api-Key": API_KEY,
                "Content-Type": "application/json",
              },
            }
          );
          const detalles = await detallesPlantaRespuesta.json();

          // console.log("datos filtrados", detalles)
          return detalles;
        })
      );

      setDatosPlantaFiltrados(detallesPlanta);

    } catch (err) {
      console.error(err);
    }
  };



  // Boton para registrar las plantas consultadas en el api
  const btnRegistrarPlantas = async () => {
    if (datosPlantaFiltrados.length === 0) {
      setMensaje("No hay plantas para registrar");
      return;
    }

    try {
      const postDatos = await fetch("http://localhost:3000/planta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosPlantaFiltrados),
      });

      if (!postDatos.ok) {
        throw new Error("Error al registrar las plantas");
      }

      const resultado = await postDatos.json();
      setMensaje(`Se registraron ${resultado.length} plantas correctamente`);
    } catch (err) {
      setMensaje("Error al registrar plantas: " + err.message);
    }
  };


  return (
    <div>
      <h1>Buscar plantas</h1>

      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={parametro}
          onChange={(e) => setParametro(e.target.value)}
        />
        <button
          onClick={btnBuscarPlantaApi}
        >
          Buscar
        </button>
      </div>
      <div>
        <button
          onClick={btnRegistrarPlantas}
          style={{ marginTop: '20px',  marginBottom:'20px'}}
        >
          Registrar Plantas BD
        </button>
      </div>
      {mensaje && <p>{mensaje}</p>}
      {datosPlantaFiltrados.length > 0 ? (
        <table border="1" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Taxonomía</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {datosPlantaFiltrados.map(({ entity_id: id, name, image, taxonomy }) => (
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
      ) : (
        <p>No hay registros consultados</p>
      )}
    </div>
  );

}

export default BuscarPlanta;