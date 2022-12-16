import moment from 'moment';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { LinkButton, PrimaryButton } from '../../../components/Common';
import { Emoji } from '../../../components/Common/Text/Emoji';
import { useStateSelector } from '../../../hooks';
import { ILocation } from '../../../interfaces';
import { IReviewTypeGet } from '../../../utils/types.d';
import { AddSessionModal } from './AddSessionModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { ContentContainer, ContentWrapper, ImageContainer, ImageWrapper, SessionCountWrapper } from './DrawerStyles';
import { Review } from './Review';

interface Props {
    selectedLocation: ILocation;
    handleReviewModal: Function;
}

export const DrawerContent: FC<Props> = ({ selectedLocation, handleReviewModal }) => {
    const [reviewList, setReviewList] = useState<ReactElement[]>([]);
    const [imageList, setImageList] = useState<ReactElement[]>([]);

    const [openSessionModal, setOpenSessionModal] = useState(false);
    const handleSessionModal = () => setOpenSessionModal(!openSessionModal);

    const [confirmModalDelete, setConfirmModalDelete] = useState(false);
    const handleDeleteModal = () => setConfirmModalDelete(!confirmModalDelete);

    const handleReviewLink = () => handleReviewModal();

    const { userSessions } = useStateSelector((state) => state.session);
    const { currentReviews } = useStateSelector((state) => state.review);
    const locationTitle = selectedLocation.properties.title;
    const locationDescription = selectedLocation.properties.description;
    const { id } = selectedLocation;

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
            if (selectedLocation.properties.webpImage) {
                const mainImg = <ImageWrapper key={Math.random() * 1000} backgroundImage={selectedLocation.properties.webpImage.cdnUri} />;
                setImageList((imageList) => [mainImg, ...imageList]);
            }
        }
    }, [currentReviews, selectedLocation.properties.webpImage]);

    useEffect(() => {
        updateCurrentReviewsCallback();
        updateCurrentImageCallback();
    }, [updateCurrentReviewsCallback, updateCurrentImageCallback]);

    return (
        <ContentWrapper style={{ marginTop: '1rem' }}>
            <PrimaryButton type="submit" style={{ height: 35, width: 100, marginTop: '2%' }} onClick={handleSessionModal}>
                Ny treningsøkt
            </PrimaryButton>
            <AddSessionModal locationId={id} open={openSessionModal} close={handleSessionModal} locationTitle={locationTitle} />

            <SessionCountWrapper>
                <p>Antall økter: </p>
                <Emoji symbol="💪" />
                <p style={{ marginLeft: '0.2rem' }}>{userSessions.length}</p>
            </SessionCountWrapper>

            <ImageContainer>{imageList && imageList}</ImageContainer>
            <ContentContainer>{locationDescription}</ContentContainer>
            <ContentContainer>
                <b>Omtaler</b>
            </ContentContainer>
            {reviewList && reviewList}
            <LinkButton sx={{ width: 150 }} onClick={handleReviewLink}>
                Legg til omtale
            </LinkButton>

            {/* {isAdmin ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton onClick={handleDeleteModal}>
                        <DeleteIcon color="warning" />
                    </IconButton>
                </div>
            ) : null} */}
            <ConfirmDeleteModal open={confirmModalDelete} close={handleDeleteModal} locationTitle={locationTitle} />
        </ContentWrapper>
    );
};
