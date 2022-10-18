import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { mapActions } from '../../store/state/map.state';
import { MyTheme } from '../../styles/global';
import { CloseButton, RoundButton } from '../Navigation/Buttons';
import { StarRating } from '../StarRating/StarRating';

interface PopupContentProps {
    name: string;
    description: string;
    rating: number;
    image?: string;
}

interface PopUpImageProp {
    imageURL?: string;
}

export const PopupCard = styled.div`
    width: 92%;
    height: 150px;
    background-color: ${MyTheme.colors.lightBase};
    position: absolute;
    bottom: 10px;
    right: 4%;
    border-radius: 10px;
    z-index: 10;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const PopupWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const PopupImage = styled.div<PopUpImageProp>`
    background: url(${(props) => props.imageURL});
    background-color: ${MyTheme.colors.grey};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 40%;
    border-radius: 10px 0px 0px 10px;
`;

const ExpandLink: FC = () => <span className="material-symbols-outlined">open_in_full</span>;

const ExpandBtn = styled(RoundButton)`
    position: absolute;
    height: 40px;
    width: 40px;
    top: 10px;
    right: 10px;
`;

const PopupContent = styled.div`
    width: calc(60% - 20px);
    padding: 10px;
    border-radius: 0px 10px 10px 0px;
    justify-content: left;
    overflow: hidden;
`;

const Parkname = styled.p`
    font-weight: bolder;
    padding-right: 50px;
    margin: 0px;
    font-size: ${MyTheme.fontSize.header};
    word-break: break-word;
    hyphens: auto;
`;

const Bodytext = styled.div`
    justify-content: left;
    margin: 5px 0px;
    font-size: ${MyTheme.fontSize.body};
`;

const ReadMoreLink = styled.a`
    color: ${MyTheme.colors.accent};
    text-decoration: underline;
    white-space: nowrap;
`;
/**
 * Popup component which displays brief information about the park
 * @param name {string} name of park
 * @param description {string} description of park
 * @param rating {number} rating of park 1-5
 */
export const Popup: FC<PopupContentProps> = ({ name, description, rating, image }) => {
    const dispatch = useStateDispatch();

    const { popUpIsVisible } = useStateSelector((state) => state.map);

    const handleClickClose = () => {
        dispatch(mapActions.setPopupVisibility(!popUpIsVisible));
        dispatch(mapActions.setSelectedMarker(''));
    };

    const handleClickShowLocationPage = () => {
        dispatch(mapActions.setHomeMarkerFocus(true));
    };

    const displayedDescription = useMemo(() => {
        if (description.length <= 50) return description;
        return `${description.slice(0, 50)}... `;
    }, [description]);

    return (
        <PopupWrapper>
            <PopupImage imageURL={image}>
                <CloseButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={handleClickClose}>
                    <span className="material-symbols-outlined">close</span>
                </CloseButton>
            </PopupImage>
            <PopupContent>
                <ExpandBtn
                    backgroundColor={MyTheme.colors.lightBase}
                    textColor={MyTheme.colors.darkBase}
                    onClick={handleClickShowLocationPage}
                >
                    <ExpandLink />
                </ExpandBtn>
                <Parkname>{name}</Parkname>
                <StarRating rating={rating} color={MyTheme.colors.darkBase} sizePx={MyTheme.fontSize.icon} />
                <Bodytext>
                    {displayedDescription}
                    <ReadMoreLink onClick={handleClickShowLocationPage}>{description.length >= 50 && 'les mer'}</ReadMoreLink>
                </Bodytext>
            </PopupContent>
        </PopupWrapper>
    );
};
