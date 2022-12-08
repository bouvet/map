import React from 'react';
import { PrimaryButton } from '../../../components/Common';
import { Section } from '../../../components/Layout';
import { useStateSelector } from '../../../hooks';

export const HowToAddReview: React.FC = () => {
    const { user } = useStateSelector((state) => state);

    const onFinishedHandler = () => {
        console.log(user);
    };

    return (
        <Section>
            <div>Hvordan legge til omtale</div>

            <PrimaryButton onClick={onFinishedHandler}>Fullfør</PrimaryButton>
        </Section>
    );
};
