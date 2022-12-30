import { FC, useState } from 'react';
import styled from 'styled-components';
import { LinkButton, PrimaryButton } from '../../../components/Common';
import { IconDeleteButton } from '../../../components/Common/Buttons/IconDeleteButton';
import { useStateSelector } from '../../../hooks';
import { ILocation } from '../../../interfaces';
import { AddSessionModal } from './AddSessionModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { ReviewImageList } from './ReviewImageList';
import { ReviewList } from './ReviewList';

interface Props {
    selectedLocation: ILocation;
    handleReviewModal: Function;
}

const SessionCountWrapper = styled.div`
    display: flex;
    margin-top: 2%;
`;

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

export const DrawerContent: FC<Props> = ({ selectedLocation, handleReviewModal }) => {
    const [openSessionModal, setOpenSessionModal] = useState(false);
    const handleSessionModal = () => setOpenSessionModal(!openSessionModal);

    const [confirmModalDelete, setConfirmModalDelete] = useState(false);
    const handleDeleteModal = () => setConfirmModalDelete(!confirmModalDelete);

    const handleReviewLink = () => handleReviewModal();

    const { userSessions } = useStateSelector((state) => state.session);

    const { isAdmin } = useStateSelector((state) => state.auth);
    const locationTitle = selectedLocation.properties.title;
    const locationDescription = selectedLocation.properties.description;
    const { id } = selectedLocation;

    return (
        <ContentWrapper style={{ marginTop: '1rem' }}>
            <PrimaryButton type="submit" style={{ height: 35, width: 100, marginTop: '2%' }} onClick={handleSessionModal}>
                Ny treningsøkt
            </PrimaryButton>
            <AddSessionModal locationId={id} open={openSessionModal} close={handleSessionModal} locationTitle={locationTitle} />
            <SessionCountWrapper>
                <p>Antall økter: 💪 {userSessions.length}</p>
            </SessionCountWrapper>
            <ReviewImageList selectedLocation={selectedLocation} />
            <ContentContainer>{locationDescription}</ContentContainer>
            <ContentContainer>
                <b>Omtaler</b>
            </ContentContainer>
            <ReviewList />
            <LinkButton sx={{ width: 150 }} onClick={handleReviewLink}>
                Legg til omtale
            </LinkButton>
            {isAdmin ? <IconDeleteButton onClick={handleDeleteModal} /> : null}
            <ConfirmDeleteModal open={confirmModalDelete} close={handleDeleteModal} locationTitle={locationTitle} locationId={id} />
        </ContentWrapper>
    );
};
