export const sleep = (time: number) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
