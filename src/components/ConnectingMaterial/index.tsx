import { useCustomAudio } from '@/hooks/audio';
import { SplicingPart } from '@/service/API';
import { Button, Form, Input, InputRef, List, NoticeBar } from 'antd-mobile';

import React, { useMemo, useRef, useState } from 'react';
import { useSelector } from 'umi';

const Index = () => {
  const [audio, controls] = useCustomAudio();
  const dataSource: {
    data: API.StationInfo[];
  } = useSelector((state: any) => state.dataSource);
  const compIdRef = useRef<any>();
  const [compId, setCompId] = useState<string>();

  const newCompIdRef = useRef<any>();
  const [newCompId, setNewCompId] = useState<string>();

  const [error, setError] = useState('');
  const [compIdInfo, setCompIdInfo] = useState<API.StationInfo>();
  const msg = useMemo(() => {
    return error && <NoticeBar content={error} color="alert" />;
  }, [error]);

  const handleOk = () => {};

  /**
   * 查找旧料盘信息
   */
  const onQueryCompIdInfo = () => {
    const _compIdInfo = dataSource.data?.find((x) => x.compId == compId);
    if (!_compIdInfo) {
      setError('旧料盘不存在,请确认!');
      controls.fail();
      return;
    }
    setCompIdInfo(_compIdInfo);
    newCompIdRef?.current.focus();
  };

  const splicingPart = async () => {
    console.log('compIdInfo', compIdInfo);

    if (!compIdInfo) {
      setError('旧料盘不存在,请确认!');
      controls.fail();
      return;
    }
    const parameter = {
      newCompId: newCompId,
      ...compIdInfo,
    };
    try {
      const res = await SplicingPart(parameter as API.SplicingPartBody);
      console.log('res', res);
    } catch (error) {}
  };
  return (
    <>
      <Form layout="horizontal">
        <Form.Item label="旧料盘号" name="compId">
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
        <Form.Item label="新料盘号" name="newCompId">
          <Input
            ref={newCompIdRef}
            placeholder="请扫描旧料盘号"
            clearable
            autoComplete="off"
            value={newCompId}
            onChange={(v) => {
              setNewCompId(v);
            }}
            onEnterPress={splicingPart}
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
      {audio}
    </>
  );
};

export default Index;
