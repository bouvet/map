import React from 'react';

import { CircularProgress } from '@mui/material';

import { FabMenuButton, PillButton } from '../../../components/UI';
import { Footer } from '../../../components/Layout';
import { MyTheme } from '../../../styles/global';

interface Props {
    getUserLocationHandler: () => void;
    showMenuToggler: () => void;
    showMenu: boolean;
    loadingUserLocation: boolean;
}

export const HomeFooter: React.FC<Props> = ({ getUserLocationHandler, showMenuToggler, showMenu, loadingUserLocation }) => (
    <Footer>
        <PillButton
            onClick={getUserLocationHandler}
            style={{
                padding: '1.2rem 0.8rem',
                marginTop: '0.7rem',
                backgroundColor: loadingUserLocation ? `${MyTheme.colors.grey}` : `${MyTheme.colors.lightBase}`,
                color: loadingUserLocation ? `${MyTheme.colors.lightBase}` : `${MyTheme.colors.darkColor}`,
            }}
            disabled={loadingUserLocation}
        >
            {!loadingUserLocation ? '🔍' : <CircularProgress color="inherit" size={17} sx={{ marginRight: '0.6rem' }} />} Nærmeste lokasjon
        </PillButton>
        <FabMenuButton showMenu={showMenu} showMenuToggler={showMenuToggler} />
    </Footer>
);
