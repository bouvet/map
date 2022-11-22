import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { Category } from '../features/adminPanel';
import { CheckAuthState, RequireAdmin, RequireAuth } from '../features/auth';
import { ChangeEmail, DeleteAccount } from '../features/profile';
import {
    CreatePassword,
    EmailConfirmation,
    EmailInput,
    Onboarding,
    PersonalInfo,
    PersonalInfoGoogle,
    Personalization,
} from '../features/userRegistration';
import { CreateWorkout } from '../features/workoutRegistration/Components/CreateWorkout';
import { Admin, Auth, ChangePassword, Home, LocationRegistration, Login, ProfilePage, Register, ResetPassword } from '../pages';
import { RegisterWorkout } from '../pages/RegisterWorkout';

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

            <Route path="auth" element={<Auth />} />

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
            <Route path="register-workout">
                <Route
                    index
                    element={
                        <RequireAuth>
                            <RegisterWorkout />
                        </RequireAuth>
                    }
                />
            </Route>

            <Route path="create-workout">
                <Route
                    index
                    element={
                        <RequireAuth>
                            <CreateWorkout />
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

            <Route path="admin" element={<RequireAdmin />}>
                <Route index element={<Admin />} />
                <Route path="category" element={<Category />} />
            </Route>
            <Route path="*" element={<Home />} />
        </Route>
    </Routes>
);
