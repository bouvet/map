import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateSelector } from '../../../hooks';
import { ILocation, IReview } from '../../../interfaces';

interface Props {
    selectedLocation: ILocation;
}

const ImageContainer = styled.div`
    width: 100%;
    overflow-x: scroll;
    display: flex;
    gap: 10px;
    padding: 30px 0px 10px 0px;
`;

type ImageProp = {
    backgroundImage: string | undefined;
};

const ImageWrapper = styled.div<ImageProp>`
    height: 40vw;
    padding-left: 40vw;
    display: inline-block;
    border-radius: 10px;
    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-repeat: none;
    background-position: center;
    background-size: cover;
    white-space: nowrap;
`;

export const ReviewImageList: FC<Props> = ({ selectedLocation }) => {
    const [imageList, setImageList] = useState<ReactElement[]>([]);

    const { currentReviews } = useStateSelector((state) => state.review);

    const updateCurrentImageCallback = useCallback(() => {
        if (currentReviews) {
            const temp = currentReviews
                .filter((item) => item.webpImage)
                // @ts-ignore
                .sort((itemA, itemB) => (itemA.webpImage?.uploaded > itemB.webpImage?.uploaded ? 1 : -1))
                .map((item: IReview) => <ImageWrapper key={item.id} backgroundImage={item.webpImage?.cdnUri} />);
            setImageList(temp);
            if (selectedLocation.properties.webpImage) {
                const mainImg = <ImageWrapper key={Math.random() * 1000} backgroundImage={selectedLocation.properties.webpImage.cdnUri} />;
                setImageList((imageList) => [mainImg, ...imageList]);
            }
        }
    }, [currentReviews, selectedLocation.properties.webpImage]);

    useEffect(() => {
        updateCurrentImageCallback();
    }, [updateCurrentImageCallback]);
    return <ImageContainer>{imageList && imageList}</ImageContainer>;
};
