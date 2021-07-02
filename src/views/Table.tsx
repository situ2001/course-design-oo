/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Table } from 'antd';
import Car, { modelEngToChn } from '../models/Car';
import formatTime from '../utils/formatTime';

const dateFormatter = (d: number) => {
  const date = new Date(d);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${formatTime(
    date
  )}`;
};

// table columns
const columns = [
  {
    title: '车牌号',
    dataIndex: 'number',
  },
  {
    title: '车型',
    render: (model: string) => modelEngToChn.get(model),
    dataIndex: 'model',
  },
  {
    title: '入场时间',
    dataIndex: 'enterTime',
    render: dateFormatter,
    sorter: {
      compare: (a: Car, b: Car) => {
        return a.enterTime - b.enterTime;
      },
      multiple: 1,
    },
  },
  {
    title: '离场时间',
    dataIndex: 'quitTime',
    render: dateFormatter,
    sorter: {
      compare: (a: Car, b: Car) => {
        return (a.quitTime ?? 1) - (b.quitTime ?? 0);
      },
      multiple: 2,
    },
  },
  {
    title: '消费金额',
    dataIndex: 'cost',
    render: (cost: number) => cost.toFixed(2),
    sorter: {
      compare: (a: Car, b: Car) => {
        return (a.cost ?? 1) - (b.cost ?? 0);
      },
      multiple: 3,
    },
  },
];

export default class MyTable extends React.Component<{ data: Car[] }> {
  render() {
    const { data } = this.props;

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ['topLeft'] }}
        rowKey="id"
      />
    );
  }
}
