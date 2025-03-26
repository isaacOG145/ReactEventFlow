import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './views/Index';
import Login from './views/Login'
import Dashboard from './views/Dashboard';
import NewEvent from './views/NewEvent';
import NewChecker from './views/NewChecker';
import MyEvents from './views/MyEvents';
import MyWorkshops from './views/MyWorkshops';
import MyChechers from './views/MyCheckers';
import UserAccount from './views/UserAccount';
import LandingPage from './views/landingpage';
import EventDetails from './views/EventDetails';


function App() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Crear" element={<CreateAccount/>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/dashboard/nuevo-evento' element={<NewEvent />} />
                <Route path='/dashboard/nuevo-checador' element={<NewChecker />} />
                <Route path='/dashboard/mis-talleres' element={<MyWorkshops />} />
                <Route path='/dashboard/mis-eventos' element={<MyEvents />} />
                <Route path='/dashboard/mis-checadores' element={<MyChechers />} />
                <Route path='/servicios' element={<LandingPage />} /> {LandingPage}
                <Route path='/details' element={<EventDetails />} /> {EventDetails}

            </Routes>
        </Router>


    );
}

export default App;