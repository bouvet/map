import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface Props {
    onClick: () => void;
}

const DeleteButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const IconDeleteButton: React.FC<Props> = ({ onClick }) => (
    <DeleteButtonWrapper>
        <IconButton aria-label="Slett" onClick={onClick}>
            <DeleteIcon color="warning" />
        </IconButton>
    </DeleteButtonWrapper>
);
