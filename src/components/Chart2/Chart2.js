// Based on: https://www.highcharts.com/stock/demo/basic-line

import React, { Component } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const names = ['MSFT', 'AAPL', 'GOOG'];

export default class Chart2 extends Component {
  state = { options: null };

  async componentDidMount() {
    // const {fetch} = this.context;

    const seriesOptions = await Promise.all(
      names.map(async company => {
        console.log(`fetch: ${company}`);
        const resp = await fetch(`/api/highchartSampleData/${company}`);
        const data = await resp.json();
        return {
          name: company,
          data,
        };
      }),
    );

    const options = {
      rangeSelector: {
        selected: 4,
      },

      yAxis: {
        labels: {
          formatter() {
            return `${(this.value > 0 ? ' + ' : '') + this.value}%`;
          },
        },
        plotLines: [
          {
            value: 0,
            width: 2,
            color: 'silver',
          },
        ],
      },

      plotOptions: {
        series: {
          compare: 'percent',
          showInNavigator: true,
        },
      },

      tooltip: {
        pointFormat:
          '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: true,
      },

      series: seriesOptions,
    };

    this.setState({ options });
  }

  render() {
    const { options } = this.state;
    if (!options) {
      return 'loading...';
    }

    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={options}
      />
    );
  }
}
