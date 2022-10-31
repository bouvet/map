import { FC, FormEvent, useEffect } from 'react';
import { Box, Modal, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, nbNO } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';
import styled from 'styled-components';
import { CloseButton, SubmitButton } from '../../components/UI';
import { StyledInput } from '../../components/Form/StyledElements/StyledInput';
import { Form } from '../../components/Form/Form';
import { useInput } from '../../hooks/useInput';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { Label } from '../../components/Form/Input';
import { userActions } from '../../store/state/user.state';
import { snackbarActions } from '../../store/state/snackbar.state';
import { ICategory } from '../../utils/types.d';
import { RegisterButtonFavorites } from '../../components/Filter/FilterButtons';
import { FilterMenuContent } from '../../components/Filter/FilterMenu';

interface ModalProps {
    open: boolean;
    close: Function;
}

const BoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: '1301',
    width: '65%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 7,
    pt: 9,
};

const Backdrop = styled.div`
    height: 100vh;
    width: 100%;
    z-index: 0;
`;

export const EditModal: FC<ModalProps> = ({ open, close }) => {
    const dispatch = useStateDispatch();

    const { user } = useStateSelector((state) => state.auth);
    const firstName = user?.firstName;
    const lastName = user?.lastName;
    const dob = user?.dob;
    // let categories = '';
    // user?.favoriteCategories?.forEach((c, index) => {
    //     // @ts-ignore
    //     if (user?.favoriteCategories?.length > 1 && index > 0) {
    //         categories = `${categories}, ${c.name}`;
    //     } else {
    //         categories = c.name;
    //     }
    // });

    const { categories } = useStateSelector((state) => state.map);
    const mappedFilter = categories.map((item: ICategory) => (
        <RegisterButtonFavorites key={item.name} id={item.id} text={item.name} emoji={item.emoji} />
    ));

    const handleChangeDob = (timestamp: Date | null) => {
        if (timestamp !== null) {
            dispatch(userActions.setDob(moment(timestamp).format('L')));
        }
    };

    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        inputBlurHandler: firstNameBlurHandler,
        valueChangeHandler: firstNameChangeHandler,
        setInitialValue: setInitialFirstName,
    } = useInput((value) => value.trim().length >= 1);

    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        inputBlurHandler: lastNameBlurHandler,
        valueChangeHandler: lastNameChangeHandler,
        setInitialValue: setInitialLastName,
    } = useInput((value) => value.trim().length >= 1);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!dob) {
            dispatch(snackbarActions.setNotify({ message: 'Fødselsdato mangler', severity: 'error', autohideDuration: null }));
        } else {
            firstNameBlurHandler();
            lastNameBlurHandler();

            if (!enteredFirstNameIsValid || !enteredLastNameIsValid) return;

            console.log(firstName);
        }
    };

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        nbNO,
    );

    useEffect(() => {
        if (firstName) {
            setInitialFirstName(firstName);
        }
        if (lastName) {
            setInitialLastName(lastName);
        }
    }, [firstName, lastName, setInitialFirstName, setInitialLastName]);

    const handleCloseEditModal = () => {
        close();
    };

    return (
        <Modal open={open}>
            {/* <Backdrop onClick={handleCloseEditModal}> */}
            <Box sx={BoxStyle}>
                <CloseButton onClick={handleCloseEditModal} />
                <Form onSubmit={onSubmitHandler}>
                    <StyledInput
                        label="Fornavn"
                        errorMessage="Vennligst fyll inn fornavn"
                        value={enteredFirstName}
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                        inputHasError={firstNameInputHasError}
                    />
                    <StyledInput
                        label="Etternavn"
                        errorMessage="Vennligst fyll inn etternavn"
                        value={enteredLastName}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                        inputHasError={lastNameInputHasError}
                    />
                    <Label>Fødselsdato</Label>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDatePicker
                                label="åååå.mm.dd"
                                value={dob || null}
                                onChange={(newValue) => handleChangeDob(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                                maxDate={new Date()}
                            />
                        </LocalizationProvider>
                    </ThemeProvider>
                    <Label>Favoritter</Label>
                    {/* show favorites as clicked */}
                    <FilterMenuContent>{mappedFilter}</FilterMenuContent>
                    <SubmitButton type="submit" variant="contained">
                        Lagre endringer
                    </SubmitButton>
                </Form>
            </Box>
            {/* </Backdrop> */}
        </Modal>
    );
};
