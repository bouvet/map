import { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BackButton, GoogleIcon } from '../../components/Navigation/Buttons';
import { MyTheme } from '../../styles/global';

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

const ButtonChangePicture = styled.button`
    border: none;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${MyTheme.colors.opaque};
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    z-index: 2;
    position: absolute;
    right: 5px;
    top: 5px;
`;

export const ProfileHeader: FC = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/');
    };

    const handleProfilePictureClick = () => console.log('profile click');
    return (
        <HeaderWrapper>
            <BackButtonHeader backgroundColor={MyTheme.colors.opaque} onClick={handleBackClick}>
                <GoogleIcon color="white" className="material-symbols-outlined">
                    arrow_back
                </GoogleIcon>
            </BackButtonHeader>
            <ColouredSection />
            <ProfilePicture>
                <ButtonChangePicture type="button" onClick={handleProfilePictureClick}>
                    <GoogleIcon color="white" className="material-symbols-outlined">
                        add
                    </GoogleIcon>
                </ButtonChangePicture>
            </ProfilePicture>
        </HeaderWrapper>
    );
};
