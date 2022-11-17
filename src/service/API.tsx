import { request } from 'umi';

export async function GetStationInfo(
  mcid: number,
  options?: { [key: string]: any },
) {
  return request<API.GetStationInfoResult>(
    `/api/Material/GetStationInfo?mcid=${mcid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(options || {}),
    },
  );
}
