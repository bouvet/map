import { FC } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/nb';
import { StarRating } from '../../../components/StarRating/StarRating';
import { MyTheme } from '../../../styles/global';

interface ReviewProps {
    name: string;
    age?: string;
    date: string;
    rating: number;
    review?: string;
}

const ReviewWrapper = styled.div`
    width: 100%;
    padding-bottom: 15px;
`;

const ReviewHeader = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
`;

const ReviewerWrapper = styled.div`
    font-style: italic;
    font-weight: bolder;
`;

const ReviewerInfo = styled.div`
    width: 100%;
`;

const Date = styled.div`
    width: 100%;
    display: flex;
    justify-content: right;
`;

moment.locale('nb');

export const Review: FC<ReviewProps> = ({ name, age, date, rating, review }) => (
    <ReviewWrapper>
        <ReviewHeader>
            <ReviewerWrapper>
                <ReviewerInfo>
                    {name}, {age}
                </ReviewerInfo>
                <StarRating rating={rating} color={MyTheme.colors.darkBase} sizePx="14px" />
            </ReviewerWrapper>
            <Date>{moment(date).format('L')}</Date>
        </ReviewHeader>
        <span>{review}</span>
    </ReviewWrapper>
);
