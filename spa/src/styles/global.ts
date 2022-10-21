import { createGlobalStyle } from 'styled-components';

export const MyTheme = {
    colors: {
        accent: '#007BC0',
        darkBase: '#282828',
        lightBase: '#FFFFFF',
        darkColor: '#000000',
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

const size = {
    mobileS: '320px',
    mobileM: '360px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
};

export const device = {
    mobileS: `screen and (min-width: ${size.mobileS})`,
    mobileM: `screen and (min-width: ${size.mobileM})`,
    mobileL: `screen and (min-width: ${size.mobileL})`,
    tablet: `screen and (min-width: ${size.tablet})`,
    laptop: `screen and (min-width: ${size.laptop})`,
    laptopL: `screen and (min-width: ${size.laptopL})`,
    desktop: `screen and (min-width: ${size.desktop})`,
    desktopL: `screen and (min-width: ${size.desktop})`,
};

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: ${MyTheme.fontFamily.body}, sans-serif;
    }
    #root {
        margin: 0;
    }
`;
