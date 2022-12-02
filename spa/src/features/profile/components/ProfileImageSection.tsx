import React from 'react';

import styled from 'styled-components';

import { Avatar, Badge, SxProps } from '@mui/material';
import { IUser } from '../../../interfaces';
import { MyTheme } from '../../../styles/global';
import { createColorHashFromString } from '../../../utils';

interface Props {
    user: IUser;
    showImageModalToggle: () => void;
}

export const ProfileImageSection: React.FC<Props> = ({ user, showImageModalToggle }) => {
    const styles: SxProps = {
        bgcolor: createColorHashFromString(`${user.firstName} ${user.lastName}`),
        height: 150,
        width: 150,
        top: -30,
        fontSize: '2rem',
        boxShadow: '3px 3px 15px rgba(0, 0, 0, 0.5)',
    };
    return (
        <ProfileImage>
            <Badge
                badgeContent={
                    <ChangeImageButton onClick={showImageModalToggle} className="material-symbols-outlined">
                        add
                    </ChangeImageButton>
                }
            >
                <Avatar
                    src={user.webpProfileImage?.cdnUri}
                    alt={`${user.firstName} ${user.lastName}`}
                    sx={styles}
                    imgProps={{ style: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' } }}
                >
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                </Avatar>
            </Badge>
        </ProfileImage>
    );
};

const ChangeImageButton = styled.button`
    color: white;
    background-color: ${MyTheme.colors.opaque};
    border-radius: 50%;
    margin-right: 3rem;
    margin-bottom: 1.5rem;
    padding: 0.3rem;
    &:hover {
        cursor: pointer;
    }
`;

const ProfileImage = styled.div`
    background-color: ${MyTheme.colors.accent};
    height: 3rem;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
`;
