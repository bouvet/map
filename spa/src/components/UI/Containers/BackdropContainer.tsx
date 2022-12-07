import React from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1999;
`;

interface Props {
    backdropClickHandler?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const BackdropContainer: React.FC<Props> = ({ backdropClickHandler }) => <Backdrop onClick={backdropClickHandler} />;
