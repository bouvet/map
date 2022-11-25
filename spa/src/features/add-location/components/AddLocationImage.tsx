import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { FilePondFile } from 'filepond';
import { Button, CircularProgress } from '@mui/material';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import Autorenew from '@mui/icons-material/Autorenew';
import styled from 'styled-components';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { MyTheme } from '../../../styles/global';
import { FilePond } from './FilePond';
import { SubmitButton } from '../../../components/UI';

const ImageUploaderWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 250px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Img = styled.img`
    max-width: 80%;
    max-height: 40vh;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

interface Props {
    onSubmitHandler: (image?: FilePondFile) => void;
}

export const AddLocationImage: React.FC<Props> = ({ onSubmitHandler }) => {
    const { loading } = useStateSelector((state) => state.addLocation);
    // const [image, setImage] = useState<File | null>(null);
    // const [imageUrl, setImageUrl] = useState('');

    // const dispatch = useStateDispatch();

    // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { files } = e.target;
    //     if (files) {
    //         console.log(files[0]);
    //         setImage(files[0]);
    //     }
    // };

    // const removeImage = () => {
    //     setImage(null);
    // };

    // useEffect(() => {
    //     if (image) {
    //         const imageUrl = URL.createObjectURL(image);
    //         setImageUrl(imageUrl);
    //         dispatch(addLocationActions.setImage(imageUrl));
    //     }
    // }, [image, dispatch]);

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
        // <ImageUploaderWrapper>
        //     {image ? (
        //         <>
        //             <Img src={imageUrl} alt="blob" />
        //             <ButtonWrapper>
        //                 <Button
        //                     sx={{ textTransform: 'none', color: 'red' }}
        //                     size="large"
        //                     onClick={removeImage}
        //                     startIcon={<DeleteIcon style={{ color: 'red' }} />}
        //                 >
        //                     Slett
        //                 </Button>
        //                 <Button
        //                     sx={{ textTransform: 'none', color: `${MyTheme.colors.accent}` }}
        //                     size="large"
        //                     component="label"
        //                     startIcon={<Autorenew style={{ color: `${MyTheme.colors.accent}` }} />}
        //                 >
        //                     <input
        //                         hidden
        //                         accept="image/png, image/jpeg, image/webp, image/jpg"
        //                         type="file"
        //                         onChange={(e) => handleImageChange(e)}
        //                     />
        //                     Bytt
        //                 </Button>
        //             </ButtonWrapper>
        //         </>
        //     ) : (
        //         <Button
        //             sx={{ padding: 7, textTransform: 'none' }}
        //             style={{ color: `${MyTheme.colors.accent}` }}
        //             component="label"
        //             startIcon={<AddAPhoto />}
        //         >
        //             <input
        //                 hidden
        //                 accept="image/png, image/jpeg, image/webp, image/jpg"
        //                 type="file"
        //                 onChange={(e) => handleImageChange(e)}
        //             />
        //             Last opp
        //         </Button>
        //     )}
        // </ImageUploaderWrapper>
    );
};
