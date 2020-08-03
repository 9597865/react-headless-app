import * as serviceApi from '@/services/domain/server';
/**
 *
 */
export const fetch = async (payload, moduleState, actionCtx) => {
  const { current, pageSize } = payload;
  const res = await serviceApi.getItems();
  return {};
};
