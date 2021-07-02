/* eslint-disable react/prefer-stateless-function */

// parking spot view
import React from 'react';
import { Button, Card, message, Popconfirm } from 'antd';
import Car, { modelEngToChn } from '../models/Car';
import calcTime from '../utils/calcTime';
import formatTime from '../utils/formatTime';

type Props = {
  car?: Car | null;
  number: number;
  leaveCarCallback: (index: number) => void;
  // parkCarCallback: (index: number, car: Car) => void;
  parkCarCallback: (index: number) => void;
};

export default class ParkingSpot extends React.Component<Props> {
  private id: NodeJS.Timeout | undefined;

  componentDidMount() {
    this.id = setInterval(() => {
      this.setState({});
    }, 1000);
  }

  componentWillUnmount() {
    if (typeof this.id !== 'undefined') {
      clearInterval(this.id);
    }
  }

  render() {
    const { leaveCarCallback, parkCarCallback, number, car } = this.props;

    return (
      <div>
        <Card style={{ height: '300px' }}>
          <p
            style={{
              fontSize: '2em',
              opacity: car ? 1 : 0.2,
            }}
          >
            {car?.number || '空闲'}
          </p>
          {car && (
            <>
              <p>车型: {modelEngToChn.get(car.model)}</p>
              <p>入场时间: {`${formatTime(new Date(car.enterTime))}`}</p>
              <p>
                停车时间:{' '}
                {new Date(new Date().getTime() - car.enterTime)
                  .toISOString()
                  .substr(11, 8)}
              </p>
              <p>
                实时费用:{' '}
                {(
                  Number(calcTime(new Date(car.enterTime), new Date())) *
                  car.price
                ).toFixed(2)}{' '}
                元
              </p>
              <Popconfirm
                title="是否离场?"
                onConfirm={() => {
                  leaveCarCallback(number);
                  message.success(`离开成功 消费: ${car.cost?.toFixed(2)}元`);
                }}
                okText="是的"
                cancelText="不了"
              >
                <Button>离场</Button>
              </Popconfirm>
            </>
          )}
          {!car && (
            <>
              <Button
                onClick={() => {
                  // need a form to handle parking request
                  parkCarCallback(number);
                }}
              >
                停车
              </Button>
            </>
          )}
        </Card>
      </div>
    );
  }
}
