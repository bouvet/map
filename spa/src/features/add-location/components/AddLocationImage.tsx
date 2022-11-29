import React, { useState } from 'react';
import { FilePondFile } from 'filepond';
import { CircularProgress } from '@mui/material';
import { useStateSelector } from '../../../hooks';
import { FilePond } from './FilePond';
import { SubmitButton } from '../../../components/UI';

interface Props {
    onSubmitHandler: (image?: FilePondFile) => void;
}

export const AddLocationImage: React.FC<Props> = ({ onSubmitHandler }) => {
    const { loading } = useStateSelector((state) => state.addLocation);

    const [files, setFiles] = useState<any>([]);

    const chooseFileHandler = (files: FilePondFile[]) => {
        setFiles(files);
    };

    return (
        <FilePond chooseFileHandler={chooseFileHandler} files={files}>
            <SubmitButton onClick={() => onSubmitHandler(files[0])}>
                {loading && <CircularProgress color="inherit" size={20} />}
                {!loading && files.length < 1 && 'Fortsett uten bilde'}
                {!loading && files.length > 0 && 'Legg til lokasjon'}
            </SubmitButton>
        </FilePond>
    );
};
