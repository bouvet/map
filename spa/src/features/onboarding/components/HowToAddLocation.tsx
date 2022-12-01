import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../../../components/Layout';
import { SubmitButton } from '../../../components/UI';

export const HowToAddLocation: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Section style={{ flex: '1 1 auto', justifyContent: 'space-between' }}>
            <div>Hvordan legge til lokasjon</div>

            <SubmitButton onClick={() => navigate('/onboarding/add-review')}>Neste</SubmitButton>
        </Section>
    );
};
