import React, { useState, useEffect } from 'react';

const Head = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You've clicked ${count} times`;
  });

  return (
    <div>
      <p>
        You've clicked {count} times
      </p>
      <button className="border rounded py-2 px-4 mt-2 ml-2 hover:bg-gray-100 hover:border-transparent" type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default Head;
