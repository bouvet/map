import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BackButton, GoogleIcon } from '../../components/Navigation/Buttons';
import { MyTheme } from '../../styles/global';
import { ProfilePicture, ProfilePictureProps } from './ProfileImage';

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

export const ProfileHeader: FC<ProfilePictureProps> = (props) => {
    const { handleClick } = props;
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <HeaderWrapper>
            <BackButtonHeader backgroundColor={MyTheme.colors.opaque} onClick={handleBackClick}>
                <GoogleIcon color="white" className="material-symbols-outlined">
                    arrow_back
                </GoogleIcon>
            </BackButtonHeader>
            <ColouredSection />
            <ProfilePicture handleClick={handleClick} />
        </HeaderWrapper>
    );
};
