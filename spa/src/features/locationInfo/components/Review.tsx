import { FC } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/nb';

/**
 * @param name @type string
 * @param age @type number
 * @param date @type string
 * @param rating @type number
 * @param review @type string
 */
interface ReviewProps {
    name: string;
    age?: number;
    date: string;
    rating: number;
    review: string;
}

const ReviewWrapper = styled.div`
    width: 100%;
    padding-bottom: 15px;
`;

const ReviewHeader = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
`;

const ReviewerInfo = styled.div`
    font-style: italic;
    font-weight: bolder;
`;

const Rating = styled.div`
    width: 100%;
    display: flex;
    justify-content: right;
`;

moment.locale('nb');

export const Review: FC<ReviewProps> = ({ name, age, date, rating, review }) => (
    <ReviewWrapper>
        <ReviewHeader>
            <ReviewerInfo>
                {name}, {age} år. {moment(date).format('L')}
            </ReviewerInfo>
            <Rating>{rating}/5</Rating>
        </ReviewHeader>
        <span>{review}</span>
    </ReviewWrapper>
);
