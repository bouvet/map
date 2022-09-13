import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

interface RatingColor {
    color: string;
}

const Rating = styled.div<RatingColor>`
    width: 100%;
    color: ${(props) => props.color};
`;

interface StarSize {
    sizePx: string;
}

const Span = styled.span<StarSize>`
    font-size: ${(props) => props.sizePx};
`;

interface StarRatingProps {
    rating: number;
    color?: string;
    sizePx: string;
}

export const StarRating: FC<StarRatingProps> = ({ rating = 0, color = '#000000', sizePx = '16px' }) => {
    const [stars, setStars] = useState([<span key="rating" />]);
    const ratingRest: number = rating % 1;

    if (rating) {
        if (rating > 5) {
            // eslint-disable-next-line no-param-reassign
            rating = 5;
        } else if (rating < 1) {
            // eslint-disable-next-line no-param-reassign
            rating = 1;
        }
    }
    useEffect(() => {
        const temp: any[] = [];
        for (let i = 0; i < Math.floor(rating); i += 1) {
            temp.push(
                <Span sizePx={sizePx} key={`${i.toString()}solid`} className="material-icons">
                    star
                </Span>,
            );
        }
        if (ratingRest > 0.5) {
            temp.push(
                <Span sizePx={sizePx} key="half" className="material-symbols-outlined">
                    star_half
                </Span>,
            );
        }
        const tempLength = temp.length;
        for (let i = 0; i < 5 - tempLength; i += 1) {
            temp.push(
                <Span sizePx={sizePx} key={`${i.toString()}outlined`} className="material-symbols-outlined">
                    star
                </Span>,
            );
        }
        setStars(temp);
    }, [rating, sizePx]);

    return <Rating color={color}>{stars}</Rating>;
};
