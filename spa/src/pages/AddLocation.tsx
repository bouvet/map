import React, { useState } from 'react';

import { FilePondFile } from 'filepond';
import { useNavigate } from 'react-router-dom';

import { Main } from '../components/Layout';

import { AddLocationHeader, AddLocationImage, AddLocationInfo, AddLocationMap, AddLocationProgressBar } from '../features/add-location';
import { locationServices } from '../features/add-location/services/location.services';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { addLocationActions } from '../store';

const AddLocation: React.FC = () => {
    const [pageIndex, setPageIndex] = useState(0);

    const { title, description, lat, lng, selectedCategories } = useStateSelector((state) => state.addLocation);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const chooseLocationHandler = (lat: number, lng: number) => {
        dispatch(addLocationActions.setLatLng({ lat, lng }));
        setPageIndex(1);
    };

    const onSubmitHandler = (image?: FilePondFile) => {
        const formData = new FormData();

        formData.append('title', title.trim());
        formData.append('description', description.trim());
        formData.append('latitude', lat.toString());
        formData.append('longitude', lng.toString());

        selectedCategories.forEach((category) => {
            formData.append('category', category.id);
        });

        if (image) {
            formData.append('image', image.file);
        }

        dispatch(
            locationServices.addLocation(formData, () => {
                navigate('/');
            }),
        );
    };

    return (
        <>
            <AddLocationHeader pageIndex={pageIndex} setPageIndex={setPageIndex} />

            <Main style={{ height: 'calc(100vh - 3rem)' }}>
                <AddLocationProgressBar pageIndex={pageIndex} />
                <AddLocationMap chooseLocationHandler={chooseLocationHandler} pageIndex={pageIndex} />

                {pageIndex === 1 && <AddLocationInfo setPageIndex={setPageIndex} />}
                {pageIndex === 2 && <AddLocationImage onSubmitHandler={onSubmitHandler} />}
            </Main>
        </>
    );
};

export default AddLocation;
