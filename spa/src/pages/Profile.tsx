import { useNavigate } from 'react-router-dom';

import Moment from 'react-moment';
import styled from 'styled-components';

import { Divider } from '@mui/material';
import { DeleteButton, LinkButton, PillButton } from '../components/Common';
import { FlexRowContainer, Main, Section } from '../components/Layout';
import { Header } from '../components/Navigation';
import { ProfileImageSection } from '../features/profile/components/ProfileImageSection';
import { useStateSelector } from '../hooks';

export const Profile = () => {
    const { user } = useStateSelector((state) => state.user);

    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Main>
                <ProfileImageSection user={user} />
                <Section style={{ paddingTop: '6rem', flex: 0 }}>
                    <ul>
                        <LineItem>
                            <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>
                                person
                            </span>
                            {user.firstName} {user.lastName}
                        </LineItem>
                        <Divider sx={{ marginBottom: '1rem', borderBottomWidth: 'medium' }} />
                        <LineItem>
                            <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>
                                mail
                            </span>
                            {user.email}
                        </LineItem>
                        <Divider sx={{ marginBottom: '1rem', borderBottomWidth: 'medium' }} />
                        <LineItem>
                            <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>
                                calendar_month
                            </span>
                            <Moment>{user.dob}</Moment>
                        </LineItem>
                        <Divider sx={{ marginBottom: '1rem', borderBottomWidth: 'medium' }} />
                        <LineItem>
                            <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>
                                favorite_border
                            </span>
                            <FlexRowContainer style={{ zIndex: '2', gap: '10px', padding: '5px 5px', overflowX: 'scroll' }}>
                                {user.favoriteCategories.length > 0 &&
                                    user.favoriteCategories.map((category) => (
                                        <PillButton key={category.id} style={{ fontSize: '0.9rem' }}>
                                            {category.emoji} {category.name}
                                        </PillButton>
                                    ))}
                                {user.favoriteCategories.length < 1 && 'Ingen favoritter valgt'}
                            </FlexRowContainer>
                        </LineItem>
                        <Divider sx={{ marginBottom: '1rem', borderBottomWidth: 'medium' }} />
                    </ul>
                </Section>
                <Section style={{ flex: 0, paddingTop: 0, paddingBottom: 0 }}>
                    <LinkButton sx={{ marginBottom: '0.5rem' }} onClick={() => navigate('/profile/edit')}>
                        Endre profilen
                    </LinkButton>
                    <LinkButton sx={{ marginBottom: '0.5rem' }} onClick={() => navigate('/profile/edit/password')}>
                        Bytt passord
                    </LinkButton>
                    <LinkButton sx={{ marginBottom: '0.5rem' }} onClick={() => navigate('/profile/edit/email')}>
                        Bytt e-post
                    </LinkButton>
                    <DeleteButton sx={{ marginBottom: '1rem' }} asLink onClick={() => navigate('/profile/edit/delete')}>
                        Slett konto
                    </DeleteButton>
                </Section>
            </Main>
        </>
    );
};

const LineItem = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    font-size: 0.9rem;
`;
