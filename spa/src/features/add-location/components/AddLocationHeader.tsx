import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../components/Navigation';

export const AddLocationHeader = () => {
    const navigate = useNavigate();

    return (
        <Header>
            <IconButton
                color="inherit"
                aria-label="Navigate home"
                onClick={() => navigate('..')}
                sx={{
                    position: 'absolute',
                    alignItems: 'center',
                    display: {
                        xs: 'flex',
                        sm: 'none',
                    },
                }}
            >
                <ArrowBack sx={{ color: 'white' }} />
            </IconButton>
            <h1 style={{ fontSize: '1rem', fontWeight: '500', color: 'white', width: '100%', textAlign: 'center' }}>
                Legg til treningssted
            </h1>
        </Header>
    );
};
