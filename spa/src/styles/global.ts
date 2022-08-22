import { createGlobalStyle } from "styled-components";

export const MyTheme = {
    colors: {
        accent: '#007BC0',
        darkbase: '#282828',
        lightbase: '#FFFFFF',
        darkcolor: '#000000',
    },
    fontFamily: {
        body: '',
        header: '',
    },
    fontSize: {
        body: '12px',
        header: '16px',
    }
}



export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: ${MyTheme.fontSize.body}, sans-serif;
    }
    #root {
        margin: 0;
    }
`
