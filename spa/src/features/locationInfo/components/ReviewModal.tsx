import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Box, Button, Modal, Rating, Stack } from '@mui/material';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import Autorenew from '@mui/icons-material/Autorenew';
import styled from 'styled-components';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { reviewServices } from '../services/locationinfo.services';
import { IReviewType } from '../../../utils/types.d';
import { Img } from '../../locationRegistration/components/ImageUploader';
import { CloseButton, SubmitButton } from '../../../components/UI';
import { MyTheme } from '../../../styles/global';

interface ReviewProps {
    open: boolean;
    close: Function;
    success: Function;
}

const AddReview = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    zIndex: '1301',
    width: '94%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 5,
    pt: 5,
};

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#007BC0',
    },
    '& .MuiRating-iconHover': {
        color: '#007BC0',
    },
});

const Backdrop = styled.div`
    height: 100vh;
    width: 100%;
    z-index: 0;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ReviewModal: FC<ReviewProps> = ({ open, close, success }) => {
    const [value, setValue] = useState<number | null>(null);
    const [review, setReview] = useState('');

    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState('');

    const handleCloseAddReview = () => {
        close();
        setValue(0);
        setReview('');
        setImage(undefined);
        setImageUrl('');
    };
    const dispatch = useStateDispatch();

    const { currentlySelectedLocation } = useStateSelector((state) => state.map);

    const handleOpenSuccessMessage = () => success();

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

    const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value !== ' ') {
            setReview(e.target.value);
        }
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        if (value === 0 || value === null) {
            e.preventDefault();
        } else {
            const payload: IReviewType = {
                rating: value,
                text: review,
                locationId: currentlySelectedLocation.id,
            };
            if (image) {
                payload.image = image;
            }
            dispatch(reviewServices.postReview(payload));
            e.preventDefault();
            handleCloseAddReview();
            handleOpenSuccessMessage();
        }
    };

    return (
        <Modal open={open}>
            <>
                <Backdrop onClick={handleCloseAddReview} />
                <form onSubmit={onSubmitHandler}>
                    <Box sx={AddReview}>
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Stack alignItems="center" spacing={3}>
                                <StyledRating
                                    name="simple-controlled"
                                    size="large"
                                    value={value}
                                    onChange={(e, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </Stack>
                            <br />
                        </Box>
                        <Stack alignItems="center" spacing={3}>
                            <textarea
                                name="review"
                                rows={4}
                                cols={30}
                                style={{ padding: 5, resize: 'none' }}
                                maxLength={120}
                                value={review}
                                onChange={(e) => handleReviewChange(e)}
                            />
                            {review.length} / 120
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
                                            sx={{ textTransform: 'none' }}
                                            style={{ color: `${MyTheme.colors.accent}` }}
                                            size="large"
                                            component="label"
                                            startIcon={<Autorenew />}
                                        >
                                            <input
                                                hidden
                                                accept="image/png, image/webp, image/jpg, image/jpeg"
                                                type="file"
                                                onChange={(e) => handleImageChange(e)}
                                            />
                                            Bytt
                                        </Button>
                                    </ButtonWrapper>
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
                                        accept="image/png, image/webp, image/jpg, image/jpeg"
                                        type="file"
                                        onChange={(e) => handleImageChange(e)}
                                    />
                                    Last opp
                                </Button>
                            )}
                            {!value ? (
                                <SubmitButton disabled variant="contained" sx={{ width: 230 }}>
                                    Send inn
                                </SubmitButton>
                            ) : (
                                <SubmitButton type="submit" variant="contained" sx={{ width: 230 }}>
                                    Send inn
                                </SubmitButton>
                            )}
                        </Stack>
                        <CloseButton onClick={handleCloseAddReview} />
                    </Box>
                </form>
            </>
        </Modal>
    );
};
