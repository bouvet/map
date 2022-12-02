import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import { Section } from '../../../components/Layout';
import { IUser } from '../../../interfaces';
import { FlexRowContainer, PillButton } from '../../../components/UI';

interface Props {
    user: IUser;
}

export const ProfileInfo: React.FC<Props> = ({ user }) => (
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
                    {user.favoriteCategories &&
                        user.favoriteCategories.map((category) => (
                            <PillButton key={category.id} style={{ fontSize: '0.9rem' }}>
                                {category.emoji} {category.name}
                            </PillButton>
                        ))}
                </FlexRowContainer>
            </LineItem>
            <Divider sx={{ marginBottom: '1rem', borderBottomWidth: 'medium' }} />
        </ul>
    </Section>
);

const LineItem = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    font-size: 0.9rem;
`;
