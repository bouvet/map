import React, { useState } from 'react';

import styled from 'styled-components';

import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import { ExpandMore, Done, Close, Edit, Delete } from '@mui/icons-material/';

import { ICategory } from '../../../interfaces';

import { MyTheme } from '../../../styles/global';
import { useStateDispatch } from '../../../hooks/useRedux';
import { categoryServices } from '../services';
import { AcceptButton, DeleteButton, PrimaryButton } from '../../../components/Common';

interface Props {
    category: ICategory;
    selectCategoryHandler: (category: ICategory) => void;
}

export const CategoryListItem: React.FC<Props> = ({ category, selectCategoryHandler }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [name, setName] = useState('');

    const dispatch = useStateDispatch();

    const onEditHandler = () => {
        setIsEditing(true);
        setEmoji(category.emoji);
        setName(category.name);
    };

    const onSubmitHandler = () => {
        dispatch(categoryServices.edit(category.id, name, emoji));
    };

    return (
        <li style={{ marginBottom: '0.5rem' }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                        {category.emoji} {category.name}
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '1rem' }}>
                    {!isEditing && (
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <DeleteButton
                                color="error"
                                sx={{ textTransform: 'none', marginBottom: '0.5rem', width: '40%' }}
                                onClick={() => selectCategoryHandler(category)}
                            >
                                <Delete />
                            </DeleteButton>
                            <PrimaryButton
                                color="warning"
                                sx={{ textTransform: 'none', marginBottom: '0.5rem', width: '40%' }}
                                onClick={onEditHandler}
                            >
                                <Edit />
                            </PrimaryButton>
                        </div>
                    )}

                    {isEditing && (
                        <>
                            <form style={{ display: 'flex', width: '100%', marginBottom: '1rem' }}>
                                <Input
                                    type="text"
                                    value={emoji}
                                    onChange={(e) => setEmoji(e.target.value)}
                                    style={{
                                        width: '15%',
                                        marginRight: '1rem',
                                    }}
                                />
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: '85%',
                                    }}
                                />
                            </form>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <DeleteButton
                                    color="error"
                                    sx={{ textTransform: 'none', marginBottom: '0.5rem', width: '40%' }}
                                    onClick={() => setIsEditing(false)}
                                >
                                    <Close />
                                </DeleteButton>
                                <AcceptButton
                                    color="success"
                                    sx={{ textTransform: 'none', marginBottom: '0.5rem', width: '40%' }}
                                    onClick={onSubmitHandler}
                                >
                                    <Done />
                                </AcceptButton>
                            </div>
                        </>
                    )}
                </AccordionDetails>
            </Accordion>
        </li>
    );
};

const Input = styled.input`
    padding: 0.3rem;
    border: none;
    border-bottom: 1px solid ${MyTheme.colors.accent};
    font-size: 1rem;
    &:focus {
        outline: none;
    }
`;
