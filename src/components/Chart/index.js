import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';

export default class Chart extends React.Component {

  static propTypes = {
    container: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.object
  };

  componentDidMount() {
    this.chart = new Highcharts[this.props.type || "Chart"](
      this.props.container,
      this.props.options
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.chart.update(nextProps.options);
      this.chart.reflow();
    }
  }

  //Destroy chart before unmount.
  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
        <div id={this.props.container}/>
    );
  }
}