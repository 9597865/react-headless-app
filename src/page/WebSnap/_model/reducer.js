import * as serviceApi from '@/services/domain/server';

/**
 * * reducer 方法 fetch
 * @param {*} payload
 * @param {*} moduleState
 * @param {*} actionCtx
 */
export const fetch = async (payload, moduleState, actionCtx) => {
  const { current, pageSize } = payload;
  const res = await serviceApi.getItems();
  const { data } = res;
  const { TotalCount } = data;
  return { list: data.IntanceSet };
};

/**
 * * reducer 方法 fetchPicUrl
 * 服务器下载，到本地服务器
 * @param {*} payload
 * @param {*} moduleState
 * @param {*} actionCtx
 */
export const fetchPicUrl = async (payload, moduleState, actionCtx) => {
  const { current, pageSize } = payload;
  const res = await serviceApi.postFetchPicUrl(payload);
  const { data } = res;
  return { localPicUrl: data };
};
