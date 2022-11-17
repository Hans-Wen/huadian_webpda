// @ts-ignore
/* eslint-disable */

declare namespace API {
  type StationInfo = {
    /**
     * mcId
     */
    mcId?: number;
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
     * 区域
     */
    nLane?: number;
    /**
     * 料盘号
     */
    compId?: number;
    /**
     * 料号
     */
    compName?: string;
    isTray?: boolean;
    amount?: number;
    programs?: string[];
    leftQty?: number;
    corlorId?: number;
    groupId?: number;
    combineStation?: string;
  };
  type GetStationInfoResult = {
    /**
     * 状态码
     */
    statusCode?: number;
    message?: string;
    data?: [StationInfo];
    actionName?: '';
  };
}
declare module '*.wav';
