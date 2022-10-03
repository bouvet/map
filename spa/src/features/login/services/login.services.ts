export const loginService = {
    validateUser() {
        return async () => {
            try {
                console.log('hello');
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
