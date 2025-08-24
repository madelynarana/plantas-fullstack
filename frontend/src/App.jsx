
import { Routes, Route } from 'react-router-dom';

import EditarPlanta from './plantaEditarPorId';
import BuscarPlanta from './plantaBuscar';


export const App = () => {
    return (
        <div className='App'>
            <Routes>
                 <Route path='/plantaBuscar' element={<BuscarPlanta />} />            
                <Route path='/' element={<BuscarPlanta />} />
                <Route path='/editarPlantaPorId/:idPlant' element={<EditarPlanta />} />
            </Routes>
        </div>
    );
}
