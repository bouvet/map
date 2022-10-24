import { Outlet } from 'react-router-dom';
import { CustomizedSnackbars } from './components/Snackbar/Snackbar';
import { PageContainer } from './components/UI';

export const App = () => (
    <PageContainer id="PageContainer">
        <Outlet />
        <CustomizedSnackbars />
    </PageContainer>
);
