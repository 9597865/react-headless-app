import * as serviceApi from "@/services/domain/server";
/**
 * * reducer 方法 fetch
 * @param payload : 挂载参数
 * @param moduleState : 可选  (默认参数，不需要外部赋值)
 * @param actionCtx : 可选  (默认参数，不需要外部赋值)
 */
export async function fetch(payload, moduleState, actionCtx) {
  const { current, pageSize } = payload;
  actionCtx.setState({
    current,
    pageSize,
  });
  const res = await serviceApi.getItems();
  const { data } = res;
  const { TotalCount } = data;
  return { list: data.InstanceSet, listTotal: TotalCount };
}
