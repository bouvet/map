import { ISession } from '../../../interfaces';
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

                dispatch(sessionActions.createSession(payload));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
    getAllSessions() {
        return async (dispatch: AppDispatch) => {
            try {
                const requestUrl = '/Sessions/mysessions';
                const sessions: ISession[] = await (await API.get(requestUrl)).data;
                dispatch(sessionActions.setUserSessions(sessions));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
    getSessionsAtLocation(payload: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const requestUrl = `/Sessions?locationId=${payload}`;
                const sessions: ISession[] = await (await API.get(requestUrl)).data;
                dispatch(sessionActions.setUserSessions(sessions));
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
