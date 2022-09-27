import { FC } from 'react';
import styled from 'styled-components';
import { BackButton, GoogleIcon } from '../../components/Navigation/Buttons';
import { MyTheme } from '../../styles/global';
import { GoogleLogoWhite } from '../login/components/Button';

const HeaderWrapper = styled.div`
    width: 100%;
    height: 250px;
    position: relative;
    display: flex;
    justify-content: center;
`;

const ColouredSection = styled.div`
    width: 100%;
    height: 150px;
    background-color: ${MyTheme.colors.accent};
`;

const BackButtonHeader = styled(BackButton)`
    position: absolute;
    top: 20px;
    left: 20px;
`;

const ProfilePicture = styled.div`
    aspect-ratio: 1;
    height: 150px;
    border-radius: 50%;
    background-image: url(https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
    position: absolute;
    top: 75px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

export const ProfileHeader: FC = () => (
    <HeaderWrapper>
        <BackButtonHeader backgroundColor={MyTheme.colors.opaque}>
            <GoogleIcon color="white" className="material-symbols-outlined">
                arrow_back
            </GoogleIcon>
        </BackButtonHeader>
        <ColouredSection />
        <ProfilePicture />
    </HeaderWrapper>
);
