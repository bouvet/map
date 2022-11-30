import styled from 'styled-components';
import { Button } from '../../../components/UI/Buttons';

const ButtonImage = styled.img`
    height: 100%;
`;

export const VippsLoginLink = () => (
    <Button
        variant="contained"
        className="vipps-button"
        sx={{ margin: '1rem 0', marginBottom: '0.5rem' }}
        onClick={() => window.location.replace(`!`)}
    >
        Fortsett med
        <ButtonImage src="https://vipps.no/documents/58/vipps-rgb-white.svg" alt="vipps" />
    </Button>
);
