import { Box, Button, Modal, Stack } from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/UI';

const Backdrop = styled.div`
    height: 100vh;
    width: 100%;
    z-index: 0;
`;

interface sessionProps {
    open: boolean;
    close: Function;
    locationTitle: any;
    handleNewSession: any;
    sessions: any;
    success: Function;
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

export const AddSessionModal: FC<sessionProps> = ({ open, close, locationTitle, handleNewSession, sessions, success }) => {
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
                            <Text>Vil du legge til en ny treningsøkt på:</Text>
                            <Text style={{ textAlign: 'center', fontWeight: 600, marginBottom: 20 }}>{locationTitle}?</Text>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    style={{ marginRight: 15 }}
                                    onClick={() => {
                                        handleNewSession();
                                        console.log(sessions);
                                        handleCloseSessionModal();
                                        success();
                                    }}
                                >
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
