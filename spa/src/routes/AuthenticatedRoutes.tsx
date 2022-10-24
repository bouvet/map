import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LocationRegistration, ProfilePage } from '../pages';

import { ChangeEmail, DeleteAccount } from '../features/profile';

export const AuthenticatedRoutes: FC = () => (
    <Routes>
        <Route path="location-registration">
            <Route index element={<LocationRegistration />} />
        </Route>

        <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="change-email" element={<ChangeEmail />} />
            <Route path="delete-account" element={<DeleteAccount />} />
        </Route>
    </Routes>
);
