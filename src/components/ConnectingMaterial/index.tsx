import { Button, Form, Input, List, NoticeBar } from 'antd-mobile';

import React, { useMemo, useRef, useState } from 'react';
import { useInputState } from './hooks';

const Index = () => {
  const {
    inputRef: compIdRef,
    value: compId,
    setValue: setCompId,
  } = useInputState();
  const {
    inputRef: newCompIdRef,
    value: newCompId,
    setValue: setNewCompId,
  } = useInputState();
  const [error, setError] = useState('');
  const msg = useMemo(() => {
    return error && <NoticeBar content={error} color="alert" />;
  }, [error]);

  const handleOk = () => {};

  /**
   * 查找旧料盘信息
   */
  const onQueryCompIdInfo = () => {};
  return (
    <>
      <Form layout="horizontal">
        <Form.Item label="旧料盘号" name="username">
          <Input
            ref={compIdRef}
            value={compId}
            placeholder="请扫描旧料盘号"
            clearable
            autoComplete="off"
            autoFocus
            onChange={(v) => {
              setCompId(v);
            }}
            onEnterPress={onQueryCompIdInfo}
          />
        </Form.Item>
        <Form.Item label="新料盘号" name="username">
          <Input
            ref={newCompIdRef}
            placeholder="请扫描旧料盘号"
            clearable
            autoComplete="off"
            value={newCompId}
            onChange={(v) => {
              setNewCompId(v);
            }}
            onEnterPress={() => {}}
          />
        </Form.Item>
      </Form>

      <List.Item>
        <Button
          block
          color="primary"
          style={{ float: 'right' }}
          size="middle"
          onClick={() => {
            handleOk();
          }}
        >
          接料
        </Button>
      </List.Item>
      {msg}
    </>
  );
};

export default Index;
