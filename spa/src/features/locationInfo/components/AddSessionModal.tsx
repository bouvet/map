import { Box, Modal, Stack } from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton, Text } from '../../../components/Common';
import { useStateDispatch } from '../../../hooks';
import { sessionServices } from '../../session/services/session.services';

const Backdrop = styled.div`
    height: 100vh;
    width: 100%;
    z-index: 0;
`;

interface sessionModalProps {
    locationId: string;
    open: boolean;
    close: Function;
    locationTitle: string;
}

const AddModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    zIndex: '1301',
    width: '94%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 5,
    pt: 5,
};

export const AddSessionModal: FC<sessionModalProps> = ({ locationId, open, close, locationTitle }) => {
    const dispatch = useStateDispatch();

    const handleNewSessionRegister = () => {
        dispatch(sessionServices.postSession({ LocationId: locationId, Registered: new Date().toISOString() }));
        close();
    };
    const handleCloseSessionModal = () => {
        close();
    };

    return (
        <Modal open={open}>
            <>
                <Backdrop onClick={handleCloseSessionModal} />
                <form>
                    <Stack>
                        <Box sx={AddModal}>
                            <Text style={{ textAlign: 'center' }}>Vil du legge til en ny treningsøkt på:</Text>
                            <Text style={{ textAlign: 'center', fontWeight: 600, marginBottom: 20 }}>{locationTitle}?</Text>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10%' }}>
                                <PrimaryButton onClick={handleNewSessionRegister}>Legg til</PrimaryButton>

                                <SecondaryButton onClick={handleCloseSessionModal}>Avbryt</SecondaryButton>
                            </div>
                        </Box>
                    </Stack>
                </form>
            </>
        </Modal>
    );
};
