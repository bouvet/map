import React, { useState } from 'react';

import { CircularProgress } from '@mui/material';
import { FilePondFile } from 'filepond';
import { ImageSelector, Modal, PrimaryButton } from '../../../components/Common';

interface Props {
    showImageModalToggle: () => void;
    uploadImageHandler: (image: FilePondFile) => void;
    loading: boolean;
}

export const ImageModal: React.FC<Props> = ({ showImageModalToggle, uploadImageHandler, loading }) => {
    const [files, setFiles] = useState<any>([]);

    const chooseFileHandler = (files: FilePondFile[]) => {
        setFiles(files);
    };

    return (
        <Modal closeModalHandler={showImageModalToggle} center title="Nytt profilbilde">
            <ImageSelector files={files} chooseFileHandler={chooseFileHandler} label="Velg bilde" />
            <PrimaryButton sx={{ marginTop: '2rem' }} disabled={files.length < 1} onClick={() => uploadImageHandler(files[0])}>
                {!loading ? 'Last opp' : <CircularProgress color="inherit" size={20} />}
            </PrimaryButton>
        </Modal>
    );
};
