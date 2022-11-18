import { ColorCodeConversion } from '@/utils/utils';
import { Table } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import './index.less';
interface Props {
  [key: string]: any;
  onRowSelect?: (row: any) => void; //单击选中单行
  columns: any[];
  dataSource: any[];
  record?: API.StationInfo; //
  scroll?: any;
  pagination?: any;
}

function PTable(props: Props): ReactElement {
  /**
   *
   * @param record
   * @param dataSource
   */
  const cantFindRecord = (record: any, dataSource: any[]): boolean => {
    return dataSource.findIndex((item) => item.mcId === record.mcId) === -1;
  };

  /**
   *
   * @param dataSource 选中表格中第一条数据
   * @param onRowSelect
   */
  const selectTopRow = (dataSource: any[], onRowSelect: (row: any) => void) => {
    if (!props.record || cantFindRecord(props.record, dataSource)) {
      onRowSelect(dataSource[0]);
    }
  };

  useEffect(() => {
    if (
      props.dataSource &&
      props.dataSource.length !== 0 &&
      props.onRowSelect
    ) {
      // 因为选择通常伴有点击事件，导致前面的接口报错无法显示出来又开始调用新的接口，所以将这段逻辑隐藏
      selectTopRow(props.dataSource, props.onRowSelect);
    }
  }, [props.dataSource]);

  return (
    <Table<API.StationInfo>
      rowClassName="pdaTableItem"
      rowKey="id"
      onRow={(row) => {
        return {
          style: {
            backgroundColor:
              `${row.station}${row.slot}${row.subSlot}` ===
              `${props.record?.station}${props.record?.slot}${props.record?.subSlot}`
                ? '#1677ff'
                : ColorCodeConversion(row.corlorId ?? 0),
            color:
              `${row.station}${row.slot}${row.subSlot}` ===
              `${props.record?.station}${props.record?.slot}${props.record?.subSlot}`
                ? '#fff'
                : '#333',
          },
          onClick: () => {
            if (props.onRowSelect) props.onRowSelect(row);
          },
        };
      }}
      pagination={false}
      size="small"
      scroll={{ x: 400, y: 250 }}
      {...props}
    ></Table>
  );
}

export default PTable;
