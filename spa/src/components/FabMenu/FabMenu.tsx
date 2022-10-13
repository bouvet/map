/* eslint-disable no-else-return */
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { authActions } from '../../store/state/auth.state';
import { MyTheme } from '../../styles/global';
import { GoogleIcon, RoundButton } from '../Navigation/Buttons';

// Setting the fab menu spacing the worst possible way
const fabSize = 42;
const largeFabSize = 56;
const fabMargin = 16;

const Fab = styled(RoundButton)`
    transition: transform 400ms ease;
    aspect-ratio: 1;
    height: ${fabSize}px;
    width: auto;
    right: ${fabMargin + (largeFabSize - fabSize) / 2}px;
`;

const LargeFab = styled(RoundButton)`
    aspect-ratio: 1;
    height: ${largeFabSize}px;
    width: auto;
    right: ${fabMargin}px;
`;

export const FabMenu: FC = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const dispatch = useStateDispatch();
    const { isAuthenticated } = useStateSelector((state) => state.auth);
    const handleLogOut = () => dispatch(authActions.logOut());

    const { user } = useStateSelector((state) => state.auth);
    let userRole = '';
    user?.roles?.forEach((x) => {
        userRole = x.name;
    });

    // there's probably a better way to do it
    return (
        <>
            {(() => {
                if (isAuthenticated) {
                    if (userRole === 'Administrator') {
                        return (
                            <>
                                <Fab
                                    backgroundColor={MyTheme.colors.lightbase}
                                    style={{
                                        transform: isActive
                                            ? `translateY(-${largeFabSize + fabMargin * 4 + fabSize * 3}px)`
                                            : 'translateY(0)',
                                        boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    <Link to="/profile">
                                        <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                                            person
                                        </GoogleIcon>
                                    </Link>
                                </Fab>
                                <Fab
                                    backgroundColor={MyTheme.colors.lightbase}
                                    style={{
                                        transform: isActive
                                            ? `translateY(-${largeFabSize + fabMargin * 3 + fabSize * 2}px)`
                                            : 'translateY(0)',
                                        boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    <Link to="/location-approval-panel">
                                        <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                                            admin_panel_settings
                                        </GoogleIcon>
                                    </Link>
                                </Fab>
                                <Fab
                                    backgroundColor={MyTheme.colors.lightbase}
                                    style={{
                                        transform: isActive ? `translateY(-${largeFabSize + fabMargin * 2 + fabSize}px)` : 'translateY(0)',
                                        boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    <Link to="/location-registration">
                                        <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                                            add
                                        </GoogleIcon>
                                    </Link>
                                </Fab>
                                <Fab
                                    backgroundColor={MyTheme.colors.lightbase}
                                    onClick={handleLogOut}
                                    style={{
                                        transform: isActive ? `translateY(-${largeFabSize + fabMargin}px)` : 'translateY(0)',
                                        boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                                        logout
                                    </GoogleIcon>
                                </Fab>
                                <LargeFab backgroundColor={MyTheme.colors.accent} type="button" onClick={handleClick}>
                                    <GoogleIcon color={MyTheme.colors.lightbase} className="material-symbols-outlined">
                                        {isActive ? 'close' : 'menu'}
                                    </GoogleIcon>
                                </LargeFab>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <Fab
                                    backgroundColor={MyTheme.colors.lightbase}
                                    style={{
                                        transform: isActive
                                            ? `translateY(-${largeFabSize + fabMargin * 3 + fabSize * 2}px)`
                                            : 'translateY(0)',
                                        boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    <Link to="/profile">
                                        <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                                            person
                                        </GoogleIcon>
                                    </Link>
                                </Fab>
                                <Fab
                                    backgroundColor={MyTheme.colors.lightbase}
                                    style={{
                                        transform: isActive ? `translateY(-${largeFabSize + fabMargin * 2 + fabSize}px)` : 'translateY(0)',
                                        boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    <Link to="/location-registration">
                                        <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                                            add
                                        </GoogleIcon>
                                    </Link>
                                </Fab>
                                <Fab
                                    backgroundColor={MyTheme.colors.lightbase}
                                    onClick={handleLogOut}
                                    style={{
                                        transform: isActive ? `translateY(-${largeFabSize + fabMargin}px)` : 'translateY(0)',
                                        boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                                        logout
                                    </GoogleIcon>
                                </Fab>
                                <LargeFab backgroundColor={MyTheme.colors.accent} type="button" onClick={handleClick}>
                                    <GoogleIcon color={MyTheme.colors.lightbase} className="material-symbols-outlined">
                                        {isActive ? 'close' : 'menu'}
                                    </GoogleIcon>
                                </LargeFab>
                            </>
                        );
                    }
                } else {
                    return (
                        <>
                            <Fab
                                backgroundColor={MyTheme.colors.lightbase}
                                style={{
                                    transform: isActive ? `translateY(-${largeFabSize + fabMargin}px)` : 'translateY(0)',
                                    boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                <Link to="/login">
                                    <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                                        login
                                    </GoogleIcon>
                                </Link>
                            </Fab>
                            <LargeFab backgroundColor={MyTheme.colors.accent} type="button" onClick={handleClick}>
                                <GoogleIcon color={MyTheme.colors.lightbase} className="material-symbols-outlined">
                                    {isActive ? 'close' : 'menu'}
                                </GoogleIcon>
                            </LargeFab>
                        </>
                    );
                }
            })()}
        </>
    );
};
