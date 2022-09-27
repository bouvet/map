import { createGlobalStyle } from 'styled-components';

export const MyTheme = {
    colors: {
        accent: '#007BC0',
        darkbase: '#282828',
        lightbase: '#FFFFFF',
        darkcolor: '#000000',
        opaque: 'rgba(0, 0, 0, 0.5)',
        grey: '#A7A7A7',
        alert: '#D32F2F',
        success: '#2E7D32',
    },
    fontFamily: {
        body: 'Open Sans, sans-serif',
        header: '',
    },
    fontSize: {
        body: '12px',
        icon: '16px',
        header: '16px',
        largeIcon: '24px',
    },
};

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
`;
