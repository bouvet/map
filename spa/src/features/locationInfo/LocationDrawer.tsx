import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import { StyledEngineProvider, styled as materialStyled } from '@mui/material/styles';
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Button, Modal, Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Rating from '@mui/material/Rating';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';
import { RoundButton } from '../../components/Navigation/Buttons';
import { useStateSelector } from '../../hooks/useRedux';
import { Review } from './Review';

const drawerBleeding = 56;

const Root = materialStyled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = materialStyled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = materialStyled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const ContentWrapper = styled.div`
    width: 94%;
    margin-left: 3%;
    margin-right: 3%;
    overflow-y: scroll;
`;

const ContentContainer = styled.div`
    width: 100%;
    padding: 10px 0px;
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const ImageContainer = styled.div`
    width: 100%;
    overflow-x: scroll;
    display: flex;
    gap: 10px;
    padding: 30px 0px 10px 0px;
`;

type ImageProp = {
    backgroundImage: any;
};

const ImageWrapper = styled.div<ImageProp>`
    height: 40vw;
    padding-left: 40vw;
    display: inline-block;
    border-radius: 10px;
    background-image: url(${(props) => props.backgroundImage});
    background-repeat: none;
    background-position: center;
    background-size: cover;
    white-space: nowrap;
`;

const AddReview = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    height: '360px',
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

const StarWrapper = styled.div`
    color: ${MyTheme.colors.accent};
`;

export const SwipeableEdgeDrawer: FC = () => {
    const [open, setOpen] = React.useState(true);

    const { currentlySelectedLocation } = useStateSelector((state) => state.map);
    const locationTitle = currentlySelectedLocation.properties.title;
    const locationDescription = currentlySelectedLocation.properties.description;
    const locationRating = currentlySelectedLocation.properties.rating;
    const locationImg = currentlySelectedLocation.properties.img;

    let rating = locationRating;

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        console.log(newOpen);
    };

    const [stars, setStars] = useState([<span key="rating" />]);

    if (rating) {
        if (rating > 5) {
            // eslint-disable-next-line no-param-reassign
            rating = 5;
        } else if (rating < 1) {
            // eslint-disable-next-line no-param-reassign
            rating = 1;
        }
    }
    useEffect(() => {
        const temp: any[] = [];
        for (let i = 0; i < rating; i += 1) {
            temp.push(
                <span key={`${i.toString()}solid`} className="material-icons">
                    star
                </span>,
            );
        }
        for (let i = 0; i < 5 - rating; i += 1) {
            temp.push(
                <span key={`${i.toString()}outlined`} className="material-symbols-outlined">
                    star
                </span>,
            );
        }
        setStars(temp);
    }, [rating]);

    const [openAddReview, setOpenAddReview] = React.useState(false);
    const handleOpenAddReview = () => setOpenAddReview(true);
    const handleCloseAddReview = () => setOpenAddReview(false);

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

    const [value, setValue] = useState<number | null>(0);

    return (
        <StyledEngineProvider>
            <Root>
                <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                            height: `calc(70% - ${drawerBleeding}px)`,
                            overflow: 'visible',
                        },
                    }}
                />
                <SwipeableDrawer
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    variant="temporary"
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <StyledBox
                        sx={{
                            position: 'absolute',
                            top: -drawerBleeding,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            visibility: 'visible',
                            right: 0,
                            left: 0,
                        }}
                    >
                        <Puller />
                        <GridWrapper>
                            <Typography sx={{ p: 2, color: 'text.primary', fontWeight: 'bold', textAlign: 'left' }}>
                                {locationTitle}
                            </Typography>
                            <Typography sx={{ p: 2, color: 'text.primary', textAlign: 'right' }} onClick={handleOpenAddReview}>
                                <StarWrapper>{stars}</StarWrapper>
                            </Typography>
                        </GridWrapper>
                    </StyledBox>
                    <ContentWrapper>
                        <ImageContainer>
                            <ImageWrapper backgroundImage={locationImg} />
                            <ImageWrapper backgroundImage={locationImg} />
                            <ImageWrapper backgroundImage={locationImg} />
                        </ImageContainer>
                        <ContentContainer>{locationDescription}</ContentContainer>
                        <ContentContainer>
                            <b>Omtaler</b>
                        </ContentContainer>
                        <Review
                            name="Ola Nordman"
                            age={24}
                            rating={3}
                            review="This park truly is average :) perfect for me!"
                            date="24.12.2012"
                        />
                        <Review
                            name="Ola Svenskman"
                            age={222}
                            rating={1}
                            review="This park is not even close to the quality we expect in sweden! Alt for Norje, under Sverje..."
                            date="17.05.1814"
                        />
                        <Review
                            name="Kjersti Giftekniv"
                            age={74}
                            rating={5}
                            review="I meet the nicest man here! We will get married at this park, 
                            as it is something special to the both of us"
                            date="01.01.2024"
                        />
                        <Button onClick={handleOpenAddReview}>Legg til omtale</Button>
                        <Modal open={openAddReview}>
                            <ClickAwayListener onClickAway={handleCloseAddReview}>
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
                                        <textarea rows={7} cols={30} />
                                        <Button variant="outlined" component="label" startIcon={<AddAPhoto />}>
                                            Last opp
                                            <input hidden accept="image/*" multiple type="file" />
                                        </Button>
                                        <Button variant="contained" onClick={handleCloseAddReview}>
                                            Send inn
                                        </Button>
                                    </Stack>
                                    <CloseBtn
                                        backgroundColor={MyTheme.colors.opaque}
                                        textColor={MyTheme.colors.lightbase}
                                        onClick={handleCloseAddReview}
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </CloseBtn>
                                </Box>
                            </ClickAwayListener>
                        </Modal>
                    </ContentWrapper>
                </SwipeableDrawer>
            </Root>
        </StyledEngineProvider>
    );
};
