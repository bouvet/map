import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../../components/Common';
import { Section } from '../../../components/Layout';
import { useStateDispatch, useStateSelector } from '../../../hooks';
import { registerServices } from '../../../services';
import { userActions } from '../../../store';

const HowToAddReview: React.FC = () => {
    const {
        user: { dob, email, firstName, lastName },
        loading,
        password,
        favoriteCategoryIds,
    } = useStateSelector((state) => state.user);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const onFinishedHandler = () => {
        dispatch(
            registerServices.register({ dob, email, firstName, lastName, password, favoriteCategoryIds }, () => {
                dispatch(userActions.setPassword(''));
                navigate('/profile');
            }),
        );
    };

    return (
        <Section>
            <div>Hvordan legge til omtale</div>

            <PrimaryButton onClick={onFinishedHandler} loading={loading}>
                Fullfør
            </PrimaryButton>
        </Section>
    );
};

export default HowToAddReview;
