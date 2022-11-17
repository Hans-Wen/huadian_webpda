import { Button, Input, List, Space } from 'antd-mobile';
import { Table } from 'antd';
import React, { useState } from 'react';
import { columns } from './columns';
import PTable from '../PTable';

const Index = () => {
  const [selectedBody, setSelectedBody] = useState();
  const dataSource = [
    {
      id: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区',
    },
    {
      id: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区',
    },
    {
      id: '3',
      name: '胡彦祖',
      age: 42,
      address: '西湖区',
    },
    {
      id: '4',
      name: '胡彦祖',
      age: 42,
      address: '西湖区',
    },
    {
      id: '5',
      name: '胡彦祖',
      age: 42,
      address: '西湖区',
    },
    {
      id: '6',
      name: '胡彦祖',
      age: 42,
      address: '西湖区',
    },
  ];
  return (
    <>
      <div>
        <List
          header={
            <div>
              当前MCID:{12345}{' '}
              <Button color="primary" style={{ float: 'right' }} size="mini">
                刷新
              </Button>
            </div>
          }
        >
          <List.Item title={'请扫描料盘号或者站位号'}>
            <Input placeholder="请扫描..." clearable />
          </List.Item>
          <List.Item>
            <Button
              block
              color="primary"
              style={{ float: 'right' }}
              size="large"
            >
              确认
            </Button>
          </List.Item>
          <List.Item title={'站位'}>XXXX站位</List.Item>
          <List.Item>
            <PTable
              columns={columns}
              ellipsis={true}
              dataSource={dataSource}
              onRowSelect={(row) => {
                console.log('row', row);

                setSelectedBody(row);
              }}
              record={selectedBody}
            />
          </List.Item>
        </List>
      </div>
    </>
  );
};

export default Index;
