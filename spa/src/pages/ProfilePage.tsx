import { ChangeEvent, Dispatch, FC, FormEvent, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/nb';
import { Form } from '../features/profile/Form';
import { ImageModal } from '../features/profile/ImageModal';
import { Input, InputProps, ProfileLink } from '../features/profile/Input';
import { ProfileHeader } from '../features/profile/ProfileHeader';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { userServices } from '../features/userRegistration/services/user.services';
import { snackbarActions } from '../store/state/snackbar.state';
import { CenterFlex } from '../components/Form/Input';
import { PageContainer, SectionContainer, SubmitButton } from '../components/UI';

export const ProfilePage: FC = () => {
    const dispatch = useStateDispatch();

    const { user } = useStateSelector((state) => state.auth);

    const firstName = user?.firstName;
    const lastName = user?.lastName;
    const dob = user?.dob;
    const email = user?.email;
    let categories = '';
    user?.favoriteCategories?.forEach((c, index) => {
        // @ts-ignore
        if (user?.favoriteCategories?.length > 1 && index > 0) {
            categories = `${categories}, ${c.name}`;
        } else {
            categories = c.name;
        }
    });

    moment.locale('nb');

    // add possibility to edit name, dob and categories + see changes on submit
    const InputContent: InputProps[] = useMemo(
        () => [
            { type: 'text', value: `${firstName} ${lastName}`, icon: 'person' },
            { type: 'text', value: moment(dob).format('L'), icon: 'calendar_month' },
            { type: 'email', value: email, icon: 'mail' },
            { type: 'text', value: categories, icon: 'favorite_border' },
        ],
        [dob, email, categories, firstName, lastName],
    );

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    // check: values cannot be empty
    // callback?

    // const editUserDetails = async () => {
    //     const formData = new FormData();
    //     formData.append('firstName', firstName);
    //     formData.append('lastName', lastName);
    //     formData.append('dob', dob);
    //     // favorites
    //     // profile photo

    //     const successStatus: boolean = await dispatch(userService.editUser(formData));

    //     if (successStatus) {
    //         dispatch(snackbarActions.setNotify({ message: 'Profilen er oppdatert', severity: 'success' }));
    //     } else {
    //         dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
    //     }
    // };

    const [imageModalIsActive, setImageModalIsActive] = useState(false);
    const ToggleImageModal = () => setImageModalIsActive((current) => !current);

    const inputs = InputContent.map((item: InputProps) => <Input key={item.icon} {...item} />);
    return (
        <>
            {imageModalIsActive && <ImageModal handleClick={ToggleImageModal} />}
            <ProfileHeader handleClick={ToggleImageModal} />
            <Form onSubmit={onSubmitHandler}>
                {inputs}
                <span>
                    <ProfileLink to="/profile/change-email">Endre e-post</ProfileLink>
                </span>
                <span>
                    <ProfileLink to="/change-password">Endre passord</ProfileLink>
                </span>
                <span>
                    {/* add functionality + check if login from email, Google or Vipps */}
                    <ProfileLink to="/profile/delete-account">Slett konto</ProfileLink>
                </span>
                <SubmitButton type="submit" variant="contained" sx={{ marginTop: 'auto', marginBottom: '-3.5vh' }}>
                    Oppdater profil
                </SubmitButton>
            </Form>
            <Outlet />
        </>
    );
};
