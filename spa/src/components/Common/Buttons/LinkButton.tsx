import { styled } from '@mui/material/styles';
import { ButtonBase } from './ButtonBase';
import { MyTheme } from '../../../styles/global';

export const LinkButton = styled(ButtonBase)({
    color: `${MyTheme.colors.accent}`,
    ':hover': {
        backgroundColor: `${MyTheme.colors.accent}`,
        color: `${MyTheme.colors.lightBase}`,
    },
});
