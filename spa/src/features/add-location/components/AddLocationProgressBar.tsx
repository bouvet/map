import React from 'react';

import { Progress, ProgressBarContainer } from '../../../components/Navigation';

interface Props {
    pageIndex: number;
}

export const AddLocationProgressBar: React.FC<Props> = ({ pageIndex }) => (
    <ProgressBarContainer elements={3}>
        <Progress completed={pageIndex >= 0} icon="add_location_alt" />
        <Progress completed={pageIndex >= 1} icon="edit_note" />
        <Progress completed={pageIndex >= 2} icon="add_photo_alternate" />
    </ProgressBarContainer>
);
