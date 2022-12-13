import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { sessionActions } from '../../../store/state/session.state';
import { uiActions } from '../../../store/state/ui.state';

export const sessionServices = {
    postSession(payload: Object) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.post('/sessions', payload);
                dispatch(uiActions.showSnackbar({ message: 'Ny treningsøkt registrert!', severity: 'success' }));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
    getAllSessions() {
        return async (dispatch: AppDispatch) => {
            try {
                const requestUrl = '/Sessions/mySessions';
                const { data } = await API.get(requestUrl);
                dispatch(sessionActions.setCurrentSessions(data));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
    getSessions(payload: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const requestUrl = `/Sessions?locationId=${payload}`;
                const { data } = await API.get(requestUrl);
                dispatch(sessionActions.setCurrentSessions(data));
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
                dispatch(uiActions.showSnackbar({ message: 'Treningsøkt slettet', severity: 'success' }));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
};
