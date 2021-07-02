/* eslint-disable react/prefer-stateless-function */

// Route: /, for showing the car
import React from 'react';
import {
  Row,
  Col,
  FormInstance,
  Modal,
  Form,
  Input,
  Select,
  Radio,
} from 'antd';
import ParkingSpot from './ParkingSpot';
import { currentSpots, leave, park } from '../controllers/Spots';
import Car, { modelEngToChn } from '../models/Car';
import { province } from '../models/Data';

const { Option } = Select;

type State = {
  modalShow: boolean;
  spotWillBePark: number;
};

export default class Home extends React.Component<any, State> {
  private formRef;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
    this.formRef = React.createRef<FormInstance>();
    this.state = {
      modalShow: false,
      spotWillBePark: 0,
    };
  }

  private leaveCarCallback = (index: number) => {
    leave(index);
    // update this component
    this.setState({});
  };

  private parkCarCallback = (spotIndex: number) => {
    // update this component & set spotWillBePark
    this.setState({ modalShow: true, spotWillBePark: spotIndex });
  };

  // read info from Form when modal OK
  private onModalOK = () => {
    this.formRef.current
      ?.validateFields()
      .then(() => {
        // get info from Form
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const province = this.formRef.current?.getFieldValue('province');
        const no: string = this.formRef.current?.getFieldValue('no') as string;
        const model = this.formRef.current?.getFieldValue('model');
        const finalNo = `${province} ${no.toUpperCase()}`;
        // get index
        const { spotWillBePark } = this.state;
        // new a Car
        park(new Car(finalNo, model), spotWillBePark);
        // reset
        // eslint-disable-next-line promise/always-return
        this.formRef.current?.resetFields();
        this.setState({ modalShow: false });
      })
      .catch(() => {});
  };

  // handle modal cancel
  private onModelCancel = () => this.setState({ modalShow: false });

  render() {
    const currentSpotsData = currentSpots();
    const { modalShow } = this.state;

    return (
      <>
        <Row
          gutter={[16, 16]}
          style={{
            padding: '8px 0 0 0',
            marginLeft: '0px',
            marginRight: '0px',
          }}
        >
          {currentSpotsData.map((car, index) => (
            // Because the array is length-fixed & position-fixed...
            // eslint-disable-next-line react/no-array-index-key
            <Col span={6} key={index}>
              <ParkingSpot
                car={car ?? null}
                leaveCarCallback={this.leaveCarCallback}
                parkCarCallback={this.parkCarCallback}
                number={index}
              />
            </Col>
          ))}
        </Row>
        <Modal
          visible={modalShow}
          closable={false}
          onCancel={this.onModelCancel}
          onOk={this.onModalOK}
        >
          <Form
            ref={this.formRef}
            initialValues={{
              province: province[0],
              no: 'COCO51',
              model: 'NORMAL',
            }}
          >
            <Form.Item
              name="province"
              label="省份"
              rules={[{ required: true, message: '请选择你的省份' }]}
            >
              <Select placeholder="请选择你的省份">
                {province.map((v, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Option value={v} key={i}>
                    {v}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="no"
              label="号码"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(
                    /^[A-Za-z]{1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警港澳]{1}$/,
                    'g'
                  ),
                  message:
                    '请输入合法的车牌号: 大写字母开头 剩下5位为数字或字母',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="model"
              label="车型"
              rules={[{ required: true, message: '请选择你的车型' }]}
            >
              <Radio.Group>
                {['SMALL', 'NORMAL', 'LARGE'].map((v, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Radio value={v} key={i}>
                    {modelEngToChn.get(v)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
