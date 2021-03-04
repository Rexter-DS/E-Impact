import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

function PieChart({ dataValues, dataLabels }) {

  const chartData = [{
    values: dataValues,
    labels: dataLabels,
    type: 'pie',
    hole: 0.4,
    hoverinfo: 'label+percent',
  }];

  const chartLayout = {
    autosize: true,
    showlegend: true,
  };

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

PieChart.propTypes = {
  dataValues: PropTypes.array.isRequired,
  dataLabels: PropTypes.array.isRequired,
};

export default PieChart;
