import { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl, { Map as MapBoxMap } from 'mapbox-gl';
import { Pin } from '../MapComponents/Pin';

import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { mapService } from '../../services/map.services';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

const Map = () => {
  

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapBoxMap | null>(null);
  const [lng, setLng] = useState<number | string>(5.7063);
  const [lat, setLat] = useState<number | string>(58.9566);
  const [zoom, setZoom] = useState<number | string>(11);

  const {locations, filteredLocations, selected} = useStateSelector(state => state.map);
  const dispatch = useStateDispatch();

  useEffect(() => {
    dispatch(mapService.getLocations())
}, [dispatch]);


//console.log(locations);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [+lng, +lat],
      zoom: +zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
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

  /* useEffect(() => {
    if (!map.current) return;

    locations.forEach((feature) => {
      const container = document.createElement('div');
      const root = createRoot(container!);
      root.render(<Marker onClick={markerClicked} feature={feature} />);

      new mapboxgl.Marker(container)
        //@ts-ignore
        .setLngLat(feature.geometry.coordinates)
        .addTo(map.current!);
    });
  }, [locations]);
  */

  return (
    <div className='container'>
      <div className='sidebar'>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className='map-container' />
    </div>
  );
  }
  const Marker = ({ onClick, feature }: { onClick: any; feature: any }) => {
    const _onClick = () => {
      onClick(feature);
    };
    return <Pin onClick={_onClick} fill='#8484ff'></Pin>;
  };
  
  const markerClicked = (feature: any) => {
    // window.alert(feature.properties.title);
    console.log(feature);
  };

export default Map;
