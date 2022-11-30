import styled from 'styled-components';
import { Button } from '../../../components/UI/Buttons';

import { fullGoogleAuthUrl } from '../../../lib/googleAPI';

const ButtonImage = styled.img`
    height: 80%;
    margin-left: 0.3rem;
    margin-right: 0.2rem;
`;

export const GoogleLoginLink = () => (
    <Button
        variant="contained"
        className="white-button"
        onClick={() => window.location.replace(`${fullGoogleAuthUrl}`)}
        style={{ margin: '1rem 0' }}
    >
        Fortsett med
        <ButtonImage src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" /> oogle
    </Button>
);
