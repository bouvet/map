import { FC, FormEvent, useEffect } from 'react';
import { Box, ClickAwayListener, Modal, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, nbNO } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';
import { CloseButton, SubmitButton } from '../../components/UI';
import { StyledInput } from '../../components/Form/StyledElements/StyledInput';
import { Form } from '../../components/Form/Form';
import { useInput } from '../../hooks/useInput';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { Label } from '../../components/Form/Input';
import { userActions } from '../../store/state/user.state';
import { IUserTypeEdit } from '../../utils/types.d';
import { RegisterButtonFavorites } from '../../components/Filter/FilterButtons';
import { FilterMenuContent } from '../../components/Filter/FilterMenu';
import { userServices } from '../userRegistration/services/user.services';
import { ICategory } from '../../interfaces';
import { uiActions } from '../../store';

interface ModalProps {
    open: boolean;
    close: Function;
}

const ModalStyle = {
    position: 'relative',
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

export const EditModal: FC<ModalProps> = ({ open, close }) => {
    const dispatch = useStateDispatch();

    const { user } = useStateSelector((state) => state.auth);
    const firstName = user?.firstName;
    const lastName = user?.lastName;
    const dob = user?.dob;

    const { favoriteCategoryIds } = useStateSelector((state) => state.user);

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
            dispatch(uiActions.setShowSnackbar({ message: 'Fødselsdato mangler', severity: 'error' }));
        } else {
            firstNameBlurHandler();
            lastNameBlurHandler();

            if (!enteredFirstNameIsValid || !enteredLastNameIsValid) return;

            const payload: IUserTypeEdit = {
                id: user.id,
                firstName: enteredFirstName,
                lastName: enteredLastName,
                dob,
                favoriteCategoryIds,
            };

            dispatch(userServices.editInfo(payload));
            close();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCloseEditModal = () => {
        close();
    };

    return (
        <Modal open={open}>
            <>
                <ClickAwayListener onClickAway={handleCloseEditModal}>
                    <Box sx={ModalStyle}>
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
                            {/* show current favorites as clicked */}
                            <FilterMenuContent>{mappedFilter}</FilterMenuContent>
                            <SubmitButton type="submit" variant="contained" disabled={firstNameInputHasError || lastNameInputHasError}>
                                Lagre endringer
                            </SubmitButton>
                        </Form>
                    </Box>
                </ClickAwayListener>
            </>
        </Modal>
    );
};
