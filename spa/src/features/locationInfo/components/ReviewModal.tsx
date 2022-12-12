import { Box, Modal, Rating, Stack } from '@mui/material';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FABCloseButton, PrimaryButton } from '../../../components/Common';
import { ILocation } from '../../../interfaces';
import { MyTheme } from '../../../styles/global';
import { IReviewType } from '../../../utils/types.d';

interface ReviewProps {
    selectedLocation: ILocation;
    open: boolean;
    close: Function;
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

export const ReviewModal: FC<ReviewProps> = ({ selectedLocation, open, close }) => {
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

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value === 0 || value === null) {
            e.preventDefault();
        } else {
            const payload: IReviewType = {
                rating: value,
                text: review,
                locationId: selectedLocation.id,
            };
            if (image) {
                payload.image = image;
            }

            handleCloseAddReview();
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
                                    {/* <Img src={imageUrl} alt="blob" /> */}
                                    <ButtonWrapper>
                                        <PrimaryButton sx={{ textTransform: 'none', color: 'red' }} onClick={removeImage}>
                                            Slett
                                        </PrimaryButton>
                                        <PrimaryButton sx={{ textTransform: 'none' }} style={{ color: `${MyTheme.colors.accent}` }}>
                                            <input
                                                hidden
                                                accept="image/png, image/webp, image/jpg, image/jpeg"
                                                type="file"
                                                onChange={(e) => handleImageChange(e)}
                                            />
                                            Bytt
                                        </PrimaryButton>
                                    </ButtonWrapper>
                                </>
                            ) : (
                                <PrimaryButton sx={{ padding: 2, textTransform: 'none' }} style={{ color: `${MyTheme.colors.accent}` }}>
                                    <input
                                        hidden
                                        accept="image/png, image/webp, image/jpg, image/jpeg"
                                        type="file"
                                        onChange={(e) => handleImageChange(e)}
                                    />
                                    Last opp
                                </PrimaryButton>
                            )}
                            {!value ? (
                                <PrimaryButton disabled sx={{ width: 230 }}>
                                    Send inn
                                </PrimaryButton>
                            ) : (
                                <PrimaryButton type="submit" sx={{ width: 230 }}>
                                    Send inn
                                </PrimaryButton>
                            )}
                        </Stack>
                        <FABCloseButton onClick={handleCloseAddReview} />
                    </Box>
                </form>
            </>
        </Modal>
    );
};
