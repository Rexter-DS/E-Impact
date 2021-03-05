import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

function Chart({ chartData, chartLayout }) {

  return (
      <div style={{ height: '100%', width: '100%' }}>
        <Plot
            data={chartData}
            layout={chartLayout}
            useResizeHandler
        />
      </div>
  );
}

Chart.propTypes = {
  chartData: PropTypes.array.isRequired,
  chartLayout: PropTypes.object.isRequired,
};

export default Chart;
