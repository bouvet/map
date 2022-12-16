import React, { useState } from 'react';
import { FilePondFile } from 'filepond';
import { CircularProgress } from '@mui/material';
import { useStateSelector } from '../../../hooks';
import { ImageSelector, PrimaryButton } from '../../../components/Common';
import { Section } from '../../../components/Layout';

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
        <Section>
            <ImageSelector chooseFileHandler={chooseFileHandler} files={files} />
            <PrimaryButton onClick={() => onSubmitHandler(files[0])}>
                {loading && <CircularProgress color="inherit" size={20} />}
                {!loading && files.length < 1 && 'Fortsett uten bilde'}
                {!loading && files.length > 0 && 'Legg til lokasjon'}
            </PrimaryButton>
        </Section>
    );
};
