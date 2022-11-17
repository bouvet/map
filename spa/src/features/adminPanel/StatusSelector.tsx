import { FC } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';

interface StatusSelectorProps {
    onChangeHandler: (
        newValue: SingleValue<{
            value: string;
            label: string;
        }>,
        actionMeta: ActionMeta<{
            value: string;
            label: string;
        }>,
    ) => void;
}

export const StatusSelector: FC<StatusSelectorProps> = ({ onChangeHandler }) => {
    const options = [
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' },
        { value: 'Reported', label: 'Reported' },
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
