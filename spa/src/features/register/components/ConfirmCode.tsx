import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField } from '@mui/material';
import { Section } from '../../../components/Layout';
import { useStateDispatch, useStateSelector } from '../../../hooks';
import { registerServices } from '../services/register.services';
import { LinkButton, Text, PageSubtitle } from '../../../components/Common';

export const ConfirmCode: React.FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const { user, emailVerified } = useStateSelector((state) => state.user);

    const [confirmationCode, setConfirmationCode] = useState<string[]>(new Array(6).fill(''));

    const onSubmitHandler = (confirmationCode: string) => {
        dispatch(
            registerServices.confirmCode(user.email, confirmationCode, () => {
                navigate('/register/personal-info');
            }),
        );
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const tempArray = [...confirmationCode];
        tempArray[index] = e.target.value;
        setConfirmationCode(tempArray);
        const nextInput = document.querySelector(`input[name=input-field-${index + 1}]`) as HTMLElement | null;
        if (nextInput !== null) {
            nextInput.focus();
        }
    };

    useEffect(() => {
        if (!confirmationCode.includes('')) {
            onSubmitHandler(confirmationCode.join(''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmationCode]);

    const resendCode = () => {
        dispatch(registerServices.resendCode());
    };

    return (
        <Section>
            <div>
                <PageSubtitle>Skriv inn koden for å bekrefte din e-postadresse</PageSubtitle>
                <Text style={{ fontWeight: 600 }}>{user.email}</Text>
            </div>
            <form style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', marginBottom: '2rem' }}>
                {confirmationCode.map((_data, index) => (
                    <TextField
                        type="text"
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        name={`input-field-${index}`}
                        onChange={(e) => handleInputChange(e, index)}
                        inputProps={{ inputMode: 'numeric', pattern: '^[0-9]*$', maxLength: 1 }}
                        required
                        onFocus={(e) => e.target.select}
                        autoFocus={index === 0}
                    />
                ))}
            </form>
            {!emailVerified && (
                <div>
                    <LinkButton sx={{ width: '100%' }} onClick={resendCode}>
                        Send ny kode
                    </LinkButton>
                    <LinkButton sx={{ marginTop: '1rem', width: '100%' }} onClick={() => navigate('/register')}>
                        Endre e-post
                    </LinkButton>
                </div>
            )}
            {emailVerified && (
                <div>
                    <p style={{ padding: '2rem 0' }}>E-posten din er bekreftet, du kan fortsette registreringen</p>
                    <LinkButton
                        variant="contained"
                        sx={{ width: '100%', color: 'white' }}
                        onClick={() => navigate('/register/personal-info')}
                    >
                        Fortsett
                    </LinkButton>
                </div>
            )}
        </Section>
    );
};
