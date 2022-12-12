import { Box, Button, Modal, Stack } from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Common';

const Backdrop = styled.div`
    height: 100vh;
    width: 100%;
    z-index: 0;
`;

interface IConfirmDelete {
    open: any;
    close: any;
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

export const ConfirmDeleteModal: FC<IConfirmDelete> = ({ open, close, locationTitle }) => {
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
                            <Text style={{ textAlign: 'center' }}>Vil du virkelig slette lokasjonen:</Text>
                            <Text style={{ textAlign: 'center', fontWeight: 600, marginBottom: 20 }}>{locationTitle}?</Text>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: 'rgb(220 17 17)' }}
                                    onClick={() => {
                                        console.log('lokasjon slettet');
                                        handleCloseSessionModal();
                                    }}
                                >
                                    Slett
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
