import React, { useState, useEffect, useRef, useLayoutEffect, FC } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import 'ol/proj';
import { fromLonLat, transform } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Projection from 'ol/proj';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { features } from 'process';

import { useStateDispatch } from '../../hooks/useRedux';
import { getLocations } from '../../services/location.services';

const MyMap: FC = () => {
  const [map, setMap]: [map: any, setMap: any] = useState();

  const dispatch = useStateDispatch();
  const mapElement: any = useRef();
  const mapRef = useRef();
  mapRef.current = map;
  const pos = transform(
    [5.732116770030319, 58.91645986493334],
    'EPSG:4326',
    'EPSG:3857'
  ); //use order lon, lat

  console.log('test', pos);

  const feature = new Feature({
    geometry: new Point(pos),
    name: 'My Marker',
  });

  useEffect(() => {
    dispatch(getLocations());
    /*
    proj4.defs(
      "EPSG:3857", 
      "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"
    );
    register(proj4);
    */
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [feature],
          }),
          style: new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            }),
          }),
        }),
      ],
      view: new View({
        center: transform([5.7318061, 58.9699509], 'EPSG:4326', 'EPSG:3857'),
        zoom: 14,
      }),
    });
    setMap(initialMap);
  }, []);

  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      ref={mapElement}
      className='map-container'
    />
  );
};

export default MyMap;
