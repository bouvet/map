import React from 'react';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';

import { PillButton } from '../../../components/UI';
import { MyTheme } from '../../../styles/global';
import { FabMenu } from './FabMenu';

interface Props {
    getUserLocationHandler: () => void;
    showMenuToggler: () => void;
    showMenu: boolean;
}

export const HomeFooter: React.FC<Props> = ({ getUserLocationHandler, showMenuToggler, showMenu }) => (
    <Footer>
        <PillButton onClick={getUserLocationHandler} style={{ padding: '1.2rem 0.8rem' }}>
            🔍 Nærmeste lokasjon
        </PillButton>
        <Fab
            onClick={showMenuToggler}
            sx={{
                backgroundColor: `${MyTheme.colors.accent}`,
                color: 'white',
                '&:hover': {
                    backgroundColor: `${MyTheme.colors.accent}`,
                },
            }}
        >
            <span className="material-symbols-outlined">{showMenu ? 'close' : 'menu'}</span>
        </Fab>
        {/* <FabMenu /> */}
    </Footer>
);

const Footer = styled.footer`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 7rem;
    width: 100%;
    background-color: transparent;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.8rem;
`;
