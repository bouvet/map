import { FC, useState } from 'react';
import { Button } from '../features/profile/Buttons';
import { Form } from '../features/profile/Form';
import { Input, InputProps } from '../features/profile/Input';
import { ProfileHeader } from '../features/profile/ProfileHeader';

export const ProfilePage: FC = () => {
    const [username, setUsername] = useState('Ola Nordman');
    const [birthday, setBirthday] = useState('01.01.1990');
    const [phoneNumber, setPhoneNumber] = useState('+4790000000');
    const [userEmail, setUserEmail] = useState('email@email.com');

    const InputContent: InputProps[] = [
        { key: 'username', value: username, setter: setUsername, icon: 'person' },
        { key: 'birthday', value: birthday, setter: setBirthday, icon: 'person' },
        { key: 'phonenumber', value: phoneNumber, setter: setPhoneNumber, icon: 'person' },
        { key: 'email', value: userEmail, setter: setUserEmail, icon: 'person' },
    ];

    const inputs = InputContent.map((item: InputProps) => <Input key={item.key} {...item} />);
    return (
        <>
            <ProfileHeader />
            <Form>
                {inputs}
                <Button type="submit">Oppdater</Button>
            </Form>
        </>
    );
};
