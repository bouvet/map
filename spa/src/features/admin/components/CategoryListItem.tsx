import React, { useState } from 'react';

import styled from 'styled-components';

import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { ExpandMore, Done, Close, Edit, Delete } from '@mui/icons-material/';

import { ICategory } from '../../../interfaces';

import { MyTheme } from '../../../styles/global';
import { useStateDispatch } from '../../../hooks/useRedux';
import { categoryServices } from '../services';

interface Props {
    category: ICategory;
}

export const CategoryListItem: React.FC<Props> = ({ category }) => {
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
        dispatch(categoryServices.edit({ id: category.id, name, emoji }));
    };

    const onDeleteHandler = () => {
        dispatch(categoryServices.delete(category.id));
    };

    return (
        <li style={{ marginBottom: '0.5rem' }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                        {category.emoji} {category.name}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {!isEditing && (
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ textTransform: 'none', marginBottom: '0.5rem' }}
                                onClick={onDeleteHandler}
                            >
                                <Delete />
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                sx={{ textTransform: 'none', marginBottom: '0.5rem' }}
                                onClick={onEditHandler}
                            >
                                <Edit />
                            </Button>
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
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ textTransform: 'none', marginBottom: '0.5rem' }}
                                    onClick={() => setIsEditing(false)}
                                >
                                    <Close />
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ textTransform: 'none', marginBottom: '0.5rem' }}
                                    onClick={onSubmitHandler}
                                >
                                    <Done />
                                </Button>
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
