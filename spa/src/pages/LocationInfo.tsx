import { FC } from 'react';
import { SwipeableEdgeDrawer } from '../features/locationInfo/LocationDrawer';
import { ReactMapGL } from '../features/map';

export const LocationInfo: FC = () => (
    <div className="App">
        <ReactMapGL />
        <SwipeableEdgeDrawer />
    </div>
);
