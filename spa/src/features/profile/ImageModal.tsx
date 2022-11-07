import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Button, Box, ClickAwayListener, Modal } from '@mui/material';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import Autorenew from '@mui/icons-material/Autorenew';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';
import { CloseButton } from '../../components/UI/Buttons/NavigationButtons';
import { SubmitButton } from '../../components/UI';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { userServices } from '../userRegistration/services/user.services';
import { Form } from '../../components/Form/Form';
import { IUserTypeEdit } from '../../utils/types.d';

interface ModalProps {
    open: boolean;
    close: Function;
}

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: '1301',
    width: '65%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 7,
    pt: 9,
};

const ModalContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

interface ProfilePictureImageProps {
    imageUrl?: string;
}

export const ProfilePicture = styled.div<ProfilePictureImageProps>`
    max-width: 80%;
    max-height: 40vh;
    margin-left: 10%;
    aspect-ratio: 1;
    border-radius: 50%;
    background-image: url(${({ imageUrl }) => imageUrl});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

export const ImageModal: FC<ModalProps> = ({ open, close }) => {
    const dispatch = useStateDispatch();

    const { user } = useStateSelector((state) => state.auth);

    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState('');

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

    const handleCloseImageModal = () => {
        close();
        setImage(undefined);
        setImageUrl('');
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload: IUserTypeEdit = {
            // @ts-ignore
            id: user?.id,
            profileImage: image,
        };

        dispatch(userServices.editInfo(payload));
        handleCloseImageModal();
    };

    return (
        <Modal open={open}>
            <>
                <ClickAwayListener onClickAway={handleCloseImageModal}>
                    <Box sx={ModalStyle}>
                        <CloseButton onClick={handleCloseImageModal} />
                        <ModalContent>
                            <Form onSubmit={onSubmitHandler}>
                                {image ? (
                                    <>
                                        <ProfilePicture imageUrl={imageUrl} />
                                        <ButtonWrapper>
                                            <Button
                                                sx={{ textTransform: 'none', color: 'red' }}
                                                size="large"
                                                onClick={removeImage}
                                                startIcon={<DeleteIcon style={{ color: 'red' }} />}
                                            >
                                                Slett
                                            </Button>
                                            <Button
                                                sx={{ textTransform: 'none', color: `${MyTheme.colors.accent}` }}
                                                size="large"
                                                component="label"
                                                startIcon={<Autorenew style={{ color: `${MyTheme.colors.accent}` }} />}
                                            >
                                                <input
                                                    hidden
                                                    accept="image/png, image/jpeg, image/webp, image/jpg"
                                                    type="file"
                                                    onChange={(e) => handleImageChange(e)}
                                                />
                                                Bytt
                                            </Button>
                                        </ButtonWrapper>
                                        <SubmitButton type="submit" variant="contained">
                                            Lagre endringer
                                        </SubmitButton>
                                    </>
                                ) : (
                                    <Button
                                        sx={{ padding: 2, textTransform: 'none' }}
                                        style={{ color: `${MyTheme.colors.accent}` }}
                                        component="label"
                                        startIcon={<AddAPhoto />}
                                    >
                                        <input
                                            hidden
                                            accept="image/png, image/jpeg, image/webp, image/jpg"
                                            type="file"
                                            onChange={(e) => handleImageChange(e)}
                                        />
                                        Last opp
                                    </Button>
                                )}
                            </Form>
                        </ModalContent>
                    </Box>
                </ClickAwayListener>
            </>
        </Modal>
    );
};
