import { FC } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

const FilterButton = styled.option``;

const Select = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline;
    font-size: ${MyTheme.fontSize.icon};
    background-color: white;
    padding: 10px 15px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    border: none;
    top: 10px;
    position: absolute;
`;

interface FilterProps {
    setter: Function;
}

export const FilterSelect: FC<FilterProps> = (props) => {
    const { setter } = props;
    return (
        <>
            <Select onChange={(e) => setter(e.target.value)}>
                <FilterButton value="Under Review">Under behandling</FilterButton>
                <FilterButton value="Approved">Godkjent</FilterButton>
                <FilterButton value="Rejected">Avvist</FilterButton>
                <FilterButton value="Reported">Rapportert</FilterButton>
            </Select>
        </>
    );
};
