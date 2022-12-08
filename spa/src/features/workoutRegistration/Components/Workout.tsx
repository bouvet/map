import { Button, Icon } from '@mui/material';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { LeftFlex, RightFlex, SplitWrapper } from '../../../components/Form/Input';

interface workoutProps {
    date: string;
    dateTitle: string;
    dateCategory: string;
}

export const SessionButton = styled(Button)`
    width: 100%;
    border-radius: 2.5px;
    border: solid #c4c4c4 1px;
    height: 40px;
    background-color: white;
    color: black;
    display: flex;
    justify-content: flex-start;
`;

const SessionBlockWrapper = styled.div`
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const SessionSplitWrapper = styled(SplitWrapper)`
    grid-template-columns: 4fr 1fr;
`;

const SessionInformation = styled.div`
    padding: 10px;
`;

const Title = styled.p`
    padding: 10px;
    overflow: hidden;
`;

export const WorkoutBlock: FC<workoutProps> = ({ date, dateTitle, dateCategory }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <SessionBlockWrapper>
            <SessionSplitWrapper onClick={() => setIsActive(!isActive)}>
                <LeftFlex>
                    <Title style={{ fontStyle: 'italic', color: 'grey' }}>{date}</Title>
                </LeftFlex>
                <RightFlex>
                    <Icon style={{ textAlign: 'right', display: 'flex' }} className="material-symbols-outlined">
                        {isActive ? 'expand_less' : 'expand_more'}
                    </Icon>
                </RightFlex>
            </SessionSplitWrapper>
            {isActive && (
                <SessionInformation>
                    <p>{dateTitle}</p>
                    {dateCategory}
                </SessionInformation>
            )}
        </SessionBlockWrapper>
    );
};
