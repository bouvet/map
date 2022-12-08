import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { FullPageSpinner } from '../components/UI';
import { CategoryList } from '../features/admin';
import { CheckAuthState, RequireAuth } from '../features/auth';
import { HowToAddLocation, HowToAddReview, TipsAndTricks } from '../features/onboarding';
import { ChangeEmail, ChangePassword, DeleteAccount, EditProfile, ProfileImage, ProfileInfo } from '../features/profile';
import { Email, ConfirmCode, PersonalInfo, Password, Personalization } from '../features/register';
import { CreateWorkout } from '../features/workoutRegistration/Components/CreateWorkout';
import { RegisterWorkout } from '../pages/RegisterWorkout';

import { Auth, Home, AddLocation, Login, Profile, Register, ResetPassword, Onboarding, ConfirmEmail } from '../pages';

const RequireAdmin = lazy(() => import('../features/auth/components/RequireAdmin'));
const Admin = lazy(() => import('../pages/Admin'));

export const AppRoutes: FC = () => (
    <Suspense fallback={<FullPageSpinner />}>
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

                <Route path="confirm-email" element={<ConfirmEmail />} />

                <Route path="auth" element={<Auth />} />

                <Route path="register" element={<Register />}>
                    <Route path="email" element={<Email />} />
                    <Route path="confirm-code" element={<ConfirmCode />} />
                    <Route path="personal-info" element={<PersonalInfo />} />
                    {/* <Route path="personal-info-google" element={<PersonalInfoGoogle />} /> */}
                    <Route path="password" element={<Password />} />
                    <Route path="personalization" element={<Personalization />} />
                </Route>

                <Route path="onboarding" element={<Onboarding />}>
                    <Route path="tips-and-tricks" element={<TipsAndTricks />} />
                    <Route path="add-location" element={<HowToAddLocation />} />
                    <Route path="add-review" element={<HowToAddReview />} />
                </Route>

                <Route path="add-location">
                    <Route index element={<AddLocation />} />
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

                <Route path="profile" element={<Profile />}>
                    <Route index element={<ProfileInfo />} />
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
                <Route path="*" element={<Home />} />
            </Route>
        </Routes>
    </Suspense>
);
