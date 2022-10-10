import { FC, ReactElement, useEffect, useState } from 'react';
import { LeftFlex, RightFlex, SplitWrapper } from '../components/Form/Input';
import { BackButtonAdmin, FilterSelect } from '../features/adminPanel/FilterSelect';
import { LocationBlock, LocationWrapper } from '../features/adminPanel/LocationBlock';
import { mapService } from '../features/map';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { Location } from '../utils/types.d';

type ApprovalFilterCategories = 'Under Review' | 'Approved' | 'Rejected' | 'Reported';

export const AdminPanel: FC = () => {
    // TODO: Get all locations from api, then filter based on properties.status

    // TODO: Create method for approving / rejecting locations

    // TODO: Display locations needing approval with button to call method

    // TODO: Create a sufficient preview for admin to judge location

    const { locations } = useStateSelector((state) => state.map);
    const [mappedLocations, setMappedLocation] = useState<ReactElement[]>([]);

    const [selectedFilter, setSelectedFilter] = useState<ApprovalFilterCategories>('Under Review');

    const dispatch = useStateDispatch();

    useEffect(() => {
        dispatch(mapService.getLocations());
    }, [dispatch]);

    useEffect(() => {
        const temp = locations
            .filter((item: Location) => item.properties.status === selectedFilter)
            .map((item: Location) => <LocationBlock key={item.id} item={item} />);
        setMappedLocation(temp);
    }, [locations, selectedFilter]);

    return (
        <>
            <LocationWrapper>
                <SplitWrapper>
                    <LeftFlex>
                        <BackButtonAdmin />
                    </LeftFlex>
                    <RightFlex>
                        <FilterSelect setter={setSelectedFilter} />
                    </RightFlex>
                </SplitWrapper>

                {mappedLocations}
            </LocationWrapper>
        </>
    );
};

// .filter((item: Location) => item.properties.description.length > 0)
