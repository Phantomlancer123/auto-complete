import React, { useState, useCallback } from 'react';

import ShowList from './ShowList';
import './style.css';

interface Product {
  name: string;
  category: string;
  detail: string[];
}
interface Props {
  data: Array<Product>;
}

const AutoCompleteComponent = ({ data }: Props): JSX.Element => {

  const useDebounce = (value: string, delay?: number): string => {
    const [debouncedVal, setDebouncedVal] = useState<string>(value);
  
    
    React.useEffect(() => {
      
      const timer = setTimeout(() => setDebouncedVal(value), delay || 500);
  
      return () => {

        clearTimeout(timer);

      };

    }, [value, delay]);
  
    return debouncedVal;
  }

  const [inputVal, setInputVal] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [DropDownVisible, setDropDownVisible] = useState<boolean>(false);
  const debouncedVal = useDebounce(inputVal, 1000);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if ((inputRef.current && event.target instanceof Node && !inputRef.current.contains(event.target))) {
      setDropDownVisible(false);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputVal(value);
  }, []);

  const onSelected = useCallback((value: Product) => {
    setDropDownVisible(false);
    setInputVal(value.name);
  }, []);

  const filterData = useCallback(async (value: string) => {
    // Use a mock API call that returns a Promise with a delay of 500ms
    const filteredOptions = await new Promise<Product[]>((resolve) =>
      setTimeout(() => {
        const regex = new RegExp(`^${value}`, 'i');
        const filteredOptions = data
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter((v: Product) => regex.test(v.name));

        setDropDownVisible(true);
        resolve(filteredOptions);
      }, 1000)
    );
    
    setFilteredProducts(filteredOptions);
  }, [data]);

  React.useEffect(() => {
    filterData(inputVal)
  }, [debouncedVal]);

  return (
    <div onClick={() => setDropDownVisible(false)} className='input-component'>
      <input
        type="text"
        name="searchInput"
        id="searchInput"
        ref={inputRef}
        value={inputVal}
        onChange={onChange}
        className='search-input'
        placeholder='Search products'
      />
      {inputVal.length > 0 && ( filteredProducts.length > 0 && DropDownVisible && (
        <ShowList 
          products={filteredProducts}
          onSelect={onSelected}
        />
      ))}
    </div>
  );
};

export default AutoCompleteComponent;
