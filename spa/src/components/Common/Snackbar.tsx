import { FC, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { uiActions } from '../../store';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

export const CustomizedSnackbars: FC = () => {
    const {
        snackbar: { message, severity, visible, visibleDuration },
    } = useStateSelector((state) => state.ui);

    const dispatch = useStateDispatch();

    const handleClose = () => {
        dispatch(uiActions.setCloseSnackbar());
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ top: '70px' }}
            open={visible}
            autoHideDuration={visibleDuration}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
