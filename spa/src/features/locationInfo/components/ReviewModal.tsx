import React, { FC, useEffect, useState } from 'react';
import { Box, Button, ClickAwayListener, Modal, Rating, Stack } from '@mui/material';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';
import { RoundButton } from '../../../components/Navigation/Buttons';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { reviewServices } from '../services/locationinfo.services';
import { ReviewType } from '../../../utils/types.d';
import { Img } from '../../locationRegistration/components/ImageUploader';

interface ReviewProps {
    open: boolean;
    close: Function;
    success: Function;
}

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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files) {
            setImage(files[0]);
        }
    };

    useEffect(() => {
        if (image) {
            const imageUrl = URL.createObjectURL(image);
            setImageUrl(imageUrl);
        }
    }, [image]);

    const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value !== ' ') {
            setReview(event.target.value);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (value === 0 || value === null) {
            event.preventDefault();
        } else {
            const payload: ReviewType = {
                rating: value,
                text: review,
                locationId: currentlySelectedLocation.id,
            };
            if (image) {
                payload.image = image;
            }
            dispatch(reviewServices.postReview(payload));
            event.preventDefault();
            handleCloseAddReview();
            handleOpenSuccessMessage();
        }
    };

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
        p: 7,
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

    const CloseBtn = styled(RoundButton)`
        position: absolute;
        height: 40px;
        width: 40px;
        top: 10px;
        left: 10px;
        &:active {
            background-color: ${MyTheme.colors.darkbase};
        }
    `;

    return (
        <Modal open={open}>
            <ClickAwayListener onClickAway={handleCloseAddReview}>
                <form onSubmit={(event) => handleSubmit(event)}>
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
                                    onChange={(event, newValue) => {
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
                                onChange={(event) => handleReviewChange(event)}
                            />
                            {review.length} / 120
                            {image ? (
                                <Img src={imageUrl} alt="blobb" />
                            ) : (
                                <Button variant="outlined" component="label" startIcon={<AddAPhoto />}>
                                    Last opp
                                    <input hidden accept="image/*" multiple type="file" onChange={(event) => handleImageChange(event)} />
                                </Button>
                            )}
                            {!value ? (
                                <Button disabled variant="contained">
                                    Send inn
                                </Button>
                            ) : (
                                <Button type="submit" variant="contained">
                                    Send inn
                                </Button>
                            )}
                        </Stack>
                        <CloseBtn
                            backgroundColor={MyTheme.colors.opaque}
                            textColor={MyTheme.colors.lightbase}
                            onClick={handleCloseAddReview}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </CloseBtn>
                    </Box>
                </form>
            </ClickAwayListener>
        </Modal>
    );
};
