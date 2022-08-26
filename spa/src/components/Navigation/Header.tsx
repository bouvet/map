import styled from 'styled-components';
import { MyTheme } from '../../styles/global';


type HeaderContent = {
    content: string;
}

const HeaderWrapper = styled.div`
    height: 130px;
    padding: 0px 10px;
    background-color: ${MyTheme.colors.lightbase};
    display: flex;
    align-items: center;
    top: 0px;
    z-index: 1;
`

const HeaderH1 = styled.h1`
    padding: 0px;
    margin: 0px;
    color: ${MyTheme.colors.darkbase};
    font-size: ${MyTheme.fontSize.header};
`

export const Header: React.FunctionComponent<HeaderContent> = ({content}) => {
    return (
        <HeaderWrapper>
            <HeaderH1>{content}</HeaderH1>
        </HeaderWrapper>
    );
}