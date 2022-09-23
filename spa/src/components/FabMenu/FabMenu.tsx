import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { authActions } from '../../store/state/auth.state';
import { MyTheme } from '../../styles/global';
import { GoogleIcon, RoundButton } from '../Navigation/Buttons';

const Fab = styled(RoundButton)`
    transition: transform 400ms ease;
`;

export const FabMenu: FC = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const dispatch = useStateDispatch();

    const { isAuthenticated } = useStateSelector((state) => state.auth);
    console.log('auth: ', isAuthenticated);

    const handleLogOut = () => dispatch(authActions.logOut());

    return (
        <>
            {isAuthenticated ? (
                <>
                    <Fab
                        backgroundColor={MyTheme.colors.lightbase}
                        style={{
                            transform: isActive ? 'translateY(-180px)' : 'translateY(0)',
                            boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        <Link to="/">
                            <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                                person
                            </GoogleIcon>
                        </Link>
                    </Fab>
                    <Fab
                        backgroundColor={MyTheme.colors.lightbase}
                        style={{
                            transform: isActive ? 'translateY(-120px)' : 'translateY(0)',
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
                            transform: isActive ? 'translateY(-60px)' : 'translateY(0)',
                            boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                            logout
                        </GoogleIcon>
                    </Fab>
                </>
            ) : (
                <Fab
                    backgroundColor={MyTheme.colors.lightbase}
                    style={{
                        transform: isActive ? 'translateY(-60px)' : 'translateY(0)',
                        boxShadow: !isActive ? 'none' : '0px 0px 5px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <Link to="/login">
                        <GoogleIcon color={MyTheme.colors.darkbase} className="material-symbols-outlined">
                            login
                        </GoogleIcon>
                    </Link>
                </Fab>
            )}
            <span onClick={handleClick} role="presentation">
                <RoundButton backgroundColor={MyTheme.colors.accent}>
                    <GoogleIcon color={MyTheme.colors.lightbase} className="material-symbols-outlined">
                        {isActive ? 'close' : 'menu'}
                    </GoogleIcon>
                </RoundButton>
            </span>
        </>
    );
};
