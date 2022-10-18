import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { LocationInfo } from './pages/LocationInfo';
import { Login } from './pages/Login';
import { LocationRegistration } from './pages/LocationRegistration';
import { CustomizedSnackbars } from './components/Snackbar/Snackbar';
import { AdminPanel } from './pages/AdminPanel';
import { ProfilePage } from './pages/ProfilePage';
import { EmailConfirmation } from './features/userRegistration/components/EmailConfirmation';
import { EmailInput } from './features/userRegistration/components/EmailInput';
import { UserRegistration } from './pages/UserRegistration';
import { PersonalInfo } from './features/userRegistration/components/PersonalInfo';
import { CreatePassword } from './features/userRegistration/components/CreatePassword';
import { Personalization } from './features/userRegistration/components/Personalization';
import { Onboarding } from './features/userRegistration/components/Onboarding';
import { ChangePassword } from './features/login/components/ChangePassword';
import { ResetPassword } from './features/login/components/ResetPassword';
import { ChangeEmail } from './features/profile/ChangeEmail';
import { useStateDispatch } from './hooks/useRedux';
import { userServices } from './features/userRegistration/services/user.services';
import { CreateCategory } from './features/adminPanel/CreateCategory';
import { AuthenticateSpinner } from './pages/AuthenticateSpinner';

const App = () => {
    const dispatch = useStateDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const parsedUser = localStorage.getItem('user');
        let user = null;
        if (parsedUser) {
            user = JSON.parse(parsedUser);
        }
        if (user && token) {
            dispatch(userServices.getInfo(user.id));
        }
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthenticateSpinner />} />
                <Route path="/location-info" element={<LocationInfo />} />
                <Route path="/location-registration" element={<LocationRegistration />} />
                <Route path="/location-approval-panel" element={<AdminPanel />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/change-email" element={<ChangeEmail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user-registration" element={<UserRegistration />} />
                <Route path="/email-input" element={<EmailInput />} />
                <Route path="/email-confirmation" element={<EmailConfirmation />} />
                <Route path="/personal-info" element={<PersonalInfo />} />
                <Route path="/create-password" element={<CreatePassword />} />
                <Route path="/personalization" element={<Personalization />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/create-category" element={<CreateCategory />} />
            </Routes>
            <CustomizedSnackbars />
        </Router>
    );
};

export default App;
