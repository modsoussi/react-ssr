import React from 'react';
import _ from 'lodash';

const Hello = () => (
  <div>{_.join(['Hello', 'World!'], ', ')}</div>
)

export default Hello;