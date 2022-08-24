import { useState, useRef, useEffect } from 'react';
import mapboxgl, { Map as MapBoxMap } from 'mapbox-gl';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { mapService } from '../services/map.services';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

export const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<MapBoxMap | null>(null);
    const [lng, setLng] = useState<number | string>(5.7063);
    const [lat, setLat] = useState<number | string>(58.9566);
    const [zoom, setZoom] = useState<number | string>(11);

    const { locations, selected, filteredLocations } = useStateSelector((state) => state.map);
    const dispatch = useStateDispatch();

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [+lng, +lat],
            zoom: +zoom,
        });

        // map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        dispatch(mapService.getLocations());
    });

    useEffect(() => {
        if (!map.current) return;

        if (map.current) {
            map.current.on('move', () => {
                setLng(map.current!.getCenter().lng.toFixed(4));
                setLat(map.current!.getCenter().lat.toFixed(4));
                setZoom(map.current!.getZoom().toFixed(2));
            });
        }
    });

    useEffect(() => {
        if (!map.current) return;

        map.current.on('load', () => {
            if (map.current) {
                if (locations.length > 0) {
                    map.current.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image: any) => {
                        if (error) return;
                        if (map.current) {
                            map.current.addImage('custom-marker', image);
                        }
                    });
                    map.current.addSource('all-locations', {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: locations,
                        },
                    });
                    map.current.addLayer({
                        id: 'all-locations',
                        source: 'all-locations',
                        type: 'symbol',
                        layout: {
                            'icon-image': 'custom-marker',
                        },
                    });
                }
            }
        });
    }, [locations]);

    useEffect(() => {
        if (map.current &&  map.current.loaded()) {
            if (map.current.getLayer('all-locations')) map.current.removeLayer('all-locations');
            if (map.current.getLayer('filtered-locations')) map.current.removeLayer('filtered-locations');
            if (map.current.getSource('filtered-locations')) map.current.removeSource('filtered-locations');

            map.current.addSource('filtered-locations', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: filteredLocations,
                },
            });

            const filteredSource = map.current.getSource('filtered-locations');

            if (filteredSource) {
                map.current.addLayer({
                    id: 'filtered-locations',
                    source: 'filtered-locations',
                    type: 'symbol',
                    layout: {
                        'icon-image': 'custom-marker',
                    },
                });
            }
        }
    }, [filteredLocations]);

    return (
        <div className="container">
            <div ref={mapContainer} className="map-container" />
        </div>
    );
};
