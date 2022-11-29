import { API } from '../../../lib/api';
import { AppDispatch, mapActions, uiActions } from '../../../store';

import { ICategory } from '../../../interfaces';

export const categoryServices = {
    get() {
        return async (dispatch: AppDispatch) => {
            try {
                const { data: categories }: { data: ICategory[] } = await API.get('/categories');
                dispatch(mapActions.loadCategories(categories));
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Lasting av kategorier feilet', severity: 'error' }));
            }
        };
    },
    create(emoji: string, name: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data: category }: { data: ICategory } = await API.post('/categories', { emoji, name });
                dispatch(mapActions.addCategory(category));
                dispatch(uiActions.setShowSnackbar({ message: 'Kategori er lagt til', severity: 'success' }));
            } catch (error: any) {
                if (error.response.status === 409) {
                    dispatch(uiActions.setShowSnackbar({ message: 'Kategori finnes allerede', severity: 'error' }));
                    return;
                }
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    edit(category: ICategory) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.put(`/categories/${category.id}`, { name: category.name, emoji: category.emoji });

                const { data } = await API.get('/categories');

                dispatch(mapActions.loadCategories(data));

                dispatch(uiActions.setShowSnackbar({ message: 'Kategori er endret', severity: 'success' }));
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    delete(id: string) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.delete(`/categories/${id}`);

                const { data } = await API.get('/categories');

                dispatch(mapActions.loadCategories(data));

                dispatch(uiActions.setShowSnackbar({ message: 'Kategori er slettet', severity: 'success' }));
            } catch (error: any) {
                if (error.response.status === 409) {
                    dispatch(uiActions.setShowSnackbar({ message: 'Kategori er i bruk, kan ikke slette', severity: 'error' }));
                    return;
                }
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
};
