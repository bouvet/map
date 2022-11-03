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
    const image = user?.webpImage?.cdnUri;
    console.log('bilde', image);
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
                {!image ? (
                    <DefaultProfilePicture name={name} handleClick={handleOpenImageModal} />
                ) : (
                    <ProfilePicture imageUrl={image} handleClick={handleOpenImageModal} />
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
                    {/* // TODO: check if login from email, Google or Vipps  */}
                    <LinkButton sx={{ width: 140, margin: 0, float: 'left' }} onClick={() => navigate('/profile/delete-account')}>
                        Slett konto
                    </LinkButton>
                    {/* <LinkButton onClick={}>Koble fra Google-konto</LinkButton> */}
                    {/* <LinkButton onClick={}>Koble fra Vipps-konto</LinkButton> */}
                </SectionContainer>
            </PageContainer>
            <Outlet />
        </>
    );
};
