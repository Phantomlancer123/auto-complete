import AutoCompleteComponent from './AutoComplete/AutoComplete';
import products from './__morks__/data.json';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <div className='search-box'>
        <label>Product Search: </label>
        <AutoCompleteComponent data={products} />
      </div>
    </div>
  );
}

export default App;
