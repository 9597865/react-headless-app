import * as serviceApi from '@/services/domain/server';
/**
 * * reducer 方法 fetch
 * @param payload : 挂载参数
 * @param moduleState : 可选  (默认参数，不需要外部赋值)
 * @param actionCtx : 可选  (默认参数，不需要外部赋值)
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
  return { list: data.InstanceSet, listTotal: TotalCount };
};
/**
 * 拼接h5 webUrl链接地址
 * @param {*} payload
 * @param {*} moduleState
 * @param {*} actionCtx
 */
export const joinWebUrl = (payload, moduleState, actionCtx) => {
  const {
    webUrl,
    styleId,
    pageWidth,
    pageHeight,
    img0 = 'images/01.jpg',
    img1 = 'images/02.jpg',
  } = payload;
  const newWebUrl = `http://${webUrl}?sid=${styleId}&img0=${img0}&img1=${img1}&w=${pageWidth}&h=${pageHeight}`;
  return { newWebUrlPath: newWebUrl, img0, img1 };
};

export const getTimeSnap = async (payload, moduleState, acticonCtx) => {
  const res = await serviceApi.getTimeSnapPercent();
  return res;
};

export const postTimeSnap = async (payload, moduleState, actionCtx) => {
  const res = await serviceApi.postTimeSnap(payload);
  const { data } = res;
  return { timesnameData: data };
};

export const postDestoryTimeSnap = async (payload, moduleState, actionCtx) => {
  await serviceApi.destoryTimeSnap(payload);
  return {};
};
