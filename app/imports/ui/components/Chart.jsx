import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

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
