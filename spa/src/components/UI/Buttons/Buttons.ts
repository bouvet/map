// import { FC, MouseEvent } from 'react';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { MyTheme } from '../../../styles/global';

export const Button = styled(MuiButton)(() => ({
    borderRadius: 50,
    width: '100%',
    textTransform: 'none',
    fontSize: 16,
    fontFamily: `${MyTheme.fontFamily.body}`,
    height: 40,
    marginBottom: 15,
}));

export const SubmitButton = styled(Button)({
    backgroundColor: `${MyTheme.colors.accent}`,
});

export const LinkButton = styled(Button)({
    color: `${MyTheme.colors.accent}`,
});
