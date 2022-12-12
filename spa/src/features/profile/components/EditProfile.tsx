import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';

import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import { PillButton, PrimaryButton, SecondaryButton } from '../../../components/Common';
import { Form, StyledInput } from '../../../components/Form';
import { useInput, useStateDispatch, useStateSelector } from '../../../hooks';
import { ICategory } from '../../../interfaces';
import { userServices } from '../../../services';
import { userActions } from '../../../store';
import { FlexRowContainer, Main, Section } from '../../../components/Layout';
import { Header } from '../../../components/Navigation';

export const EditProfile = () => {
    const { user, loading } = useStateSelector((state) => state.user);
    const { categories } = useStateSelector((state) => state.map);

    const [dateOfBirth, setDateOfBirth] = useState(user.dob);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        setInitialValue: initialFirstName,
    } = useInput((value: string) => value.length >= 1);

    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        setInitialValue: initialLastName,
    } = useInput((value: string) => value.length >= 1);

    const dobChangeHandler = (date: Date | null) => {
        if (date !== null) {
            const dob = moment(date).format('YYYY-MM-DD');
            setDateOfBirth(new Date(dob).toISOString());
        }
    };

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!enteredFirstNameIsValid || !enteredLastNameIsValid) return;

        const formData = new FormData();

        if (enteredFirstName !== user.firstName) {
            formData.append('firstName', enteredFirstName);
        }

        if (enteredLastName !== user.lastName) {
            formData.append('lastName', enteredLastName);
        }

        if (dateOfBirth !== user.dob) {
            formData.append('dob', dateOfBirth);
        }

        if (user.favoriteCategories.length > 0) {
            user.favoriteCategories.forEach((category) => {
                formData.append('FavoriteCategoryIds', category.id);
            });
        }

        dispatch(
            userServices.updateProfile(user.id, formData, () => {
                navigate('/profile');
            }),
        );
    };

    const selectCategoryHandler = (selectedCategory: ICategory) => {
        if (user.favoriteCategories.find((category) => category.id === selectedCategory.id)) {
            dispatch(
                userActions.updateUser({
                    favoriteCategories: user.favoriteCategories.filter((category) => category.id !== selectedCategory.id),
                }),
            );
            return;
        }
        dispatch(userActions.updateUser({ favoriteCategories: [...user.favoriteCategories, selectedCategory] }));
    };

    useEffect(() => {
        initialFirstName(user.firstName);
        initialLastName(user.lastName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header>Rediger profilen din</Header>
            <Main>
                <Section>
                    <Form onSubmit={onSubmitHandler}>
                        <StyledInput
                            label="Fornavn"
                            type="text"
                            errorMessage="Vennligst oppgi fornavn"
                            value={enteredFirstName}
                            onChange={firstNameChangeHandler}
                            onBlur={firstNameBlurHandler}
                            inputHasError={firstNameInputHasError}
                        />
                        <StyledInput
                            label="Etternavn"
                            type="text"
                            errorMessage="Vennligst oppgi etternavn"
                            value={enteredLastName}
                            onChange={lastNameChangeHandler}
                            onBlur={lastNameBlurHandler}
                            inputHasError={lastNameInputHasError}
                            style={{ marginBottom: '1rem' }}
                        />
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDatePicker
                                disableFuture
                                label="Fødselsdato"
                                value={dateOfBirth}
                                onChange={(value: Date | null) => {
                                    dobChangeHandler(value);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <FlexRowContainer
                            style={{
                                zIndex: '2',
                                gap: '10px',
                                padding: '5px',
                                paddingLeft: '0.3rem',
                                overflowX: 'scroll',
                                marginTop: '1rem',
                            }}
                        >
                            {categories.map((category: ICategory) => (
                                <PillButton
                                    key={category.id}
                                    selected={user.favoriteCategories.some((c) => c.id === category.id)}
                                    onClick={() => selectCategoryHandler(category)}
                                    type="button"
                                >
                                    {category.emoji} {category.name}
                                </PillButton>
                            ))}
                        </FlexRowContainer>
                        <div style={{ marginTop: 'auto' }}>
                            <PrimaryButton disabled={loading} type="submit" loading={loading} sx={{ marginBottom: '1rem' }}>
                                Lagre
                            </PrimaryButton>
                            <SecondaryButton onClick={() => navigate(-1)}>Gå tilbake</SecondaryButton>
                        </div>
                    </Form>
                </Section>
            </Main>
        </>
    );
};
