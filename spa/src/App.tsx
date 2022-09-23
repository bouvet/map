import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { LocationInfo } from './pages/LocationInfo';
import { Login } from './pages/Login';
import { LocationRegistration } from './pages/LocationRegistration';
import { CustomizedSnackbars } from './components/Snackbar/Snackbar';
import { EmailConfirmation } from './features/userRegistration/components/EmailConfirmation';
import { EmailInput } from './features/userRegistration/components/EmailInput';
import { UserRegistration } from './pages/UserRegistration';
import { PersonalInfo } from './features/userRegistration/components/PersonalInfo';
import { CreatePassword } from './features/userRegistration/components/CreatePassword';
import { Personalization } from './features/userRegistration/components/Personalization';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location-info" element={<LocationInfo />} />
            <Route path="/location-registration" element={<LocationRegistration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-registration" element={<UserRegistration />} />
            <Route path="/email-input" element={<EmailInput />} />
            <Route path="/email-confirmation" element={<EmailConfirmation />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/create-password" element={<CreatePassword />} />
            <Route path="/personalization" element={<Personalization />} />
        </Routes>
        <CustomizedSnackbars />
    </Router>
);

export default App;
