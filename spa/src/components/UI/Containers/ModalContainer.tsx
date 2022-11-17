import React from 'react';
import { Modal, ClickAwayListener, Box } from '@mui/material';

interface Props {
    open: boolean;
    onCloseHandler: (event: MouseEvent | TouchEvent) => void;
    children: React.ReactNode;
}

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: '1301',
    width: '85%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 2,
};

export const ModalContainer: React.FC<Props> = ({ open, onCloseHandler, children }) => (
    <Modal open={open}>
        <ClickAwayListener onClickAway={onCloseHandler}>
            <Box sx={ModalStyle}>{children}</Box>
        </ClickAwayListener>
    </Modal>
);
