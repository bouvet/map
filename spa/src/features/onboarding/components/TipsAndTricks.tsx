import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkButton, PrimaryButton } from '../../../components/Common';
import { Section } from '../../../components/Layout';
import { useStateDispatch, useStateSelector } from '../../../hooks';
import { userActions } from '../../../store';
import { registerServices } from '../../register/services/register.services';

export const TipsAndTricks: React.FC = () => {
    const {
        user: { dob, email, firstName, lastName },
        password,
        favoriteCategoryIds,
    } = useStateSelector((state) => state.user);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const onSkipHandler = () => {
        dispatch(userActions.setLoading(true));
        dispatch(
            registerServices.register({ dob, email, firstName, lastName, password, favoriteCategoryIds }, () => {
                dispatch(userActions.resetState());
                navigate('/');
            }),
        );
    };

    return (
        <Section>
            <div>Tips og triks</div>
            <div>Her kommer det tips og triks for applikasjonen</div>
            <div>
                <PrimaryButton onClick={() => navigate('/onboarding/add-location')}>Neste</PrimaryButton>
                <LinkButton sx={{ marginTop: '0.5rem' }} onClick={onSkipHandler}>
                    Hopp over
                </LinkButton>
            </div>
        </Section>
    );
};
