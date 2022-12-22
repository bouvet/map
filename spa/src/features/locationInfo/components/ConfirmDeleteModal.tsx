import { Box, Button, Modal, Stack } from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Common';
import { useStateDispatch } from '../../../hooks';
import { approvalServices } from '../../admin';

const Backdrop = styled.div`
    height: 100vh;
    width: 100%;
    z-index: 0;
`;

interface IConfirmDelete {
    open: boolean;
    close: Function;
    locationTitle: string;
    locationId: string;
}

const DeleteModal = {
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

export const ConfirmDeleteModal: FC<IConfirmDelete> = ({ open, close, locationTitle, locationId }) => {
    const dispatch = useStateDispatch();

    const handleModalOnClick = () => {
        close();
    };

    const deleteLocationHandler = () => {
        dispatch(approvalServices.deleteLocation(locationId));
        close();
    };

    return (
        <Modal open={open}>
            <>
                <Backdrop onClick={handleModalOnClick} />
                <form>
                    <Stack>
                        <Box sx={DeleteModal}>
                            <Text style={{ textAlign: 'center' }}>Vil du virkelig slette lokasjonen:</Text>
                            <Text style={{ textAlign: 'center', fontWeight: 600, marginBottom: 20 }}>{locationTitle}?</Text>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Button variant="contained" style={{ backgroundColor: 'rgb(220 17 17)' }} onClick={deleteLocationHandler}>
                                    Slett
                                </Button>

                                <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={handleModalOnClick}>
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
