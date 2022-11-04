import { FC, useState, useEffect, ReactElement, useCallback } from 'react';
import { Global } from '@emotion/react';
import { SwipeableDrawer, Box, CssBaseline, Snackbar, Alert } from '@mui/material';
import { StyledEngineProvider, styled as materialStyled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import 'moment/locale/nb';
import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { Review } from './Review';
import { ReviewModal } from './ReviewModal';
import { StarRating } from '../../../components/StarRating/StarRating';
import { reviewServices } from '../services/locationinfo.services';
import { IReviewTypeGet } from '../../../utils/types.d';
import { mapActions } from '../../../store/state/map.state';
import { LinkButton } from '../../../components/UI';

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
    const locationTitle = currentlySelectedLocation.properties.title;
    const locationDescription = currentlySelectedLocation.properties.description;
    const locationRating = currentlySelectedLocation.properties.rating;
    const { id } = currentlySelectedLocation;

    const dispatch = useStateDispatch();

    useEffect(() => {
        dispatch(reviewServices.getReviews(id));
    }, [id, dispatch]);

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
                        age={moment(item.creator?.dob).fromNow(true)} // updating?
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
            if (currentlySelectedLocation.properties.webpImage.cdnUri) {
                const mainImg = (
                    <ImageWrapper key={Math.random() * 1000} backgroundImage={currentlySelectedLocation.properties.webpImage.cdnUri} />
                );
                setImageList((imageList) => [mainImg, ...imageList]);
            }
        }
    }, [currentReviews, currentlySelectedLocation.properties.webpImage.cdnUri]);

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

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleCloseDrawer = () => {
        dispatch(mapActions.setHomeMarkerFocus(false));
        dispatch(mapActions.setPopupVisibility(false));
        dispatch(mapActions.setSelectedMarker(''));
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
                        <ImageContainer>{imageList && imageList}</ImageContainer>
                        <ContentContainer>{locationDescription}</ContentContainer>
                        <ContentContainer>
                            <b>Omtaler</b>
                        </ContentContainer>
                        {reviewList && reviewList}
                        <LinkButton sx={{ width: 150 }} onClick={handleOpenAddReview}>
                            Legg til omtale
                        </LinkButton>
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
