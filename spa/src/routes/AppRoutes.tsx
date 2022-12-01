import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { FullPageSpinner } from '../components/UI';
import { CategoryList } from '../features/admin';
import { CheckAuthState, RequireAdmin, RequireAuth } from '../features/auth';
import { HowToAddLocation, HowToAddReview, TipsAndTricks } from '../features/onboarding';
import { ChangeEmail, DeleteAccount } from '../features/profile';
import { Email, ConfirmCode, PersonalInfo, Password, Personalization } from '../features/register';
import { PersonalInfoGoogle } from '../features/userRegistration';
import { CreateWorkout } from '../features/workoutRegistration/Components/CreateWorkout';
import { Auth, ChangePassword, Home, AddLocation, Login, ProfilePage, Register, ResetPassword, Onboarding } from '../pages';
import { RegisterWorkout } from '../pages/RegisterWorkout';

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
                <Route path="change-password" element={<ChangePassword />} />

                <Route path="auth" element={<Auth />} />

                <Route path="register" element={<Register />}>
                    <Route path="email" element={<Email />} />
                    <Route path="confirm-code" element={<ConfirmCode />} />
                    <Route path="personal-info" element={<PersonalInfo />} />
                    <Route path="personal-info-google" element={<PersonalInfoGoogle />} />
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
                    <Route path="category" element={<CategoryList />} />
                </Route>
                <Route path="*" element={<Home />} />
            </Route>
        </Routes>
    </Suspense>
);
