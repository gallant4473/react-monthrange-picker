import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { default as App } from '../src/app';

require('moment-range');

const startYear = new Date(2014, 0, 1);
const endYear = new Date(2014, 11, 31);
const resStartYear = new Date(631132200000);
const resEndYear = new Date();

const selectedDateRange = moment.range(startYear, endYear);
const restrictedRange= moment.range(resStartYear, resEndYear);
const position = {
  top: -90,
};

render(
  <App
    direction="left"
    position={position}
    selectedDateRange={selectedDateRange}
    restrictionRange={restrictedRange}
    futureDisable
  />,
  document.getElementById('content')
);
