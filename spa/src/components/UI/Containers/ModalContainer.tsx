import React from 'react';
import styled from 'styled-components';

interface Props {
    center?: boolean;
    style?: {};
    closeModalHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
}

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

const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1999;
`;

const Modal = styled.div`
    width: 85%;
    padding: 1rem;
    background-color: white;
    border-radius: 3px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    z-index: 2000;
`;

export const ModalContainer: React.FC<Props> = ({ center, style, closeModalHandler, children }) => (
    <Container style={{ justifyContent: center ? 'center' : '' }}>
        <Backdrop onClick={closeModalHandler} />
        <Modal style={{ marginTop: center ? '' : '1rem', ...style }}>{children}</Modal>
    </Container>
);
