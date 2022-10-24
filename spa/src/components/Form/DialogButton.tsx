import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CloseButton } from '../UI';

export const DialogButton: FC = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => navigate('/login');
    const handleCloseDialog = () => setOpen(false);

    return (
        <>
            <CloseButton onClick={handleClickOpen} />
            <Dialog open={open}>
                <DialogTitle id="alert-dialog-title">Avbryt registrering</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Sikker på at du ønsker å avslutte registreringen?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ja</Button>
                    <Button onClick={handleCloseDialog}>Nei</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
