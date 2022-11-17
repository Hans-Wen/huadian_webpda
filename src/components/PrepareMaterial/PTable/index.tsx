import { ColorCodeConversion } from '@/utils/utils';
import { Table } from 'antd';
import React, { ReactElement, useEffect } from 'react';

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
      rowKey="id"
      onRow={(row) => {
        console.log('row', row);
        console.log('props.record', props.record);

        return {
          style: {
            backgroundColor: row === props.record ? 'blue' : '#fff',
            color:
              row === props.record
                ? '#fff'
                : ColorCodeConversion(row.corlorId ?? 0),
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
