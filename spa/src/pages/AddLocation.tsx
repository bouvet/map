import { FilePondFile } from 'filepond';
import React, { useState } from 'react';

import { AddLocationHeader, AddLocationImage, AddLocationInfo, AddLocationMap, AddLocationProgressBar } from '../features/add-location';
import { locationServices } from '../features/add-location/services/location.services';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { addLocationActions } from '../store';

export const AddLocation: React.FC = () => {
    const [pageIndex, setPageIndex] = useState(0);

    const { title, description, lat, lng, selectedCategories } = useStateSelector((state) => state.addLocation);

    const dispatch = useStateDispatch();

    const chooseLocationHandler = (lat: number, lng: number) => {
        dispatch(addLocationActions.setLatLng({ lat, lng }));
        setPageIndex(1);
    };

    const onSubmitHandler = (image?: FilePondFile) => {
        dispatch(addLocationActions.setLoading(true));
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

        dispatch(locationServices.addLocation(formData));
    };

    return (
        <>
            <AddLocationHeader pageIndex={pageIndex} setPageIndex={setPageIndex} />
            <AddLocationProgressBar pageIndex={pageIndex} />

            <AddLocationMap chooseLocationHandler={chooseLocationHandler} pageIndex={pageIndex} />

            {pageIndex === 1 && <AddLocationInfo setPageIndex={setPageIndex} />}
            {pageIndex === 2 && <AddLocationImage onSubmitHandler={onSubmitHandler} />}
        </>
    );
};
