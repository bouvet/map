/* eslint-disable-next-line */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { LocationInfo } from './pages/LocationInfo';
import { Login } from './pages/Login';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location-info" element={<LocationInfo />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
);

export default App;
