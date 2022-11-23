import React from 'react';

import { FabMenuButton, PillButton } from '../../../components/UI';
import { Footer } from '../../../components/Layout';

interface Props {
    getUserLocationHandler: () => void;
    showMenuToggler: () => void;
    showMenu: boolean;
}

export const HomeFooter: React.FC<Props> = ({ getUserLocationHandler, showMenuToggler, showMenu }) => (
    <Footer>
        <PillButton onClick={getUserLocationHandler} style={{ padding: '1.2rem 0.8rem', marginTop: '0.7rem' }}>
            🔍 Nærmeste lokasjon
        </PillButton>
        <FabMenuButton showMenu={showMenu} showMenuToggler={showMenuToggler} />
    </Footer>
);
