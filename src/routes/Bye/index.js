import React from 'react';
import _ from 'lodash';

export const Bye = () => (
  <div>{_.join(['Good Bye', 'World!'], ', ')}</div>
)