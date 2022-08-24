import styled from 'styled-components';
import { MyTheme } from '../../styles/global';


/** Header content as a string which will be structured as a H1 element */
type HeaderContent = {
    /** The stuff that will be converted  */
    content: string;
}

/** Header body, structure based on div
 * Color set to be the light base color in the theme object
 */
const HeaderWrapper = styled.div`
    height: 130px;
    padding: 0px 10px;
    background-color: ${MyTheme.colors.lightbase};
    display: flex;
    align-items: center;
    top: 0px;
    z-index: 1;
`

/** H1 Header for displaying name of application */
const HeaderH1 = styled.h1`
    padding: 0px;
    margin: 0px;
    color: ${MyTheme.colors.darkbase};
    font-size: ${MyTheme.fontSize.header};
`

/** Header component with HeaderWrapper and H1 element
 *  takes content passed as child in component usage.
 *  content is set to be displayed as H1 element.
 */
export const Header: React.FunctionComponent<HeaderContent> = ({content}) => {
    return (
        <HeaderWrapper>
            <HeaderH1>{content}</HeaderH1>
        </HeaderWrapper>
    );
}