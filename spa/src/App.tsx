/* eslint-disable-next-line */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { LocationInfo } from './pages/LocationInfo';
import { Login } from './pages/Login';
import { LocationRegistration } from './pages/LocationRegistration';
import { CustomizedSnackbars } from './components/Snackbar/Snackbar';
import { AdminPanel } from './pages/AdminPanel';
import { ProfilePage } from './pages/ProfilePage';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location-info" element={<LocationInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/location-registration" element={<LocationRegistration />} />
            <Route path="/location-approval-panel" element={<AdminPanel />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <CustomizedSnackbars />
    </Router>
);

export default App;
