import React from 'react';
import join from 'lodash/join';

import './hello.css';

const Hello = () => (
  <div className="classic ml-4">{join(['Hello', 'World!'], ', ')}</div>
);

export default Hello;
