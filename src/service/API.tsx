import { request } from 'umi';

/**
 * 获取站位信息
 * @param mcid
 * @param options
 * @returns
 */
export async function GetStationInfo(
  mcid: number,
  options?: { [key: string]: any },
) {
  return request<API.BaseResult>(`/api/Material/GetStationInfo?mcid=${mcid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * 备料
 * @param body
 * @param options
 * @returns
 */
export async function UpPart(
  body: API.UpPartBody,
  options?: { [key: string]: any },
) {
  return request<API.BaseResult>(`/api/Material/UpPart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 获取料盘详细信息
 * @param sCompId  料盘
 * @param options
 * @returns
 */
export async function GetCompInfo(
  /**
   * 料盘
   */
  sCompId: string,
  options?: { [key: string]: any },
) {
  return request<API.GetCompInfoResult>(
    `/api/Material/GetCompInfo?sCompId=${sCompId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(options || {}),
    },
  );
}

/**
 * 接料
 * @param body
 * @param options
 * @returns
 */
export async function SplicingPart(
  body: API.SplicingPartBody,
  options?: { [key: string]: any },
) {
  console.log('body', body);

  return request<API.SplicingPartResult>(`/api/Material/SplicingPart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
