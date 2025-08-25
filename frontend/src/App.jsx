
import { Routes, Route } from 'react-router-dom';

import EditarPlanta from './plantaEditarPorId';
import BuscarPlanta from './plantaBuscar';
import PlantasPorFamilia from './plantaPorFamilia';


export const App = () => {
    return (
        <div className='App'>
            <Routes>
                <Route path='/plantaBuscar' element={<BuscarPlanta />} />
                <Route path='/plantasPorFamilia' element={<PlantasPorFamilia />} />            
                <Route path='/' element={<BuscarPlanta />} />
                <Route path='/plantaEditarPorId/:idPlant' element={<EditarPlanta />} />
            </Routes>
        </div>
    );
}
