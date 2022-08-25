import { useCallback, useEffect, useRef, useState } from 'react';
import { Map as ReactMap } from 'react-map-gl';
import { CustomMarker } from './CustomMarker';

import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { mapService } from '../services/map.services';
import { Location } from '../../../utils/types.d';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export const ReactMapGL = () => {
    const [viewState, setViewState] = useState({
        longitude: 5.7063,
        latitude: 58.9566,
        zoom: 11,
    });

    const [selectedMarker, setSelectedMarker] = useState('');

    const { locations, filteredLocations, selected } = useStateSelector((state) => state.map);

    const dispatch = useStateDispatch();

    useEffect(() => {
        dispatch(mapService.getLocations());
    }, [dispatch]);

    const mapRef = useRef(null);

    const onMapLoad = useCallback((evt: any) => {
        if (mapRef.current) {
            //@ts-ignore
            mapRef.current.on('move', () => {
                setViewState(evt.viewState);
            });
        }
    }, []);

    const onClickHandler = (location: Location) => {
        setSelectedMarker(location.properties.title);
        if (mapRef.current) {
            setViewState({ 
                latitude: location.geometry.coordinates[1], 
                longitude: location.geometry.coordinates[0], 
                zoom: 14 
            });
        }
    };

    return (
        <div className="container">
            <ReactMap
                {...viewState}
                ref={mapRef}
                onLoad={onMapLoad}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {selected &&
                    filteredLocations.map((locaction) => (
                        <CustomMarker
                            key={locaction.properties.title}
                            coordinates={locaction.geometry.coordinates}
                            onClickHandler={onClickHandler}
                            locaction={locaction}
                            selectedMarker={selectedMarker}
                        />
                    ))}
                {!selected &&
                    locations.map((locaction) => (
                        <CustomMarker
                            key={locaction.properties.title}
                            coordinates={locaction.geometry.coordinates}
                            onClickHandler={onClickHandler}
                            locaction={locaction}
                            selectedMarker={selectedMarker}
                        />
                    ))}
            </ReactMap>
        </div>
    );
};
