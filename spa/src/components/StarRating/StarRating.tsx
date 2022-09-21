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
    const [stars, setStars] = useState([<span key="a" />]);
    const ratingRest: number = rating % 1;
    let ratingInt: number = Math.floor(rating);
    const MAXSTARS = 5;

    if (rating > MAXSTARS) {
        ratingInt = MAXSTARS;
    } else if (rating < 0) {
        ratingInt = 0;
    }

    useEffect(() => {
        setStars([]);
        for (let i = 0; i < MAXSTARS; i += 1) {
            const classOption = {
                solid: 'material-icons',
                outline: 'material-symbols-outlined',
            };
            const star = (
                <Span sizePx={sizePx} key={i.toString()} className={i < ratingInt ? classOption.solid : classOption.outline}>
                    {ratingInt <= i && i < ratingInt + 1 && ratingRest >= 0.5 ? 'star_half' : 'star'}
                </Span>
            );
            setStars((s) => [...s, star]);
        }
    }, [rating, sizePx, ratingRest, ratingInt]);

    return <Rating color={color}>{stars}</Rating>;
};
