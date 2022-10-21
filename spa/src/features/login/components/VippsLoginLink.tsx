import styled from 'styled-components';

import { Button } from './GoogleLoginLink';

const ButtonImage = styled.img`
    height: 100%;
`;

export const VippsLoginLink = () => (
    <Button variant="contained" className="vipps-button" onClick={() => window.location.replace(`!`)}>
        Logg inn med
        <ButtonImage src="https://vipps.no/documents/58/vipps-rgb-white.svg" alt="vipps" />
    </Button>
);
