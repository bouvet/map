import React, { FC } from 'react';
import styled from 'styled-components';

type FilterMenuContentProps = {
    children: React.ReactNode;
};

const FilterMenuWrapper = styled.div`
    position: absolute;
    width: 100%;
`;

const FilterMenuContent = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    overflow-x: scroll;
    scrollbar-width: none;
    position: relative;
    z-index: 2;
`;

export const FilterMenu: FC<FilterMenuContentProps> = ({ children }) => (
    <FilterMenuWrapper>
        <FilterMenuContent>{children}</FilterMenuContent>
    </FilterMenuWrapper>
);
