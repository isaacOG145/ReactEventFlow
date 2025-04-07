import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-datetime/css/react-datetime.css';

import Index from './views/Index';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import NewEvent from './views/NewEvent';
import NewChecker from './views/NewChecker';
import MyEvents from './views/MyEvents';
import MyWorkshops from './views/MyWorkshops';
import MyChechers from './views/MyCheckers';
import RecoverUserPassword from './views/RecoverUserPassword';
import RecoverPasswordCode from './views/recoverpasswordcode';
import NewPassword from './views/newpassword';
import CreateAccount from './views/CreateAccount';
import NewWorkshop from './views/NewWorkshops';
import AssignmentChecker from './views/AssignmentCheckers';
import EventDetails from './views/EventDetails';
import AdminEventDetails from './views/AdminEventDetails';
import AdminWorkshopDetails from './views/AdminWorkshopDetails';
import MyAsignments from './views/MyAsignments';
import ShowCheckersWorkshop from './views/ShowCheckersWorkshop';
import ShowCheckersEvent from './views/ShowCheckersEvent';
import CreateUserAcount from './components/modals/CreateUserAcount';

function App() {
    return (
        <Router>
            <Routes>
                {/**Rutas publicas */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recover-password" element={<RecoverUserPassword />} />
                <Route path="/recover-password-code" element={<RecoverPasswordCode />} />
                <Route path='/nueva-contraseña' element={<NewPassword />} />
                <Route path='/crear-cuenta' element={<CreateAccount />} />
                <Route path="/detalles-evento/:id" element={<EventDetails />} />

                <Route path='/usuario/crear-cuenta' element={<CreateUserAcount/>} />


                {/**Rutas del administrador */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/dashboard/nuevo-evento' element={<NewEvent />} />
                <Route path='/dashboard/nuevo-checador' element={<NewChecker />} />
                <Route path='/dashboard/nuevo-taller' element={<NewWorkshop />} />
                <Route path='/dashboard/mis-talleres' element={<MyWorkshops />} />
                <Route path='/dashboard/mis-eventos' element={<MyEvents />} />
                <Route path='/dashboard/mis-checadores' element={<MyChechers />} />
                <Route path='/dashboard/mis-asignaciones' element={<MyAsignments />} />
                <Route path='/dashboard/asignar-checadores' element={<AssignmentChecker />} />

                <Route path='/administrar/detalles-evento/:id' element={<AdminEventDetails/>}/>
                <Route path='/administrar/detalles-taller/:id' element={<AdminWorkshopDetails/>} />

                <Route path='/administrar/ver-checadores-evento/:id' element={<ShowCheckersEvent/>}/>
                <Route path='/administrar/ver-checador-taller/:id' element={<ShowCheckersWorkshop/>}/>

                

            </Routes>
        </Router>
    );
}

export default App;