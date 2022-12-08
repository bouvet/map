import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../../../components/Layout';
import { LinkButton, SubmitButton } from '../../../components/UI';
import { useStateDispatch, useStateSelector } from '../../../hooks';
import { userActions } from '../../../store';
import { registerServices } from '../../register/services/register.services';

export const TipsAndTricks: React.FC = () => {
    const { user } = useStateSelector((state) => state);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const onSkipHandler = () => {
        dispatch(userActions.setLoading(true));
        dispatch(
            registerServices.register(user, () => {
                dispatch(userActions.resetState());
                navigate('/');
            }),
        );
    };

    return (
        <Section>
            <div>Tips og triks</div>
            <div>
                <SubmitButton onClick={() => navigate('/onboarding/add-location')}>Neste</SubmitButton>
                <LinkButton onClick={onSkipHandler}>Hopp over</LinkButton>
            </div>
        </Section>
    );
};
