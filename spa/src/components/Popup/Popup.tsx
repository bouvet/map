import { ClickAwayListener } from '@mui/base';
import { FC, useEffect } from 'react';
import { sessionServices } from '../../features/session/services/session.services';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { ILocation } from '../../interfaces';
import { uiActions } from '../../store/state/ui.state';
import { MyTheme } from '../../styles/global';
import { CloseButton, StarRating } from '../Common';
import { ExpandButton } from '../Common/Buttons/ExpandButton';
import { Emoji } from '../Common/Text/Emoji';

import { BodyText, ParkName, PopupContent, PopupImage, PopupWrapper, ReadMoreLink } from './PopupStyles';

interface Props {
    location: ILocation;
    popupHandler: Function;
}

export const Popup: FC<Props> = ({ location, popupHandler }) => {
    const {
        properties: { description, webpImage, rating, title },
    } = location;

    const dispatch = useStateDispatch();

    const { userSessions } = useStateSelector((state) => state.session);

    useEffect(() => {
        dispatch(sessionServices.getSessionsAtLocation(location.id));
    }, [dispatch, location.id]);

    const handleClickClose = () => {
        popupHandler();
    };

    const handleClickShowLocationPage = () => {
        dispatch(uiActions.setShowLocationDrawer(true));
        dispatch(uiActions.setShowLocationPopup(false));
    };

    return (
        <ClickAwayListener onClickAway={handleClickClose}>
            <PopupWrapper>
                <PopupImage imageURL={webpImage?.cdnUri}>
                    <CloseButton onClick={handleClickClose} />
                </PopupImage>
                <PopupContent>
                    <ExpandButton onClick={handleClickShowLocationPage} />
                    <ParkName>{title}</ParkName>
                    <StarRating rating={rating} color={MyTheme.colors.darkBase} sizePx={MyTheme.fontSize.icon} />
                    <BodyText>{description}</BodyText>
                    <ReadMoreLink onClick={handleClickShowLocationPage}>{description.length >= 50 && 'les mer'}</ReadMoreLink>
                    <div style={{ display: 'flex' }}>
                        <Emoji symbol="💪" />
                        <p style={{ fontSize: 12 }}>{userSessions.length}</p>
                    </div>
                </PopupContent>
            </PopupWrapper>
        </ClickAwayListener>
    );
};
