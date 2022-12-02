import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';
import { ButtonBase } from './ButtonBase';

export const PrimaryButton = styled(ButtonBase)({
    backgroundColor: `${MyTheme.colors.accent}`,
});
