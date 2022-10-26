import { CircularProgress } from '@mui/material';

export const FullPageSpinner = () => (
    <div
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <CircularProgress color="primary" size={80} />
    </div>
);
