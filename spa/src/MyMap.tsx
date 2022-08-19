import React, { useState, useEffect, useRef, useLayoutEffect, FC } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import 'ol/proj';
import { fromLonLat, transform} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Projection from 'ol/proj';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection} from 'ol/proj';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

const MyMap:FC = () => {
  const [map, setMap]: [map: any, setMap: any] = useState();
  const mapElement: any = useRef();
  const mapRef = useRef();
  mapRef.current = map;
  //var pos = fromLonLat([58.91645986493334, 5.732116770030319]); //EPSG:4326
  //var pos = transform([58.91645986493334, 5.732116770030319], 'EPSG:3857', 'EPSG:4326');
  const E4326 = [58.96244136386599, 5.733473680298888];
  console.log(E4326);
  const pos = transform([58.96244136386599, 5.733473680298888], 'EPSG:4326', 'EPSG:3857');
  console.log(pos);
  

  


  //var pos = [637988.0193740928, 8172162.384060871];

  
  const feature = new Feature({
    geometry: new Point(pos),
    name: 'My Marker',
  });

  useEffect(() => {
    proj4.defs(
      "EPSG:3857", 
      "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"
    );
    register(proj4);
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),

        new VectorLayer({
          source: new VectorSource({
            features: [feature]
          }),
          //projection: new Projection('EPSG:4326'),
          style: new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: 'https://openlayers.org/en/latest/examples/data/icon.png'
            })
          })
        }),

      ],
      view: new View({
        //projection: 'EPSG:4326',
        center: [638537.6284378038, 8173564.364519258],
        //center: [58.931006497394485, 5.7235173200663745],
        zoom: 14,
      }),
    });
    setMap(initialMap);
  }, []);

    /*
    const coordinates = [position.coords.longitude, position.coords.latitude];
      dispatch(setCenter({
        lon: coordinates[0],
        lat: coordinates[1],
        epsg: 'EPSG:4258',
      }));
      */

  //   var pos = fromLonLat([58.91645986493334, 5.732116770030319]); //EPSG:4326
  
  // const center = initialMap.getView().getCenter();
  // var pinned = transform(center, 'EPSG:3857', 'EPSG:4326');
  // const feature2: any = new Feature(new Point(center));

  // var feature = new Feature({
  //   geometry: new Point(pos),
  //   name: 'My Marker',
  // });

  // const pinLayer = new VectorLayer ({
  //   source: new VectorSource ({
  //     features: [feature]
  //   }),
  //   style: new Style ({
  //     image: new Icon({
  //       src: 'http://openlayers.org/en/v3.8.2/examples/data/icon.png'
  //     })
  //   })
  // });
  // map.addLayer (pinLayer);
  


  // var pos = fromLonLat([58.91645986493334, 5.732116770030319]); //EPSG:4326
  
  // const center = map.getView().getCenter();
  // var pinned = transform(center, 'EPSG:3857', 'EPSG:4326');
  // const feature2: any = new Feature(new Point(center));

  // var feature = new Feature({
  //   geometry: new Point(pos),
  //   name: 'My Marker',
  // });

  // const pinLayer = new VectorLayer ({
  //   source: new VectorSource ({
  //     features: [feature]
  //   }),
  //   style: new Style ({
  //     image: new Icon({
  //       src: 'http://openlayers.org/en/v3.8.2/examples/data/icon.png'
  //     })
  //   })
  // });
  // map.addLayer (pinLayer);


  /*
  var layer = new VectorLayer({
    source: new VectorSource({
      features: [feature2]
    }),
    style: new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      })
    })
  });
  map.addLayer(layer);
  */

  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      ref={mapElement}
      className='map-container'
    />
  );
}

export default MyMap;
