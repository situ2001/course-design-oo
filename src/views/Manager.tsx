/* eslint-disable react/prefer-stateless-function */
import { Button, message, Statistic, Switch } from 'antd';
import React from 'react';
import {
  clearLog,
  getCostByModel,
  getLog,
  getTotalCost,
} from '../controllers/ParkLog';
import Car from '../models/Car';
import Chart from './Chart';
import './styles/Manager.global.css';
import MyTable from './Table';

type Props = {
  refresh: () => void;
  foo: number;
};

type State = {
  isSwitchOn: boolean;
  costDataByModel: { value: number; type: string }[];
  parkLog: Car[];
};

export default class Manager extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSwitchOn: false,
      costDataByModel: getCostByModel(),
      parkLog: getLog(true),
    };
  }

  componentDidUpdate(prev: Props) {
    const { foo } = this.props;
    if (prev.foo !== foo) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        costDataByModel: getCostByModel(),
        parkLog: getLog(true),
      });
    }
  }

  render() {
    const { refresh } = this.props;

    const { isSwitchOn, costDataByModel, parkLog } = this.state;

    return (
      <div style={{ padding: '8px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Switch
            style={{ marginRight: '16px' }}
            unCheckedChildren="表格"
            checkedChildren="图表"
            onChange={(checked) => this.setState({ isSwitchOn: checked })}
          />
          <Button
            style={{ marginRight: '16px' }}
            onClick={() => {
              message.success('退出登录成功');
              localStorage.setItem('loggedIn', 'false');
              refresh();
            }}
          >
            退出登录
          </Button>
          <Button
            style={{ marginRight: '16px' }}
            onClick={() => {
              message.success('清除记录成功');
              clearLog();
              this.setState({ parkLog: getLog(true) });
              refresh();
            }}
          >
            清除日志
          </Button>
          <Statistic
            className="income"
            title="收入"
            value={`${getTotalCost()}元`}
          />
        </div>
        {!isSwitchOn ? (
          <MyTable data={parkLog} />
        ) : (
          <Chart data={costDataByModel} />
        )}
      </div>
    );
  }
}
