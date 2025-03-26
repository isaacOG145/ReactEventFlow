import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import EditEvent from '../src/views/EditEvents';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/dashboard/nuevo-evento' element={<NewEvent />} />
                <Route path='/dashboard/nuevo-checador' element={<NewChecker />} />
                <Route path='/dashboard/mis-talleres' element={<MyWorkshops />} />
                <Route path='/dashboard/mis-eventos' element={<MyEvents />} />
                <Route path='/dashboard/mis-eventos/editar/:id' element={<EditEvent />} />
                <Route path='/dashboard/mis-checadores' element={<MyChechers />} />
                <Route path="/recover-password" element={<RecoverUserPassword />} />
                <Route path="/recover-password-code" element={<RecoverPasswordCode />} />
                <Route path='/new-password' element={<NewPassword/>}/>
            </Routes>
        </Router>
    );
}

export default App;