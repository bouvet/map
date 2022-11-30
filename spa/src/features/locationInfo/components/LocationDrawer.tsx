import { Global } from '@emotion/react';
import { Alert, Box, Button, CssBaseline, Snackbar, SwipeableDrawer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled as materialStyled, StyledEngineProvider } from '@mui/material/styles';
import moment from 'moment';
import 'moment/locale/nb';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { StarRating } from '../../../components/StarRating/StarRating';
import { LinkButton, SubmitButton } from '../../../components/UI';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { mapActions } from '../../../store/state/map.state';
import { MyTheme } from '../../../styles/global';
import { IReviewTypeGet } from '../../../utils/types.d';
import { sessionServices } from '../../session/services/session.services';
import { reviewServices } from '../services/locationinfo.services';
import { AddSessionModal } from './AddSessionModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { Review } from './Review';
import { ReviewModal } from './ReviewModal';

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
    word-break: break-word;
    hyphens: auto;
`;

const ImageContainer = styled.div`
    width: 100%;
    overflow-x: scroll;
    display: flex;
    gap: 10px;
    padding: 30px 0px 10px 0px;
`;

type ImageProp = {
    backgroundImage: string | undefined;
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

    const [reviewList, setReviewList] = useState<ReactElement[]>([]);
    const [imageList, setImageList] = useState<ReactElement[]>([]);
    const { currentlySelectedLocation } = useStateSelector((state) => state.map);
    const { currentReviews } = useStateSelector((state) => state.review);
    const { currentSessions } = useStateSelector((state) => state.session);
    const locationTitle = currentlySelectedLocation.properties.title;
    const locationDescription = currentlySelectedLocation.properties.description;
    const locationRating = currentlySelectedLocation.properties.rating;
    const { id } = currentlySelectedLocation;

    const dispatch = useStateDispatch();

    useEffect(() => {
        dispatch(reviewServices.getReviews(id));
        dispatch(sessionServices.getSessions(id));
    }, [dispatch, id]);

    moment.locale('nb');

    const updateCurrentReviewsCallback = useCallback(() => {
        if (currentReviews) {
            const temp = currentReviews
                .filter((item) => item.text)
                .sort((itemA, itemB) => (itemA.created > itemB.created ? -1 : 1))
                .map((item: IReviewTypeGet) => (
                    <Review
                        key={item.id}
                        date={moment(item.created).format('L')}
                        // @ts-ignore
                        name={item.creator?.firstName}
                        age={moment(item.creator?.dob).fromNow(true)}
                        rating={item.rating}
                        review={item.text}
                    />
                ));
            setReviewList(temp);
        }
    }, [currentReviews, setReviewList]);

    const updateCurrentImageCallback = useCallback(() => {
        if (currentReviews) {
            const temp = currentReviews
                .filter((item) => item.webpImage)
                // @ts-ignore
                .sort((itemA, itemB) => (itemA.webpImage?.uploaded > itemB.webpImage?.uploaded ? 1 : -1))
                .map((item: IReviewTypeGet) => <ImageWrapper key={item.id} backgroundImage={item.webpImage?.cdnUri} />);
            setImageList(temp);
            if (currentlySelectedLocation.properties.webpImage) {
                const mainImg = (
                    <ImageWrapper key={Math.random() * 1000} backgroundImage={currentlySelectedLocation.properties.webpImage.cdnUri} />
                );
                setImageList((imageList) => [mainImg, ...imageList]);
            }
        }
    }, [currentReviews, currentlySelectedLocation.properties.webpImage]);

    useEffect(() => {
        updateCurrentReviewsCallback();
        updateCurrentImageCallback();
    }, [updateCurrentReviewsCallback, updateCurrentImageCallback]);

    const [openAddReview, setOpenAddReview] = useState(false);
    const handleOpenAddReview = () => setOpenAddReview(true);
    const handleCloseAddReview = () => setOpenAddReview(false);

    const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
    const handleOpenSuccessMessage = () => setOpenSuccessMessage(true);
    const handleCloseSuccessMessage = () => setOpenSuccessMessage(false);

    const [openErrorMessage, setOpenErrorMessage] = useState(false);
    const handleOpenErrorMessage = () => setOpenErrorMessage(true);
    const handleCloseErrorMessage = () => setOpenErrorMessage(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleCloseDrawer = () => {
        dispatch(mapActions.setHomeMarkerFocus(false));
        dispatch(mapActions.setPopupVisibility(false));
        dispatch(mapActions.setSelectedMarker(''));
    };

    const [openSessionModal, setOpenSessionModal] = useState(false);
    const handleSessionModalOpen = () => setOpenSessionModal(true);
    const handleSessionModalClose = () => setOpenSessionModal(false);

    const [confirmModal, setConfirmModal] = useState(false);
    const handleOpenConfirmModal = () => setConfirmModal(true);
    const handleCloseConfirmModal = () => setConfirmModal(false);

    const { isAdmin } = useStateSelector((state) => state.auth);
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
                    onClose={handleCloseDrawer}
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
                            <StyledBox sx={{ p: 2, color: 'text.primary', fontWeight: 'bold', textAlign: 'left' }}>
                                {locationTitle}
                            </StyledBox>
                            <StyledBox sx={{ p: 2, color: 'text.primary', textAlign: 'right' }} onClick={handleOpenAddReview}>
                                <StarRating rating={locationRating} color={MyTheme.colors.accent} sizePx={MyTheme.fontSize.largeIcon} />
                            </StyledBox>
                        </GridWrapper>
                    </StyledBox>
                    <ContentWrapper>
                        <SubmitButton
                            type="submit"
                            variant="contained"
                            style={{ height: 35, width: 100, marginTop: '2%' }}
                            onClick={handleSessionModalOpen}
                        >
                            Ny økt
                        </SubmitButton>
                        <AddSessionModal open={openSessionModal} close={handleSessionModalClose} locationTitle={locationTitle} />

                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10, marginBottom: -20 }}>
                            <p>Antall økter: </p>
                            <span role="img" aria-label="flexed biceps">
                                💪
                            </span>
                            <p>{currentSessions.length}</p>
                        </div>
                        <ImageContainer>{imageList && imageList}</ImageContainer>
                        <ContentContainer>{locationDescription}</ContentContainer>
                        <ContentContainer>
                            <b>Omtaler</b>
                        </ContentContainer>
                        {reviewList && reviewList}
                        <LinkButton sx={{ width: 150 }} onClick={handleOpenAddReview}>
                            Legg til omtale
                        </LinkButton>

                        <ReviewModal
                            open={openAddReview}
                            close={handleCloseAddReview}
                            success={handleOpenSuccessMessage}
                            error={handleOpenErrorMessage}
                        />
                        <Snackbar
                            open={openSuccessMessage}
                            autoHideDuration={3000}
                            onClose={handleCloseSuccessMessage}
                            sx={{ display: 'inline' }}
                        >
                            <Alert severity="success">Innsending fullført!</Alert>
                        </Snackbar>
                        <Snackbar
                            open={openErrorMessage}
                            autoHideDuration={3000}
                            onClose={handleCloseErrorMessage}
                            sx={{ display: 'inline' }}
                        >
                            <Alert severity="error">Noe gikk galt</Alert>
                        </Snackbar>
                    </ContentWrapper>
                    {isAdmin ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" style={{ backgroundColor: '#dc1111' }} onClick={handleOpenConfirmModal}>
                                Slett lokasjon
                            </Button>
                        </div>
                    ) : null}
                    <ConfirmDeleteModal open={confirmModal} close={handleCloseConfirmModal} locationTitle={locationTitle} />
                </SwipeableDrawer>
            </Root>
        </StyledEngineProvider>
    );
};
