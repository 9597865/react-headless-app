import * as serviceApi from '@/services/domain/server';

/**
 *
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
