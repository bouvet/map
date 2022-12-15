import { createGlobalStyle } from 'styled-components';

export const MyTheme = {
    colors: {
        accent: '#007BC0',
        darkBase: '#282828',
        lightBase: '#FFFFFF',
        darkColor: '#000000',
        opaque: 'rgba(0, 0, 0, 0.5)',
        gray: '#A7A7A7',
        alert: '#d32f2f',
        alertLight: '#f44336',
        success: '#2E7D32',
        warning: '#ffa726',
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

export const deviceWidth = {
    mobileS: '320px',
    mobileM: '360px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
};

export const device = {
    mobileS: `screen and (min-width: ${deviceWidth.mobileS})`,
    mobileM: `screen and (min-width: ${deviceWidth.mobileM})`,
    mobileL: `screen and (min-width: ${deviceWidth.mobileL})`,
    tablet: `screen and (min-width: ${deviceWidth.tablet})`,
    laptop: `screen and (min-width: ${deviceWidth.laptop})`,
    laptopL: `screen and (min-width: ${deviceWidth.laptopL})`,
    desktop: `screen and (min-width: ${deviceWidth.desktop})`,
    desktopL: `screen and (min-width: ${deviceWidth.desktop})`,
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
