import { Progress, Statistic } from 'antd';
import React from 'react';
import { availableSpots } from '../controllers/Spots';
import formatTime from '../utils/formatTime';

export default class Timer extends React.Component<
  any,
  { now: Date; available: number; total: number }
> {
  private id: NodeJS.Timeout | undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      now: new Date(),
      available: availableSpots()[0],
      total: availableSpots()[1],
    };
  }

  componentDidMount() {
    this.id = setInterval(() => {
      this.setState({
        now: new Date(),
        available: availableSpots()[0],
        total: availableSpots()[1],
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (typeof this.id !== 'undefined') {
      clearInterval(this.id);
    }
  }

  render() {
    const { now, available, total } = this.state;

    return (
      <>
        <Statistic
          title="现在时间"
          value={formatTime(now)}
          style={{ marginRight: 32 }}
        />
        <Statistic
          title="剩余"
          value={`${available}/${total}`}
          style={{ marginRight: 32 }}
        />
        <Progress
          type="circle"
          percent={Number(((1 - available / total) * 100).toFixed(0))}
          status={(available === 0 || undefined) && 'exception'}
          width={80}
        />
      </>
    );
  }
}
