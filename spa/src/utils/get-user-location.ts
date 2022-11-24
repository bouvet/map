// eslint-disable-next-line no-undef
export const getUserLocation = (getUserLocationSuccess: PositionCallback) => {
    // eslint-disable-next-line no-undef
    const getUserLocationError: PositionErrorCallback = (error) => {
        if (error.message === 'User denied geolocation prompt') return;
        console.log(error);
        console.log(error.message);
    };

    navigator.geolocation.getCurrentPosition(getUserLocationSuccess, getUserLocationError);
};
