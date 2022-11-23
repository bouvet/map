import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import Autorenew from '@mui/icons-material/Autorenew';
import styled from 'styled-components';
import { useStateDispatch } from '../../../hooks/useRedux';
import { registrationActions } from '../../../store/state/registration.state';
import { MyTheme } from '../../../styles/global';

const ImageUploaderWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 250px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Img = styled.img`
    max-width: 80%;
    max-height: 40vh;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ImageUploader: FC = () => {
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState('');

    const dispatch = useStateDispatch();

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
            dispatch(registrationActions.setCurrentImage(imageUrl));
        }
    }, [image, dispatch]);

    return (
        <ImageUploaderWrapper>
            {image ? (
                <>
                    <Img src={imageUrl} alt="blobb" />
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
                </>
            ) : (
                <Button
                    sx={{ padding: 7, textTransform: 'none' }}
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
        </ImageUploaderWrapper>
    );
};
