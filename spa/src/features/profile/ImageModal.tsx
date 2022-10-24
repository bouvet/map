import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';
import { ProfilePictureProps } from './ProfileImage';
import { Button as UploadButton } from './Buttons';
import { CloseButton } from '../../components/UI/Buttons/NavigationButtons';

const BackDrop = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${MyTheme.colors.opaque};
    position: absolute;
    z-index: 5;
`;

const Modal = styled.div`
    width: 90%;
    height: 90vh;
    max-height: 500px;
    max-width: 400px;
    background-color: ${MyTheme.colors.lightBase};
    z-index: 6;
    position: relative;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    width: 80%;
    margin-inline: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface ProfilePictureImageProps {
    imageUrl?: string;
}

export const ProfilePicture = styled.div<ProfilePictureImageProps>`
    aspect-ratio: 1;
    height: 200px;
    border-radius: 50%;
    background-image: url(${({ imageUrl }) => imageUrl});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

export const ImageModal: FC<ProfilePictureProps> = (props) => {
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState('');

    const { handleClick } = props;

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            setImage(files[0]);
        }
    };

    const removeImage = () => {
        setImage(undefined);
    };

    useEffect(() => {
        if (image) {
            const imageUrl = URL.createObjectURL(image);
            setImageUrl(imageUrl);
        }
    }, [image]);

    return (
        <BackDrop>
            <Modal>
                <CloseButton onClick={handleClick} />
                <ModalContent>
                    {image ? (
                        <>
                            <ProfilePicture imageUrl={imageUrl} />
                            <IconButton onClick={removeImage}>
                                <DeleteIcon />
                            </IconButton>
                            <UploadButton>Bekreft</UploadButton>
                        </>
                    ) : (
                        <Button variant="outlined" component="label" startIcon={<AddAPhoto />}>
                            <input
                                hidden
                                accept="image/png, image/jpeg, image/webp, image/jpg"
                                type="file"
                                onChange={(e) => handleImageChange(e)}
                            />
                            Last opp
                        </Button>
                    )}
                </ModalContent>
            </Modal>
        </BackDrop>
    );
};
