import styled from 'styled-components';

export const FilterMenuContent = styled.div`
    display: flex;
    gap: 10px;
    padding: 20px 30px;
    overflow-x: scroll;
    scrollbar-width: none;
    z-index: 2;
`;

// interface Props {
//     categories: ICategory[];
// }

// export const FilterMenu: React.FC<Props> = ({ categories }) => (
//     <Header style={{ backgroundColor: 'transparent', position: 'absolute', height: '4rem' }}>
//         <FlexRowContainer style={{ zIndex: '2', gap: '10px', padding: '20px 30px', overflowX: 'scroll' }}>
//             {categories.map((category) => (
//                 <FilterButton key={category.id} id={category.id} text={category.name} emoji={category.emoji} />
//             ))}
//         </FlexRowContainer>
//     </Header>
// );
