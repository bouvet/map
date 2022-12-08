import styled from 'styled-components';
import { PrimaryButton } from '../../../components/Common';

import { fullGoogleAuthUrl } from '../../../lib/googleAPI';

const ButtonImage = styled.img`
    height: 80%;
    margin-left: 0.3rem;
    margin-right: 0.2rem;
`;

export const GoogleLoginLink = () => (
    <PrimaryButton onClick={() => window.location.replace(`${fullGoogleAuthUrl}`)} sx={{ marginBottom: '0.5rem' }}>
        Fortsett med
        <ButtonImage src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" /> oogle
    </PrimaryButton>
);
