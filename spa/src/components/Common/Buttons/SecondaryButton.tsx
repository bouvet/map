import { styled } from '@mui/material/styles';
import { MyTheme } from '../../../styles/global';
import { ButtonBase } from './ButtonBase';

export const SecondaryButton = styled(ButtonBase)({
    backgroundColor: `${MyTheme.colors.gray}`,
});
