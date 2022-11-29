import { MyTheme } from '../styles/global';

export const useLocationStatus = (status?: string) => {
    switch (status) {
        case 'Approved':
            return {
                color: `${MyTheme.colors.success}`,
                status: 'Godkjent',
            };
        case 'Rejected':
            return {
                color: `${MyTheme.colors.alert}`,
                status: 'Avslått',
            };
        case 'Reported':
            return {
                color: `${MyTheme.colors.alert}`,
                status: 'Rapportert',
            };

        case 'Under Review':
            return {
                color: `${MyTheme.colors.warning}`,
                status: 'Under Behandling',
            };

        default:
            return {
                color: `${MyTheme.colors.alert}`,
                status: 'Under Behandling',
            };
    }
};
