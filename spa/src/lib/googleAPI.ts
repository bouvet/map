import axios from 'axios';

const GOOGLE_AUTH_URI = process.env.REACT_APP_GOOGLE_AUTH_URI;
const GOOGLE_REVOKE_URI = process.env.REACT_APP_GOOGLE_REVOKE_URI;

const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
const GOOGLE_STATE = process.env.REACT_APP_GOOGLE_STATE;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_SCOPE = process.env.REACT_APP_GOOGLE_SCOPE;

// eslint-disable-next-line max-len
export const fullGoogleAuthUrl = `${GOOGLE_AUTH_URI}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${GOOGLE_SCOPE}&state=${GOOGLE_STATE}&access_type=offline`;

export const googleAuth = axios.create({
    baseURL: fullGoogleAuthUrl,
});

export const googleRevokeAccess = axios.create({
    baseURL: GOOGLE_REVOKE_URI,
});
