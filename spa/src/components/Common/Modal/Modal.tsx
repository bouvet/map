import React from 'react';
import styled from 'styled-components';

import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { MyTheme } from '../../../styles/global';

interface Props {
    center?: boolean;
    style?: {};
    closeModalHandler: (event?: React.MouseEvent<HTMLDivElement>) => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ center, style, closeModalHandler, title, children }) => (
    <Container style={{ justifyContent: center ? 'center' : '' }}>
        <Backdrop onClick={closeModalHandler} />
        <ModalContainer style={{ marginTop: center ? '' : '1rem', ...style }}>
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
        </ModalContainer>
    </Container>
);

const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1500;
`;

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModalContainer = styled.div`
    width: 85%;
    max-height: 90vh;
    background-color: white;
    border-radius: 3px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    z-index: 1600;
    overflow: hidden;
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
