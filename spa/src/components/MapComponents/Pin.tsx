import styled from "styled-components";
import Icon from "../Icon";
import { MyTheme } from '../../styles/global';

interface Props {
    fillColor: string;
}

const Svg = styled(Icon)`
    width: 33px;
    height: 53px;
`

export const Pin: React.FunctionComponent<Props> = ({fillColor}) => (
    <Svg viewBox="0 0 33 53">
        <path d="M33 16.5C33 25.6127 28 33 16.5 53.5C5 33 0 25.6127 0 16.5C0 7.3873 7.3873 0 16.5 0C25.6127 0 33 7.3873 33 16.5Z" fill={fillColor}/>
    </Svg>
)
