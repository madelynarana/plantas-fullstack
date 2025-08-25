import React from 'react'
import PlantasPorFamilia from './plantaPorFamilia'
import BuscarPlanta from './plantaBuscar';

const PaginaInicio =() =>{
  return (
  <div>
<div id='section1' className='section scrollspy'>
      <div className='container'>
        <div className='row'>
          <div className='col s12 m6'>
            <h4 className='green-text text-darken-3'>Sube tu imagen</h4>
            <div className='file-field input-field'>
              <div className='btn green'>
                <span>Subir</span>
                <input type='file' accept='image/*'/>
              </div>
              <div className='file-path-wrapper'>
                <input className='file-path validate' type='text' placeholder='Selecciona una imagen'/>
              </div>
            </div>
          </div>
          <div className='col s12 m6'>
            <div className='center-align'>
              <img src='' alt='Preview' className='responsive-img z-depth-2'/>
            </div>
            <table className='highlight tabla-bonita centered'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ejemplo</td>
                  <td>Imagen de prueba</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      <BuscarPlanta />
      <PlantasPorFamilia />
  </div>
      
    
  );
}

export default PaginaInicio;