import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { MyTheme } from '../../../styles/global';

interface ButtonStylingProps {
    backgroundColor?: string;
}

// @ts-ignore
export const Button = styled(MuiButton, { shouldForwardProp: (props) => props !== 'bgColor' })(({ bgColor }) => ({
    borderRadius: 50,
    width: '100%',
    textTransform: 'none',
    fontSize: 16,
    fontFamily: `${MyTheme.fontFamily.body}`,
    backgroundColor: bgColor,
    height: 40,
}));

export const SubmitButton = styled(Button)({
    backgroundColor: `${MyTheme.colors.accent}`,
});

export const LinkButton = styled(Button)({
    color: `${MyTheme.colors.accent}`,
});
