import { FC } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { locationStatus } from '../../../types';

interface StatusSelectorProps {
    onChangeHandler: (
        newValue: SingleValue<{
            value: locationStatus;
            label: string;
        }>,
        actionMeta: ActionMeta<{
            value: string;
            label: string;
        }>,
    ) => void;
}

interface IOptions {
    value: locationStatus;
    label: string;
}

export const StatusSelector: FC<StatusSelectorProps> = ({ onChangeHandler }) => {
    const options: IOptions[] = [
        { value: 'Under Review', label: 'Under Behandling' },
        { value: 'Approved', label: 'Godkjent' },
        { value: 'Rejected', label: 'Avslått' },
        { value: 'Reported', label: 'Rapportert' },
    ];

    return (
        <Select
            options={options}
            isSearchable={false}
            onChange={onChangeHandler}
            defaultValue={options[0]}
            styles={{ container: (styles) => ({ ...styles, width: '100%' }) }}
        />
    );
};
