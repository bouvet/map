import { Icon } from '@mui/material';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { LeftFlex, RightFlex, SplitWrapper } from '../../../components/Form/Input';
import { Button, Text } from '../../../components/UI';

interface SessionBlockProps {
    locationTitle: string;
    registered: string;
    deleteBlock: Function;
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

const SessionPageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
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

const Title = styled(Text)`
    padding: 10px;
    overflow: hidden;
`;

export const SessionBlock: FC<SessionBlockProps> = ({ locationTitle, registered, deleteBlock }) => {
    const [isActive, setIsActive] = useState(false);

    const handleBlockClick = () => {
        setIsActive(!isActive);
    };

    const handleBlockDelete = () => {
        deleteBlock();
    };
    return (
        <SessionPageWrapper>
            <SessionBlockWrapper>
                <SessionSplitWrapper onClick={handleBlockClick}>
                    <LeftFlex>
                        <Title style={{ fontStyle: 'italic', color: 'grey' }}>{registered}</Title>
                    </LeftFlex>
                    <RightFlex>
                        <Icon style={{ textAlign: 'right', display: 'flex' }} className="material-symbols-outlined">
                            {isActive ? 'expand_less' : 'expand_more'}
                        </Icon>
                    </RightFlex>
                </SessionSplitWrapper>
                {isActive && (
                    <SessionInformation>
                        <Text>{locationTitle}</Text>
                    </SessionInformation>
                )}
            </SessionBlockWrapper>
            <Button style={{ width: '0%' }} onClick={handleBlockDelete}>
                <span style={{ color: 'red' }} className="material-symbols-outlined">
                    delete
                </span>
            </Button>
        </SessionPageWrapper>
    );
};
