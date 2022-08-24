import { Marker } from 'react-map-gl';
import { Location } from '../../../utils/types.d';

type Props = {
    coordinates: number[];
    onClickHandler: (obj: any) => void;
    color?: string;
    style?: React.CSSProperties;
    locaction: Location;
};

export const CustomMarker: React.FC<Props> = ({ coordinates, onClickHandler, color, style, locaction }) => {
    return (
        <Marker
            longitude={coordinates[0]}
            latitude={coordinates[1]}
            onClick={() => onClickHandler(locaction)}
            anchor={'bottom'}
            color={color}
            style={style}
        />
    );
};
