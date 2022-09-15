/* eslint-disable-next-line */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { LocationInfo } from './pages/LocationInfo';
import { Login } from './pages/Login';
import { LocationRegistration } from './pages/LocationRegistration';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location-info" element={<LocationInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/location-registration" element={<LocationRegistration />} />
        </Routes>
    </Router>
);

export default App;
