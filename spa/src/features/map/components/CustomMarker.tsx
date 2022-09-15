import { useEffect, useState, FC } from 'react';
import { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { MyTheme } from '../../../styles/global';
import { Location } from '../../../utils/types.d';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

type Props = {
    coordinates: number[];
    onClickHandler: (obj: Location) => void;
    locaction: Location;
    selectedMarker: string;
};

export const CustomMarker: FC<Props> = ({ coordinates, onClickHandler, selectedMarker, locaction }) => {
    const [color, setColor] = useState(MyTheme.colors.darkbase);

    useEffect(() => {
        if (selectedMarker === locaction.properties.title) {
            setColor(MyTheme.colors.accent);
        } else {
            setColor(MyTheme.colors.darkbase);
        }
    }, [selectedMarker, locaction.properties.title]);

    return (
        <Marker longitude={coordinates[0]} latitude={coordinates[1]} onClick={() => onClickHandler(locaction)} anchor="bottom">
            <svg width="30" height="35" viewBox="0 0 33 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M33 16.5C33 25.6127 28 33 16.5 53.5C5 33 0 25.6127 0 16.5C0 7.3873 7.3873 0 16.5 0C25.6127 0 33 7.3873 33 16.5Z"
                    fill={color}
                />
            </svg>
        </Marker>
    );
};
