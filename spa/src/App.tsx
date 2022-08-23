import Map from './components/Map/Map';
import { FilterMenu } from './components/Filter/FilterMenu';
import { FilterButton } from './components/Filter/Buttons';
import { category } from './utils/types.d';
import { useStateSelector } from './hooks/useRedux';
import { Header } from './components/Navigation/Header';
import { FilterEvent } from './utils/filterLogic';

function App() {

  const { selected } = useStateSelector(state => state.map)

  const mappedFilter = category.map(item => (
    <FilterButton key={item} text={item} />
  ));
  
  FilterEvent();

  return (
    <div className="App">
      <Header content={selected}></Header>
      <FilterMenu>
        {mappedFilter}

      </FilterMenu>
      <Map />
    </div>
  );
}

export default App;
