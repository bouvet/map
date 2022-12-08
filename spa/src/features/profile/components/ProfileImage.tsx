import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CircularProgress } from '@mui/material';
import { FilePondFile } from 'filepond';
import { ConfirmationModal, DeleteButton, ImageSelector, PrimaryButton } from '../../../components/Common';
import { useStateDispatch, useStateSelector } from '../../../hooks';
import { userServices } from '../../../services';
import { Main, Section } from '../../../components/Layout';
import { Header } from '../../../components/Navigation';

export const ProfileImage = () => {
    const [files, setFiles] = useState<any>([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { user, loading } = useStateSelector((state) => state.user);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const chooseFileHandler = (files: FilePondFile[]) => {
        setFiles(files);
    };

    const uploadImageHandler = (image: FilePondFile) => {
        dispatch(
            userServices.updateProfileImage(user.id, image, () => {
                navigate('/profile');
            }),
        );
    };

    const deleteImageHandler = () => {
        dispatch(
            userServices.deleteProfileImage(user.id, () => {
                navigate('/profile');
            }),
        );
    };

    return (
        <>
            <Header>Nytt profilbilde</Header>
            <Main>
                <Section>
                    <ImageSelector files={files} chooseFileHandler={chooseFileHandler} label="Velg bilde" />
                    <div>
                        <PrimaryButton sx={{ marginTop: '2rem' }} disabled={files.length < 1} onClick={() => uploadImageHandler(files[0])}>
                            {!loading && 'Last opp'}
                            {loading && files.length > 0 && <CircularProgress color="inherit" size={20} />}
                        </PrimaryButton>
                        {!!user.webpProfileImage && (
                            <DeleteButton sx={{ marginTop: '1rem' }} onClick={() => setShowConfirmModal(true)}>
                                Slett profilbilde
                            </DeleteButton>
                        )}
                    </div>
                    {showConfirmModal && (
                        <ConfirmationModal
                            modalTitle="Slett profilbilde"
                            // eslint-disable-next-line max-len
                            modalText="Du er i ferd med å slette profilbilde. Bilde blir slettet for godt men du kan alltids laste opp nytt bilde senere."
                            acceptButtonText="Ja, jeg vil slette bilde"
                            onCancelHandler={() => setShowConfirmModal(false)}
                            onAcceptHandler={deleteImageHandler}
                            loading={loading}
                        />
                    )}
                </Section>
            </Main>
        </>
    );
};
