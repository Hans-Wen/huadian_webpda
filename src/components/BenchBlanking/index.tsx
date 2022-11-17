import { Button, Form, Input, List, NoticeBar } from 'antd-mobile';

import React, { useState } from 'react';

const Index = () => {
  return (
    <>
      <Form layout="horizontal">
        <Form.Item label="MCID" name="mcid">
          <Input
            placeholder="请输入MCID"
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
    </>
  );
};

export default Index;
