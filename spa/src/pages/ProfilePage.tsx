import { FC, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/nb';
import { ImageModal } from '../features/profile/ImageModal';
import { Input, InputProps } from '../features/profile/Input';
import { useStateSelector } from '../hooks/useRedux';
import { LinkButton, PageContainer, SectionContainer } from '../components/UI';
import { EditModal } from '../features/profile/EditModal';
import { DefaultProfilePicture, ProfilePicture } from '../features/profile/ProfileImage';

export const ProfilePage: FC = () => {
    const navigate = useNavigate();

    const { user } = useStateSelector((state) => state.auth);

    const firstName = user?.firstName;
    const lastName = user?.lastName;
    const dob = user?.dob;
    const email = user?.email;
    let categories = '';
    user?.favoriteCategories?.forEach((c, index) => {
        // @ts-ignore
        if (user?.favoriteCategories?.length > 1 && index > 0) {
            categories = `${categories}, ${c.name}`;
        } else {
            categories = c.name;
        }
    });

    const image = '';

    const defaultImage =
        'https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds';

    const name = `${firstName} ${lastName}`;

    moment.locale('nb');

    const InputContent: InputProps[] = useMemo(
        () => [
            { type: 'text', value: `${firstName} ${lastName}`, icon: 'person' },
            { type: 'text', value: moment(dob).format('L'), icon: 'calendar_month' },
            { type: 'email', value: email, icon: 'mail' },
            { type: 'text', value: categories, icon: 'favorite_border' },
        ],
        [dob, email, categories, firstName, lastName],
    );

    const inputs = InputContent.map((item: InputProps) => <Input key={item.icon} {...item} />);

    const [openImageModal, setOpenImageModal] = useState(false);
    const handleOpenImageModal = () => setOpenImageModal(true);
    const handleCloseImageModal = () => setOpenImageModal(false);

    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    return (
        <>
            <PageContainer>
                <ImageModal open={openImageModal} close={handleCloseImageModal} />

                {/* {image === '' ? (
                    <ProfilePicture backgroundImage={defaultImage} handleClick={handleOpenImageModal} />
                ) : (
                    <ProfilePicture backgroundImage={image} handleClick={handleOpenImageModal} />
                )} */}

                {image === '' ? (
                    <DefaultProfilePicture name={name} handleClick={handleOpenImageModal} />
                ) : (
                    <ProfilePicture backgroundImage={image} handleClick={handleOpenImageModal} />
                )}

                <SectionContainer>
                    {inputs}
                    <EditModal open={openEditModal} close={handleCloseEditModal} />
                    <LinkButton sx={{ width: 140, margin: 0, float: 'left' }} onClick={handleOpenEditModal}>
                        Rediger info
                    </LinkButton>
                    <LinkButton sx={{ width: 140, margin: 0, float: 'left' }} onClick={() => navigate('/change-password')}>
                        Endre passord
                    </LinkButton>
                    <LinkButton sx={{ width: 140, margin: 0, float: 'left' }} onClick={() => navigate('/profile/change-email')}>
                        Endre e-post
                    </LinkButton>
                    <LinkButton sx={{ width: 140, margin: 0, float: 'left' }} onClick={() => navigate('/profile/delete-account')}>
                        Slett konto
                    </LinkButton>
                    {/* add functionality + check if login from email, Google or Vipps */}
                    {/* <LinkButton onClick={}>Koble fra Google-konto</LinkButton> */}
                </SectionContainer>
            </PageContainer>
            <Outlet />
        </>
    );
};
