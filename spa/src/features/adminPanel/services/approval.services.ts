export const approvalServices = {
    approveLocation() {
        return async () => {
            try {
                console.log('hello');
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
    rejectLocation() {
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
