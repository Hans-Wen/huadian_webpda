import { Button, Form, Input, List, NoticeBar, Toast } from 'antd-mobile';

import React, { useMemo, useState } from 'react';
import { columns } from './columns';
import PTable from './PTable';
import { useCustomAudio } from '@/hooks/audio';
import { GetStationInfo } from '@/service/API';

const Index = () => {
  const [selectedBody, setSelectedBody] = useState<API.StationInfo>();
  const [dataSource, sertDataSource] = useState<[API.StationInfo]>([{}]);
  const [mcid, sertMcid] = useState<number>(0);
  const [error, setError] = useState('');
  /**
   * 扫描值
   */
  const [scanValue, setScanValue] = useState('');
  const getStationInfo = async (mcid: number) => {
    try {
      const res = await GetStationInfo(mcid);
      if (res.statusCode != 200) {
        return;
      }
      res.data && sertDataSource(res.data);
    } catch (error) {
      console.log(error);
      setError('请求错误，请检查');
    }
  };

  const handleOk = () => {
    setError('');
    if (!scanValue) {
      setError('请扫描料盘号或站位号或MCID!');
      return;
    }
    if (scanValue.slice(0, 4).toUpperCase() == 'MCID') {
      const mcid = scanValue.slice(4);
      if (!mcid) {
        setError('MCID不能为空,请确认!');
        return;
      }
      const re: RegExp = /^\d{1,}$/; //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
      if (!re.test(mcid)) {
        setError('MCID不能为非数字!');
        return;
      }
      sertMcid(Number(mcid));
      getStationInfo(Number(mcid));
      return;
    }
  };
  const msg = useMemo(() => {
    return error && <NoticeBar content={error} color="alert" />;
  }, [error]);
  return (
    <>
      <List>
        <List.Item title={'当前MCID'}>{mcid}</List.Item>
        <List.Item title={'站位'}>{selectedBody?.station ?? ' '}</List.Item>
      </List>
      <Form layout="horizontal">
        <Form.Item label="">
          <Input
            placeholder="请扫描料盘号或者站位号"
            clearable
            value={scanValue}
            onChange={(val: string) => {
              setScanValue(val);
            }}
            onEnterPress={() => {
              handleOk();
            }}
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
          确定
        </Button>
      </List.Item>
      {msg}

      <List>
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
      </List>
    </>
  );
};

export default Index;
