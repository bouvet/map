import { FC, useState, useEffect } from 'react';
import { Global } from '@emotion/react';
import { SwipeableDrawer, Button, Box, Typography, CssBaseline, Snackbar, Alert } from '@mui/material';
import { StyledEngineProvider, styled as materialStyled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';
import { useStateSelector } from '../../../hooks/useRedux';
import { Review } from './Review';
import { ReviewModal } from './ReviewModal';
import { StarRating } from '../../../components/StarRating/StarRating';

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
    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-repeat: none;
    background-position: center;
    background-size: cover;
    white-space: nowrap;
`;

export const SwipeableEdgeDrawer: FC = () => {
    const [open, setOpen] = useState(true);

    const { currentlySelectedLocation } = useStateSelector((state) => state.map);
    const locationTitle = currentlySelectedLocation.properties.title;
    const locationDescription = currentlySelectedLocation.properties.description;
    const locationRating = currentlySelectedLocation.properties.rating;
    const locationImg = currentlySelectedLocation.properties.img;

    const [openAddReview, setOpenAddReview] = useState(false);
    const handleOpenAddReview = () => setOpenAddReview(true);
    const handleCloseAddReview = () => {
        setOpenAddReview(false);
    };

    const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
    const handleOpenSuccessMessage = () => setOpenSuccessMessage(true);
    const handleCloseSuccessMessage = () => setOpenSuccessMessage(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

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
                                <StarRating rating={locationRating} color={MyTheme.colors.accent} sizePx={MyTheme.fontSize.largeIcon} />
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
                            name="Ola Svenskman"
                            age={222}
                            rating={1}
                            review="This park is not even close to the quality we expect in sweden! Alt for Norje, under Sverje..."
                            date="17.05.1814"
                        />
                        <Button onClick={handleOpenAddReview}>Legg til omtale</Button>
                        <ReviewModal open={openAddReview} close={handleCloseAddReview} success={handleOpenSuccessMessage} />
                        <Snackbar
                            open={openSuccessMessage}
                            autoHideDuration={3000}
                            onClose={handleCloseSuccessMessage}
                            sx={{ display: 'inline' }}
                        >
                            <Alert severity="success">Innsending fullført!</Alert>
                        </Snackbar>
                    </ContentWrapper>
                </SwipeableDrawer>
            </Root>
        </StyledEngineProvider>
    );
};