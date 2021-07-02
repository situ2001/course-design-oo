/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Pie } from '@ant-design/charts';
import { PieConfig } from '@ant-design/charts/es/pie';
import { Datum } from '@antv/g2/lib/interface';
import { modelEngToChn } from '../models/Car';

export default class MyChart extends React.Component<{
  data: { value: number; type: string }[];
}> {
  render() {
    const { data } = this.props;

    const config: PieConfig = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      label: {
        type: 'outer',
        content: '{name} {percentage}',
      },
      interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
      tooltip: {
        fields: ['value', 'type'],
        formatter: (datum: Datum) => {
          return {
            name: modelEngToChn.get(datum.type) as string,
            value: `${datum.value}元`,
          };
        },
      },
    };

    return (
      <div>
        <Pie {...config} />
      </div>
    );
  }
}
