import moment from 'moment';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateSelector } from '../../../hooks';
import { IReview } from '../../../interfaces';
import { Review } from './Review';

const ReviewContainer = styled.div`
    width: 100%;
`;

export const ReviewList: FC = () => {
    const [reviewList, setReviewList] = useState<ReactElement[]>([]);

    const { currentReviews } = useStateSelector((state) => state.review);

    moment.locale('nb');

    const updateCurrentReviewsCallback = useCallback(() => {
        if (currentReviews) {
            const temp = currentReviews
                .filter((item) => item.text)
                .sort((itemA, itemB) => (itemA.created > itemB.created ? -1 : 1))
                .map((item: IReview) => (
                    <Review
                        key={item.id}
                        date={moment(item.created).format('L')}
                        // @ts-ignore
                        name={item.creator?.firstName}
                        age={moment(item.creator?.dob).fromNow(true)}
                        rating={item.rating}
                        review={item.text}
                    />
                ));
            setReviewList(temp);
        }
    }, [currentReviews, setReviewList]);

    useEffect(() => {
        updateCurrentReviewsCallback();
    }, [updateCurrentReviewsCallback]);

    return <ReviewContainer>{reviewList && reviewList}</ReviewContainer>;
};
