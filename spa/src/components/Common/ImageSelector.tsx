import React from 'react';

import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile, FilePondInitialFile, setOptions } from 'filepond';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// @ts-ignore
import locale from 'filepond/locale/no_nb';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import styled from 'styled-components';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageResize);
setOptions(locale);

const closeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
`;

setOptions({
    stylePanelAspectRatio: '1.1',
    stylePanelLayout: 'integrated',
    styleButtonRemoveItemPosition: 'right',
    iconRemove: closeIcon,
    allowMultiple: false,
    instantUpload: false,
    allowProcess: false,
});

interface Props {
    label?: string;
    style?: React.CSSProperties;
    files: (string | FilePondInitialFile | Blob)[] | undefined;
    chooseFileHandler: (files: FilePondFile[]) => void;
}

export const ImageSelector: React.FC<Props> = ({ label = 'Legg til bilde', style, files, chooseFileHandler }) => (
    <Section style={style}>
        <FilePond files={files} onupdatefiles={chooseFileHandler} name="files" labelIdle={`<span class='file-pond-text'>${label}</span>`} />
    </Section>
);

const Section = styled.div`
    width: 100%;
    &:hover {
        cursor: pointer;
    }
`;
