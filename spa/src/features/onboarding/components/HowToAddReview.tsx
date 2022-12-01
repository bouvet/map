import React from 'react';
import { Section } from '../../../components/Layout';
import { SubmitButton } from '../../../components/UI';
import { useStateSelector } from '../../../hooks';

export const HowToAddReview: React.FC = () => {
    const { user } = useStateSelector((state) => state);

    const onFinishedHandler = () => {
        console.log(user);
    };

    return (
        <Section style={{ flex: '1 1 auto', justifyContent: 'space-between' }}>
            <div>Hvordan legge til omtale</div>

            <SubmitButton onClick={onFinishedHandler}>Fullfør</SubmitButton>
        </Section>
    );
};
