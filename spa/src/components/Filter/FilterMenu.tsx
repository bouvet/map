import React from 'react';
import styled from 'styled-components';

type FilterProps = {
    children: React.ReactNode;
};

/** Wrapper for menu for positioning the component */
const FilterMenuWrapper = styled.div`
    position: absolute;
    width: 100%;
`;

/** Content container for the filter menu
 * Mostly for applying flex and setting the correct
 * spacing between button components
 */
const FilterMenuContent = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    overflow-x: scroll;
    scrollbar-width: none;
    position: relative;
    z-index: 2;
`;

/** Takes in an array of FilterButton components as children
 * type of children is React.ReactNode.
 */
export const FilterMenu: React.FunctionComponent<FilterProps> = ({ children }) => (
    <FilterMenuWrapper>
        <FilterMenuContent>{children}</FilterMenuContent>
    </FilterMenuWrapper>
);
