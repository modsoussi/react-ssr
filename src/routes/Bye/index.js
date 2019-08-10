import React from 'react';
import _ from 'lodash';

const Bye = () => (
  <div>{_.join(['Good Bye', 'World!'], ', ')}</div>
)

export default Bye;