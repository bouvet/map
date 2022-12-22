import { Global } from '@emotion/react';
import { ClickAwayListener, SwipeableDrawer } from '@mui/material';
import 'moment/locale/nb';
import { FC, useEffect, useState } from 'react';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { ILocation } from '../../../interfaces';
import { uiActions } from '../../../store';
import { sessionServices } from '../../session/services/session.services';
import { reviewServices } from '../services/locationinfo.services';
import { DrawerContent } from './DrawerContent';
import { DrawerEdge } from './DrawerEdge';
import { ReviewModal } from './ReviewModal';

const drawerBleeding = 56;

interface Props {
    selectedLocation: ILocation;
}

export const SwipeableEdgeDrawer: FC<Props> = ({ selectedLocation }) => {
    const [open, setOpen] = useState(false);

    const [openAddReview, setOpenAddReview] = useState(false);
    const handleReviewModal = () => setOpenAddReview(!openAddReview);

    const { showLocationInfoDrawer } = useStateSelector((state) => state.ui);
    const locationTitle = selectedLocation.properties.title;
    const locationRating = selectedLocation.properties.rating;
    const { id } = selectedLocation;

    const dispatch = useStateDispatch();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        if (!open) {
            dispatch(uiActions.setShowLocationDrawer(false));
        } else {
            dispatch(uiActions.setShowLocationDrawer(true));
        }
    };

    useEffect(() => {
        dispatch(reviewServices.getReviews(id));
        dispatch(sessionServices.getSessionsAtLocation(id));
    }, [dispatch, id]);

    // must use local state management for transition to work
    useEffect(() => {
        if (showLocationInfoDrawer) {
            setOpen(true);
        }
    }, [showLocationInfoDrawer]);

    return (
        <>
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(70% - ${drawerBleeding}px)`,
                        overflow: open ? 'visible' : 'hidden',
                    },
                }}
            />
            <ClickAwayListener onClickAway={toggleDrawer(false)}>
                <SwipeableDrawer
                    anchor="bottom"
                    open={open}
                    onOpen={toggleDrawer(true)}
                    onClose={toggleDrawer(false)}
                    swipeAreaWidth={drawerBleeding}
                    variant="temporary"
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <ReviewModal selectedLocation={selectedLocation} open={openAddReview} close={handleReviewModal} />
                    <DrawerEdge handleReviewModal={handleReviewModal} locationTitle={locationTitle} locationRating={locationRating} />
                    <DrawerContent handleReviewModal={handleReviewModal} selectedLocation={selectedLocation} />
                </SwipeableDrawer>
            </ClickAwayListener>
        </>
    );
};
