import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { sessionActions } from '../../../store/state/session.state';
import { uiActions } from '../../../store/state/ui.state';
// import { snackbarActions } from '../../../store/state/snackbar.state';
import { ISessionTypeGet } from '../../../utils/types.d';

export const sessionServices = {
    postSession(payload: Object) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.post('/sessions', payload);
                dispatch(uiActions.setShowSnackbar({ message: 'Ny treningsøkt registrert!', severity: 'success' }));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
    getAllSessions() {
        return async (dispatch: AppDispatch) => {
            try {
                const requestUrl = '/Sessions/mysessions';
                const sessions: ISessionTypeGet[] = await (await API.get(requestUrl)).data;
                dispatch(sessionActions.setCurrentSessions(sessions));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
    getSessions(payload: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const requestUrl = `/Sessions?locationId=${payload}`;
                const sessions: ISessionTypeGet[] = await (await API.get(requestUrl)).data;
                dispatch(sessionActions.setCurrentSessions(sessions));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
    deleteSession(sessionId: string) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.delete(`/Sessions/${sessionId}`);
                dispatch(sessionActions.removeSession(sessionId));
                dispatch(uiActions.setShowSnackbar({ message: 'Treningsøkt slettet', severity: 'success' }));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
};
