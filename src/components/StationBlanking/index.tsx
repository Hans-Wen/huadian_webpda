import { Button, Form, Input, List, NoticeBar } from 'antd-mobile';

import React, { useState } from 'react';

const Index = () => {
  return (
    <>
      <Form layout="horizontal">
        <Form.Item label="区域" name="username">
          <Input
            placeholder="请输入区域"
            clearable
            autoComplete="off"
            autoFocus
          />
        </Form.Item>
        <Form.Item label="站位" name="password">
          <Input placeholder="请输入站位" clearable autoComplete="off" />
        </Form.Item>
      </Form>
      <List.Item>
        <Button block color="primary" style={{ float: 'right' }} size="middle">
          下料
        </Button>
      </List.Item>
    </>
  );
};

export default Index;
