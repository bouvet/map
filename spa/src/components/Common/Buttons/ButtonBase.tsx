import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { MyTheme } from '../../../styles/global';

export const ButtonBase = styled(MuiButton)(() => ({
    width: '100%',
    textTransform: 'none',
    fontSize: 16,
    fontFamily: `${MyTheme.fontFamily.body}`,
    height: 40,
    color: `${MyTheme.colors.lightBase}`,
    ':hover': {
        backgroundColor: `${MyTheme.colors.accent}`,
        color: 'white',
    },
    ':disabled': {
        backgroundColor: `${MyTheme.colors.gray}`,
        color: `${MyTheme.colors.lightBase}`,
    },
}));
