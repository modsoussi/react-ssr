import React from 'react';
import join from 'lodash/join';

const Bye = () => (
  <div>{join(['Good Bye', 'World!'], ', ')}</div>
);

export default Bye;
