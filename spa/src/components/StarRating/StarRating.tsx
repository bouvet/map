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
    sizePx?: string;
}

export const StarRating: FC<StarRatingProps> = ({ rating = 0, color = '#000000', sizePx = '16px' }) => {
    const [stars, setStars] = useState([<span key="rating" />]);
    const ratingRest: number = rating % 1;
    let ratingInt: number = Math.floor(rating);
    const MAXSTARS = 5;

    if (rating > MAXSTARS) {
        ratingInt = MAXSTARS;
    } else if (rating < 0) {
        ratingInt = 0;
    }

    useEffect(() => {
        const temp: any[] = [];
        for (let i = 0; i < ratingInt; i += 1) {
            temp.push(
                <Span sizePx={sizePx} key={`${i.toString()}solid`} className="material-icons">
                    star
                </Span>,
            );
        }
        if (ratingRest >= 0.5) {
            temp.push(
                <Span sizePx={sizePx} key="half" className="material-symbols-outlined">
                    star_half
                </Span>,
            );
        }
        const tempLength = temp.length;
        for (let i = 0; i < MAXSTARS - tempLength; i += 1) {
            temp.push(
                <Span sizePx={sizePx} key={`${i.toString()}outlined`} className="material-symbols-outlined">
                    star
                </Span>,
            );
        }
        setStars(temp);
    }, [rating, sizePx, ratingRest, ratingInt]);

    return <Rating color={color}>{stars}</Rating>;
};
