import React, { FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { snackbarActions } from '../../store/state/snackbar.state';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

export const CustomizedSnackbars: FC = () => {
    const { severity, message, isOpen, autohideDuration } = useStateSelector((state) => state.snackbar);

    const dispatch = useStateDispatch();

    const handleClose = () => {
        dispatch(snackbarActions.closeNotify());
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ top: '70px' }}
            open={isOpen}
            autoHideDuration={autohideDuration === null ? undefined : 6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
