import React from 'react';

import { CircularProgress } from '@mui/material';

import { AcceptButton, DeleteButton } from '../Buttons';
import { Modal } from './Modal';

interface Props {
    modalText: string;
    acceptButtonText: string;
    modalTitle: string;
    onCancelHandler: () => void;
    onAcceptHandler: () => void;
    loading?: boolean;
}

export const ConfirmationModal: React.FC<Props> = ({
    modalText,
    acceptButtonText,
    modalTitle,
    onCancelHandler,
    onAcceptHandler,
    loading,
}) => (
    <Modal closeModalHandler={onCancelHandler} center title={modalTitle}>
        <p style={{ lineHeight: '1.4rem' }}>{modalText}</p>
        <p style={{ padding: '1rem 0' }}>Er du sikker?</p>
        <AcceptButton sx={{ marginTop: '0.5rem', backgroundColor: 'green' }} onClick={onCancelHandler}>
            Nei, ta meg tilbake
        </AcceptButton>
        <DeleteButton sx={{ marginTop: '0.5rem' }} onClick={onAcceptHandler}>
            {!loading ? acceptButtonText : <CircularProgress color="inherit" size={20} />}
        </DeleteButton>
    </Modal>
);
