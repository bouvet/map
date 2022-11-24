import React, { useState } from 'react';

import { AddLocationHeader, AddLocationImage, AddLocationInfo, AddLocationMap, AddLocationProgressBar } from '../features/add-location';

export const AddLocation: React.FC = () => {
    const [pageIndex, setPageIndex] = useState(0);

    const formData = new FormData();

    const chooseLocationHandler = (longitude: number, latitude: number) => {
        console.log(longitude);
        console.log(latitude);
        formData.append('longitude', longitude.toString());
        formData.append('latitude', latitude.toString());
        console.log(formData);
        setPageIndex(1);
    };

    // title = ""
    // description = ""
    // image = file
    // category = "60c951f3-d233-442b-7883-08da9ad92895"
    // longitude = 5.1234
    // latitude = 58.1234

    return (
        <>
            <AddLocationHeader pageIndex={pageIndex} setPageIndex={setPageIndex} />
            <AddLocationProgressBar pageIndex={pageIndex} />

            <AddLocationMap chooseLocationHandler={chooseLocationHandler} pageIndex={pageIndex} />

            {pageIndex === 1 && <AddLocationInfo />}
            {pageIndex === 2 && <AddLocationImage />}
        </>
    );
};
