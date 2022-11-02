/* eslint-disable max-len */
import { FC, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { deepPurple } from '@mui/material/colors';
import { GoogleIcon } from '../../components/Navigation/GoogleIcon';
import { BackButton } from '../../components/UI';
import { MyTheme } from '../../styles/global';

type ImageProp = {
    backgroundImage?: string | undefined;
};

export const ProfilePictureWrapper = styled.div<ImageProp>`
    aspect-ratio: 1;
    height: 150px;
    border-radius: 50%;
    background-image: url(${({ backgroundImage }) => backgroundImage});
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

const HeaderWrapper = styled.div`
    width: 100%;
    height: 350px;
    position: relative;
    display: flex;
    justify-content: center;
`;

const ColouredSection = styled.div`
    width: 100%;
    height: 150px;
    background-color: ${MyTheme.colors.accent};
`;

interface ProfilePictureProps {
    handleClick: MouseEventHandler<HTMLButtonElement>;
    backgroundImage?: string | undefined;
    // name?: string | undefined;
}

interface DefaultProfilePictureProps {
    handleClick: MouseEventHandler<HTMLButtonElement>;
    name: string;
}

export const ProfilePicture: FC<ProfilePictureProps> = ({ handleClick, backgroundImage }) => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <HeaderWrapper>
            <BackButton onClick={handleBackClick} />
            <ColouredSection />
            <ProfilePictureWrapper backgroundImage={backgroundImage}>
                <ButtonChangePicture type="button" onClick={handleClick}>
                    <GoogleIcon color="white" className="material-symbols-outlined">
                        add
                    </GoogleIcon>
                </ButtonChangePicture>
            </ProfilePictureWrapper>
        </HeaderWrapper>
    );
};

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    console.log('test fullname', name);
    console.log(typeof name);
    return {
        sx: {
            bgcolor: stringToColor(name),
            aspectRatio: 1,
            height: 150,
            width: 150,
            zIndex: 1,
            position: 'absolute',
            top: 75,
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
        },
        children: `${name.toString().split(' ')[0][0]}${name.toString().split(' ')[1][0]}`,
    };
}

export const DefaultProfilePicture: FC<DefaultProfilePictureProps> = ({ handleClick, name }) => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <HeaderWrapper>
            <BackButton onClick={handleBackClick} />
            <ColouredSection />
            {/* @ts-ignore */}
            {/* <Avatar
                sx={{
                    bgcolor: deepPurple[500],
                    aspectRatio: 1,
                    height: 150,
                    width: 150,
                    zIndex: 1,
                    position: 'absolute',
                    top: 75,
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
                }}
                >
            VV */}

            <Avatar {...stringAvatar('Verden Venter')} />

            <ButtonChangePicture type="button" onClick={handleClick}>
                <GoogleIcon color="white" className="material-symbols-outlined">
                    add
                </GoogleIcon>
            </ButtonChangePicture>
            {/* <ButtonChangePicture type="button" onClick={handleClick}>
                <Badge
                    overlap="circular"
                    sx={{ position: 'absolute' }}
                    badgeContent={
                        <GoogleIcon color="white" className="material-symbols-outlined">
                            add
                        </GoogleIcon>
                    }
                />
            </ButtonChangePicture> */}
            {/* </Avatar> */}
        </HeaderWrapper>
    );
};
