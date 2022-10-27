/* eslint-disable max-len */
import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { GoogleIcon } from '../../components/Navigation/GoogleIcon';
import { MyTheme } from '../../styles/global';

export const ProfilePictureWrapper = styled.div`
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

export interface ProfilePictureProps {
    handleClick: MouseEventHandler<HTMLButtonElement>;
}

export const ProfilePicture: FC<ProfilePictureProps> = (props) => {
    const { handleClick } = props;

    return (
        <ProfilePictureWrapper>
            <ButtonChangePicture type="button" onClick={handleClick}>
                <GoogleIcon color="white" className="material-symbols-outlined">
                    add
                </GoogleIcon>
            </ButtonChangePicture>
        </ProfilePictureWrapper>
    );
};
