/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { PageHeader, Descriptions, Tabs, Button, message } from 'antd';
import { ipcRenderer } from 'electron';
import { leaveAll, randomParking } from '../controllers/Spots';
import './styles/Body.global.css';
import Home from './Home';
import ManagerSwitch from './ManagerSwitch';
import Timer from './StatExtra';

export default class Head extends React.Component<any, { currentTab: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: '0',
    };
  }

  render() {
    const { currentTab } = this.state;

    return (
      <div className="Test">
        <PageHeader
          title="管理你的车"
          subTitle="该停车场不接受黑车停泊"
          ghost={false}
          extra={[
            <Button
              key="0"
              onClick={() => {
                ipcRenderer.send('showConfigDir');
              }}
            >
              修改配置
            </Button>,
            <Button
              onClick={() => {
                randomParking((hint: string) => message.info(hint));
                // update this component
                this.setState({});
              }}
              key="1"
            >
              一键抢位
            </Button>,
            <Button
              onClick={() => {
                leaveAll((hint: string) => message.info(hint));
                // update this component
                this.setState({});
              }}
              key="2"
            >
              一键离场
            </Button>,
          ]}
          footer={
            <Tabs
              defaultActiveKey="0"
              onChange={(k) => this.setState({ currentTab: k })}
            >
              <Tabs.TabPane tab="车位" key="0" forceRender>
                {currentTab === '0' ? (
                  <Home foo={new Date().getTime()} />
                ) : null}
              </Tabs.TabPane>
              <Tabs.TabPane tab="管理" key="1" forceRender>
                {currentTab === '1' ? (
                  <ManagerSwitch foo={new Date().getTime()} />
                ) : null}
              </Tabs.TabPane>
            </Tabs>
          }
        >
          <div className="content">
            <div>
              <Descriptions size="small" column={2}>
                <Descriptions.Item label="作者">situ2001</Descriptions.Item>
                <Descriptions.Item label="班级">网络工程202</Descriptions.Item>
                <Descriptions.Item label="按车型计费(元/小时)">
                  小5 中10 大15
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className="extra">
              <Timer />
            </div>
          </div>
        </PageHeader>
      </div>
    );
  }
}
