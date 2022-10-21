import { FC, ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftFlex, RightFlex, SplitWrapper } from '../components/Form/Input';
import { BackButton } from '../components/Navigation/Buttons';
import { FilterSelect } from '../features/adminPanel/FilterSelect';
import { LocationBlock, LocationWrapper } from '../features/adminPanel/LocationBlock';
import { mapServices } from '../features/map';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { MyTheme } from '../styles/global';
import { ILocation } from '../utils/types.d';

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
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(mapServices.getLocations());
    }, [dispatch]);

    useEffect(() => {
        const temp = locations
            .filter((item: ILocation) => item.properties.status === selectedFilter)
            .map((item: ILocation) => <LocationBlock key={item.id} item={item} />);
        setMappedLocation(temp);
    }, [locations, selectedFilter]);

    return (
        <>
            <LocationWrapper>
                <SplitWrapper>
                    <LeftFlex>
                        <BackButton
                            backgroundColor={MyTheme.colors.opaque}
                            textColor={MyTheme.colors.lightBase}
                            onClick={() => navigate('/')}
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </BackButton>
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
