import { AlertColor } from '@mui/material';

export interface ISnackbar {
    visible?: boolean;
    message: string;
    visibleDuration?: number;
    severity?: AlertColor;
}
