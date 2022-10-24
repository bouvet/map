import { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MyTheme } from '../../styles/global';
import { ProfilePicture, ProfilePictureProps } from './ProfileImage';
import { BackButton } from '../../components/UI/Buttons/NavigationButtons';

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

export const ProfileHeader: FC<ProfilePictureProps> = (props) => {
    const { handleClick } = props;
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <HeaderWrapper>
            <BackButton onClick={handleBackClick} />
            <ColouredSection />
            <ProfilePicture handleClick={handleClick} />
        </HeaderWrapper>
    );
};
