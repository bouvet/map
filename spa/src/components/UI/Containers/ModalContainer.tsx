import React from 'react';
import styled from 'styled-components';

import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { MyTheme } from '../../../styles/global';
import { BackdropContainer } from './BackdropContainer';

interface Props {
    center?: boolean;
    style?: {};
    closeModalHandler: (event?: React.MouseEvent<HTMLDivElement>) => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
}

export const ModalContainer: React.FC<Props> = ({ center, style, closeModalHandler, title, children }) => (
    <Container style={{ justifyContent: center ? 'center' : '' }}>
        <BackdropContainer backdropClickHandler={closeModalHandler} />
        <Modal style={{ marginTop: center ? '' : '1rem', ...style }}>
            <ModalHeader>
                <IconButton
                    color="inherit"
                    aria-label="Close modal"
                    onClick={() => closeModalHandler()}
                    sx={{ zIndex: 50, marginLeft: '0.5rem' }}
                >
                    <Close sx={{ color: 'white' }} />
                </IconButton>
                <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
        </Modal>
    </Container>
);

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Modal = styled.div`
    width: 85%;
    max-height: 90vh;
    background-color: white;
    border-radius: 3px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    z-index: 2000;
`;

const ModalHeader = styled.div`
    width: 100%;
    height: 3rem;
    background-color: ${MyTheme.colors.accent};
    display: flex;
    align-items: center;
    position: relative;
`;

const ModalTitle = styled.p`
    width: 100%;
    background-color: ${MyTheme.colors.accent};
    color: white;
    position: absolute;
    left: 0;
    text-align: center;
`;

const ModalBody = styled.div`
    width: 100%;
    padding: 1.5rem 1rem;
`;
