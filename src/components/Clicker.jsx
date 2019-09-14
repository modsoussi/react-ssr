import React, { useState, useEffect } from 'react';

const Head = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You've clicked ${count} times`;
  });

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <p>
        You've clicked {count} times
      </p>
      <button className="border rounded py-2 px-4 mt-2 ml-2 hover:bg-gray-100 hover:border-transparent" type="button" onClick={increment}>
        +
      </button>
      <button className="border rounded py-2 px-4 mt-2 ml-2 hover:bg-gray-100 hover:border-transparent" type="button" onClick={decrement}>
        -
      </button>
    </div>
  );
};

export default Head;
