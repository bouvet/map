import { useState, useRef, useEffect } from 'react';
import { useStateDispatch } from '../../hooks/useRedux';
import mapboxgl from 'mapbox-gl';
import { mapService } from '../../services/map.services';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Pin } from '../MapComponents/Pin';
import { MyTheme } from '../../styles/global';

const Map = () => {
    const dispatch = useStateDispatch();

    //const apiKey = process.env.REACT_APP_MAP_API_KEY;
    mapboxgl.accessToken = 'pk.eyJ1IjoicG9va2llcGV3IiwiYSI6ImNsNzR0YmRocDBmMmIzcXBlNXg4YzZxODQifQ.wc2TzvypwqeRe6F94xpgPw';
    const [map, setMap]: [map: any, setMap: any] = useState();
    const mapContainer: any = useRef();
    const mapRef = useRef();
    mapRef.current = map;

    useEffect(() => {
        dispatch(mapService.getLocations());

        const initialMap = new mapboxgl.Map({
            //accessToken: apiKey,
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [5.7318061, 58.9699509], //lon, lat
            zoom: 13,
        });
        setMap(initialMap);

        //test
        const popup = new mapboxgl.Popup({ offset: 25 }).setText('Test');

        new mapboxgl.Marker()
        .setLngLat([5.732116770030319, 58.91645986493334])
        .setPopup(popup)
        .addTo(initialMap);
    }, []);

    return (
        <div
          style={{ height: '100vh', width: '100%', position: 'fixed'}}
          ref={mapContainer}
          className='map-container'
        />
    );
};

export default Map;
