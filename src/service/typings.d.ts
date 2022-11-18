// @ts-ignore
/* eslint-disable */

declare namespace API {
  type StationInfo = {
    /**
     * mcId
     */
    mcId?: number;
    /**
     * 区域
     */
    nLane?: number;
    /**
     * 站位
     */
    station?: number;
    /**
     * 槽位
     */
    slot?: number;
    /**
     * 子槽位
     */
    subSlot?: number;
    splicings?: any[];

    /**
     * 料盘号
     */
    compId?: string;
    /**
     * 料号
     */
    compName?: string;
    isTray?: boolean;
    amount?: number;
    programs?: [string];
    leftQty?: number;
    corlorId?: number;
    groupId?: number;
    combineStation?: string;
  };
  type BaseResult = {
    /**
     * 状态码
     */
    statusCode?: number;
    message?: string;
    data?: StationInfo[];
    actionName?: '';
  };

  type UpPartBody = {
    feederId: number;
    station: number;
    slot: number;
    subSlot: number;
    nLane: number;
    /**
     * 料盘
     */
    compId: string;
    mcId: number;
    programs: [string];
    compName: string;
  };

  type CompInfo = {
    /**
     * 区域
     */
    nLane: number;
    /**
     * 站位
     */
    station: number;
    /**
     * 槽位
     */
    slot: number;
    /**
     * 料盘号
     */
    compId: string;
    /**
     * 料号
     */
    compName: string;
    /**
     * 剩余数量
     */
    amount: number;
    /**
     * 使用数量
     */
    used: number;
    /**
     * 错误数量
     */
    errors: number;
    /**
     * 修正数量
     */
    correction: number;
  };
  type GetCompInfoResult = {
    /**
     * 状态码
     */
    statusCode?: number;
    message?: string;
    data?: CompInfo;
  };

  type SplicingPartBody = {
    station: number;
    slot: number;
    subSlot: number;
    nLane: number;
    /**
     * 旧料盘
     */
    compId: string;
    mcId: number;
    compName: string;
    /**
     * 新料盘
     */
    newCompId: string;
  };

  type SplicingPartResult = {
    statusCode?: number;
    message?: string;
    data?: string;
    actionName?: '';
  };
}
declare module '*.wav';
