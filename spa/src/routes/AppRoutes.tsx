import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { App } from '../App';
import { CheckAuthState, RequireAdmin, RequireAuth } from '../features/auth';
import {
    AdminPanel,
    AuthenticationSpinner,
    ChangePassword,
    Home,
    LocationRegistration,
    Login,
    ProfilePage,
    Register,
    ResetPassword,
} from '../pages';
import {
    CreatePassword,
    EmailConfirmation,
    EmailInput,
    Onboarding,
    PersonalInfo,
    PersonalInfoGoogle,
    Personalization,
} from '../features/userRegistration';
import { ChangeEmail, DeleteAccount } from '../features/profile';
import { CreateCategory } from '../features/adminPanel';

export const AppRoutes: FC = () => (
    <Routes>
        <Route
            path="/"
            element={
                <CheckAuthState>
                    <App />
                </CheckAuthState>
            }
        >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="change-password" element={<ChangePassword />} />

            <Route path="auth" element={<AuthenticationSpinner />} />

            <Route path="register" element={<Register />}>
                <Route path="email" element={<EmailInput />} />
                <Route path="confirm-code" element={<EmailConfirmation />} />
                <Route path="personal-info" element={<PersonalInfo />} />
                <Route path="personal-info-google" element={<PersonalInfoGoogle />} />
                <Route path="create-password" element={<CreatePassword />} />
                <Route path="personalization" element={<Personalization />} />
                <Route path="onboarding" element={<Onboarding />} />
            </Route>

            <Route path="location-registration">
                <Route
                    index
                    element={
                        <RequireAuth>
                            <LocationRegistration />
                        </RequireAuth>
                    }
                />
            </Route>

            <Route path="profile">
                <Route
                    index
                    element={
                        <RequireAuth>
                            <ProfilePage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="change-email"
                    element={
                        <RequireAuth>
                            <ChangeEmail />
                        </RequireAuth>
                    }
                />
                <Route
                    path="delete-account"
                    element={
                        <RequireAuth>
                            <DeleteAccount />
                        </RequireAuth>
                    }
                />
            </Route>

            <Route path="admin">
                <Route
                    index
                    element={
                        <RequireAdmin>
                            <AdminPanel />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="create-category"
                    element={
                        <RequireAdmin>
                            <CreateCategory />
                        </RequireAdmin>
                    }
                />
            </Route>
            <Route path="*" element={<Home />} />
        </Route>
    </Routes>
);
