import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';
import { RoundedButtonBase } from './RoundedButtonBase';

export const BackButton = styled(RoundedButtonBase)`
    z-index: 1300;
    top: 10px;
    left: 10px;
`;

export const CloseButton = styled(RoundedButtonBase)``;

// eslint-disable-next-line react/destructuring-assignment
const FabButton = (props: any) => <i className={`material-icons ${props.className}`}>arrow_back</i>;

export const FabTest = () => (
    <Fab size="small" color="secondary">
        <ArrowBackIcon />
    </Fab>
);
