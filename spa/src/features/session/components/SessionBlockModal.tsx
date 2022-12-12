import { Box, Button, Modal, Stack } from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Common';

const Backdrop = styled.div`
    height: 100vh;
    width: 100%;
    z-index: 0;
`;

const StyledModalBox = {
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

interface ISessionBlockModal {
    handler: Function;
    isOpen: boolean;
    deleteBlock: Function;
}

export const SessionBlockModal: FC<ISessionBlockModal> = ({ handler, isOpen, deleteBlock }) => {
    const handleCloseModalOnClick = () => handler();
    const handleDeleteandClose = () => {
        deleteBlock();
        handler();
    };
    return (
        <Modal open={isOpen}>
            <>
                <Backdrop onClick={handleCloseModalOnClick} />
                <form>
                    <Stack>
                        <Box sx={StyledModalBox}>
                            <Text style={{ textAlign: 'center', marginBottom: '1rem' }}>Vil du slette denne treningsøkten?</Text>

                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Button variant="contained" style={{ backgroundColor: 'rgb(220 17 17)' }} onClick={handleDeleteandClose}>
                                    Slett
                                </Button>

                                <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={handleCloseModalOnClick}>
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
