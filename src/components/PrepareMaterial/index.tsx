import {
  Button,
  Ellipsis,
  Form,
  Grid,
  Input,
  List,
  NoticeBar,
  Space,
  Tag,
  Toast,
} from 'antd-mobile';
import React, { useEffect, useMemo, useState } from 'react';
import { columns } from './columns';
import PTable from './PTable';
import { GetCompInfo, GetStationInfo, UpPart } from '@/service/API';

const Index = () => {
  const [selectedBody, setSelectedBody] = useState<API.StationInfo>();
  const [dataSource, sertDataSource] = useState<API.StationInfo[]>([{}]);
  const [screenDataSource, sertScreenDataSource] = useState<API.StationInfo[]>([
    {},
  ]);
  const [mcid, sertMcid] = useState<number>(0);
  const [error, setError] = useState('');
  const [scanValue, setScanValue] = useState('');
  const [qty, setQty] = useState(0);
  const getCompInfo = async (sCompId: string) => {
    try {
      const res = await GetCompInfo(sCompId);
      if (res.statusCode != 200) {
        return;
      }
      if (res.data) {
        console.log('res.data', res.data);
        if (res.data.amount ?? 0 > 0) {
          /**
           * 最终剩余数量 = 剩余数量 - 使用数量 - 错误数量 - 修正数量
           */
          setQty(
            res.data.amount -
              res.data.used -
              res.data.errors -
              res.data.correction,
          );
        }
      }
    } catch (error) {}
  };

  const getStationInfo = async (mcid: number) => {
    try {
      const res = await GetStationInfo(mcid);
      if (res.statusCode != 200) {
        return;
      }
      if (res.data) {
        sertDataSource(res.data);
        console.log('dataSource[0]', res.data[0]);
        setSelectedBody(res.data[0]);
        res.data[0].compId && getCompInfo(res.data[0].compId);
        Toast.show({
          icon: 'success',
          content: '获取站位信息成功',
        });
      }
    } catch (error) {
      console.log(error);
      setScanValue('');
      setError('请求错误，请检查');
    }
  };
  const upPart = async (values: API.UpPartBody) => {
    try {
      const res = await UpPart(values);
      if (res.statusCode != 200) {
        res.message && setError(res.message);
        setScanValue('');
        return;
      }
      Toast.show({
        icon: 'success',
        content: '备料成功',
      });
      setError('');
      setScanValue('');
      getStationInfo(mcid);
    } catch (error) {
      console.log(error);
      setScanValue('');
      setError('请求错误，请检查');
    }
  };
  const handleOk = () => {
    setError('');
    if (!scanValue) {
      setError('请扫描料盘号或站位号或MCID!');
      return;
    }
    if (scanValue.slice(0, 2).toUpperCase() == 'MD') {
      /**
       * 区域或者轨道
       */
      const nLane = scanValue.slice(2);
      if (!nLane) {
        setError('关键字MD,没有识别到轨道编号,请确认');
      }
      const re: RegExp = /^\d{1,}$/; //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
      if (!re.test(nLane)) {
        setError('轨道编号不能为非数字!');
        setScanValue('');
        return;
      }
      if (nLane == '1' || (nLane == '2' && dataSource)) {
        const newDataSource: API.StationInfo[] = [];
        dataSource?.map((x) => {
          if (x.nLane == Number(nLane)) {
            newDataSource.push(x);
          }
        });
        sertScreenDataSource(newDataSource);
      }
      setScanValue('');
      return;
    }
    if (scanValue.slice(0, 4).toUpperCase() == 'MCID') {
      sertScreenDataSource([]);
      const mcid = scanValue.slice(4);
      if (!mcid) {
        setError('MCID不能为空,请确认!');
        setScanValue('');
        return;
      }
      const re: RegExp = /^\d{1,}$/; //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
      if (!re.test(mcid)) {
        setError('MCID不能为非数字!');
        setScanValue('');
        return;
      }
      sertMcid(Number(mcid));
      getStationInfo(Number(mcid));
      setScanValue('');
      return;
    } else {
      const parameter = {
        feederId: 0,
        ...selectedBody,
      };
      parameter.compId = scanValue;
      upPart(parameter as API.UpPartBody);
      return;
    }
  };
  const msg = useMemo(() => {
    return error && <NoticeBar content={error} color="alert" />;
  }, [error]);

  useEffect(() => {
    if (selectedBody?.compId) {
      getCompInfo(selectedBody?.compId);
    }
  }, [selectedBody?.compId]);

  return (
    <>
      {msg}
      <Input
        style={{ border: '2px solid #eee', height: '42px', lineHeight: '42px' }}
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

      <Grid columns={2} gap={2}>
        <Grid.Item>
          <span>
            <Tag color="default" style={{ width: '100%' }}>
              MCID:{mcid}
            </Tag>
          </span>
        </Grid.Item>
        <Grid.Item>
          <Tag color="default" style={{ width: '100%' }}>
            当前站位:{selectedBody?.station ?? ' '}
          </Tag>
        </Grid.Item>
        <Grid.Item>
          <Tag color="default" style={{ width: '100%' }}>
            当前轨道:{selectedBody?.station ?? ' '}
          </Tag>
        </Grid.Item>
        <Grid.Item>
          <Tag color="default" style={{ width: '100%' }}>
            当前槽位:{selectedBody?.station ?? ' '}
          </Tag>
        </Grid.Item>
        <Grid.Item>
          <Tag color="default" style={{ width: '100%' }}>
            当前料号:{selectedBody?.compName ?? ' '}
          </Tag>
        </Grid.Item>
        <Grid.Item>
          <Tag color="default" style={{ width: '100%' }}>
            剩余数量:{qty}
          </Tag>
        </Grid.Item>
        <Grid.Item span={2}>
          <Tag color="default" style={{ width: '100%' }}>
            当前料盘:
            {selectedBody?.compId ?? ''}
          </Tag>
        </Grid.Item>
      </Grid>

      <List>
        <PTable
          columns={columns}
          ellipsis={true}
          dataSource={
            screenDataSource.length > 1 ? screenDataSource : dataSource
          }
          onRowSelect={(row) => {
            setSelectedBody(row);
          }}
          record={selectedBody}
        />
      </List>
    </>
  );
};

export default Index;
