import React from 'react';

import { Link } from 'react-router-dom';

import { Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { MyTheme } from '../../../styles/global';

import { LinkButton } from '../Buttons';

export type link = {
    label: string;
    to: string;
};

interface Props {
    drawerOpen: boolean;
    openCloseToggle: () => void;
    links: link[];
}

export const DrawerContainer: React.FC<Props> = ({ drawerOpen, openCloseToggle, links }) => (
    <Drawer anchor="right" open={drawerOpen} onClose={openCloseToggle}>
        <div
            style={{
                width: '75vw',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: `${MyTheme.colors.accent}`,
            }}
        >
            <IconButton
                onClick={openCloseToggle}
                sx={{ marginLeft: 'auto', marginRight: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
        </div>
        <nav style={{ marginTop: '1rem' }}>
            <ul>
                {links.map((link) => (
                    <li style={{ textAlign: 'center' }} key={link.label}>
                        <Link to={link.to} style={{ display: 'block' }}>
                            <LinkButton>{link.label}</LinkButton>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    </Drawer>
);
