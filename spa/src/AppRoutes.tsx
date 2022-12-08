import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { FullPageSpinner } from './components/Common';
import { ConfirmEmail, Login, RequireAuth } from './features/auth';
import { HowToAddLocation, HowToAddReview, TipsAndTricks } from './features/onboarding';
import { ChangeEmail, ChangePassword, DeleteAccount, EditProfile, ProfileImage } from './features/profile';
import { Email, ConfirmCode, PersonalInfo, Password, Personalization } from './features/register';
import { CreateWorkout } from './features/workoutRegistration/Components/CreateWorkout';
import { RegisterWorkout } from './pages/RegisterWorkout';

import { Auth, Home, AddLocation, Profile, Register, Onboarding, ResetPassword } from './pages';

const RequireAdmin = lazy(() => import('./features/auth/components/RequireAdmin'));
const Admin = lazy(() => import('./pages/Admin'));
const CategoryList = lazy(() => import('./features/admin/components/CategoryList'));

export const AppRoutes = () => (
    <Suspense fallback={<FullPageSpinner />}>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />

                <Route path="add-location" element={<AddLocation />} />

                <Route path="auth">
                    <Route index element={<Auth />} />
                    <Route path="login" element={<Login />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                    <Route path="confirm-email" element={<ConfirmEmail />} />
                </Route>

                <Route path="register" element={<Register />}>
                    <Route index element={<Email />} />
                    <Route path="confirm-code" element={<ConfirmCode />} />
                    <Route path="personal-info" element={<PersonalInfo />} />
                    <Route path="password" element={<Password />} />
                    <Route path="personalization" element={<Personalization />} />
                </Route>

                <Route path="onboarding" element={<Onboarding />}>
                    <Route path="tips-and-tricks" element={<TipsAndTricks />} />
                    <Route path="add-location" element={<HowToAddLocation />} />
                    <Route path="add-review" element={<HowToAddReview />} />
                </Route>

                <Route path="profile" element={<RequireAuth />}>
                    <Route index element={<Profile />} />
                    <Route path="edit">
                        <Route index element={<EditProfile />} />
                        <Route path="image" element={<ProfileImage />} />
                        <Route path="email" element={<ChangeEmail />} />
                        <Route path="password" element={<ChangePassword />} />
                        <Route path="delete" element={<DeleteAccount />} />
                    </Route>
                </Route>

                <Route path="admin" element={<RequireAdmin />}>
                    <Route index element={<Admin />} />
                    <Route path="category" element={<CategoryList />} />
                </Route>

                <Route path="register-workout" element={<RequireAuth />}>
                    <Route index element={<RegisterWorkout />} />
                </Route>

                <Route path="create-workout" element={<RequireAuth />}>
                    <Route index element={<CreateWorkout />} />
                </Route>

                <Route path="*" element={<Home />} />
            </Route>
        </Routes>
    </Suspense>
);
