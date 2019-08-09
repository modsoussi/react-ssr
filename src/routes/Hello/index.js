import React from 'react';
import _ from 'lodash';

export const Hello = () => (
  <div>{_.join(['Hello', 'World!'], ', ')}</div>
)