// Based on: https://www.highcharts.com/stock/demo/basic-line
// And: https://github.com/highcharts/highcharts-react

import React, { Component } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import aaplData from './aapl-c.json';

const options = {
  rangeSelector: {
    selected: 1,
  },

  title: {
    text: 'AAPL Stock Price',
  },

  series: [
    {
      name: 'AAPL',
      data: aaplData,
      tooltip: {
        valueDecimals: 2,
      },
    },
  ],
};

export default class Chart1 extends Component {
  render() {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={options}
      />
    );
  }
}
