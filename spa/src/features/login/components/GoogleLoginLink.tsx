import styledC from 'styled-components';

import { styled } from '@mui/material/styles';

import MuiButton from '@mui/material/Button';
import { fullGoogleAuthUrl } from '../../../lib/googleAPI';
import { MyTheme } from '../../../styles/global';

const ButtonImage = styledC.img`
    height: 80%;
    margin-left: 0.3rem;
`;

export const Button = styled(MuiButton)(() => ({
    borderRadius: 50,
    width: '100%',
    textTransform: 'none',
    fontSize: 16,
    fontFamily: `${MyTheme.fontFamily.body}`,
    height: 40,
    marginBottom: 15,
}));

export const GoogleLoginLink = () => (
    <Button variant="contained" className="white-button" onClick={() => window.location.replace(`${fullGoogleAuthUrl}`)}>
        Logg inn med
        <ButtonImage src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" /> oogle
    </Button>
);
