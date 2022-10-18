import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BackButton, GoogleIcon } from '../../components/Navigation/Buttons';
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
`;

interface FilterProps {
    setter: Function;
}

export const BackButtonAdminWrapper = styled(BackButton)`
    position: relative;
    top: 0;
    left: 0;
`;

export const BackButtonAdmin: FC = () => (
    <BackButtonAdminWrapper backgroundColor={MyTheme.colors.opaque}>
        <Link to="/">
            <GoogleIcon color={MyTheme.colors.lightBase} className="material-symbols-outlined">
                arrow_back
            </GoogleIcon>
        </Link>
    </BackButtonAdminWrapper>
);

export const FilterSelect: FC<FilterProps> = (props) => {
    const { setter } = props;
    return (
        <>
            <Select onChange={(e) => setter(e.target.value)}>
                <FilterButton value="Under behandling">Under behandling</FilterButton>
                <FilterButton value="Godkjent">Godkjent</FilterButton>
                <FilterButton value="Avvist">Avvist</FilterButton>
                <FilterButton value="Rapportert">Rapportert</FilterButton>
            </Select>
        </>
    );
};
