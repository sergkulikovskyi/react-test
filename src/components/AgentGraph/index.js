import React from 'react';
import PropTypes from 'prop-types';

import Chart from '../Chart'

export default class AgentGraph extends React.Component {

  static propTypes = {
    agents: PropTypes.array,
    loading: PropTypes.bool
  };

  prepareAgentsLists = (agents) => {
    const categories = [];
    const negative = [];
    const neutral = [];
    const positive = [];

    agents.forEach(agent => {
      categories.push(agent.name);
      negative.push(agent.negative || 0);
      positive.push(agent.positive || 0);
      neutral.push(agent.neutral || 0);
    });
    return {categories, negative, neutral, positive};
  };

  getSeries = (dataLists) => {
    const series = [];
    const seriesOptions = {
      negative: {
        name: 'Negative conversations',
        color: 'rgba(235, 110, 125, 0.6)',
        pointWidth: 37,
        pointPadding: 0.8
      },
      neutral: {
        name: 'Neutral conversations',
        color: 'rgba(245, 166, 35, 0.6)',
        pointWidth: 37
      },
      positive: {
        name: 'Positive conversations',
        color: 'rgba(0, 200, 120, 0.6)',
        pointWidth: 37
      }
    };

    Object.keys(dataLists).forEach(item => {
      if (seriesOptions[item]) {
        series.push({...seriesOptions[item], data: dataLists[item]});
      }
    });
    return series;

  };

  render() {
    const {agents, loading} = this.props;

    if (loading) {
      return <h1>Loading...</h1>
    }

    if (!agents.length) {
      return <h1>No agents to display</h1>;
    }

    const dataLists = this.prepareAgentsLists(agents);
    const series = this.getSeries(dataLists);


    const chartOptions = {
      chart: {
        // height: 562,
        type: 'bar',
        style: {
          fontFamily: 'Open Sans',
          marginTop: '13px'
        }
      },
      title: {
        text: null
      },
      xAxis: {
        categories: dataLists.categories,
        lineColor: '#e9ecef',
        tickColor: '#e9ecef',
        tickWidth: 2,
        tickLength: 18,
        labels: {
          align: 'right',
          style: {
            color: '#9b9b9b',
            fontSize: '14px',
            fontFamily: 'Open Sans',
            fontWeight: '600',
            whiteSpace: 'nowrap'
          }
        },
      },
      yAxis: {
        min: 0,
        lineColor: '#e9ecef',
        gridLineColor: '#e9ecef',
        gridLineWidth: 2,
        title: {
          text: ''
        }
      },
      legend: {
        symbolHeight: 12,
        symbolWidth: 12,
        symbolRadius: 6,
        reversed: true,
        itemDistance: 30,
        itemStyle: {
          fontFamily: 'Open Sans',
          marginTop: '16px',
          fontWeight: 'normal',
          color: '#727272'
        }
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series
    };
    return (
      <div className="chart-container">
        <Chart container="chart" options={chartOptions} categories={dataLists.categories}/>
      </div>
    );

  }
}