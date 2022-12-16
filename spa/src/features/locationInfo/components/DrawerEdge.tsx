import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled as materialStyled } from '@mui/material/styles';
import { FC } from 'react';
import styled from 'styled-components';
import { StarRating } from '../../../components/StarRating/StarRating';
import { MyTheme } from '../../../styles/global';

const DrawerEdgeWrapper = materialStyled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    visibility: 'visible',
    right: 0,
    left: 0,
}));

const Puller = materialStyled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    word-break: break-word;
    hyphens: auto;
    align-items: center;
`;

const EdgeTitle = styled.p`
    padding: 10%;
    padding-left: 7%;
    color: text.primary;
    font-weight: bold;
    text-align: left;
`;

const RatingBox = styled.div`
    padding: 10%;
    padding-right: 7%;
    color: text.primary;
    text-align: right;
`;

interface Props {
    locationTitle: string;
    handleReviewModal: Function;
    locationRating: number;
}

export const DrawerEdge: FC<Props> = ({ locationTitle, handleReviewModal, locationRating }) => {
    const drawerBleeding = 56;
    const handleRatingBox = () => handleReviewModal();

    return (
        <DrawerEdgeWrapper sx={{ position: 'absolute', top: -drawerBleeding }}>
            <Puller />
            <GridWrapper>
                <EdgeTitle>{locationTitle}</EdgeTitle>
                <RatingBox onClick={handleRatingBox}>
                    <StarRating rating={locationRating} color={MyTheme.colors.accent} sizePx={MyTheme.fontSize.largeIcon} />
                </RatingBox>
            </GridWrapper>
        </DrawerEdgeWrapper>
    );
};
