import { FC, useState } from 'react';
import { Alert, Box, Button, ClickAwayListener, Modal, Rating, Snackbar, Stack } from '@mui/material';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';
import { RoundButton } from '../../../components/Navigation/Buttons';

interface ReviewProps {
    open: boolean;
    close: Function;
}

export const ReviewModal: FC<ReviewProps> = ({ open, close }) => {
    const [value, setValue] = useState<number | null>(0);
    const [review, setReview] = useState('');

    const handleCloseAddReview = () => close();

    const [openSuccessMessage, setOpenSuccessMessage] = useState(false);

    const [openErrorMessage, setOpenErrorMessage] = useState(false);
    const handleCloseErrorMessage = () => setOpenErrorMessage(false);

    const handleSubmit = (event: any) => {
        if (value === 0 || value === null) {
            event.preventDefault();
            setOpenErrorMessage(true);
        } else {
            event.preventDefault();
            setOpenSuccessMessage(true);
            setValue(0);
            setReview('');
        }
    };

    const AddReview = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        height: '340px',
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
                <form onSubmit={handleSubmit}>
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
                                onChange={(event) => setReview(event.target.value)}
                            />
                            {review.length} / 120
                            <Button variant="outlined" component="label" startIcon={<AddAPhoto />}>
                                Last opp
                                <input hidden accept="image/*" multiple type="file" />
                            </Button>
                            <Button type="submit" variant="contained" onClick={handleSubmit}>
                                Send inn
                            </Button>
                        </Stack>
                        <Snackbar open={openSuccessMessage} sx={{ display: 'inline' }}>
                            <Alert severity="success" onClose={handleCloseAddReview}>
                                Innsending fullført!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openErrorMessage} sx={{ display: 'inline' }}>
                            <Alert severity="error" onClose={handleCloseErrorMessage}>
                                Rating mangler!
                            </Alert>
                        </Snackbar>
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
