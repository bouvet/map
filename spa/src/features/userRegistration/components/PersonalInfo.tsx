import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SubmitButton } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { InputAge, InputName } from '../../../components/Form/Input';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { ProgressBarForm, TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';

export const PersonalInfo: FC = () => {
    const navigate = useNavigate();

    const [inputName, setInputName] = useState('');
    const [inputAge, setInputAge] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/create-password');
        console.log('Name: ', inputName);
        console.log('Age: ', inputAge);
    };

    const pageIndex = 2;

    return (
        <FormWrapper>
            <BackButton
                backgroundColor={MyTheme.colors.opaque}
                textColor={MyTheme.colors.lightbase}
                onClick={() => navigate('/user-registration')}
            >
                <span className="material-symbols-outlined">close</span>
            </BackButton>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Personlig informasjon</TitleForm>
                    <ProgressBarForm pageIndex={pageIndex} />
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputName label="Navn*" value={inputName} setState={setInputName} handleChange={handleFormInputChange} />
                        {/* <InputAge label="Fødselsdato*" value={inputAge} setState={setInputAge} handleChange={handleFormInputChange} /> */}
                        <Box>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="demo-simple-select-label">År</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="År"
                                    defaultValue=""
                                    // @ts-ignore
                                    autoWidth="true"
                                    value={inputAge}
                                    // @ts-ignore
                                    onChange={(e) => handleFormInputChange(e, setInputAge)}
                                >
                                    <MenuItem value={1990}>1990</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <InputLabel id="demo-simple-select-label">Måned</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Måned"
                                    defaultValue=""
                                    autoWidth
                                    value={inputAge}
                                    // @ts-ignore
                                    onChange={(e) => handleFormInputChange(e, setInputAge)}
                                >
                                    <MenuItem value={1}>Januar</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="demo-simple-select-label">Dag</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Dag"
                                    defaultValue=""
                                    autoWidth
                                    value={inputAge}
                                    // @ts-ignore
                                    onChange={(e) => handleFormInputChange(e, setInputAge)}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <SubmitButton text="white">Gå videre</SubmitButton>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
