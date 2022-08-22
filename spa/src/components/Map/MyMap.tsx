import { useState, useEffect, useRef, FC } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import 'ol/proj';
import { transform} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { MyTheme } from '../../styles/global';
import { features } from 'process';

import { useStateDispatch } from '../../hooks/useRedux';
import { mapService } from '../../services/map.services';


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


  const pin :string = `<svg width='33' height='53' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M33 16.5C33 25.6127 28 33 16.5 53.5C5 33 0 25.6127 0 16.5C0 7.3873 7.3873 0 16.5 0C25.6127 0 33 7.3873 33 16.5Z' fill='${MyTheme.colors.accent.replace("#", "%23")}' /></svg>`

  useEffect(() => {
    dispatch(mapService.getLocations());
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
              src: 'data:image/svg+xml;utf8,' + pin,
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
      style={{ height: '100vh', width: '100%', position: 'fixed'}}
      ref={mapElement}
      className='map-container'
    />
  );
};

export default MyMap;
