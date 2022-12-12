import { Box, Button, Modal, Stack } from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/UI';
import { useStateDispatch } from '../../../hooks/useRedux';
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
    locationTitle: any;
}

const AddSession = {
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
                        <Box sx={AddSession}>
                            <Text style={{ textAlign: 'center' }}>Vil du legge til en ny treningsøkt på:</Text>
                            <Text style={{ textAlign: 'center', fontWeight: 600, marginBottom: 20 }}>{locationTitle}?</Text>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" style={{ marginRight: 15 }} onClick={handleNewSessionRegister}>
                                    Legg til
                                </Button>

                                <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={handleCloseSessionModal}>
                                    Avbryt
                                </Button>
                            </div>
                        </Box>
                    </Stack>
                </form>
            </>
        </Modal>
    );
};
