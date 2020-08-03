import * as serviceApi from '@/services/domain/server';

/**
 * * reducer 方法 fetch
 * @param {*} payload
 * @param {*} moduleState
 * @param {*} actionCtx
 */
export const fetch = async (payload, moduleState, actionCtx) => {
  const { current, pageSize } = payload;
  actionCtx.setState({
    current,
    pageSize,
  });
  const res = await serviceApi.getItems();
  const { data } = res;
  const { TotalCount } = data;
  return { list: data.IntanceSet };
};
