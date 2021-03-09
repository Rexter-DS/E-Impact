import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

// A base chart that can be customized to visualize any data in any way.
// chartData is formatted as an array of objects with each object being a specific chart.
// chartLayout is formatted as an object that contains any custom look of the chart
// Refer to https://plotly.com/javascript/
function Chart({ chartData, chartLayout }) {

  return (
      <div>
        <Plot
            data={chartData}
            layout={chartLayout}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%'}}
        />
      </div>
  );
}

Chart.propTypes = {
  chartData: PropTypes.array.isRequired,
  chartLayout: PropTypes.object.isRequired,
};

export default Chart;
