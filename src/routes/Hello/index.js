import React from 'react';
import join from 'lodash/join';

const Hello = () => (
  <div>{join(['Hello', 'World!'], ', ')}</div>
)

export default Hello;