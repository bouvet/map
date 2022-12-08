import React from 'react';
import { Link } from 'react-router-dom';

import { Collapse, Fab } from '@mui/material';
import styled from 'styled-components';

interface Props {
    visible: boolean;
    icon: string;
    endpoint?: string;
    onClickHandler?: () => void;
}

export const FabSubMenuButton: React.FC<Props> = ({ visible, icon, endpoint, onClickHandler }) => (
    <Collapse in={visible} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
        <MenuListItem>
            {endpoint && (
                <Link to={endpoint}>
                    <Fab size="small" sx={{ backgroundColor: 'white' }} className="material-symbols-outlined">
                        {icon}
                    </Fab>
                </Link>
            )}
            {!endpoint && (
                <Fab size="small" sx={{ backgroundColor: 'white' }} className="material-symbols-outlined" onClick={onClickHandler}>
                    {icon}
                </Fab>
            )}
        </MenuListItem>
    </Collapse>
);

const MenuListItem = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem 0;
`;
