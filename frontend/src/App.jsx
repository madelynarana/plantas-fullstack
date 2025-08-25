
import { Routes, Route } from 'react-router-dom';

import EditarPlanta from './plantaEditarPorId';
import BuscarPlanta from './plantaBuscar';
import PlantasPorFamilia from './plantaPorFamilia';
import ApiGrafica from './apiGrafica';
import Template from './paginaInicio';
import PaginaInicio from './paginaInicio';


export const App = () => {
    return (
        <div className='App'>
            <Routes>
                <Route path='/PaginaInicio' element={<PaginaInicio/>} />
                <Route path='/plantaBuscar' element={<BuscarPlanta />} />
                <Route path='/plantasPorFamilia' element={<PlantasPorFamilia />} />            
                <Route path='/' element={<BuscarPlanta />} />
                <Route path='/plantaEditarPorId/:idPlant' element={<EditarPlanta />} />
                <Route path='/apiGrafica' element={<ApiGrafica/>} />
            </Routes>
        </div>
    );
}
