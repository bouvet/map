import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type FilterMenuContentProps = {
    children: ReactNode;
};

const FilterMenuWrapper = styled.div`
    position: absolute;
    width: 100%;
`;

export const FilterMenuContent = styled.div`
    display: flex;
    gap: 10px;
    padding: 20px 30px 20px 30px;
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
