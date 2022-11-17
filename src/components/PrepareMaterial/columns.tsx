import { ColorCodeConversion } from '@/utils/utils';

export const columns = [
  {
    title: '序号',
    width: 50,
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    render: (text: any, record: any, index: number) => {
      return (
        <span style={{ color: ColorCodeConversion(record.corlorId) }}>
          {index + 1}
        </span>
      );
    },
  },
  {
    title: '区域',
    width: 70,
    dataIndex: 'nLane',
    key: 'nLane',
    render: (text: any, record: any, index: number) => {
      return (
        <span style={{ color: ColorCodeConversion(record.corlorId) }}>
          {text}
        </span>
      );
    },
  },
  {
    title: '站位',
    width: 70,
    dataIndex: 'station',
    key: 'station',
    render: (text: any, record: any, index: number) => {
      return (
        <span style={{ color: ColorCodeConversion(record.corlorId) }}>
          {text}
        </span>
      );
    },
  },
  {
    title: '槽位',
    width: 70,
    dataIndex: 'slot',
    key: 'slot',
    render: (text: any, record: any, index: number) => {
      return (
        <span style={{ color: ColorCodeConversion(record.corlorId) }}>
          {text}
        </span>
      );
    },
  },
  {
    title: '子槽位',
    width: 70,
    dataIndex: 'subSlot',
    key: 'subSlot',
    render: (text: any, record: any, index: number) => {
      return (
        <span style={{ color: ColorCodeConversion(record.corlorId) }}>
          {text}
        </span>
      );
    },
  },
  {
    title: '料号',
    width: 150,
    dataIndex: 'compName',
    key: 'compName',
    render: (text: any, record: any, index: number) => {
      return (
        <span style={{ color: ColorCodeConversion(record.corlorId) }}>
          {text}
        </span>
      );
    },
  },
  {
    title: '料盘',
    width: 150,
    dataIndex: 'compId',
    key: 'compId',
    render: (text: any, record: any, index: number) => {
      return (
        <span style={{ color: ColorCodeConversion(record.corlorId) }}>
          {text}
        </span>
      );
    },
  },
];
