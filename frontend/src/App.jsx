
import { Routes, Route } from 'react-router-dom';

import EditarPlanta from './plantaEditarPorId';
import BuscarPlanta from './plantaBuscar';
import PlantasPorFamilia from './plantaPorFamilia';
import ApiGrafica from './apiGrafica';
import PaginaInicio from './paginaInicio';
import PlantaIdentificar from './plantaIdentificar';


export const App = () => {
    return (
        <div className='App'>
            <Routes>
                <Route path='/PaginaInicio' element={<PaginaInicio/>} />
                <Route path='/plantaBuscar' element={<BuscarPlanta />} />
                <Route path='/plantasPorFamilia' element={<PlantasPorFamilia />} />            
                <Route path='/' element={<PaginaInicio />} />
                <Route path='/plantaEditarPorId/:idPlant' element={<EditarPlanta />} />
                <Route path='/apiGrafica' element={<ApiGrafica/>} />
                <Route path='/plantaIdentificar' element={<PlantaIdentificar/>} />
            </Routes>
        </div>
    );
}
