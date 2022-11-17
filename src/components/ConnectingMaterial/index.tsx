import { Button, Form, Input, List } from 'antd-mobile';

import React, { useState } from 'react';

const Index = () => {
  return (
    <>
      <Form layout="horizontal">
        <Form.Item label="旧料盘号" name="username">
          <Input
            placeholder="请扫描旧料盘号"
            clearable
            autoComplete="off"
            autoFocus
          />
        </Form.Item>
      </Form>

      <List.Item>
        <Button block color="primary" style={{ float: 'right' }} size="middle">
          下料
        </Button>
      </List.Item>
      <List.Item>旧料盘号</List.Item>
      <List.Item>旧料盘号</List.Item>
    </>
  );
};

export default Index;
