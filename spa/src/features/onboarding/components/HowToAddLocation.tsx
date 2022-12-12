import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../../components/Common';
import { Section } from '../../../components/Layout';

const HowToAddLocation: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Section>
            <div>Hvordan legge til lokasjon</div>

            <PrimaryButton onClick={() => navigate('/onboarding/add-review')}>Neste</PrimaryButton>
        </Section>
    );
};

export default HowToAddLocation;
