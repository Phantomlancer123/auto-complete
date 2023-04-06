import React, { useState, useCallback, useMemo } from 'react';

interface Product {
  name: string;
  category: string;
  detail: string[];
}

type Props = {
  products: Product[];
  onSelect: (item: Product) => void;
}

const rowHeight = 37;
const containerHeight = 375;
const bufferedItems = 2;

function ShowList({ products, onSelect }: Props) {

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleItemClick = useCallback((item: Product) => {

    onSelect(item);

  }, [onSelect]);

  const handleOnScroll = useCallback((e: React.UIEvent) => {

    setScrollPosition(e.currentTarget.scrollTop);

  }, []);

  const renderList = useMemo(() => {

    const startIndex = Math.max(
      Math.floor(scrollPosition / rowHeight) - bufferedItems,
      0
    );

    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) + bufferedItems,
      products.length - 1
    );

    return products.slice(startIndex, endIndex + 1).map((item, index) =>
      <li
        key={index} 
        style={{ position: 'absolute', height: `${rowHeight}px`, top: (startIndex + index) * rowHeight }}
        onClick={() => handleItemClick(item)}
        className='dropdown-box-item'
      >
        {item.name}
      </li>
    );
    
  }, [products, scrollPosition, handleItemClick]);

  return (
    <ul style={{ height: `${Math.min(containerHeight, rowHeight * products.length + 2)}px`}} onScroll={handleOnScroll} className='dropdown-box'>
      {renderList}
    </ul>
  );
}

export default ShowList;
