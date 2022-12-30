import React from 'react';

import { CircularProgress, ClickAwayListener, Fab } from '@mui/material';

import { PillButton } from '../../../components/Common';
import { Footer } from '../../../components/Layout';
import { MyTheme } from '../../../styles/global';
import { HomeMenu } from './HomeMenu';

interface Props {
    getUserLocationHandler: () => void;
    showMenuToggler: () => void;
    showMenu: boolean;
    loadingUserLocation: boolean;
}

export const HomeFooter: React.FC<Props> = ({ getUserLocationHandler, showMenuToggler, showMenu, loadingUserLocation }) => (
    <Footer style={{ bottom: 0 }}>
        <PillButton
            onClick={getUserLocationHandler}
            style={{
                padding: '1.2rem 0.8rem',
                marginTop: '0.7rem',
                backgroundColor: loadingUserLocation ? `${MyTheme.colors.gray}` : `${MyTheme.colors.lightBase}`,
                color: loadingUserLocation ? `${MyTheme.colors.lightBase}` : `${MyTheme.colors.darkColor}`,
            }}
            disabled={loadingUserLocation}
        >
            {!loadingUserLocation ? '🔍' : <CircularProgress color="inherit" size={17} sx={{ marginRight: '0.6rem' }} />} Nærmeste lokasjon
        </PillButton>
        <ClickAwayListener onClickAway={() => (showMenu ? showMenuToggler() : null)}>
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
        </ClickAwayListener>
        <HomeMenu showMenu={showMenu} />
    </Footer>
);
