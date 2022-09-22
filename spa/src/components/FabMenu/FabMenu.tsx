import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';
import { GoogleIcon, RoundButton } from '../Navigation/Buttons';

interface FabActiveProps {
    active: boolean;
}

const Fab = styled(RoundButton)<FabActiveProps>`
    transition: transform 500ms ease;
    bottom: ${(active) => (active ? '10px' : '50px')};
`;

const MenuButton: FC = () => (
    <RoundButton backgroundColor={MyTheme.colors.accent}>
        <GoogleIcon color={MyTheme.colors.lightbase} className="material-symbols-outlined">
            menu
        </GoogleIcon>
    </RoundButton>
);

export const FabMenu: FC = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <Fab backgroundColor={MyTheme.colors.lightbase} active={isActive}>
                <Link to="/location-registration">
                    <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                        add
                    </GoogleIcon>
                </Link>
            </Fab>
            <span onClick={handleClick} role="presentation">
                <MenuButton />
            </span>
        </>
    );
};
