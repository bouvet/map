import { FC, FormEvent, useState } from 'react';
import { Button } from '../features/profile/Buttons';
import { Form } from '../features/profile/Form';
import { ImageModal } from '../features/profile/ImageModal';
import { Input, InputProps, PasswordLink } from '../features/profile/Input';
import { ProfileHeader } from '../features/profile/ProfileHeader';

export const ProfilePage: FC = () => {
    const [username, setUsername] = useState('Ola Nordman');
    const [birthday, setBirthday] = useState('01.01.1990');
    const [phoneNumber, setPhoneNumber] = useState('90000000');
    const [userEmail, setUserEmail] = useState('email@email.com');

    const InputContent: InputProps[] = [
        { type: 'text', value: username, setter: setUsername, icon: 'person' },
        { type: 'text', value: birthday, setter: setBirthday, icon: 'calendar_month' },
        { type: 'number', value: phoneNumber, setter: setPhoneNumber, icon: 'call' },
        { type: 'email', value: userEmail, setter: setUserEmail, icon: 'mail' },
        { type: 'password', value: '********', icon: 'key' },
    ];

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submitted');
    };

    const [imageModalIsActive, setImageModalIsActive] = useState(false);
    const ToggleImageModal = () => setImageModalIsActive((current) => !current);

    const inputs = InputContent.map((item: InputProps) => <Input key={item.icon} {...item} />);
    return (
        <>
            {imageModalIsActive && <ImageModal handleClick={ToggleImageModal} />}

            <ProfileHeader handleClick={ToggleImageModal} />
            <Form onSubmit={(event) => handleSubmit(event)}>
                {inputs}
                <PasswordLink to="/change-password">Endre passord</PasswordLink>
                <Button type="submit">Oppdater profil</Button>
            </Form>
        </>
    );
};
