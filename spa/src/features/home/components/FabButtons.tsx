import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateDispatch } from '../../../hooks/useRedux';
import { GoogleIcon } from '../../../components/Navigation/GoogleIcon';
import { Fab as FabButton } from '../../../components/UI';
import { authActions } from '../../../store/state/auth.state';
import { MyTheme } from '../../../styles/global';

const fabSize = 42;
const largeFabSize = 56;
const fabMargin = 16;

const Fab = styled(FabButton)`
    transition: transform 400ms ease;
    aspect-ratio: 1;
    height: ${fabSize}px;
    width: auto;
    right: ${fabMargin + (largeFabSize - fabSize) / 2}px;
    background-color: ${MyTheme.colors.lightBase};
    bottom: 30px;
    font-size: 32px;
`;

const LargeFab = styled(Fab)`
    height: ${largeFabSize}px;
    right: ${fabMargin}px;
    background-color: ${MyTheme.colors.accent};
`;

export const GuestMenu: FC = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <Fab
                style={{
                    transform: isActive ? `translateY(-${largeFabSize + fabMargin}px)` : 'translateY(0)',
                    boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Link to="/login">
                    <GoogleIcon color={MyTheme.colors.darkBase} className="material-symbols-outlined">
                        login
                    </GoogleIcon>
                </Link>
            </Fab>
            <LargeFab
                sx={{
                    '&:hover': {
                        backgroundColor: `${MyTheme.colors.accent}`,
                    },
                }}
                type="button"
                onClick={handleClick}
            >
                <GoogleIcon color={MyTheme.colors.lightBase} className="material-symbols-outlined">
                    {isActive ? 'close' : 'menu'}
                </GoogleIcon>
            </LargeFab>
        </>
    );
};

export const UserMenu: FC = () => {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useStateDispatch();
    const handleLogOut = () => dispatch(authActions.logOut());

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <Fab
                style={{
                    transform: isActive ? `translateY(-${largeFabSize + fabMargin * 3 + fabSize * 2}px)` : 'translateY(0)',
                    boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Link to="/profile">
                    <GoogleIcon color={MyTheme.colors.darkBase} className="material-symbols-outlined">
                        person
                    </GoogleIcon>
                </Link>
            </Fab>
            <Fab
                style={{
                    transform: isActive ? `translateY(-${largeFabSize + fabMargin * 2 + fabSize}px)` : 'translateY(0)',
                    boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Link to="/location-registration">
                    <GoogleIcon color={MyTheme.colors.darkBase} className="material-symbols-outlined">
                        add
                    </GoogleIcon>
                </Link>
            </Fab>
            <Fab
                onClick={handleLogOut}
                style={{
                    transform: isActive ? `translateY(-${largeFabSize + fabMargin}px)` : 'translateY(0)',
                    boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                }}
            >
                <GoogleIcon color={MyTheme.colors.darkBase} className="material-symbols-outlined">
                    logout
                </GoogleIcon>
            </Fab>
            <LargeFab
                sx={{
                    '&:hover': {
                        backgroundColor: `${MyTheme.colors.accent}`,
                    },
                }}
                type="button"
                onClick={handleClick}
            >
                <GoogleIcon color={MyTheme.colors.lightBase} className="material-symbols-outlined">
                    {isActive ? 'close' : 'menu'}
                </GoogleIcon>
            </LargeFab>
        </>
    );
};

export const AdminMenu: FC = () => {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useStateDispatch();
    const handleLogOut = () => dispatch(authActions.logOut());

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <Fab
                style={{
                    transform: isActive ? `translateY(-${largeFabSize + fabMargin * 4 + fabSize * 3}px)` : 'translateY(0)',
                    boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Link to="/profile">
                    <GoogleIcon color={MyTheme.colors.darkBase} className="material-symbols-outlined">
                        person
                    </GoogleIcon>
                </Link>
            </Fab>
            <Fab
                style={{
                    transform: isActive ? `translateY(-${largeFabSize + fabMargin * 3 + fabSize * 2}px)` : 'translateY(0)',
                    boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Link to="/admin">
                    <GoogleIcon color={MyTheme.colors.darkBase} className="material-symbols-outlined">
                        admin_panel_settings
                    </GoogleIcon>
                </Link>
            </Fab>
            <Fab
                style={{
                    transform: isActive ? `translateY(-${largeFabSize + fabMargin * 2 + fabSize}px)` : 'translateY(0)',
                    boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Link to="/location-registration">
                    <GoogleIcon color={MyTheme.colors.darkBase} className="material-symbols-outlined">
                        add
                    </GoogleIcon>
                </Link>
            </Fab>
            <Fab
                onClick={handleLogOut}
                style={{
                    transform: isActive ? `translateY(-${largeFabSize + fabMargin}px)` : 'translateY(0)',
                    boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                }}
            >
                <GoogleIcon color={MyTheme.colors.darkBase} className="material-symbols-outlined">
                    logout
                </GoogleIcon>
            </Fab>
            <LargeFab
                sx={{
                    '&:hover': {
                        backgroundColor: `${MyTheme.colors.accent}`,
                    },
                }}
                type="button"
                onClick={handleClick}
            >
                <GoogleIcon color={MyTheme.colors.lightBase} className="material-symbols-outlined">
                    {isActive ? 'close' : 'menu'}
                </GoogleIcon>
            </LargeFab>
        </>
    );
};
